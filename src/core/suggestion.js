import { message } from "antd"

export const API = "/api2"

export const getSuggestionByGood = (gid, size=50) => {
    return fetch(`${API}/suggestion?gid=${gid}&size=${size}`,{
        method:'GET'
    }).then(res=>{
        if(res.status===200){
            return res.json()
        }else{
            message.error("Please Check Network Connection")
            return {result:[]}
        }
    })
}