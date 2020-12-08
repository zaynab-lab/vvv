import { styles } from "../public/js/styles";

import Cloud from "./Loaders/Cloud";

export default function Loader() {
  return (
    <>
      <div className="loading">
        <div className="loading-title">جاري تحميل البيانات</div>
        <div className="svg">
          <Cloud />
        </div>
      </div>

      <style jsx>{`
        .loading {
          position: absolute;
          background: white;
          height: calc(100vh - 3rem);
          width: 100vw;
          top: 3rem;
          z-index: 20;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .loading-title {
          font-size: 1.3rem;
          color: ${styles.secondaryColor};
        }

        .svg {
          width: 100px;
          height: 100px;
        }
      `}</style>
    </>
  );
}
