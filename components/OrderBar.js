import { useState } from "react";
import { styles } from "../public/js/styles";
import Link from "next/link";
import Cloud from "./Loaders/Cloud";

export default function OrderBar() {
  const [user, setUser] = useState(false);
  const [inProgress, setInProgress] = useState(true);

  return (
    <>
      {user && (
        <>
          {inProgress ? (
            <Link href="/details/orders">
              <div className="currentOrders">
                <div>الطلبيات الحالية</div>
                <div className="loader">
                  <Cloud />
                </div>
              </div>
            </Link>
          ) : (
            <div className="oldOrders">الطلبيات السابقة</div>
          )}
        </>
      )}

      <style jsx>{`
        .oldOrders {
          width: 100vw;
          margin: 0.5rem;
          padding: 0.5rem;
          color: ${styles.secondaryColor};
          border: 1.5px solid ${styles.primaryColor};
          border-radius: 0.5rem;
          text-align: center;
          font-size: 1.2rem;
        }

        .currentOrders {
          width: 100vw;
          margin: 0.3rem;
          padding: 0.5rem;
          background: white;
          color: ${styles.secondaryColor};
          border: 1.5px solid ${styles.primaryColor};
          border-radius: 0.5rem;
          text-align: center;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
          font-size: 1.2rem;
        }

        .loader {
          width: 3.5rem;
        }
      `}</style>
    </>
  );
}
