import {
  FaCheckCircle,
  FaSearchPlus,
  FaShoppingBag,
  FaSmileWink,
  FaTruck
} from "react-icons/fa";
import { styles } from "../public/js/styles";

export default function ArrowBar() {
  return (
    <>
      <div className="arrow-steps clearfix">
        <div className="step done">
          <span className="icon">
            <FaCheckCircle />
          </span>
          <span>تسجيل الطلبية</span>
        </div>
        <div className="step">
          <span className="icon">
            <FaShoppingBag />
          </span>
          <span>تحضير الطلبية</span>
        </div>
        <div className="step">
          <span className="icon">
            <FaSearchPlus />
          </span>
          <span>تدقيق الطلبية</span>
        </div>
        <div className="step">
          <span className="icon">
            <FaTruck />
          </span>
          <span>الإرسال</span>
        </div>
        <div className="step">
          <span className="icon">
            <FaSmileWink />
          </span>
          <span>التسليم</span>
        </div>
      </div>
      <style jsx>{`
        .clearfix:after {
          clear: both;
          content: "";
          display: block;
        }

        .arrow-steps .step {
          font-size: 1rem;
          text-align: center;
          color: ${styles.primaryColor};
          cursor: default;
          margin: 0 1px 0 0;
          padding: 0.2rem;
          width: 9rem;
          float: right;
          position: relative;
          background-color: #ddd;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .arrow-steps .step:after,
        .arrow-steps .step:before {
          content: "";
          position: absolute;
          top: 0;
          left: -1rem;
          width: 0;
          height: 0;
          border-top: 1rem solid transparent;
          border-bottom: 1.1rem solid transparent;
          border-right: 1rem solid #ddd;
          z-index: 2;
        }

        .arrow-steps .step:before {
          left: auto;
          right: 0;
          border-right: 17px solid #fff;
          z-index: 0;
        }

        .arrow-steps .step:first-child:before {
          border: none;
        }

        .arrow-steps .step:last-child:after {
          border: none;
        }

        .arrow-steps .step.done {
          color: #fff;
          background-color: ${styles.secondaryColor};
        }

        .arrow-steps .step.done:after {
          border-right: 17px solid ${styles.secondaryColor};
        }

        .icon {
          padding: 0rem 0.3rem;
        }
      `}</style>
    </>
  );
}
