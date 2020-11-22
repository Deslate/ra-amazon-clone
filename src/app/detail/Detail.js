import React from 'react'
import { Breadcrumb, Button, Space } from 'antd';
import "./Detail.css"
import { useLocation, useRouteMatch } from "react-router-dom";
import { getGoodById } from '../../core/good';
import Item from 'antd/lib/list/Item';
import { Rate, Divider } from 'antd'
import { LocalDining } from '@material-ui/icons';
import Product from '../components/product/Product'
import { getSuggestionByGood } from '../../core/suggestion';

const Detail = () => {

    const match = useRouteMatch()
    
    const goodId = new URLSearchParams(useLocation().search).get('gid')

    const [ good_info, setGoodInfo ] = React.useState()

    const [ suggestions, setSuggestions ] = React.useState([])

    React.useState(()=>{
        getGoodById(goodId)
        .then(data=>{
            setGoodInfo(data)
            console.log(data)
        })
        getSuggestionByGood(goodId,8)
        .then(data=>{
            setSuggestions(data.result)
        })
    })


    return (
        <div className="Detail-page" style={{backgroundColor:"white"}}>
            <div className="Detail-heading-bar">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Home</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href={good_info?good_info.category?`/gl?cid=${good_info.category.category_id}`:"/":match.url}>
                            {good_info?good_info.category?good_info.category.name:"Uncategorized":"Loading..."}
                        </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href={match.url}>{good_info?good_info.name:"Loading..."}</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="Detail-contant">
                <div className="Detail-main">
                    <img className="Detail-image" src={good_info?good_info.image:""}></img>
                    <div className="Detail-info">
                        <h1>{good_info?good_info.name:"Loading..."}</h1>
                        <Rate disabled value={good_info?good_info.rating:0} />
                        <Divider/>
                        <div className="Detail-description">
                            {good_info?good_info.description:"Loading..."}
                        </div>
                        <Space className="Detail-choices">
                            <div className="Detail-choice-box">
                                <span>Price:</span>
                                <div className="Good-price">
                                    <span className="Good-price-label">$</span>
                                    <span className="Good-price-number">{good_info&&good_info.price}</span>
                                </div>
                            </div>
                        </Space>
                        <div className="Detail-actions">
                            <Space>
                                <Button className="Add-to-cart">Add to cart</Button>
                                <Button className="Purchase">Purchase</Button>
                            </Space>
                        </div>
                    </div>
                    
                </div>

                <div className="suggestions">

                    <Divider style={{marginTop:"50px"}}>Similar Goods</Divider>
                    <Space>
                        {suggestions.slice(0,4).map(good=>
                            <Product
                                id={good.good_id}
                                title={good.name}
                                price={good.price}
                                rating={good.rating}
                                image={good.image}
                            />
                        )}
                    </Space>
                    <Space >
                        {suggestions.slice(4,8).map(good=>
                            <Product
                                id={good.good_id}
                                title={good.name}
                                price={good.price}
                                rating={good.rating}
                                image={good.image}
                            />
                        )}
                    </Space>
                    
                </div>

            </div>

            
            
        </div>

    )
}

export default Detail