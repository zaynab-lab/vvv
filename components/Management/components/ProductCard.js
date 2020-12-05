import { useState } from "react";
import { styles } from "../../../public/js/styles";
import { FaStore, FaBan, FaEdit, FaAppStoreIos } from "react-icons/fa";

export default function ProductCard({ product }) {
  const [appear, setAppear] = useState(true);
  const [exist, setExist] = useState(true);

  return (
    <>
      <div className="productCard">
        <div className="productCard-ImgName">
          <img
            className="productCard-img"
            // src={`/img/png/${product.name}.png`}

            src={`/img/png/Default.png`}
            alt=""
          />

          <div className="productCard-content">
            <div className="productCard-name">{product.name}</div>

            <div className="productCard-brand">الماركة: {product.brand}</div>

            <div className="productCard-brand">
              <span>{product.category}</span>\<span>{product.subCategory}</span>
            </div>

            <div className="productCard-brand"></div>
          </div>

          <div className="productCard-options">
            <li onClick={() => setAppear(!appear)}>
              {appear ? <>&#128064;</> : <FaBan />}
            </li>

            <li onClick={() => setExist(!exist)}>
              {exist ? <FaStore /> : <FaAppStoreIos />}
            </li>

            <li>
              <FaEdit />
            </li>
          </div>
        </div>

        <div className="productCard-footer">
          <div className="productCard-price">
            السعر الأولي: {product.initprice}
          </div>

          <div className="productCard-price">
            السعر النهائي: {product.price}
          </div>
        </div>
      </div>

      <style jsx>{`
        .productCard {
          display: flex;

          justify-content: space-evenly;

          height: fit-content;

          align-items: center;

          border: 1px solid ${styles.primaryColorLight};

          border-radius: 0.5rem;

          flex: 1 1 100%;

          margin: 0.3rem;

          flex-wrap: wrap;
        }

        .productCard-img {
          width: 6rem;

          height: 6rem;
        }

        .productCard-ImgName {
          display: flex;

          justify-content: space-evenly;

          align-items: center;

          width: 100%;

          padding: 0.5rem 1rem;
        }

        .productCard-price:after {
          padding-right: 0.3rem;

          content: "ل.ل";
        }

        .productCard-content {
          display: flex;

          flex-direction: column;

          justify-content: space-between;

          align-items: center;

          flex: 1 1 100%;
        }

        .productCard-name {
          font-size: 1.5rem;

          padding-bottom: 0.5rem;

          color: ${styles.secondaryColor};
        }

        .productCard-brand {
          font-size: 0.8rem;

          padding: 0.2rem;
        }

        .productCard-footer {
          display: flex;

          justify-content: space-evenly;

          align-items: center;

          color: grey;

          padding: 0.2rem 0.8rem;

          width: 100%;

          border-top: 1px solid ${styles.primaryColorLight};

          border-radius: 0rem 0rem 0.5rem 0.5rem;
        }

        .productCard-total {
          flex: 1 1 70%;

          text-align: center;

          color: ${styles.primaryColor};
        }

        .productCard-total:after {
          padding-right: 0.3rem;

          content: "ل.ل";
        }

        .productCard-options {
          display: flex;

          flex-direction: column;

          align-items: center;
        }

        li {
          font-size: 1.2rem;

          padding: 0.5rem;

          list-style: none;
        }
      `}</style>
    </>
  );
}
