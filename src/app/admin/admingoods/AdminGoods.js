import React from 'react'
import { createCategory, getAllCategories } from '../../../core/category'
import { List, Skeleton, Button, Modal, Form, Input, message } from 'antd'
import './AdminGoods.css'
import { editGood, getAllGoods } from '../../../core/good'
import { Category } from '@material-ui/icons'
const AdminGoods = () => {
    
    const [ all_categories, setAllCategories ] = React.useState([])
    const [ all_goods, setAllGoods ] = React.useState([])

    const [ selected_goods, setSelectedGoods ] = React.useState([])
    
    React.useEffect(()=>{
        getAllCategories()
        .then(data=>{
            setAllCategories(data.result)
        })
        getAllGoods()
        .then(data=>{
            setAllGoods(data.result)
            console.log(data.result)
        })
    },[])

    const [ add_category_modal_shown, setAddCategoryModalShown ] = React.useState(false)
    const [ add_good_modal_shown, setAddGoodModalShown ] = React.useState(false)
    const [ edit_good_modal_shown, setEditGoodModalShown ] = React.useState(false)
    const add_category_form = React.useRef()
    const add_good_form = React.useRef()
    const [edit_good_form] = Form.useForm()


    return (
        <div className="AdminGoods-page">
            <h1 style={{textAlign:"center"}}>Manage the Goods, Categories and Labels</h1>
            
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={all_categories}
                bordered
                header={<h2>Categories</h2>}
                renderItem={item => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit">Move</a>, <a key="list-loadmore-more">more</a>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                        <div>{item.name}</div>
                        </Skeleton>
                    </List.Item>
                )}
                footer={
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                        <Button onClick={()=>setAddCategoryModalShown(true)}>Add</Button>
                    </div>
                }
            />

            <Modal
                visible={add_category_modal_shown}
                onOk={()=>{
                    add_category_form.current.submit();
                    setAddCategoryModalShown(false)
                }}
                onCancel={()=>setAddCategoryModalShown(false)}
                title="Add a new category"
            >
                <Form
                    ref = {add_category_form}
                    layout={{
                        abelCol: { span: 8 },
                        wrapperCol: { span: 16 }
                    }}
                    initialValues={{ remember: false }}
                    onFinish={values => {
                        console.log('Success:', values);
                        createCategory(values.category_id,values.name,values.super_category_id)
                        .then(data=>{
                            if (data){
                                message.success("You have successfully added a category")
                                getAllCategories()
                                .then(data=>{
                                    setAllCategories(data.result)
                                })
                                setAddCategoryModalShown(false)
                            }
                        })
                    }}
                >
                    <Form.Item
                        label="Category ID"
                        name="category_id"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Category Name"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        label="Super Category ID (Optional)"
                        name="super_category_id"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>




            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={all_goods}
                bordered
                style={{marginTop:"10px"}}
                header={<h2>Categories</h2>}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button
                                onClick={()=>{
                                    setEditGoodModalShown(true)
                                    console.log(item)
                                    edit_good_form.setFieldsValue({
                                        good_id: item.good_id,
                                        category_id: item.category?item.category.category_id:null,
                                        name: item.name,
                                    });
                                }}
                                type="link"
                            >
                                Edit
                            </Button>
                        ]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                        <div className="List-item-name">{item.name}</div>
                        </Skeleton>
                    </List.Item>
                )}
                footer={
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                        <Button onClick={()=>setAddCategoryModalShown(true)}>Add</Button>
                    </div>
                }
            />

            <Modal
                className="Add-good-modal"
                visible={add_good_modal_shown}
                onOk={()=>{
                    add_good_form.current.submit();
                    setAddGoodModalShown(false)
                }}
                onCancel={()=>setAddGoodModalShown(false)}
                title="Add a new good"
            >
                <Form
                    ref = {add_good_form}
                    layout={{
                        abelCol: { span: 8 },
                        wrapperCol: { span: 16 }
                    }}
                    initialValues={{ remember: false }}
                    onFinish={values => {
                        console.log('Success:', values);
                        createCategory(values.category_id,values.name,values.super_category_id)
                        .then(data=>{
                            if (data){
                                message.success("You have successfully added a category")
                                getAllCategories()
                                .then(data=>{
                                    setAllCategories(data.result)
                                })
                                setAddCategoryModalShown(false)
                            }
                        })
                    }}
                >

                    <Form.Item
                        label="Category Name"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        label="Super Category ID (Optional)"
                        name="category_id"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                className="Edit-good-modal"
                visible={edit_good_modal_shown}
                onOk={()=>{
                    edit_good_form.submit();
                    setEditGoodModalShown(false)
                }}
                onCancel={()=>setEditGoodModalShown(false)}
                title="Edit this good"
            >
                <div style={{marginBottom:"20px"}}>
                    Good id: {edit_good_form.getFieldValue("good_id")}
                </div>
                <Form
                    form = {edit_good_form}
                    layout={{
                        abelCol: { span: 8 },
                        wrapperCol: { span: 16 }
                    }}
                    initialValues={{ remember: false }}
                    onFinish={values => {
                        console.log('Success:', values);
                        editGood(values.good_id,{
                            category_id:values.category_id,
                            name:values.name,
                        })
                        .then(data=>{
                            if (data){
                                message.success("You have successfully added a category")
                                getAllCategories()
                                .then(data=>{
                                    setAllCategories(data.result)
                                })
                                setAddCategoryModalShown(false)
                            }
                        })
                    }}
                >
                    
                    <Form.Item
                        label="Good ID"
                        name="good_id"
                        hidden
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Good Name"
                        name="name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Category ID"
                        name="category_id"
                    >
                        <Input />
                    </Form.Item>
                    
                </Form>
            </Modal>



        </div>
    )

}

export default AdminGoods