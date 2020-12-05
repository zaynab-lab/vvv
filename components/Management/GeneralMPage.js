import { useState, useEffect } from "react";
import { styles } from "../../public/js/styles";
import axios from "axios";
import Input from "../Input";

export default function ProductsPage() {
  const [roles, setRoles] = useState("");
  const [state, setState] = useState({
    name: "",
    title: "",
    category: "",
    subCategory: ""
  });

  const [categoryList, setCategoryList] = useState([]);

  const [subCategoryList, setSubCategoryList] = useState([]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get("/api/auth").then((res) => {
      const { data } = res;
      if (data !== "noToken" && data !== "invalid") {
        setRoles(data.roles);
      }
    });
    axios.get("/api/categories").then((res) => {
      const { data } = res;
      data && setCategoryList(data);
    });
  }, [setRoles, setCategoryList]);

  return (
    <>
      {roles.includes("GM") && (
        <div className="container">
          {/* //////////////addCategory///////// */}
          <div className="section">
            <div className="title">اضافة قسم</div>
            <Input
              name={"name"}
              value={state.name}
              placeholder={"Category Name"}
              handleChange={handleChange.bind(this)}
            />

            <div className="addCategory-comb">
              <Input
                name={"title"}
                value={state.title}
                placeholder={"اسم القسم"}
                handleChange={handleChange.bind(this)}
              />

              <button
                className="addCategorybtn"
                onClick={() => {
                  state.title !== "" && state.name !== ""
                    ? axios
                        .post(
                          "/api/categories",
                          { name: state.name, title: state.title },
                          { "content-type": "application/json" }
                        )
                        .then((res) => {
                          res.data === "done" &&
                            setState({ ...state, name: "", title: "" });
                        })
                    : alert("املء الفراغات اللازمة");
                }}
              >
                اضافة قسم
              </button>
            </div>
          </div>

          {/* ///////////addsubCategory///////// */}

          <div className="section">
            <div className="title">اضافة مجموعة</div>

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

            <select className="select">
              <option>اختر المجموعة</option>

              {subCategoryList.map((obj, index) => (
                <option key={index} value={obj}>
                  {obj}
                </option>
              ))}
            </select>

            <div className="addCategory-comb">
              <Input
                name={"subCategory"}
                value={state.subCategory}
                placeholder={"اسم المجموعة"}
                handleChange={handleChange.bind(this)}
              />

              <button
                className="addCategorybtn"
                onClick={() => {
                  state.category !== "" && state.subCategory !== ""
                    ? axios
                        .post(
                          "/api/categories/subCategory",
                          {
                            category: state.category,
                            subCategory: state.subCategory
                          },
                          { "content-type": "application/json" }
                        )
                        .then((res) => {
                          res.data === "done" &&
                            setState({ ...state, subCategory: "" });
                        })
                    : alert("املء الفراغات اللازمة");
                }}
              >
                اضافة مجموعة
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          height: calc(100vh - 6.1rem);
          overflow: auto;
        }

        .product {
          height: 9rem;
          border: 1px solid black;
        }

        .section {
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid lightgrey;
          padding: 1rem;
        }

        .select {
          width: 100%;
          height: 100%;
          border: 1px solid gray;
          background: white;
          border-radius: 0.5rem;
          padding: 0.2rem 0.8rem;
          color: #555;
          height: 2.8rem;
          font-size: 1.1rem;
          margin: 0.5rem 0;
        }

        .addCategory-comb {
          display: flex;
          align-items: center;
          direction: rtl;
        }

        .addCategorybtn {
          background: ${styles.primaryColorLight};
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 0.8rem;
          flex: 1 1 11rem;
          margin-right: 0.5rem;
        }

        .title {
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
