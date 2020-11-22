import { message } from "antd"

export const API = "/api2"

export const getAllCategories = () => {
    return fetch(`${API}/category?list_all=True`,{
        method:'GET'
    }).then(res=>{
        if(res.status===200){
            return res.json()
        }else{
            return {result:[]}
        }
    })
}

export const getCategories = (super_category) => {
    return fetch(`${API}/good?super=${super_category}`,{
        method:'GET'
    }).then(response=>{
        if(response.status===200){
            return response.json()
        }else{
            message.error("Network failure")
            return{
                result:[]
            }
        }
    })
}

export const createCategory = (category_id,name,super_category_id=null) => {
    if((!category_id)||(!name)){
        message.error("You should get all entry filled.")
    }
    return fetch(`${API}/category`,{
        method:'POST',
        body:JSON.stringify({
            category_id,
            name,
            super_category_id,
        })
    }).then(res=>{
        if (res.status===201){
            return res.json()
        }
    })
}