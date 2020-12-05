import Link from "next/link";
import { useState } from "react";
import { styles } from "../public/js/styles";
import Loader from "./Loader";

const Cover = ({ name }) => (
  <>
    <svg className="svg" viewBox="0 0 100 96" preserveAspectRatio="none">
      <use xlinkHref={`/img/svg/Categories.svg#${name}`} />
    </svg>
    <style jsx>{`
      .svg {
        fill: none;
        width: 120px;
      }
    `}</style>
  </>
);

const CataItem = ({ title, name }) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Link href={`/${name}`}>
        <div className="container" onClick={() => setLoading(true)}>
          <div className="icon">
            <Cover name={name} />
          </div>
          <div className="title">{title}</div>
        </div>
      </Link>
      {loading && <Loader />}
      <style jsx>{`
        .container {
          border: 1.5px solid ${styles.primaryColor};
          margin: 0.3rem;
          padding: 0.3rem 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 0.5rem;
          flex: 1 1 150px;
        }

        .title {
          font-size: 1.2rem;
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
};
export default function CategoryItems({ categories }) {
  return (
    <>
      <div className="container">
        {categories.map((obj, index) => (
          <CataItem key={index} title={obj.title} name={obj.name} />
        ))}
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}
