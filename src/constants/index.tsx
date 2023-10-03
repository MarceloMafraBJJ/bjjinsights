export const getData = async (url: string) => {
  try {
    const res = await fetch(`https://bjjinsights.vercel.app/api/${url}`, {
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    throw new Error("Failed");
  }
};

export const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);

    return await res.json();
  } catch (error) {
    throw new Error("Failed");
  }
};

export const removeHTMLTags = (str: string) => {
  return str.replace(/<[^>]*>/g, " ");
};

export const getVideoID = (url: string | null | undefined) => {
  if (!url) {
    return null;
  }

  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("v");
};

export const categories = [
  {
    slug: "ataque",
    title: "Ataque",
    subcategories: [
      {
        slug: "armlock",
        title: "Armlock",
      },
      {
        slug: "triangulo",
        title: "Triângulo",
      },
      {
        slug: "chave-de-pe",
        title: "Chave de Pé",
      },
      {
        slug: "estrangulamento",
        title: "Estrangulamento",
      },
    ],
  },
  {
    slug: "guarda",
    title: "Guarda",
    subcategories: [
      {
        slug: "fechada",
        title: "Fechada",
      },
      {
        slug: "x-guard",
        title: "X-Guard",
      },
      {
        slug: "de-la-riva",
        title: "De La Riva",
      },
      {
        slug: "aranha",
        title: "Aranha",
      },
      {
        slug: "meia-guarda",
        title: "Meia-Guarda",
      },
      {
        slug: "berimbolo",
        title: "Berimbolo",
      },
    ],
  },
  {
    slug: "passagem",
    title: "Passagem",
    subcategories: [
      {
        slug: "torreando",
        title: "Torreando",
      },
      {
        slug: "pressao",
        title: "Pressão",
      },
      {
        slug: "passagem-meia-guarda",
        title: "Meia-Guarda",
      },
    ],
  },
  {
    slug: "raspagem",
    title: "Raspagem",
    subcategories: [
      {
        slug: "balao",
        title: "Balão",
      },
      {
        slug: "raspagem-de-la-riva",
        title: "De La Riva",
      },
      {
        slug: "tesoura",
        title: "Tesoura",
      },
    ],
  },
  {
    slug: "queda",
    title: "Queda",
    subcategories: [
      {
        slug: "uchi-mata",
        title: "Uchi Mata",
      },
      {
        slug: "tai-otoshi",
        title: "Tai Otoshi",
      },
      {
        slug: "osoto-gari",
        title: "Osoto Gari",
      },
      {
        slug: "harai-goshi",
        title: "Harai Goshi",
      },
    ],
  },
  {
    slug: "outro",
    title: "Outro",
    subcategories: [
      {
        slug: "noticia",
        title: "Notícia",
      },
      {
        slug: "pessoal",
        title: "Pessoal",
      },
      {
        slug: "analise",
        title: "Análise",
      },
    ],
  },
];

export const belts = [
  {
    category: "Infantil",
    subcategory: [
      "Faixa Branca",
      "Faixa Cinza",
      "Faixa Amarela",
      "Faixa Laranja",
      "Faixa Verde",
    ],
  },
  {
    category: "Adulto",
    subcategory: [
      "Faixa Branca",
      "Faixa Azul",
      "Faixa Roxa",
      "Faixa Marrom",
      "Faixa Preta",
    ],
  },
];

export const commonReports = [
  "Conteúdo ofensivo",
  "Spam",
  "Plágio",
  "Violação de direitos autorais",
  "Assédio",
  "Outro",
];
