import { styles } from "../public/js/styles";

export default function SlideShow() {
  return (
    <>
      <div className="container">الطريقة الأسهل والأوفر للتموين</div>

      <style jsx>{`
        .container {
          width: 100%;
          color: white;
          font-size: 1.5rem;
          line-height: 4rem;
          text-align: center;
          background: ${styles.primaryColor};
          position: sticky;
          top: 0;
        }
      `}</style>
    </>
  );
}
