import styled from "@emotion/styled";
import { Field, Form } from "formik";



export const FormInput = styled(Field)`
    display: block;
    min-height: 30px;
    width: 85%;
    max-width: 280px;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 300;
    &::placeholder{
        color: black;
    }
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }
`;

export const SubmitInput = styled(Field)`
    display: block;
    min-height: 30px;
    width: 85%;
    max-width: 254px;
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
    gap: 5px;
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
    margin-top: 0px;
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
    width: 60px;
    object-fit: cover;
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
    align-items: center;
    appearance: none;
    background-color: #a7c957;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#8aa649 0 -3px 0 inset;
    box-sizing: border-box;
    color: white;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono",monospace;
    height: 35px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow,transform;
    font-size: 18px;
    width: 150px;
    &:focus {
    box-shadow: #8aa649 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
    }

    &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
    transform: translateY(-2px);
    }

    &:active {
    box-shadow: #8aa649 0 3px 7px inset;
    transform: translateY(1px);
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
    align-items: center;
    appearance: none;
    background-color: #a7c957;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#8aa649 0 -3px 0 inset;
    box-sizing: border-box;
    color: white;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono",monospace;
    height: 35px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding: 5px 7px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow,transform;
    font-size: 18px;
    &:focus {
    box-shadow: #8aa649 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
    }

    &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
    transform: translateY(-2px);
    }

    &:active {
    box-shadow: #8aa649 0 3px 7px inset;
    transform: translateY(1px);
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

export const AddImageButton = styled.button`
    align-items: center;
    appearance: none;
    background-color: #a7c957;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#8aa649 0 -3px 0 inset;
    box-sizing: border-box;
    color: white;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono",monospace;
    height: 35px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow,transform;
    font-size: 18px;
    width: 120px;
    &:focus {
    box-shadow: #8aa649 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
    }

    &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
    transform: translateY(-2px);
    }

    &:active {
    box-shadow: #8aa649 0 3px 7px inset;
    transform: translateY(1px);
    }
`;