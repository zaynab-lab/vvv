import { useState } from "react";
import { styles } from "../public/js/styles";
import Input from "./Input";
import Dots from "./Loaders/Dots";
import Modal from "./Management/components/Modal";

const addressInputList = [
  { name: "region", placeholder: "المنطقة", type: "text" },
  { name: "street", placeholder: "الشارع", type: "text" },
  { name: "building", placeholder: "المبنى", type: "text" },
  { name: "floor", placeholder: "الطابق", type: "number" },
  { name: "details", placeholder: "تفاصيل العنوان", type: "text" }
];

const ModalContent = () => {
  const [state, setState] = useState({
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
      <select className="select">
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
              <span>اضافة</span>
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
        }
      `}</style>
    </>
  );
};

export default function AddAddress() {
  const [modal, setModal] = useState(false);
  const [addresses, setAddresses] = useState([]);

  return (
    <>
      <div className="addressContainer">
        {addresses.length > 0 && (
          <select className="select-address">
            {addresses.map((obj, index) => (
              <option value={index}>{obj.content}</option>
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
      {modal && <Modal children={<ModalContent />} setModal={setModal} />}
      <style jsx>{`
        .addressContainer {
          display: flex;
        }

        .select-address {
          flex: 1 1 70%;
          margin: 0.5rem;
          margin-right: 0;
          padding: 0.8rem;
          height: 3rem;
          background: white;
          border-radius: 0.5rem;
        }

        .addbtn {
          display: block;
          margin: 0.5rem auto;
          background: white;
          color: ${styles.secondaryColor};
          border: 1.5px solid ${styles.primaryColor};
          border-radius: 0.5rem;
          padding: 0.5rem 0.8rem;
        }
      `}</style>
    </>
  );
}
