import { BrowserRouter, Routes, Route} from 'react-router-dom';
import GlobalStyle from './styles/globalStyle';
import Home from "./Home"
import Favicon from 'react-favicon'
import Login from './Login';

export default function App(){
  return(
    <>
      <Favicon url='https://res.cloudinary.com/dmo7nzytn/image/upload/v1665501260/muden/muden_simbolo-03_1_szv3ip.png' />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </>
    )
}