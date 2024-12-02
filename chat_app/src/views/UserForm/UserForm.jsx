import React from "react"

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
            <button onClick={console.log("enviado")}>Cadastrar</button>
        </form>
        </>
    )
}