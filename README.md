# Academia da Jurema 🌿

Vitrine de cursos de mestres e mestras juremeiros, no estilo "catálogo de streaming" — estática, leve e hospedada de graça no **GitHub Pages**.

> **Aqui quem ensina é quem vive.** Remuneração justa aos mestres, fundamento de casa não se vende, e parte de cada venda sustenta um fundo de apoio às casas de Jurema.

## Como funciona (fase 1)

- O site é a **vitrine + funil de venda** (catálogo, página do curso, botão comprar).
- A **venda e a entrega do curso** (vídeos, área do aluno) acontecem numa plataforma de cursos (Hotmart, Kiwify etc.): o botão "Quero este curso" aponta para o checkout de lá.
- **GitHub Pages não hospeda os vídeos nem faz login de aluno** — isso é a fase 2 (área de membros própria com Vercel + Supabase, quando houver tração).

## Como editar os cursos

Tudo vive em **um arquivo só**: [`cursos.js`](cursos.js). Cada curso é um bloco `{ ... }` com título, mestre, categoria, descrição, preço, cor da capa e o link do checkout. Instruções completas no topo do próprio arquivo.

- Curso fechou com o mestre? Preencha `link` com a URL do checkout e mude `emBreve` para `false`.
- Os cursos atuais são **exemplos de estrutura** (nenhum mestre real). Só liste curso com nome de mestre **com consentimento dele**.

## Rodar localmente

Basta abrir o `index.html` no navegador (duplo clique) — não precisa de servidor.

## Publicar / atualizar no GitHub Pages

```bash
git add -A && git commit -m "Atualiza catálogo" && git push
```

O Pages publica sozinho a partir da branch `main`. O site fica em:
`https://rodrigortwo.github.io/academia-da-jurema/`

## Princípios (inegociáveis)

1. **Consentimento e atribuição** — nenhum curso, nome ou imagem de mestre entra sem acordo claro e por escrito.
2. **Sem promessa espiritual** — os cursos são formação cultural e devocional; nunca prometem resultado, cura ou "garantia".
3. **Fundamento tem dono** — cada mestre ensina o que escolhe tornar público; a Academia não pede segredo de casa.
4. **Fundo das casas** — percentual de cada venda vai para o fundo de apoio às casas de Jurema, com prestação de contas.
