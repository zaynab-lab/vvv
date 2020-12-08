import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TopBar from "../components/TopBar";
import ProductItems from "../components/ProductItems";
import { useRecoilValue } from "recoil";
import LoadData from "../components/LoadData";
import { categoriesState, productsState } from "./index";
import axios from "axios";

export default function Page() {
  const [pageProducts, setPageProducts] = useState([]);
  const [title, setTitle] = useState("");
  const categoryListInfo = useRecoilValue(categoriesState);
  const [categoryList, setCategoryList] = useState(categoryListInfo);
  // const productListInfo = useRecoilValue(productsState);
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      const { data } = res;
      setCategoryList(data);
    });
    // setPageProducts(productListInfo.filter((obj) => obj.catagory === page));
    // console.log("load first");
  }, [setCategoryList, page]);
  useEffect(() => {
    const p = categoryList.find((obj) => obj.name === page);
    setTitle(p && p.title);
    console.log(page);
  }, [setTitle, page, categoryList]);

  useEffect(() => {
    axios.get(`/api/products/${page}`).then((res) => {
      const { data } = res;
      setPageProducts(data);
    });
  }, [setPageProducts, page]);

  return (
    <>
      <TopBar title={title} page={true} cart={true} />
      <ProductItems pageProducts={pageProducts} />
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
