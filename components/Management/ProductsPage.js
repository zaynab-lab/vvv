import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./components/Modal";
import EditProduct from "./components/EditProduct";
import ProductCard from "./components/ProductCard";
import CategoryList from "./components/CategoryList";

export default function ProductsPage() {
  const [roles, setRoles] = useState("");
  const [selected, setSelected] = useState("Vegetables");
  const [productList, setProductsList] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setRoles(data.roles);
      }
    });
    axios.get(`/api/products/Vegetables`).then((res) => {
      const { data } = res;
      setProductsList(data);
    });
  }, [setRoles]);

  const select = (category) => {
    axios.get(`/api/products/${category}`).then((res) => {
      const { data } = res;
      setProductsList(data);
      setSelected(category);
    });
  };
  const setActionById = (id, action, state, callback) => {
    if (action !== "edit") {
      axios
        .put(
          "/api/products",
          { id, [action]: !state },
          { "content-type": "application/json" }
        )
        .then((res) => {
          const { data } = res;
          data === "done" && callback(!state);
        });
    } else {
      setCurrentProduct({ product: state });
      setModalOn(true);
    }
  };
  return (
    <>
      {roles.includes("productsManager") && (
        <div className="container">
          <CategoryList selected={selected} select={select.bind(this)} />
          <>
            {productList.map((obj, index) => (
              <ProductCard
                setActionById={setActionById.bind(this)}
                key={index}
                product={obj}
              />
            ))}
          </>

          <Modal modalOn={modalOn}>
            <EditProduct product={currentProduct} />
          </Modal>

          <Modal add={true}>
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
