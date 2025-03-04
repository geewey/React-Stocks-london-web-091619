import React from "react";

const Stock = ({ stock, handleClick }) => {
  const { name, ticker, price } = stock;
  return (
    <div onClick={() => handleClick(stock)}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            {ticker}: {price}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Stock;
