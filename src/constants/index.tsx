export const categories = [
  {
    title: "Style",
    src: "/style.png",
    category: "style",
    color: "",
  },
  {
    title: "Fashion",
    src: "/style.png",
    category: "fashion",
    color: "",
  },
  {
    title: "Food",
    src: "/style.png",
    category: "style",
    color: "",
  },
  {
    title: "Travel",
    src: "/style.png",
    category: "style",
    color: "",
  },
  {
    title: "Culture",
    src: "/style.png",
    category: "style",
    color: "",
  },
  {
    title: "Coding",
    src: "/style.png",
    category: "style",
    color: "",
  },
];

export const getData = async (url: string) => {
  const res = await fetch(`http://localhost:3000/api/${url}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.messsage);
  }

  return data;
};

export const removeHTMLTags = (str: string) => {
  return str.replace(/<[^>]*>/g, " ");
};
