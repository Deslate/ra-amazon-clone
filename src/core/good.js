import { message } from "antd"

export const API = "/api2"

export const getFrontPageGoods = () => {
    return fetch(`${API}/good?mode=list_all`,{
        method:'GET',
    }).then(response=>{
        if(response.status===200){
            return response.json()
        }else{
            return {result:[]}
        }
    })
}

export const getAllGoods = () => {
    return fetch(`${API}/good?mode=list_all`,{
        method:'GET',
    }).then(response=>{
        if(response.status===200){
            return response.json()
        }else{
            return {result:[]}
        }
    })
}


export const editGood = (gid,params) => {
    return fetch(`${API}/good?gid=${gid}`,{
        method:'PATCH',
        body:JSON.stringify({
            ...params
        })
    }).then(response=>{
        if(response.status===200){
            return response.json()
        }else{
            message.error("Server Error, code="+response.status)
            return null
        }
    })
}

export const getGoodsByCategory = (cid) => {
    return fetch(`${API}/good?mode=list&cid=${cid}`,{
        method:'GET',
    }).then(response=>{
        if(response.status===200){
            return response.json()
        }else{
            return {result:[]}
        }
    })
}

export const getGoodById = (gid) => {
    return fetch(`${API}/good?gid=${gid}`,{
        method:'GET',
    }).then(response=>{
        if(response.status===200){
            return response.json()
        }else{
            return null
        }
    })
}