import Controll from "./Controll";
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
          <div className="card-price">
            <div className="initprice">{product.initprice}</div>
            <div className="price">{product.price}</div>
          </div>
        </div>
        {product.exist ? (
          <Controll id={product._id} measure={product.measure} />
        ) : (
          <div className="exist">نفذ المنتج</div>
        )}
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
          flex: 1 1 10rem;
          margin: 0.3rem;
          font-size: 1.2rem;
          text-align: center;
        }

        .card-img {
          width: 10rem;
          height: 10rem;
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

        .initprice {
          color: ${styles.secondaryColor};
          text-decoration: line-through;
        }

        .initprice:after {
          font-size: 1rem;
          ${product.initprice && "content:' ل.ل'"};
        }
        .exist {
          line-height: 4rem;
          color: ${styles.primaryColor};
        }
      `}
    </style>
  </>
);

export default function ProductsList({ pageProducts }) {
  return (
    <>
      <div>
        <div className="productsList">
          {pageProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .productsList {
          overflow: auto;
          display: flex;
          flex-wrap: wrap;
          height: calc(100vh - 3rem);
        }
      `}</style>
    </>
  );
}
