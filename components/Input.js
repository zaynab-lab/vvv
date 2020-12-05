import { styles } from "../public/js/styles";

export default function Input({
  name,
  value,
  placeholder,
  type,
  disabled,
  handleChange
}) {
  return (
    <>
      <div className="inputContainer">
        <input
          className="input"
          placeholder={placeholder}
          value={value}
          type={type}
          name={name}
          autoComplete="off"
          onChange={(e) => {
            handleChange(e);
          }}
          disabled={disabled}
        />

        {value && (
          <label className="label" for={placeholder}>
            {placeholder}
          </label>
        )}
      </div>

      <style jsx>{`
        .inputContainer {
          position: relative;
          margin: 1.2rem 0;
        }

        .input {
          width: 100%;
          border: 1px solid gray;
          border-radius: 0.5rem;
          padding: 0.6rem 0.8rem;
          color: #555;
          font-size: 1rem;
        }

        .input:focus {
          border: 1px solid ${styles.primaryColor};
          box-shadow: 0px 0px 5px lightgrey;
        }

        .input::placeholder {
          color: lightgrey;
        }

        .label {
          width: fit-content;
          font-size: 0.8rem;
          position: absolute;
          bottom: 0.6rem;
          right: 0.8rem;
          padding: 0;
          pointer-events: none;
          color: grey;
          background: white;
          transform: translateY(-1.4rem);
          opacity: ${disabled === true && "0"};
          transition: all 0.8s ease;
        }
      `}</style>
    </>
  );
}
