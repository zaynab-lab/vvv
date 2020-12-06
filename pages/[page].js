import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TopBar from "../components/TopBar";
import Products from "../components/ProductItems";
import { useRecoilState, useRecoilValue } from "recoil";
import LoadData from "../components/LoadData";
import { categoriesState, productsState } from "./index";
import axios from "axios";

export default function Page() {
  const [pageProducts, setPageProducts] = useState([]);
  const [title, setTitle] = useState("");
  const categoryListInfo = useRecoilValue(categoriesState);
  const [categoryList, setCategoryList] = useState(categoryListInfo);
  const [productListInfo, setProductListInfo] = useRecoilState(productsState);
  const [productList, setProductList] = useState(productListInfo);
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      const { data } = res;
      setCategoryList(data);
    });
    setPageProducts(productList.filter((obj) => obj.catagory === page));
    const p = categoryList.find((obj) => obj.name === page);
    setTitle(p && p.title);
    // axios.get(`/api/products/${page}`).then((res) => {
    //   const { data } = res;
    //   setProductList(data);
    // });
  }, [productList, categoryList, page]);

  return (
    <>
      <TopBar title={title} page={true} cart={true} />
      <Products pageProducts={pageProducts} />
      <LoadData />
      <style jsx>
        {`
          .page {
            height: calc(100vh - 3rem);
            overflow: scroll;
          }
        `}
      </style>
    </>
  );
}
