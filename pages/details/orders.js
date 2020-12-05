import { useState } from "react";
import TopBar from "../../components/TopBar";
import { styles } from "../../public/js/styles";

export default function OrdersPage() {
  const [current, setCurrent] = useState(true);

  return (
    <>
      <TopBar title="الطلبيات" page={true} />

      <div className="topBar">
        <div
          className={`topBar-item ${current && "current"}`}
          onClick={() => setCurrent(true)}
        >
          الحالية
        </div>

        <div
          className={`topBar-item ${!current && "current"}`}
          onClick={() => setCurrent(false)}
        >
          السابقة
        </div>
      </div>
      <style jsx>{`
        .topBar {
          display: flex;
          width: 100%;
          border-bottom: 1px solid ${styles.primaryColor};
        }

        .topBar-item {
          text-align: center;
          padding: 0.2rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .current {
          color: ${styles.secondaryColor};
          font-size: 1.4rem;
          flex: 1 1 100%;
        }
      `}</style>
    </>
  );
}
