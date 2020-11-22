import React from "react";
import "./Product.css";
import { useStateValue } from "../../StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product" style={{flex:1}}>
      <div className="product__info">
        <a href={`/g?gid=${id}`}><span style={{color:"black", fontSize:"20px", fontWeight:500}}>{title}</span></a>
        <a href={`/g?gid=${id}`}><p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p></a>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" onClick={()=>window.location.href=`/g?gid=${id}`}/>

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
