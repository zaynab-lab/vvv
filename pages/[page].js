import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TopBar from "../components/TopBar";
import Products from "../components/ProductItems";
import { useRecoilValue } from "recoil";
import LoadData from "../components/LoadData";
import { categoriesState, productsState } from "./index";

export default function Page() {
  const [pageProducts, setPageProducts] = useState([]);
  const [title, setTitle] = useState("");
  const categoryList = useRecoilValue(categoriesState);
  const productList = useRecoilValue(productsState);
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    setPageProducts(productList.filter((obj) => obj.catagory === page));
    const p = categoryList.find((obj) => obj.name === page);
    setTitle(p && p.title);
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
