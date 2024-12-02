import React, { useState } from "react"
import { Router } from "react-router-dom"
import UserForm from "../UserForm/UserForm"
import UsersList from "../UsersList/UsersList"

export default function Home(){
    const [islogged,setIslogged] = useState(false)

    function handleLog(){
        setIslogged(!islogged)
    }

    return(
    
    <>
        {islogged ? (        
        <div>Div se não tem gente cadastrada
            <button onClick={handleLog}>mudar log</button>
            <UsersList/>
        </div>
        ):(        
        <div>DIV se tem gente cadastrada
            <button onClick={handleLog}>mudar log</button>
            <UserForm/>
        </div>
        )}

 
    </>
    )
}