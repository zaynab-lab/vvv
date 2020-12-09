import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { styles } from "../public/js/styles";
import { useRouter } from "next/router";
import Router from "next/router";
import axios from "axios";
import Dots from "../components/Loaders/Dots";
import Loader from "../components/Loader";
import { cartListState } from "./cart";
import { useRecoilValue } from "recoil";
import OrderEnd from "../components/OrderEnd";

export default function Proceed() {
  const [route, setRoute] = useState(true);
  const [dots, setDots] = useState(false);
  const cartList = useRecoilValue(cartListState);
  const [total, setTotal] = useState(0);
  const [productList, setProductList] = useState([]);
  const [proceedProducts, setProceedProducts] = useState([]);
  const [payment, setPayment] = useState("عند الإستلام");
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const { data } = res;
      setProductList(data);
    });
  }, [setProductList]);

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      if (res.data === "noToken" || res.data === "invalid") {
        Router.push("/Login");
      } else {
        setRoute(false);
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
          : setTotal("");
      }
    });
  }, [total, cartList, productList, proceedProducts, setProceedProducts]);

  useEffect(() => {
    setProceedProducts(
      productList
        .filter((obj) => cartList.map((items) => items.id).includes(obj._id))
        .map((obj) => ({
          ...obj,
          ...cartList.find((item) => item.id === obj._id)
        }))
    );
  }, [productList, cartList]);

  return (
    <>
      {route ? (
        <Loader />
      ) : (
        <>
          <TopBar title="المرحلة النهائية" page={true} cart={false} />

          <div className="container">
            <label>
              <span>اجمالي الطلب بـ</span>{" "}
              <span className="total">{total}</span>
            </label>
            <OrderEnd proceedProducts={proceedProducts} />

            <label>اختر العنوان</label>
            <select className="select">
              <option>العنوان الأول: </option>
            </select>
            <label>اختر طريقة الدفع</label>
            <select
              className="select"
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value="عند الإستلام">عند الإستلام</option>
              <option value="بطاقة الائتمان">بطاقة الائتمان</option>
              <option onClick={() => alert("الخدمة غير متوفرة حاليا")} disabled>
                عبر الإنترنت
              </option>
            </select>

            {/* <Link href="/"> */}
            <button
              className="confirmbtn"
              onClick={() => {
                setDots(true);
                axios
                  .post(
                    "/api/orders",
                    { ...proceedProducts, total, payment },
                    { "content-type": "application/json" }
                  )
                  .then((res) => {
                    const { data } = res;
                    data === "done" && setDots(false);
                  })
                  .then(() => {
                    localStorage.setItem("cartList", JSON.stringify([]));
                    router.push("/");
                  });
              }}
            >
              {dots ? <Dots /> : <span>الموافقة النهائية</span>}
            </button>
            {/* </Link> */}
          </div>
        </>
      )}
      <style jsx>{`
        .container {
          height: calc(100vh - 3rem);
          overflow: auto;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          font-size: 1.2rem;
        }

        .select {
          border-radius: 0.5rem;
          font-size: 1.2rem;
          padding: 0.2rem 0.8rem;
          background: white;
          margin-right: 0.4rem;
        }

        .select:focus {
          border: 1px solid ${styles.primaryColor};
        }

        label {
          width: 80%;
          margin-top: 1rem;
        }

        .confirmbtn {
          font-size: 1.4rem;
          border: 1px solid ${styles.primaryColorLight};
          background-color: ${!dots && styles.primaryColorLight};
          color: white;
          width: 12rem;
          margin: 2rem auto;
          padding: 0.5rem 0.8rem;
          border-radius: 0.5rem;
          line-height: 2rem;
          text-align: center;
        }
        .total::after {
          content: " ل.ل";
        }
      `}</style>
    </>
  );
}
