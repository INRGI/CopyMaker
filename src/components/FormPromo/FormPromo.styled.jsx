import styled from "@emotion/styled";
import { Field, Form } from "formik";



export const FormInput = styled(Field)`
    display: block;
    min-height: 30px;
    width: 85%;
    max-width: 300px;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
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

export const SubmitInput = styled(Field)`
    display: block;
    min-height: 30px;
    width: 85%;
    max-width: 230px;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
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
    height: 40px;
`;

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    
`;

export const FormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 15px;
`;


export const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    width: 250px;
`;

export const LabelCheckBox = styled.label`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    width: 150px;
`;

export const CheckBoxContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    height: 40px;
`

export const ImageContaianer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-content: center;
    align-items: center;
    justify-content: center;
`;

export const ImageBlock = styled.div`
    display: flex;
    gap: 10px;
    align-content: center;
    align-items: center;
    justify-content: center;
`;

export const ImageToDowload = styled.img`
    width: 100%;
    max-width: 60px;
    border: 2px solid black;
    border-radius: 10px;
    &:hover{
        transform: translateY(-1px);
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }
`;

export const LinkToDownload = styled.a`
    text-decoration: none;
    border-radius: 5px;
    border: 1px solid black;
    padding: 3px 7px;
    background-color: #a7c957;
    cursor: pointer;
    &:hover{
        transform: translateY(-1px);
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }
`;

export const InputToDowload = styled.input`
    display: block;
    min-height: 30px;
    width: 85%;
    max-width: 300px;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
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

export const SubmitButtonDownload = styled.button`
    width: 150px;
    background-color: #8aa649;
    color: white;
    padding: 5px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;

    &:hover{
        transform: translateY(-1px);
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }
`;

export const HasImagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

export const TitleImages = styled.h3`
    font-size: 20px;
    font-weight: 700;
    line-height: 42px;
    text-align: center;
    margin: 0;
`;

export const SubmitContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

export const CopyButton = styled.button`
    background-color: #8aa649;
    color: white;
    padding: 5px 7px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;

    &:hover{
        transform: translateY(-1px);
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }
`;

export const ResultText = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 250px;
`;

export const ResultContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
`;

export const ResultTitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
    line-height: 42px;
    text-align: center;
    margin: 0;
`;

