import React from 'react'
import AdminGoods from './admingoods/AdminGoods'
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

const Admin = () => {

    const match = useRouteMatch()
    
    return (
        <Switch>
            <Route path={`${match.url}/goods`}>
                <AdminGoods />
            </Route >
            <Route path={`${match.url}`}>
                <Redirect to={`${match.url}/goods`}></Redirect>
            </Route >
        </Switch>
    )
}
export default Admin