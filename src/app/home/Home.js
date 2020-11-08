import React from "react";
import "./Home.css";
import Product from "../components/product/Product";
import { getFrontPageGoods } from "../../core/good";

const Home = () => {

  const [ fp_goods, setFPGoods ] = React.useState([])

  React.useState(()=>{
    getFrontPageGoods()
    .then(data=>{
      console.log(data)
      var good_section = []
      for (var i=0, len=data.result.length;i<len;i+=3){
        good_section.push(data.result.slice(i,i+2+(i+1)%2))
      }
      setFPGoods(good_section)
    })
  })

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        {fp_goods.map(section=>
          <div className="home__row">
            {section.map(good=>
              <Product
                id={good.id}
                title={good.name}
                price={good.price}
                rating={good.rating}
                image={good.image}
              />
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;
