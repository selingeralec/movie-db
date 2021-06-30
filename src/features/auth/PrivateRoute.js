import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

//destructure + rename component prop in args
export function PrivateRoute ({ component: Component, privilege, ...rest }){
    const { user: currentUser } = useSelector((state) => state.auth);

    return (<Route {...rest} render={props => {
        if(!currentUser){
            return <Redirect to={{pathname: '/login', state: { from: props.location } }} />
        }
        //check user has permitted role
        if(privilege && privilege.indexOf(currentUser.privilege) === -1){
            //privilige not authorised, redirect to home
            return <Redirect to={{ pathname: '/' }} />
        }
        //authorised, return component
        return <Component {...props} />
    }} />
)} 
