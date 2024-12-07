import { useState } from "react"
import { Link } from "react-router-dom"
import CustomUserForm from "../../components/Form/CustomForm"

export default function UserForm(){

    return(
        <div>
            <p>OOI TO NO USERFORM</p>
            <CustomUserForm/>
            <Link to={"/usuarios"}>Lista de usuários</Link>
        </div>
    )
}