import React from "react"
import { Link } from "react-router-dom"

export default function Chat(){
    return(
        <div>
            <Link to={"/usuarios"}>Voltar para lista de usuários</Link>
            <ul>
                <li> CHAT</li>
                <li>TODAS AS MSGS</li>
            </ul>

            <form>
                <label>Digite sua mensagem</label>
                <input></input>
            </form>
        </div>
    )
}