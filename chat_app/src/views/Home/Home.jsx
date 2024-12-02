import React from "react"
import { Router } from "react-router-dom"
import UserForm from "../UserForm/UserForm"
import UsersList from "../UsersList/UsersList"

export default function Home(){
    return(
    
    <>
        <div>DIV se tem gente cadastrada
            <UserForm/>
        </div>
        <div>Div se não tem gente cadastrada
            <UsersList/>
        </div> 
    </>
    )
}