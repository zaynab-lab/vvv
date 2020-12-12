import { styles } from "../public/js/styles";

export default function SlideShow() {
  return (
    <>
      <div className="container">
        الطريقة
        <div className="flip">
          <div>الأوفر</div>
          <div>الأسهل</div>
          <div>الأمتع</div>
        </div>
        للتسوق
      </div>
      <style jsx>{`
        .container {
          color: #999;
          text-transform: uppercase;
          font-size: 1.6rem;
          font-weight: bold;
          width: 100%;
          padding: 0.5rem 0.8rem;
          display: flex;
          justify-content: center;
        }

        .flip {
          height: 3rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .flip > div {
          color: #fff;
          padding: 0.2rem 0.8rem;
          margin: 0 1.2rem;
          height: 3rem;
          margin-bottom: 40px;
          display: inline-block;
        }

        .flip div:first-child {
          animation: show 5s linear infinite;
        }

        .flip div {
          background: ${styles.primaryColorLight};
        }
        .flip div:first-child {
          background: ${styles.secondaryColor};
        }
        .flip div:last-child {
          background: #999;
        }

        @keyframes show {
          0% {
            margin-top: -270px;
          }
          5% {
            margin-top: -180px;
          }
          33% {
            margin-top: -180px;
          }
          38% {
            margin-top: -90px;
          }
          66% {
            margin-top: -90px;
          }
          71% {
            margin-top: 0px;
          }
          99.99% {
            margin-top: 0px;
          }
          100% {
            margin-top: -270px;
          }
        }
      `}</style>
    </>
  );
}
