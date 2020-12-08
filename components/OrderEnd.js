import { styles } from "../public/js/styles";

const ProductCard = ({ product }) => (
  <>
    {product.appear && (
      <div className="card">
        <img
          className="card-img"
          src={`/img/png/${product.category}/${product._id}.png`}
          alt=""
        />

        <div className="card-content">
          <div className="card-name">{product.name}</div>
          <div>{product.quantity}</div>
        </div>
      </div>
    )}

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

        .card-price {
          background-color: ${styles.thirdColor};
          width: 100%;
          padding: 0.1rem;
          border: solid ${styles.primaryColor};
          border-width: 1px 0;
          margin: 0;
          height: 4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .price:after {
          font-size: 1rem;
          content: " ل.ل";
        }

        .card-name {
          margin: 0.3rem;
        }
      `}
    </style>
  </>
);

export default function OrderEnd({ cartProducts }) {
  return (
    <>
      <div className="orderContainer">
        {cartProducts.map((obj, index) => (
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
        }
      `}</style>
    </>
  );
}
