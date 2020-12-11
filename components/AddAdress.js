import { useState } from "react";
import { styles } from "../public/js/styles";
import Input from "./Input";

const addressInputList = [
  { name: "region", placeholder: "المنطقة", type: "text" },
  { name: "street", placeholder: "الشارع", type: "text" },
  { name: "building", placeholder: "المبنى", type: "text" },
  { name: "floor", placeholder: "الطابق", type: "number" },
  { name: "details", placeholder: "تفاصيل العنوان", type: "text" }
];

export default function AddAddress() {
  const [state, setState] = useState({
    region: "",
    street: "",
    building: "",
    floor: "",
    details: ""
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="header">اضف عنوان</div>
      <select className="select">
        <option>بيروت</option>
        <option>نبطية</option>
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
      <style jsx>{`
        .header {
          height: 3rem;
          background: ${styles.primaryColor};
          color: white;
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
      `}</style>
    </>
  );
}
