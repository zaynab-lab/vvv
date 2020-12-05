import CategoryItems from "../components/CategoryItems";
import TopBar from "../components/TopBar";
import OrderBar from "../components/OrderBar";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";

export const productsState = atom({
  key: "productsList",
  default: []
});
export const categoriesState = atom({
  key: "categoryList",
  default: []
});

export default function IndexPage() {
  const [categoryList, setCategoryList] = useState([]);
  const setCategoryListState = useSetRecoilState(categoriesState);
  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      const { data } = res;
      setCategoryList(data);
      setCategoryListState(data);
    });
  }, [setCategoryList, setCategoryListState]);
  return (
    <>
      <TopBar title="الفئات" cart={true} main={true} />

      <div className="container">
        <OrderBar />
        <CategoryItems categories={categoryList} />
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

// IndexPage.getInitialProps = async () => {
//   return axios.get("http://localhost:3000/api/categories").then((res) => {
//     const { data } = res;
//     return { categories: data };
//   });
// };
