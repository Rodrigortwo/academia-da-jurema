/* ============================================================
   ACADEMIA DA JUREMA — CATÁLOGO DE CURSOS
   ============================================================
   Este arquivo é o ÚNICO lugar que você edita para gerenciar
   os cursos. Cada curso é um bloco { ... } na lista abaixo.

   Campos:
   - id ........... identificador único (sem espaços)
   - titulo ....... nome do curso
   - mestre ....... quem ensina (SÓ com consentimento do mestre!)
   - categoria .... precisa bater com uma das CATEGORIAS abaixo
   - descricao .... texto curto do card/modal
   - aprende ...... lista do "O que você vai aprender"
   - preco ........ ex.: "R$ 197" (ou "Gratuito")
   - link ......... URL do checkout (Hotmart/Kiwify/Stripe).
                    Enquanto for "", o botão mostra "Em breve".
   - capa ......... cor do poster (gradiente). Opções:
                    "ouro" | "mata" | "terra" | "noite" | "fogo" | "agua"
   - destaque ..... true = aparece no banner principal (hero)
   - emBreve ...... true = selo "EM BREVE" e sem botão de compra
   ============================================================ */

const CATEGORIAS = [
  "Fundamentos",
  "História e Memória",
  "Ervas, Banhos e Fumos",
  "Toques, Pontos e Curimba",
  "Mesa e Devoção",
];

/* Os cursos abaixo são EXEMPLOS/estrutura (nenhum mestre real).
   Substitua pelos cursos reais conforme fechar com cada mestre. */
const CURSOS = [
  {
    id: "fundamentos-jurema",
    titulo: "Fundamentos da Jurema Sagrada",
    mestre: "Mestre(a) convidado(a) — vaga aberta",
    categoria: "Fundamentos",
    descricao: "O que é a Jurema, de onde vem, como se organiza: ciência, mesa, chão, mestres e encantados — contado por quem vive a tradição.",
    aprende: [
      "O que é a Ciência da Jurema",
      "Mesa, chão e gira: as formas do culto",
      "Mestres, mestras, caboclos e encantados",
      "Como se portar ao chegar numa casa de Jurema",
    ],
    preco: "R$ 197",
    link: "",
    capa: "mata",
    destaque: true,
    emBreve: true,
  },
  {
    id: "historia-catuca",
    titulo: "Catucá, Malunguinho e a Memória da Jurema",
    mestre: "Mestre(a) convidado(a) — vaga aberta",
    categoria: "História e Memória",
    descricao: "Do quilombo do Catucá às mesas de hoje: a história que o povo guardou quando a escrita calou.",
    aprende: [
      "O Quilombo do Catucá na história de Pernambuco",
      "Malunguinho: história e devoção",
      "Alhandra, o Acais e as raízes da Paraíba",
      "Por que memória também é fundamento",
    ],
    preco: "R$ 147",
    link: "",
    capa: "terra",
    destaque: false,
    emBreve: true,
  },
  {
    id: "ervas-e-banhos",
    titulo: "Ervas e Banhos na Tradição Nordestina",
    mestre: "Mestre(a) convidado(a) — vaga aberta",
    categoria: "Ervas, Banhos e Fumos",
    descricao: "As folhas que trabalham: usos devocionais, preparos simples e os cuidados que a folha pede.",
    aprende: [
      "As ervas mais usadas e seus sentidos",
      "Banhos de limpeza, firmeza e doçura",
      "Segurança: o que nunca se faz com folha",
      "A defumação e o fumo na Jurema",
    ],
    preco: "R$ 167",
    link: "",
    capa: "agua",
    destaque: false,
    emBreve: true,
  },
  {
    id: "toques-e-pontos",
    titulo: "Toques e Pontos: a Música da Gira",
    mestre: "Mestre(a) convidado(a) — vaga aberta",
    categoria: "Toques, Pontos e Curimba",
    descricao: "O que sustenta uma gira: os toques, os pontos cantados e o ofício de quem puxa a curimba.",
    aprende: [
      "Os toques da Jurema e seus momentos",
      "Como se aprende e se respeita um ponto",
      "A função do maracá e do ilú",
      "Prática guiada de canto",
    ],
    preco: "R$ 147",
    link: "",
    capa: "fogo",
    destaque: false,
    emBreve: true,
  },
  {
    id: "mesa-e-devocao",
    titulo: "A Mesa de Jurema: Devoção de Casa",
    mestre: "Mestre(a) convidado(a) — vaga aberta",
    categoria: "Mesa e Devoção",
    descricao: "A tradição da mesa: oração, disciplina e o cuidado diário de quem firma sua devoção em casa.",
    aprende: [
      "O que é a Jurema de mesa",
      "Oração, ofício e rotina de devoção",
      "O que é público e o que é de cada casa",
      "Erros comuns de quem está começando",
    ],
    preco: "R$ 197",
    link: "",
    capa: "noite",
    destaque: false,
    emBreve: true,
  },
  {
    id: "prosperidade-doçura",
    titulo: "Doçura e Caminhos: a Jurema no Dia a Dia",
    mestre: "Mestre(a) convidado(a) — vaga aberta",
    categoria: "Mesa e Devoção",
    descricao: "Devoção prática para a vida: doçura nas relações, firmeza no trabalho e juízo nos caminhos.",
    aprende: [
      "Devoção sem promessa: o jeito certo de pedir",
      "Doçura: os erês e o adoçar da vida",
      "Firmeza pessoal e constância",
      "Fé com responsabilidade",
    ],
    preco: "R$ 127",
    link: "",
    capa: "ouro",
    destaque: false,
    emBreve: true,
  },
];
