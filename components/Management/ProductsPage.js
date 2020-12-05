import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";
import EditProduct from "./components/EditProduct";
import ProductCard from "./components/ProductCard";
import CategoryList from "./components/CategoryList";

export default function ProductsPage() {
  const [roles, setRoles] = useState("");
  const [productList, setProductsList] = useState([]);

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setRoles(data.roles);
      }
    });

    axios.get("/api/products").then((res) => {
      const { data } = res;
      setProductsList(data);
    });
  }, [setRoles]);

  return (
    <>
      {roles.includes("productsManager") && (
        <div className="container">
          <CategoryList />
          <>
            {productList.map((obj, index) => (
              <ProductCard key={index} product={obj} />
            ))}
          </>

          <Modal>
            <EditProduct add={true} />
          </Modal>
        </div>
      )}

      <style jsx>{`
        .container {
          height: calc(100vh - 6.1rem);
          overflow: auto;
        }
      `}</style>
    </>
  );
}
