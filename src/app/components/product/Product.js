import React from "react";
import "./Product.css";
import { useStateValue } from "../../StateProvider";
import { newGoodClickEvent } from "../../../core/event";
import { getCookie } from "../../../core/cookie";

function Product({ id, title, image, price, rating, page_url }) {
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

  const onProductClicked = () => {
    newGoodClickEvent(getCookie("user_id"),""+id,page_url)
    .then(()=>window.location.href=`/g?gid=${id}`)
  }

  return (
    <div className="product" style={{flex:1}}>
      <div className="product__info">
        <a href={`/g?gid=${id}`} onClick={onProductClicked}><span style={{color:"black", fontSize:"20px", fontWeight:500}}>{title}</span></a>
        <a href={`/g?gid=${id}`} onClick={onProductClicked}><p className="product__price">
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

      <img src={image} alt="" onClick={onProductClicked}/>

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
