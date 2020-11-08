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