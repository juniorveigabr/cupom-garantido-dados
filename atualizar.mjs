// Atualiza os arquivos de dados deste repositório a partir do arquivo público do site:
// https://cupomgarantido.com.br/numeros/dados.json
// Roda sozinho toda semana (.github/workflows/atualizar.yml). Não usa chave nem senha: lê só o que qualquer visitante lê.
// Se o arquivo do site vier estranho, não grava nada (sai com erro) e os dados da semana anterior ficam.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const FONTE = 'https://cupomgarantido.com.br/numeros/dados.json';
const r = await fetch(FONTE, { headers: { 'User-Agent': 'cupom-garantido-dados (github.com/juniorveigabr/cupom-garantido-dados)' }, signal: AbortSignal.timeout(30000) });
if (!r.ok) throw new Error(`O site respondeu ${r.status}`);
const d = await r.json();
if (d.fonte !== 'Cupom Garantido' || !(d.cupons > 0) || !(d.lojas > 0) || !Array.isArray(d.categorias) || !d.em) throw new Error('O arquivo do site não veio no formato esperado; nada foi gravado.');

const celula = (v) => { const s = v == null ? '' : String(v); return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
const csv = (colunas, linhas) => [colunas.join(','), ...linhas.map((l) => colunas.map((c) => celula(l[c])).join(','))].join('\n') + '\n';
const lerCsv = async (arquivo) => {
  const t = await readFile(arquivo, 'utf8').catch(() => '');
  const [cab, ...linhas] = t.trim().split('\n').filter(Boolean);
  if (!cab) return [];
  const colunas = cab.split(',');
  return linhas.map((l) => Object.fromEntries(l.split(',').map((v, i) => [colunas[i], v])));
};
/** Junta linhas novas às antigas por uma chave (a nova vale) e ordena por ela. */
const juntar = (antigas, novas, chave) => [...new Map([...antigas, ...novas].map((l) => [String(l[chave]), l])).values()].sort((a, b) => String(a[chave]).localeCompare(String(b[chave])));

await mkdir('dados', { recursive: true });
const dia = d.em.slice(0, 10);

// 1) A foto de agora, como o site publica
await writeFile('dados/atual.json', JSON.stringify(d, null, 1) + '\n');

// 2) Série por dia: quantos cupons ativos em cada dia (o site só mostra os últimos dias; aqui a série acumula)
const serie = juntar(await lerCsv('dados/cupons-por-dia.csv'), (d.porDia || []).map((x) => ({ dia: x.dia, cupons_ativos: x.cupons })), 'dia');
await writeFile('dados/cupons-por-dia.csv', csv(['dia', 'cupons_ativos'], serie));

// 3) Resumo de cada leitura (uma linha por data em que este repositório foi atualizado)
const RESUMO = ['data', 'cupons_ativos', 'lojas', 'lojas_com_cupom', 'confirmados_em_2_fontes', 'confirmados_em_3_fontes', 'pct_confirmados', 'expirados_em_30_dias', 'retirados_por_campanha_passada'];
const resumo = juntar(await lerCsv('dados/resumo-por-leitura.csv'), [{ data: dia, cupons_ativos: d.cupons, lojas: d.lojas, lojas_com_cupom: d.lojasComCupom, confirmados_em_2_fontes: d.confirmados, confirmados_em_3_fontes: d.confirmadosEm3, pct_confirmados: d.pctConfirmados, expirados_em_30_dias: d.expirados30, retirados_por_campanha_passada: d.retirados }], 'data');
await writeFile('dados/resumo-por-leitura.csv', csv(RESUMO, resumo));

// 4) As tabelas de agora
await writeFile('dados/categorias.csv', csv(['categoria', 'lojas', 'cupons', 'confirmados'], d.categorias.map((c) => ({ categoria: c.nome, lojas: c.lojas, cupons: c.cupons, confirmados: c.confirmados }))));
await writeFile('dados/tipos-de-cupom.csv', csv(['tipo', 'cupons'], (d.tipos || []).map((t) => ({ tipo: t.nome, cupons: t.cupons }))));
await writeFile('dados/lojas-com-mais-cupons.csv', csv(['loja', 'cupons', 'confirmados', 'pagina'], (d.maisCupons || []).map((l) => ({ loja: l.nome, cupons: l.cupons, confirmados: l.confirmados, pagina: l.url }))));

console.log(`Dados de ${dia}: ${d.cupons} cupons ativos em ${d.lojasComCupom} lojas; série com ${serie.length} dia(s); ${resumo.length} leitura(s).`);
