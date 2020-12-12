import { FaBan, FaEdit } from "react-icons/fa";
import { styles } from "../../../public/js/styles";

export default function OrderControllBar() {
  return (
    <>
      <div className="controlBar">
        <div className="cancel" onClick={() => alert("i am cancel buttom")}>
          <span className="icon">
            <FaBan />
          </span>
          إلغاء الطلب
        </div>
        <div className="edit" onClick={() => alert("i am edit buttom")}>
          <span className="icon">
            <FaEdit />
          </span>
          تعديل الطلب
        </div>
      </div>

      <style jsx>{`
        .controlBar {
          display: flex;
          line-height: 2rem;
          background: ${styles.thirdColor};
        }

        .controlBar div {
          flex: 1 1 100%;
          text-align: center;
        }
        .cancel {
          color: red;
        }
        .edit {
          color: ${styles.secondaryColor};
        }
        .icon {
          margin: 0 0.2rem;
        }
      `}</style>
    </>
  );
}
