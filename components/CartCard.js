import Controll from "./Controll";
import { cartListState } from "../pages/cart";
import { useRecoilValue } from "recoil";
import { styles } from "../public/js/styles";

export default function CartCard({ product }) {
  const cartList = useRecoilValue(cartListState);
  const a = cartList
    .filter((items) => items.id === product._id)
    .map((obj) => obj.quantity);
  return (
    <>
      <div className="cartCard">
        <div className="cartCard-ImgName">
          <img
            className="cartCard-img"
            src={`/img/png/${product.category}/${product._id}.png`}
            alt=""
          />

          <div className="cartCard-content">
            <div className="cartCard-name">{product.name}</div>
            <Controll id={product._id} measure={product.measure} />
          </div>
        </div>

        <div className="cartCard-footer">
          <div className="cartCard-price">السعر: {product.price}</div>
          <div className="cartCard-total">الإجمالي: {product.price * a}</div>
        </div>
      </div>

      <style jsx>{`
        .cartCard {
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

        .cartCard-img {
          width: 6rem;
          height: 6rem;
        }

        .cartCard-ImgName {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 100%;
          padding: 0.5rem 1rem;
        }

        .cartCard-price:after {
          padding-right: 0.3rem;
          content: "ل.ل";
        }

        .cartCard-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          flex: 1 1 100%;
        }

        .cartCard-name {
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }

        .cartCard-footer {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          color: lightgray;
          padding: 0.2rem 0.8rem;
          width: 100%;
          border-top: 1px solid ${styles.primaryColorLight};
          border-radius: 0rem 0rem 0.5rem 0.5rem;
        }

        .cartCard-total {
          flex: 1 1 70%;
          text-align: center;
          color: ${styles.primaryColor};
        }

        .cartCard-total:after {
          padding-right: 0.3rem;
          content: "ل.ل";
        }
      `}</style>
    </>
  );
}
