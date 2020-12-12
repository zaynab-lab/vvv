import axios from "axios";
import { useEffect, useState } from "react";
import { styles } from "../public/js/styles";
import Input from "./Input";
import Dots from "./Loaders/Dots";
import Modal from "./Management/components/Modal";

const addressInputList = [
  { name: "region", placeholder: "المنطقة*", type: "text" },
  { name: "street", placeholder: "الشارع*", type: "text" },
  { name: "building", placeholder: "المبنى*", type: "text" },
  { name: "floor", placeholder: "الطابق*", type: "number" },
  { name: "details", placeholder: "تفاصيل العنوان", type: "text" }
];

const ModalContent = ({ setModal, setAddresses }) => {
  const [state, setState] = useState({
    city: "بيروت",
    region: "",
    street: "",
    building: "",
    floor: "",
    details: ""
  });
  const [dots, setDots] = useState(false);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="header">اضف عنوان</div>
      <select
        className="select"
        onChange={(e) => setState({ ...state, city: e.target.value })}
      >
        <option value="بيروت">بيروت</option>
        <option value="النبطية">النبطية</option>
      </select>
      {addressInputList.map((obj, index) => (
        <Input
          key={index}
          name={obj.name}
          value={state[obj.name]}
          type={obj.type}
          placeholder={obj.placeholder}
          handleChange={handleChange.bind(this)}
        />
      ))}
      <>
        <div className="btnContainer">
          <button className="addbtn">
            {dots ? (
              <div className="dots">
                <Dots />
              </div>
            ) : (
              <div
                onClick={() => {
                  setDots(true);
                  if (
                    state.building === "" ||
                    state.floor === "" ||
                    state.region === "" ||
                    state.street === ""
                  ) {
                    alert("املاء الخانات اللازمة، واللتي تحتوي على نجمة*");
                    setDots(false);
                  } else {
                    const fadd =
                      state.city +
                      "، " +
                      state.region +
                      "، " +
                      state.street +
                      "، " +
                      state.building +
                      "، " +
                      state.floor +
                      "، " +
                      state.details;
                    axios
                      .put(
                        "/api/users/update/address",
                        { fadd },
                        { "content-type": "application/json" }
                      )
                      .then((res) => {
                        const { data } = res;
                        data === "done" &&
                          setState({
                            city: "بيروت",
                            region: "",
                            street: "",
                            building: "",
                            floor: "",
                            details: ""
                          });
                        data === "done" && setModal(false);
                        data === "done" && setDots(false);
                      })
                      .then(() => {
                        axios.get("/api/users/addresses").then((res) => {
                          const { data } = res;
                          setAddresses(data);
                        });
                      });
                  }
                }}
              >
                اضافة
              </div>
            )}
          </button>
        </div>
      </>
      <style jsx>{`
        .header {
          height: 3rem;
          color: ${styles.primaryColor};
          font-size: 1.3rem;
          line-height: 3rem;
          text-align: center;
          width: 100%;
        }
        .select {
          margin: 0.5rem 0;
          padding: 0.5rem;
          height: 2.8rem;
          background: white;
          border-radius: 0.5rem;
        }
        .btnContainer {
          display: flex;
          padding: 0 0.2rem;
        }
        .addbtn {
          background: ${!dots && styles.primaryColorLight};
          color: white;
          border: none;
          font-size: 1.2rem;
          border-radius: 0.5rem;
          padding: 0.2rem 0.8rem;
          margin: 0.5rem 0;
          flex: 1 1 100%;
          line-height: 2.2rem;
        }
      `}</style>
    </>
  );
};

export default function AddAddress({ setSelectedAddress, setHasAddress }) {
  const [modal, setModal] = useState(false);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    axios.get("/api/users/addresses").then((res) => {
      const { data } = res;
      const { status } = res;
      if (status === 200) {
        setAddresses(data);
        data.length > 0 && setHasAddress(true);
      }
    });
  }, []);

  return (
    <>
      <div className="addressContainer">
        {addresses.length > 0 && (
          <select
            className="select-address"
            onChange={(e) => setSelectedAddress(e.target.value)}
          >
            <option value="">اختر عنوان</option>
            {addresses.map((obj) => (
              <option value={obj.content}>{obj.content}</option>
            ))}
          </select>
        )}
        <button
          className="addbtn"
          onClick={() => {
            setModal(true);
          }}
        >
          اضافة عنوان
        </button>
      </div>
      {modal && (
        <Modal
          children={
            <ModalContent setAddresses={setAddresses} setModal={setModal} />
          }
          setModal={setModal}
        />
      )}
      <style jsx>{`
        .addressContainer {
          display: flex;
          margin: 0.5rem 0;
        }

        .select-address {
          flex: 1 1 70%;
          margin: 0.5rem;
          margin-right: 0;
          padding: 0.2rem 0.8rem;
          background: white;
          border-radius: 0.5rem;
          max-width: calc(100% - 6.8rem);
        }

        .addbtn {
          display: block;
          margin: 0.5rem auto;
          background: white;
          color: ${styles.primaryColor};
          border: 1.5px solid ${styles.primaryColor};
          border-radius: 0.5rem;
          padding: 0.5rem 0.8rem;
        }
      `}</style>
    </>
  );
}
