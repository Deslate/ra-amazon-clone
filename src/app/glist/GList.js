import React from 'react'
import './GList.css'
import { useLocation } from "react-router-dom";
import { getGoodsByCategory } from '../../core/good';
import { List, Rate, Button } from 'antd';
import { getAllCategories } from '../../core/category';

const GList = () => {

    const categoryId = new URLSearchParams(useLocation().search).get('cid')

    const [ goods, setGoods ] = React.useState([])
    const [ category_name, setCategoryName ] = React.useState()
    const [ categories, setCategories ] = React.useState([])

    React.useEffect(()=>{
        getGoodsByCategory(categoryId)
        .then(data=>{
            setGoods(data.result)
            console.log(data.result)
            setCategoryName(data.category_name)
        })
        getAllCategories()
        .then(data=>{
            setCategories(data.result)
        })
    },[])

    return (
        <div className="GList-page">
            <div className="GList-heading-bar">
                1-16 out of 2000 results
            </div>
            <div className="GList-main">
                <div className="Siding-menu">
                    <Button type="text" href="/" style={{fontSize:"16px",fontWeight:500}}>Back</Button>
                    {categories.map(item=>
                        <Button type="text"
                            style={{fontSize:"16px",fontWeight:400}}
                            href={`/gl?cid=${item.category_id}`}
                        >
                            {item.name}
                        </Button>
                    )}
                </div>
                <List
                    className="GList-list"
                    bordered={false}
                    dataSource={goods}
                    renderItem={item => (
                        <List.Item className="GList-item">
                            <img className="GList-item-image" src={item.image}></img>
                            <div className="GList-item-info">
                                <a href={`/g?gid=${item.good_id}`}>
                                    <span className="Good-name">{item.name}</span>
                                </a>
                                <Rate disabled value={item.rating} />
                                <a href={`/g?gid=${item.good_id}`}>
                                    <div className="Good-price">
                                        <span className="Good-price-label">$</span>
                                        <span className="Good-price-number">{item.price}</span>
                                    </div>
                                </a>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}

export default GList