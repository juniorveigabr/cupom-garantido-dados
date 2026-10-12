# Cupons de desconto no Brasil em números

Dados abertos do [Cupom Garantido](https://cupomgarantido.com.br/), site brasileiro que reúne cupons de desconto de lojas online e mostra quais códigos foram encontrados em mais de uma fonte.

Aqui ficam os mesmos números da página [Cupons em números](https://cupomgarantido.com.br/numeros/), em arquivos fáceis de baixar e de abrir numa planilha, com a série guardada ao longo do tempo. Os arquivos são atualizados sozinhos, uma vez por semana.

## O que tem aqui

| Arquivo | O que é |
|---|---|
| [`dados/resumo-por-leitura.csv`](dados/resumo-por-leitura.csv) | Uma linha por semana: cupons ativos, lojas, cupons confirmados, expirados em 30 dias e retirados |
| [`dados/cupons-por-dia.csv`](dados/cupons-por-dia.csv) | Quantos cupons ativos o site tinha em cada dia |
| [`dados/categorias.csv`](dados/categorias.csv) | Lojas, cupons e cupons confirmados por categoria (moda, farmácia, informática…) |
| [`dados/tipos-de-cupom.csv`](dados/tipos-de-cupom.csv) | Quantos cupons de cada tipo: porcentagem, frete grátis, primeira compra, só no aplicativo |
| [`dados/lojas-com-mais-cupons.csv`](dados/lojas-com-mais-cupons.csv) | As dez lojas com mais cupons ativos |
| [`dados/atual.json`](dados/atual.json) | A leitura mais recente, inteira, como o site publica |

## Como os números são contados

- **Cupom ativo**: código que o site está mostrando naquele dia, de uma loja acompanhada.
- **Confirmado**: o mesmo código foi encontrado em duas fontes ou mais. **O site não testa o cupom no carrinho da loja**: "confirmado" não quer dizer "funciona", quer dizer que mais de uma fonte publica aquele código.
- **Expirados em 30 dias**: cupons que saíram do site por terem vencido. O site guarda no máximo 15 expirados por loja, então o número real é esse ou maior.
- **Retirados por campanha passada**: códigos de datas que já acabaram (Black Friday, Dia das Mães) e que as fontes ainda publicavam.
- A coleta é automática e roda várias vezes por dia. Ninguém edita os números à mão.

A explicação completa está na página [Cupons em números](https://cupomgarantido.com.br/numeros/).

## Pode usar

Pode usar estes dados em reportagem, trabalho escolar, pesquisa, planilha ou gráfico, sem pedir autorização. Pedimos só que a fonte seja citada, com o link:

> Fonte: Cupom Garantido, "Cupons em números" (https://cupomgarantido.com.br/numeros/)

O botão **Cite this repository**, no alto desta página, entrega a citação pronta.

## Limites que vale saber

- Os números são do que o Cupom Garantido acompanha (as lojas da lista dele), não de todo o comércio eletrônico do Brasil.
- A série começa em outubro de 2026.
- Queda ou subida de um dia para o outro pode ser só uma fonte fora do ar naquele dia; olhe a semana.

## In English

Open data about discount coupons in Brazilian online stores, published by [Cupom Garantido](https://cupomgarantido.com.br/): active coupons, stores, coupons confirmed by two or more sources, and breakdowns by category and coupon type. Updated weekly by an automated job. "Confirmed" means the same code was found in two or more sources; codes are not tested at checkout. Free to use with attribution and a link to https://cupomgarantido.com.br/numeros/.
