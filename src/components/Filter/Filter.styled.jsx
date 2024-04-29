import styled from "@emotion/styled";

export const Container = styled.div`

`;

export const Input = styled.input`
    display: block;
    min-height: 50px;
    width: 85%;
    max-width: 800px;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    border: 1px solid;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    &::placeholder{
        color: black;
    }
    &:hover{
        transform: translateY(-1px);
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }
    
    
`;

export const Label = styled.label`

`;