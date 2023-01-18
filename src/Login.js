import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function Login(){

    const [loginData, setLoginData] = useState({email: '', password: ''});
    const navigate = useNavigate()

    function setDados(event){

        event.preventDefault()
        const promise = axios.post('https://muden-backend.up.railway.app/login', loginData)
        
        promise.then((response) => {
            navigate('/home');
        })
        promise.catch(() => {
            alert('usuário ou senha incorretos, tente novamente')
        })
    }

    return(
        <LoginMain>
            <Logo src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1673386845/muden/template_primary_9_zd4hhl.png"/>
            <FormDiv>
                <form onSubmit={setDados}>
                    <Input type='text' placeholder="E-mail" onChange={(e)=>setLoginData({...loginData, email: e.target.value})} value={loginData.email} />
                    <Input type='password' placeholder="Senha" onChange={(e)=>setLoginData({...loginData, password: e.target.value})} value={loginData.password} />
                    <Button>Entrar</Button>
                </form>
            </FormDiv>
        </LoginMain>
        )
    }



const FormDiv = styled.div`
    background-color: white;
    width: 350px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //box-shadow:  0 0 4px black;
    border-radius: 1rem;
    box-shadow: 0 0 #0000, 0 0 #0000 , 0px 5px 22px rgba(0,0,0,.15);

    @media(max-width: 975px){
        width: 250px;
        eight: 200px;
    }
`

const LoginMain = styled.main`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 10px;
    }
    .span{
        margin-top: 36px;
        width: 100%;
        height: 18px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
    }
    .span:hover{
        color: #FFFFFF;
        text-decoration: underline;
        cursor: pointer;
    }
    
`
const Logo = styled.img`
    width: 250px;
    height: 125px;
`
const Input = styled.input`
    width: 90%;
    border-radius: 20px;
    border: 1px solid #38bc94;
    height: 30px;
    padding: 0px 15px;
    font-size: 15px;
    font-style: italic;
    font-family: 'Poppins';
    background-color: lightgrey;
`

const Button = styled.button`
    width: 30%;
    margin-top: 20px;
    border-radius: 40px;
    padding: 0px 10px;
    height: 30px;
    min-height: 38px;
    background-color: #38bc94;
    border-width: 0px;
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 975px){
        font-size: 15px;
    }

    :hover{
        border: 1px solid #38bc94;
        cursor: pointer;
        transition: 0.5s;
        color: white;
        background-color: white;
        color: #38bc94;
    }
`