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
  const [modal, setModal] = useState(false);

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

  const refresh = (selected) => {
    axios.get(`/api/products/${selected}`).then((res) => {
      const { data } = res;
      setProductsList([]);
      setProductsList(data);
      setSelected(selected);
    });
  };

  const select = (category) => {
    refresh(category);
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
      setCurrentProduct(state);
      setModal(true);
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

          {modal && (
            <Modal
              add={false}
              setModal={setModal}
              refresh={refresh}
              selected={selected}
              children={<EditProduct product={currentProduct} />}
            />
          )}

          <Modal
            add={true}
            refresh={refresh}
            selected={selected}
            children={<EditProduct add={true} />}
          />
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
