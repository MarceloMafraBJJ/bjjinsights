type User = {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: string | null;
  image?: string | null;
  description?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  followingIds?: string[] | null;
  followersIds?: string[] | null;
  belt?: string | null;
  createdAt: string;

  posts: Post[];
  comments: Comment[];
  location: Location;
};

type Category = {
  id: string;
  slug: string;
  title: string;
  subcategories: Subcategory[];
};

type Subcategory = {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
};

type Post = {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img?: string | null;
  videoURL?: string | null;
  views: number;
  likesCount: number;
  catSlug: string;
  userEmail: string;

  cat: Category;
  user: User;
  comments: Comment[];
};

type Comment = {
  id: string;
  createdAt: string;
  desc: string;
  userEmail: string;
  postSlug: string;
  user: User;
  post: Post;
};

type Location = {
  id?: string;
  userEmail: string;
  city: string;
  state: string;
  uf: string;
  mesoregion: string;
  microregion: string;
  region: string;
};

type Region = {
  id: number;
  sigla: string;
  nome: string;
};

type State = {
  id: number;
  sigla: string;
  nome: string;
  regiao: Region;
};

type Mesoregion = {
  id: number;
  nome: string;
  UF: State;
};

type Microregion = {
  id: number;
  nome: string;
  mesorregiao: Mesoregion;
};

type IntermediaryRegion = {
  id: number;
  nome: string;
  UF: State;
};

type ImmediateRegion = {
  id: number;
  nome: string;
  regiaoIntermediaria: IntermediaryRegion;
};

type City = {
  id: number;
  nome: string;
  microrregiao: Microregion;
  "regiao-imediata": ImmediateRegion;
};

export type { User, Category, Post, Comment, Subcategory, City, Location };
