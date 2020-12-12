import { styles } from "../public/js/styles";

export default function SlideShow() {
  return (
    <>
      <div className="container">التطبيق الأسهل للتموين</div>

      <style jsx>{`
        .container {
          width: 100%;
          color: white;
          font-size: 2rem;
          line-height: 6rem;
          text-align: center;
          background: ${styles.primaryColor};
          position: sticky;
          top: 0;
        }
      `}</style>
    </>
  );
}
