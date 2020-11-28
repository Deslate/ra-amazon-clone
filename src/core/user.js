import { message } from "antd"

export const API = "/api2"

export const autoLogin = (info=true) => {
    return fetch(`${API}/user`,{
        method:'POST',
        body:JSON.stringify({
            password:"Research-Password",
        })
    }).then(async response=>{
        if(response.status===200){
            if(info){message.success("Auto Login")}
            else{console.log("check login successful")}
            return response.json()
        }else if(response.status===404){
            // 如果登录失败则手动创建一个新用户
            message.info("User Recreating...")
            const data = await fetch(`${API}/user?new=true`,{
                method:'POST',
                body:JSON.stringify({
                    identity:"Research-User",
                    password:"Research-Password"
                })
            }).then(res=>{
                if(res.status===201||res.status===200){
                    return res.json()
                }else{
                    return {user_id:null}
                }
            })
            if (data.user_id){
                message.success("User Recreated")
                return {...data, user_name:"Research-User"}
            }else{
                message.error("Unsolvable Error Occurred")
                return {}
            }
        }
    })
}