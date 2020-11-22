import { message } from "antd"

export const API = "/api2"

export const autoLogin = () => {
    return fetch(`${API}/user`,{
        method:'POST',
        body:JSON.stringify({
            password:"Research-Password",
        })
    }).then(async response=>{
        if(response.status===200){
            message.success("Auto Login")
            return response.json()
        }else if(response.status===405){
            // 正常情况下以上逻辑都可以交由后端成功处理
            // 为了以防万一，如果登录失败则手动创建一个新用户
            message.info("User Recreating...")
            const data = await fetch(`${API}/user?new=true`,{
                method:'POST',
                body:JSON.stringify({
                    identity:"Research-User",
                    password:"Research-Password"
                })
            }).then(res=>{
                if(res.status===201){
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