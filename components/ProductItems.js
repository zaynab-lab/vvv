import Controll from "./Controll";
import { styles } from "../public/js/styles";
import ImageLoader, { PriceLoader } from "./ProductContentLoader";

const ProductCard = ({ product }) => (
  <>
    {product.appear && (
      <div className="card">
        {product.category ? (
          <img
            className="card-img"
            src={`/img/png/${product.category}/${product._id}.png`}
            alt=""
          />
        ) : (
          <ImageLoader />
        )}
        <div className="card-content">
          {product.name ? (
            <>
              <div className="card-name">
                {product.name}
                <span className="card-description">{product.description}</span>
              </div>
              <div className="card-description">{product.brand}</div>
            </>
          ) : (
            <PriceLoader />
          )}
          <div className="card-price">
            <div className="initprice">{product.initprice}</div>
            <div className="price">
              {product.price ? <>{product.price}</> : <PriceLoader />}
            </div>
          </div>
        </div>
        {product.exist ? (
          <Controll id={product._id} measure={product.measure} />
        ) : (
          <div className="exist">
            {product.name ? <>نفذ المنتج</> : <PriceLoader />}
          </div>
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
          box-shadow: 0px 0px 1px 2px ${styles.thirdColor};
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
          height: 3.6rem;
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
        .card-description {
          margin: 0 0.3rem;
          font-size: 0.8rem;
        }

        .initprice {
          font-size: 0.8rem;
          color: ${styles.secondaryColor};
          text-decoration: line-through;
        }

        .initprice:after {
          font-size: 1rem;
          ${product.initprice && "content:' ل.ل'"};
        }
        .exist {
          line-height: 3.6rem;
          color: ${styles.primaryColor};
        }
      `}
    </style>
  </>
);

export default function ProductsList({ pageProducts }) {
  const skelaton = new Array(20).fill({ appear: true });

  return (
    <>
      <div>
        <div className="productsList">
          {pageProducts.length === 0 &&
            skelaton.map((obj, index) => (
              <ProductCard key={index} product={obj} />
            ))}
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
