import React from "react";
import "./Home.css";
import Product from "../components/product/Product";
import { getFrontPageGoods } from "../../core/good";
import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd'
import { getAllCategories } from "../../core/category";
import { useRouteMatch } from "react-router-dom";


const Home = () => {

  const [ fp_goods, setFPGoods ] = React.useState([])

  const [ categories, setCategories ] = React.useState([])

  const [ visible, setVisible ] = React.useState(false)

  const match = useRouteMatch()

  React.useEffect(()=>{

    getFrontPageGoods()
    .then(data=>{
      console.log(data)
      var good_section = []
      for (var i=0, len=data.result.length;i<len;i+=3){
        good_section.push(data.result.slice(i,i+2+(i+1)%2))
      }
      setFPGoods(good_section)
    })

    getAllCategories()
    .then(data=>{
      setCategories(data.result)
    })

  },[])



  return (
    <div className="home">
      <div className="Home-heading">
        <Button style={{fontWeight:800,fontSize:"18px", color:"white"}} icon={<MenuOutlined/>} type="text" ghost
          onClick={()=>{
            setVisible(true)
          }}
        >
          Categories
        </Button>
        
      </div>
      <div className="Home-container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        {fp_goods.map(section=>
          <div className="home__row">
            {section.map(good=>
              <Product
                id={good.good_id}
                title={good.name}
                price={good.price}
                rating={good.rating}
                image={good.image}
                page_url={match.url}
              />
            )}
          </div>
        )}

      </div>

      <Drawer
        title="Category Menu"
        placement="left"
        closable={true}
        onClose={()=>{setVisible(false)}}
        visible={visible}
      >
        {categories.map(item=>
          <Button type="text"
            style={{fontSize:"16px",fontWeight:400}}
            href={`/gl?cid=${item.category_id}`}
          >
            {item.name}
          </Button>
        )}
      </Drawer>

    </div>
  );
}

export default Home;
