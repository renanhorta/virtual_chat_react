import React from "react"
import { Link } from "react-router-dom"

const MOCKLIST = [{
    id:1,
    name:"fulano",
    image:"",
    email:"fulano@gmail.com",
    age: 20,
},
{
    id:2,
    name:"beltrano",
    image:"",
    email:"beltrano@gmail.com",
    age: 17,
},
{
    id:1,
    name:"ciclano",
    image:"",
    email:"ciclano@gmail.com",
    age: 22,
}]

export default function UsersList(){

    return(
        <div>
            <h2>Lista de Usuários</h2>   
            <Link to={"/cadastro"}>Cadastrar um novo usuário</Link>
            <ul>{MOCKLIST.map((user)=>(
                <li >
                    <Link to={`/chat`}>
                    {/* </Link><Link to={`/chat/${user.id}`}> */}
                    <p>Nome: {user.name}</p>
                    <p>idade: {user.age}</p>
                    </Link>
                </li>
            ))}</ul>
        </div>
    )
}