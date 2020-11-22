import { Label } from "@material-ui/icons"
import { message } from "antd"

export const API = "/api2"

export const newGoodViewEvent = (user_id, good_id) => {
    return fetch(`${API}/event`,{
        method:'POST',
        body:JSON.stringify({
            label:"View-Good",
            user_id,
            extra:{
                good_id
            }
        })
    })
}