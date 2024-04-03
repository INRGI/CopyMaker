import styled from "@emotion/styled";
import { Field, Form } from "formik";



export const FormInput = styled(Field)`
    display: block;
    min-height: 30px;
    width: 85%;
    max-width: 200px;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
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


export const InputContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    height: 32px;
`;

export const Container = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
`;

export const FormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;


export const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    font-size: 14px;
    font-weight: 300;
`;