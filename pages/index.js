import CategoryItems from "../components/CategoryItems";
import TopBar from "../components/TopBar";
import OrderBar from "../components/OrderBar";
import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadData from "../components/LoadData";

export const productsState = atom({
  key: "productList",
  default: []
});
export const categoriesState = atom({
  key: "categoryList",
  default: []
});

export default function IndexPage() {
  const [categoryListInfo, setCategoryListInfo] = useRecoilState(
    categoriesState
  );
  const [categoryList, setCategoryList] = useState(categoryListInfo);
  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      const { data } = res;
      setCategoryList(data);
      setCategoryListInfo(data);
    });
  }, [setCategoryList, setCategoryListInfo]);

  return (
    <>
      <TopBar title="الفئات" cart={true} main={true} />
      <div className="container">
        <OrderBar />
        <CategoryItems categories={categoryList} />
      </div>
      <LoadData />
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
