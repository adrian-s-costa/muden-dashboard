import { createGlobalStyle } from 'styled-components';
import reset from 'react-style-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    
    html, body, .root{
        font-family: Poppins;
        width: 100%;
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }

`;

export default GlobalStyle;