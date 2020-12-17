import { FaTruck } from "react-icons/fa";
import { styles } from "../public/js/styles";

export default function OrdersContentLoader() {
  return (
    <>
      <div className="loading">
        <div className="loading-title">لا يوجد طلبيات</div>

        <div className="svg">
          <FaTruck />
        </div>
      </div>

      <style jsx>{`
        .loading {
          width: 100%;
          padding: 6rem 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .loading-title {
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }

        .svg {
          font-size: 5rem;
          color: #666;
          text-align: center;
          width: 100vw;
        }
      `}</style>
    </>
  );
}
