import React from "react"
import { Link } from "react-router-dom"

export default function UserForm(){
    return(
        <>
        <form>
            <label htmlFor="form">Nome</label>
            <input type="text" />
            <label htmlFor="form">email</label>
            <input type="email" />
            <label htmlFor="form">idade</label>
            <input type="number" />
            <label htmlFor="form">foto</label>
            <input type="text" />
            <button onClick={console.log("enviado")}>Cadastrar</button>
        </form>
        <Link to={"/usuarios"}>Lista de usuários</Link>
        </>
    )
}