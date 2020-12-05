import CategoryItems from "../components/CategoryItems";
import TopBar from "../components/TopBar";
import OrderBar from "../components/OrderBar";
import { atom, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";

export const productsState = atom({
  key: "productsList",
  default: []
});
export const categoriesState = atom({
  key: "categoryList",
  default: []
});

export default function IndexPage({ categories }) {
  const setCategoryList = useSetRecoilState(categoriesState);
  useEffect(() => {
    setCategoryList(categories);
  }, [setCategoryList, categories]);
  return (
    <>
      <TopBar title="الفئات" cart={true} main={true} />

      <div className="container">
        <OrderBar />
        <CategoryItems categories={categories} />
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 3rem);
          overflow: auto;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  return axios.get("http://localhost:3000/api/categories").then((res) => {
    const { data } = res;
    return { props: { categories: data } };
  });
}
