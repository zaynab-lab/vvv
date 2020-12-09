import { styles } from "../public/js/styles";

const ProductCard = ({ product }) => (
  <>
    <div className="card">
      <img
        className="card-img"
        src={`/img/png/${product.category}/${product._id}.png`}
        alt=""
      />

      <div className="card-content">
        <div className="card-name">{product.name}</div>
        <div>
          {product.quantity} <span className="measure">{product.measure}</span>
        </div>
        <div className="price">{product.quantity * product.price}</div>
      </div>
    </div>

    <style jsx>
      {`
        .card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: fit-content;
          align-items: center;
          border: 1px solid ${styles.primaryColor};
          border-radius: 0.5rem;
          margin: 0.3rem;
          font-size: 1rem;
          text-align: center;
          box-shadow: 0px 0px 1px 2px ${styles.thirdColor};
        }

        .card-img {
          width: 5rem;
          height: 5rem;
        }

        .card-content {
          width: 100%;
        }
        .measure {
          font-size: 0.7rem;
        }

        .price:after {
          font-size: 0.7rem;
          content: " ل.ل";
        }
      `}
    </style>
  </>
);

export default function OrderEnd({ proceedProducts }) {
  return (
    <>
      <div className="orderContainer">
        {proceedProducts.map((obj, index) => (
          <ProductCard key={index} product={obj} />
        ))}
      </div>
      <style jsx>{`
        .orderContainer {
          display: flex;
          width: 100%;
          overflow: auto;
          padding: 0.5rem 0rem;
          border: solid ${styles.primaryColor};
          border-width: 1px 0px;
          min-height: fit-content;
        }
      `}</style>
    </>
  );
}
