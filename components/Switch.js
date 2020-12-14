import { atom, useRecoilState } from "recoil";
import { styles } from "../public/js/styles";
import { FaCheck } from "react-icons/fa";

export const toggleState = atom({
  key: "toggle",
  default: true
});

export default () => {
  const [toggle, setToggle] = useRecoilState(toggleState);

  return (
    <>
      <div className="switch" onClick={() => setToggle(!toggle)}>
        <div className="switch-body"></div>
        {toggle ? (
          <div className="switch-btn">
            <FaCheck />
          </div>
        ) : (
          <div className="switch-btn">X</div>
        )}
      </div>
      <style jsx>{`
        .switch {
          display: flex;
          flex-direction: ${toggle ? "row-reverse" : "row"};
          justify-content: center;
          align-items: center;
          border: 1px solid grey;
          border-radius: 0.3rem;
          background: white;
          width: fit-content;
          height: fit-content;
        }
        .switch-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 1.5rem;
          height: 1.5rem;
          background: white;
          color: ${toggle ? styles.secondaryColor : "red"};
          border: 1px solid ${toggle ? styles.secondaryColor : "red"};
          border-radius: 0.3rem;
          box-shadow: 0px 0px 2px 3px ${toggle ? styles.secondaryColor : "red"};
        }
        .switch-body {
          width: 2rem;
        }
      `}</style>
    </>
  );
};
