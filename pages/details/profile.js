import { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import Loader from "../../components/Loader";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { styles } from "../../public/js/styles";
import Input from "../../components/Input";
import { FaIdCard, FaMapMarkedAlt, FaTasks } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { userState } from "../menu";
import Dots from "../../components/Loaders/Dots";
import AddAddress from "../../components/AddAdress";

const userInputList = [
  { name: "name", placeholder: "الإسم", type: "text" },
  {
    name: "number",
    placeholder: "رقم الهاتف",
    type: "number",
    disabled: true
  },
  { name: "password", placeholder: "الرمز", type: "password" },
  { name: "mail", placeholder: "البريد الإلكتروني", type: "text" }
];

export default function Profile() {
  const userInfo = useRecoilValue(userState);
  const [state, setState] = useState(userInfo);
  const [dots, setDots] = useState(true);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("/api/auth")
      .then((res) => {
        const { data } = res;
        setRoles(data.roles);
        if (data !== "noToken" && data !== "invalid") {
          setState({
            ...state,
            name: data.name,
            number: data.number,
            mail: data.mail
          });
        }
      })
      .then(() => setDots(false));
  }, [setState]);

  return (
    <>
      <TopBar title="الملف الشخصي" page={true} />
      {loading && <Loader />}
      {!loading && (
        <>
          <div className="container">
            {roles.length > 1 && (
              <Link href="/details/management">
                <div onClick={() => setLoading(true)} className="management">
                  <FaTasks />
                  <span className="section-title-name">الصفحة الإدارية</span>
                </div>
              </Link>
            )}

            <div className="section-title">
              <FaIdCard />
              <span className="section-title-name">الهوية</span>
            </div>
            {dots ? (
              <div className="dots">
                <Dots />
              </div>
            ) : (
              <>
                <div className="inputContainer">
                  {userInputList.map((obj, index) => (
                    <Input
                      key={index}
                      name={obj.name}
                      value={state[obj.name]}
                      type={obj.type}
                      placeholder={obj.placeholder}
                      disabled={obj.disabled}
                      handleChange={handleChange.bind(this)}
                    />
                  ))}
                </div>
                <div>تاريخ الميلاد</div>

                <input
                  className="birth"
                  name={"birth"}
                  type="date"
                  ata-date=""
                  data-date-format="DD MMMM YYYY"
                  value="2019-01-01"
                />
              </>
            )}

            {/* ////////////////Address////////////// */}

            <div className="address">
              <div className="section-title">
                <FaMapMarkedAlt />
                <span className="section-title-name">العناوين</span>
              </div>
              {dots ? (
                <div className="dots">
                  <Dots />
                </div>
              ) : (
                <AddAddress />
              )}
            </div>
            {/* /////////////////LOGOUT///////////////////// */}
            {!dots && (
              <div
                className="Logout"
                onClick={() => {
                  axios
                    .post("/api/auth/Logout")
                    .then(
                      (res) =>
                        res.data === "done" &&
                        setState({
                          name: "",
                          number: "",
                          mail: "",
                          password: ""
                        })
                    )
                    .then(() => Router.push("/"));
                }}
              >
                تسجيل الخروج
              </div>
            )}
          </div>
        </>
      )}
      <style jsx>{`
        .container {
          padding: 0.5rem;
          height: calc(100vh - 3rem);
          overflow: auto;
        }

        .management {
          padding: 0.5rem;
          color: ${styles.secondaryColor};
          border: 1.5px solid ${styles.primaryColor};
          border-radius: 0.5rem;
          text-align: center;
          font-size: 1.2rem;
        }
        .inputContainer {
          display: flex;
          flex-direction: column;
        }

        .birth {
          width: 100%;
          height: 3rem;
          background: white;
          margin-bottom: 2rem;
          border-radius: 0.5rem;
        }

        .section-title {
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }

        .section-title-name {
          padding: 0.3rem 0.5rem 0 0.5rem;
        }

        .Logout {
          margin: 2rem 0;
          color: red;
          text-align: center;
        }

        .address {
          border: 1px solid lightgrey;
          border-width: 1px 0;
          padding: 0.5rem;
        }
        .dots {
          height: 7rem;
          padding: 1rem;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
