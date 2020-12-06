import { useEffect, useState } from "react";
import { styles } from "../../../public/js/styles";
import Input from "../../Input";
import Image from "../../Image";
import axios from "axios";

const productInputList = [
  { name: "name", placeholder: "اسم المنتج", type: "text" },
  { name: "brand", placeholder: "ماركة المنتج", type: "text" },
  { name: "initprice", placeholder: "السعر الأولي", type: "number" },
  { name: "price", placeholder: "السعر النهائي", type: "number" },
  { name: "description", placeholder: "الشرح", type: "text" }
];

export default function EditProduct({ add, product }) {
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [state, setState] = useState(
    add
      ? {
          img: false,
          name: "",
          brand: "",
          initprice: "",
          price: "",
          description: "",
          measure: "",
          category: "",
          subCategory: ""
        }
      : { product }
  );

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      const { data } = res;
      data && setCategoryList(data);
    });
  }, [setCategoryList]);

  return (
    <>
      <div className="crtproduct-container">
        <div className="crtproduct-img">
          <Image name="soon" />
        </div>
        {productInputList.map((obj, index) => (
          <Input
            key={index}
            name={obj.name}
            value={state[obj.name]}
            type={obj.type}
            placeholder={obj.placeholder}
            handleChange={handleChange.bind(this)}
          />
        ))}
        {/*///////////////////Measure/////////////////////////*/}
        <select
          className="select"
          onChange={(e) => {
            setState({ ...state, measure: e.target.value });
          }}
        >
          <option value="">وحدة القياس</option>
          <option value="كيلوغرام">كيلوغرام</option>
          <option value="حبة">حبة</option>
          <option value="ربطة">ربطة</option>
        </select>
        {/*///////////////////Category/////////////////////////*/}
        <div className="title">القسم والمجموعة</div>
        <select
          className="select"
          onChange={(e) => {
            setState({ ...state, category: e.target.value });
            axios
              .get(`/api/categories/${e.target.value}`)
              .then((res) => setSubCategoryList(res.data));
          }}
        >
          <option value="">اختر قسم</option>
          {categoryList.map((obj, index) => (
            <option key={index} value={obj.name}>
              {obj.title}
            </option>
          ))}
        </select>
        {/*///////////////////subCategory/////////////////////////*/}
        <select
          className="select"
          onChange={(e) => setState({ ...state, subCategory: e.target.value })}
        >
          <option value="">اختر المجموعة</option>
          {subCategoryList.map((obj, index) => (
            <option key={index} value={obj}>
              {obj}
            </option>
          ))}
        </select>
        <button
          className="crtproduct-btn"
          onClick={() => {
            add
              ? axios
                  .post(
                    "/api/products",
                    { ...state },
                    { "content-type": "application/json" }
                  )
                  .then((res) => {
                    const { data } = res;
                    data === "done" &&
                      setState({
                        ...state,
                        name: "",
                        brand: "",
                        initprice: "",
                        price: "",
                        description: ""
                      });
                  })
              : axios
                  .put(
                    "/api/products",
                    { ...state },
                    { "content-type": "application/json" }
                  )
                  .then((res) => {
                    const { data } = res;
                    data === "done" &&
                      setState({
                        ...state,
                        name: "",
                        brand: "",
                        initprice: "",
                        price: "",
                        description: ""
                      });
                  });
          }}
        >
          {add ? <span>اضافة المنتج</span> : <span>تعديل المنتج</span>}
        </button>
      </div>
      <style>{`
      .crtproduct-container {
        display: flex;
        flex-direction: column;
      }
      .select{
        width: 100%;
        height: 100%;
        border: 1px solid gray;
        background:white; 
        border-radius: 0.5rem;
        padding: 0.2rem 0.8rem;
        color: #555;
        height: 2.8rem;
        font-size: 1.1rem;
        margin:.5rem 0;
      }


      .crtproduct-btn {
        background: ${styles.primaryColorLight};
        color:white;
        border:none;
        font-size:1.2rem;
        border-radius: 0.5rem;
        padding: 0.2rem 0.8rem;
        margin:.5rem 0; 
      }


      .title {
        color: ${styles.secondaryColor};
      }

      .crtproduct-img{
          display:flex;
          justify-content:center;
          align-items:center
        }
      `}</style>
    </>
  );
}
