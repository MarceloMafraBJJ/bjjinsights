import { getData } from "@/constants";
import { MenuCard, MenuCategories } from "../components";
import { Post } from "@/types";

const Menu = async () => {
  const { mostViewedPosts, mostLikedPosts } = (await getData("posts/menu")) as {
    mostViewedPosts: Post[];
    mostLikedPosts: Post[];
  };

  return (
    <div className="mt-12 hidden flex-1 lg:block">
      <h2 className="text-sm font-normal text-gray-400">Postagens</h2>
      <h1 className="text-2xl font-bold capitalize">Mais visualizadas</h1>

      <div className="mb-14 mt-8 flex flex-col gap-8">
        {mostViewedPosts?.map((item) => (
          <MenuCard showImage={false} post={item} key={item.id} />
        ))}
      </div>

      <MenuCategories title="Categorias" subtitle="Navegue por" />

      <h2 className="text-sm font-normal text-gray-400">Postagens</h2>
      <h1 className="text-2xl font-bold capitalize">Mais curtidas</h1>

      <div className="mb-14 mt-8 flex flex-col gap-8">
        {mostLikedPosts?.map((item) => <MenuCard post={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default Menu;
