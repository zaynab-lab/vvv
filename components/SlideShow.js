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
          font-size: 1.8rem;
          font-weight: bold;
          width: 100%;
          padding: 0.2rem;
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
          padding: 0.2rem 2rem;
          height: 3rem;
          margin-bottom: 40px;
          display: inline-block;
        }

        .flip div:first-child {
          animation: show 5s linear infinite;
        }

        .flip div {
          color: #42c58a;
        }
        .flip div:first-child {
          color: #4ec7f3;
        }
        .flip div:last-child {
          color: #dc143c;
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
