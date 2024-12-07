import { useEffect, useState } from "react"
import UserForm from "../UserForm/UserForm"
import UsersList from "../UsersList/UsersList"

const FAKEDATA =[
    {id:1,
        name:"renan",
        email:"email@email.com",
        age:18,
        photoUrl:"",
        messages:[{
            date:"15-12-2024:12:25:30",
            message:"olá"
        },
        {
            date:"15-12-2024:12:25:40",
            message:"Tudo bem?"
        }],
    },
    {id:2,
        name:"carla",
        email:"carla@email.com",
        age:19,
        photoUrl:"",
        messages:[{
            date:"15-12-2024:12:25:31",
            message:"olá"
        },
        {
            date:"15-12-2024:12:25:45",
            message:"To bem e você?"
        }],
    }
]

const FAKEEMPTYDATA = []

export default function Home(){
    const [profile,setProfile] = useState([])     
    const [islogged,setIslogged] = useState(false)

    function handleLog(){
        setIslogged(!islogged)
    }
    console.log(localStorage)

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