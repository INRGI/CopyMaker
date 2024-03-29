import styled from "@emotion/styled";
import { Field } from "formik";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: flex-start;
    height: 400px;
    width: 400px;
    margin-left: 20px;
    border: 1.5px solid;
    box-shadow: rgba(34, 34, 34, 0.35) 0px 5px 15px;
    border-radius: 5px;
`;

export const Title = styled.h3`
    font-size: 32px;
    font-weight: 700;
    line-height: 42px;
    text-align: center;
    margin: 0;
    margin-top: 30px;
`;

export const Input = styled(Field)`
    display: block;
    height: 50px;
    width: 276px;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 0px;
    &::placeholder{
        color: black;
    }
    &:hover{
        transform: translateY(-1px);
        box-shadow: #8aa649 0 4px 12px;
    }
`;

export const Button = styled.button`
    margin-top: 10px;
    width: 300px;
    background-color: #8aa649;
    color: white;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;

    &:hover{
        transform: translateY(-1px);
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }
`;