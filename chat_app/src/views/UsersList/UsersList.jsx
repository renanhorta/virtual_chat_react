import React from "react"

const MOCKLIST = [{
    id:1,
    name:"fulano",
    email:"fulano@gmail.com",
    age: 20,
},
{
    id:2,
    name:"beltrano",
    email:"beltrano@gmail.com",
    age: 17,
},
{
    id:1,
    name:"ciclano",
    email:"ciclano@gmail.com",
    age: 22,
}]

export default function UsersList(){

    return(
        <div>
            <h2>Lista de Usuários</h2>       
            <ul>{MOCKLIST.map((user)=>(
                <li>
                    <p>Nome: {user.name}</p>
                    <p>idade: {user.age}</p>
                </li>
            ))}</ul>
        </div>
    )
}