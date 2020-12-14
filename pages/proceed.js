import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { styles } from "../public/js/styles";
import Router from "next/router";
import axios from "axios";
import Dots from "../components/Loaders/Dots";
import Loader from "../components/Loader";
import { cartListState } from "./cart";
import { useRecoilValue } from "recoil";
import OrderEnd from "../components/OrderEnd";
import AddAddress from "../components/AddAdress";
import SnakBar from "../components/SnakBar";
import Switch from "../components/Switch";

export default function Proceed() {
  const cartList = useRecoilValue(cartListState);
  const [route, setRoute] = useState(true);
  const [dots, setDots] = useState(false);
  const [total, setTotal] = useState(0);
  const [productList, setProductList] = useState([]);
  const [proceedProducts, setProceedProducts] = useState([]);
  const [payment, setPayment] = useState("عند الإستلام");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [hasAddress, setHasAddress] = useState(false);
  const [snak, setSnak] = useState("");
  const fire = (message) => {
    setSnak({ message, show: true });
    setTimeout(() => setSnak(""), 3000);
  };

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      if (res.data === "noToken" || res.data === "invalid") {
        Router.push("/Login");
      } else {
        cartList.length ? setRoute(false) : Router.push("/cart");
      }
    });
  }, []);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      const { data } = res;
      setProductList(data);
    });
  }, [setProductList]);
  useEffect(() => {
    setProceedProducts(
      productList
        .filter((obj) => cartList.map((items) => items.id).includes(obj._id))
        .map((obj) => ({
          ...obj,
          ...cartList.find((item) => item.id === obj._id)
        }))
    );
    cartList.length &&
      setTotal(
        cartList
          .map(
            (obj) =>
              productList
                .filter((items) => items._id === obj.id)
                .map((items) => items.price) * obj.quantity
          )
          .reduce((a, b) => a + b)
      );
  }, [setProceedProducts, productList, cartList]);

  return (
    <>
      {route ? (
        <Loader />
      ) : (
        <>
          <TopBar title="المرحلة النهائية" page={true} cart={false} />
          <div className="container">
            <div className="bill">
              <div>فاتورة الطلبية</div>
              <OrderEnd proceedProducts={proceedProducts} />
              <div className="bill-content">
                <div>
                  <span>اجمالي الطلب بـ</span>{" "}
                  <span className="price">{total} </span>
                </div>
                <div>
                  <span>اجرة النقل</span> <span className="price">2000 </span>{" "}
                </div>
                <div className="bill-total">
                  <span>الإجمالي النهائي</span>{" "}
                  <span className="price">{total + 2000} </span>{" "}
                </div>
              </div>
            </div>
            {/* ////////////////Address////////////// */}
            <div className="address">
              {dots ? (
                <div className="dots">
                  <Dots />
                </div>
              ) : (
                <AddAddress
                  setSelectedAddress={setSelectedAddress}
                  setHasAddress={setHasAddress}
                />
              )}
            </div>

            {/* ///////////////////////////////// */}
            <div className="pay">
              <div>
                <span className="label">طريقة الدفع: </span>
                <select
                  className="select"
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <option value="عند الإستلام">عند الإستلام</option>
                  <option disabled value="بطاقة الائتمان">
                    بطاقة الائتمان
                  </option>
                  <option
                    onClick={() => alert("الخدمة غير متوفرة حاليا")}
                    disabled
                    value="عبر الإنترنت"
                  >
                    عبر الإنترنت
                  </option>
                </select>
              </div>
              <div>
                <span className="label">خصم من الرصيد:</span>
                <Switch />
              </div>
            </div>

            <div className="confirmbtn">
              {dots ? (
                <Dots />
              ) : (
                <div
                  onClick={() => {
                    if (selectedAddress === "") {
                      !hasAddress
                        ? fire("اضف عنوان للتمكن من الإرسال")
                        : fire("اختر العنوان المطلوب الإرسال إليه");
                    } else {
                      setDots(true);
                      axios
                        .post(
                          "/api/orders",
                          { proceedProducts, total, payment, selectedAddress },
                          { "content-type": "application/json" }
                        )
                        .then((res) => {
                          const { data } = res;
                          data === "done" && setDots(false);
                          data === "done" && fire("تم تسجيل الطلبية بنجاح");
                        })
                        .then(() => {
                          localStorage.setItem("cartList", JSON.stringify([]));
                          setTimeout(() => Router.push("/"), 1500);
                        });
                    }
                  }}
                >
                  الموافقة النهائية
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <SnakBar show={snak.show} message={snak.message} />
      <style jsx>{`
        .container {
          height: calc(100vh - 3rem);
          overflow: auto;
          display: flex;
          flex-direction: column;
          font-size: 1.2rem;
        }

        .label {
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }

        .select {
          border-radius: 0.5rem;
          font-size: 1rem;
          padding: 0.2rem 0.8rem;
          background: white;
          height: 2rem;
        }

        .select:focus {
          border: 1px solid ${styles.primaryColor};
        }
        .bill {
          padding: 0.8rem;
        }
        .bill-content {
          padding: 0.5rem;
          font-size: 1rem;
        }
        .bill-content div {
          display: flex;
          justify-content: space-between;
        }
        .bill-total {
          font-size: 1.2rem;
          border-top: 1px solid ${styles.primaryColor};
        }

        .confirmbtn {
          font-size: 1.2rem;
          border: 1px solid ${styles.primaryColorLight};
          background-color: ${dots ? "white" : styles.primaryColorLight};
          color: white;
          width: 12rem;
          margin: 1rem auto;
          padding: 0.5rem 0.8rem;
          border-radius: 0.5rem;
          line-height: 1.8rem;
          text-align: center;
        }
        .price::after {
          content: " ل.ل";
        }

        .dots {
          height: 7rem;
          padding: 1rem;
          display: flex;
          justify-content: center;
        }
        .pay {
          padding: 0.8rem;
          width: 100%;
        }
        .pay div {
          display: flex;
          justify-content: space-between;
          padding: 0.2rem;
        }
      `}</style>
    </>
  );
}
