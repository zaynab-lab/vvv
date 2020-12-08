import React, { useState, useEffect } from "react";
import { atom, useRecoilValue } from "recoil";
import CartCard from "../components/CartCard";
import LoadData from "../components/LoadData";
import Link from "next/link";
import TopBar from "../components/TopBar";
import { productsState } from "../pages/index";
import { styles } from "../public/js/styles";
import axios from "axios";

export const cartListState = atom({
  key: "cartList",
  default: []
});

export default function CartPage() {
  const cartList = useRecoilValue(cartListState);
  const productListInfo = useRecoilValue(productsState);
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const { data } = res;
      setProductList(data);
    });
    setCartProducts(
      productList.filter((obj) =>
        cartList.map((items) => items.id).includes(obj._id)
      )
    );
    cartList.length
      ? setTotal(
          cartList
            .map(
              (obj) =>
                productList
                  .filter((items) => items._id === obj.id)
                  .map((items) => items.price) * obj.quantity
            )
            .reduce((a, b) => a + b)
        )
      : setTotal(0);
  }, [cartList, productList]);

  return (
    <>
      <TopBar title="عربة التسوق" page={true} />
      <div>
        <div className="cartItems">
          {cartProducts.map((obj) => (
            <div key={obj._id}>
              <CartCard product={obj} />
            </div>
          ))}
        </div>

        <div className="total">
          <div></div>

          <div className="currency">
            الإجمالي: <span>{total}</span>
          </div>
        </div>

        {total > 0 && (
          <Link href="/proceed">
            <div className="proceed">تأكيد الطلب</div>
          </Link>
        )}
      </div>
      <LoadData />
      <style jsx>{`
        .cartItems {
          height: calc(100vh - 11rem);
          overflow: auto;
        }

        .currency:after {
          content: " ل.ل";
        }

        .proceed {
          background-color: ${styles.primaryColorLight};
          font-size: 1.4rem;
          width: fit-content;
          padding: 0.2rem 1rem;
          color: white;
          border-radius: 0.3rem;
          margin: 1rem auto;
        }

        .total {
          display: flex;
          justify-content: space-around;
          background: ${styles.thirdColor};
          padding: 0.3rem;
          font-size: 1.2rem;
          border: solid ${styles.primaryColor};
          border-width: 1px 0;
        }
      `}</style>
    </>
  );
}
