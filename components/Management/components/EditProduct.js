import { useEffect, useState } from "react";
import { styles } from "../../../public/js/styles";
import Input from "../../Input";
import Image from "../../Image";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const productInputList = [
  { name: "name", placeholder: "اسم المنتج", type: "text" },
  { name: "brand", placeholder: "ماركة المنتج", type: "text" },
  { name: "initprice", placeholder: "السعر الأولي", type: "number" },
  { name: "price", placeholder: "السعر النهائي", type: "number" },
  { name: "description", placeholder: "الشرح", type: "text" }
];
const measures = ["كيلوغرام", "حبة", "ربطة"];

export default function EditProduct({ add, product, refresh }) {
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [state, setState] = useState({
    img: add ? false : product.img,
    name: add ? "" : product.name,
    brand: add ? "" : product.brand,
    initprice: add ? "" : product.initprice,
    price: add ? "" : product.price,
    description: add ? "" : product.description,
    measure: add ? "" : product.measure,
    category: add ? "" : product.category,
    subCategory: add ? "" : product.subCategory
  });

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
          {measures.map((obj, index) => (
            <option
              key={index}
              value={obj}
              selected={!add && obj === state.measure}
            >
              {obj}
            </option>
          ))}
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
          {add && (
            <option value="" selected>
              اختر قسم
            </option>
          )}
          {categoryList.map((obj, index) => (
            <option
              key={index}
              value={obj.name}
              selected={!add && obj.name === state.category}
            >
              {obj.title}
            </option>
          ))}
        </select>
        {/* <button
          onClick={() => {
            alert(state.category);
          }}
        >
          test
        </button> */}
        {/*///////////////////subCategory/////////////////////////*/}
        <select
          className="select"
          onChange={(e) => setState({ ...state, subCategory: e.target.value })}
        >
          <option value="">اختر المجموعة</option>
          {subCategoryList.map((obj, index) => (
            <option
              key={index}
              value={obj}
              selected={obj === state.subCategory}
            >
              {obj}
            </option>
          ))}
        </select>
        {/*///////////////////button/////////////////////////*/}
        <div className="btnContainer">
          <button
            className="crtproduct-btn"
            onClick={() => {
              if (
                state.category !== "" &&
                state.name !== "" &&
                state.price !== ""
              ) {
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
                        `/api/products/id/${product._id}`,
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
                      .then(() => refresh(product._id, "update", state));
              } else {
                alert("املء المطلوب");
              }
            }}
          >
            {add ? <span>اضافة المنتج</span> : <span>تعديل المنتج</span>}
          </button>
          {!add && (
            <button
              className="delete-btn"
              onClick={() => {
                axios
                  .delete(`/api/products/id/${product._id}`)
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
                  .then(() => refresh(product._id, "delete", state));
              }}
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>
      <style>{`
      .crtproduct-container {
        display: flex;
        flex-direction: column;
        position:relative;
        margin-bottom:3rem;
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

      .btnContainer{
        display:flex;
        padding:0 .2rem;
        position:fixed;
        bottom:10.2vh;
        background:white;
        width:88vw;
        right:6vw;
      }
      .delete-btn{
        flex:1 1 4rem;
        font-size:1.3rem;
        background:white;
        border:none;
        color:${styles.secondaryColor}
      }

      .crtproduct-btn {
        background: ${styles.primaryColorLight};
        color:white;
        border:none;
        font-size:1.2rem;
        border-radius: 0.5rem;
        padding: 0.2rem 0.8rem;
        margin:.5rem 0;
        flex:1 1 100%; 
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
