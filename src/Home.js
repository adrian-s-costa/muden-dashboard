import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { ExportToCsv } from 'export-to-csv';

export default function Home(){
    const [data, setData] = useState({});
    const [messages, setMessages] = useState([]);
    const [messagesFilter, setMessagesFilter] = useState([]);
    const [messagesNormal, setMessagesNormal] = useState([]);
    const [opened, setOpened] = useState(false);
    const [toggle3, setToggle3] = useState(1);

    useEffect(() => {
        const promise = axios.get("https://muden-backend.up.railway.app/messages")

        promise.then((response)=>{
            setMessages(response.data);
        })

        promise.catch(()=>{
            alert("Erro ao carregar as mensagens");
        })
    }, [] );

    useEffect(() => {
        const promise = axios.get("https://muden-backend.up.railway.app/messages")

        promise.then((response)=>{
            setMessagesNormal(response.data);
        })

        promise.catch(()=>{
            alert("Erro ao carregar as mensagens");
        })
    }, [] );

    useEffect(() => {

        console.log(toggle3)

        const promise = axios.get("https://muden-backend.up.railway.app/messages")

        promise.then((response)=>{
            setMessagesFilter(response.data);
        })

        promise.catch(()=>{
            alert("Erro ao carregar as mensagens");
        })

        console.log(messagesFilter);
        console.log(toggle3);
        
        if(toggle3>3){
            setToggle3(1)
        }

        if(toggle3 == 3){
            messagesFilter.sort(function (a, b) {
                if (a.type > b.type) {
                  return 1;
                }
                if (a.type < b.type) {
                  return -1;
                }
                return 0;
            })
            setMessages(messagesFilter)
        }
        
        if(toggle3 == 2){
            messagesFilter.sort(function (a, b) {
                if (a.type < b.type) {
                  return 1;
                }
                if (a.type > b.type) {
                  return -1;
                }
                return 0;
            })
            setMessages(messagesFilter)
        }
        if(toggle3 == 1){
            setMessages(messagesNormal);
        }
        
    }, [toggle3] );

    function showPopUp(){
        setOpened(true);
    }

    function closePopUp(){
        setOpened(false);
    }

    function generateCsv(){
        const options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'Mensagens',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };

        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(messages);
    }

    return(
        <AllDiv>
            <Header>
                Mensagens
                <button onClick={generateCsv} className="csvBtn">Baixar aquivos</button>
            </Header>
            <Legenda>
                <div className="leg messageConfig type" onClick={()=>{setToggle3(toggle3+1)}}>Tipo</div>
                <div className="leg messageConfig">Nome</div>
                <div className="leg messageConfig">Telefone</div>
                <div className="leg messageConfig">Email</div>
                <div className="leg messageConfig">Serviço</div>
                <div className="leg messageConfig">Mudança</div>
            </Legenda>
            {messages.length === 0 ? <div class="lds-dual-ring"></div>:
            <MessagesDiv>
                {messages.map((m)=>(
                    <Message onClick={()=>{ setData(m); showPopUp(); }}>
                        <div className="leg messageConfig height">{m.type}</div>
                        <div className="leg messageConfig height">{m.nome}</div>
                        <div className="leg messageConfig height">{m.telefone}</div>
                        <div className="leg messageConfig height">{m.email}</div>
                        <div className="leg messageConfig height">{m.servico}</div>
                        <div className="leg messageConfig height">{m.mudanca}</div>
                    </Message>
                ))}
            </MessagesDiv>
            }

            <PopUp className={`${opened ? "" : "displayNone"}`}>
                <button className="popUpBtn" onClick={()=>{closePopUp()}}>x</button>
                {data.type == "Orçamento" ?
                <>
                    <div>
                        <h3><Label>Nome:</Label> {data.nome}</h3>
                    </div>
                    <div>
                        <h3><Label>Telefone:</Label> {data.telefone}</h3>
                    </div>
                    <div>
                        <h3><Label>Email:</Label> {data.email}</h3>
                    </div>
                    <div>
                        <h3><Label>Mudança:</Label> {data.mudanca}</h3>
                    </div>
                </>
                :<>
                    <div>
                        <h3><Label>Nome:</Label> {data.nome}</h3>
                    </div>
                    <div>
                        <h3><Label>Telefone:</Label> {data.telefone}</h3>
                    </div>
                    <div>
                        <h3><Label>Email:</Label> {data.email}</h3>
                    </div>
                    <div>
                        <h3><Label>Serviço:</Label> {data.servico}</h3>
                    </div>
                </>}
            </PopUp>
            <div className={`background ${opened ? "displayShow" : "displayNone"}`} onClick={()=>{closePopUp()}}></div>
        </AllDiv>
    );
}

const PopUp = styled.div`
    width: 600px;
    height: 500px;
    position: fixed;
    background-color: white;
    top: 50%;
    left: 50%;
    margin-top: -250px; 
    margin-left: -300px;
    z-index: 2;
    padding: 20px;
    
    div{
        margin: 10px 0px;
    }

    .popUpBtn{
        position: absolute;
        right: 10px;
        top: 7px;
        border-radius: 50px;
        border: none;
        background-color: white;
        color: black;
        :hover{
            transition: 1s;
            color:white;
            background-color: black;
        }
    }

    .mensagem{
        overflow-wrap: break-word;
    }

    @media (max-width: 600px) {
        width: 80%;
        margin: 5% auto;
        left: 0;
        right: 0;
        top: 0;
    }
`

const Label = styled.span`
    font-weight: bold;
    color: #38bc94;
`

const AllDiv = styled.main`
    width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 100%;
    background-color: white;
    align-items: center;
    display: flex;
    flex-direction: column;

    .background{
        background-color: rgb(31, 41, 40, 0.4);
        width: 100%;
        height: 100%;
        z-index: 0;
        position: fixed;
    }

    .displayNone{
        display: none;
    }

    .messageConfig{
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: 10px;
    }

    .type{
        cursor: pointer;
    }

    .height{
        display: flex;
        align-items: center;
        height: 40px;
    }

    .lds-dual-ring {
        display: inline-block;
        width: 80px;
        height: 80px;
    
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #fff;
        border-color: #38bc94 transparent #38bc94 transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

`

const MessagesDiv=styled.div`
    width: 100%;
    height: auto;
    background-color: white;
`

const Header = styled.header`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    background-color: #38bc94;
    font-size: 40px;
    color: white;
    padding-left: 30px;
    font-weight: bold;
    justify-content: space-between;

    .csvBtn{
        margin: 0px 30px;
        border-radius: 40px;
        width: 100px;
        padding: 0px 10px;
        height: auto;
        min-height: 38px;
        background-color: white;
        border-width: 0px;
        color: #38bc94;
        font-weight: bold;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        :hover{
            border: #38bc94;
            border-style: solid;
            border-color: white;
            cursor: pointer;
            transition: 0.5s;
            color: white;
            background-color: #38bc94;
        }
    }
`

const Legenda = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    font-weight: 500;
    padding-left: 20px;
    border-bottom: 1px solid rgb(224, 224, 224);

    .leg:nth-child(1){
        width: 10%;
    }

    .leg:nth-child(2), .leg:nth-child(4), .leg:nth-child(5){
        width: 20%;
    }

    .leg:nth-child(3){
        width: 15%;
    }

    .leg:nth-child(5){
        width: 22%;
    }

    .leg:nth-child(6){
        width: 10%;
    }


    @media (max-width: 500px) {
        padding-left: 20px;
    }
`

const Message = styled.div`
    width: 100%;
    min-height: 40px;
    height: auto;
    border: 1px solid rgb(224, 224, 224);
    border-top: none;
    display: flex;
    align-items: center;
    padding-left: 10px;

    :hover{
        transition: 0.2s;
        background-color: lightgray;
    }

    .leg:nth-child(1){
        width: 10%;
    }

    .leg:nth-child(2), .leg:nth-child(4), .leg:nth-child(5){
        width: 20%;
    }
    
    .leg:nth-child(5){
        align-items: flex-start;
        padding-top: 5px;
    }

    .leg:nth-child(3){
        width: 15%;
    }

    .leg:nth-child(5){
        width: 22%;
    }

    .leg:nth-child(6){
        width: 10%;
    }

    @media (max-width: 500px) {
        padding-left: 20px;
    }
`