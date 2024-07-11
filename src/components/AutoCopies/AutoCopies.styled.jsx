import styled from "@emotion/styled";
import { Form } from "formik";
import TextField from '@mui/material/TextField';

export const PageContainer = styled.div`
    display: flex;
    align-content: center;
    width: 100%;
    padding: 0 30px;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
`;

export const LoadingCont = styled.div`
    width: 100%;
    max-width: 400px;
    border-radius: 16px;
    box-shadow: 0 30px 30px -25px rgba(65, 51, 183, 0.25);
    background-color:#fff;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fff;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MuiInput = styled(TextField)`
    z-index: 0;
`;

export const InputContainer = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 100%;
`;

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    
`;

export const FuncContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
`;

export const CheckBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
    justify-content: center;
    height: 40px;
    gap: 5px;
    margin-top: 0px;
    border-radius: 16px;
    box-shadow: 0 30px 30px -25px rgba(65, 51, 183, 0.25);
    background-color:#fff;
    padding: 20px 10px;
    padding-top: 10px;
    min-width: 160px;
    height: 140px;
`

export const FormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 0px;
    border-radius: 16px;
    box-shadow: 0 30px 30px -25px rgba(65, 51, 183, 0.25);
    background-color:#fff;
    padding: 20px 10px;
    min-width: 450px;
`;

export const LabelCheckBox = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    width: 100%;
`;


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
    border: 0.5px solid black;
    border-radius: 10px;
    &:hover{
        transform: translateY(-0.5px);
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }
`;

export const LinkToDownload = styled.a`
    text-decoration: none;
    border-radius: 5px;
    padding: 3px 7px;
    background-color: #a7c957;
    cursor: pointer;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#8aa649 0 -3px 0 inset;
    &&:focus {
    box-shadow: #8aa649 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
    }

    &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
    transform: translateY(-1px);
    }

    &:active {
    box-shadow: #8aa649 0 3px 7px inset;
    transform: translateY(1px);
    }
`;

export const InputToDowload = styled.input`
    display: block;
    min-height: 30px;
    width: 85%;
    max-width: 300px;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    border: 0.5px solid;
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
    transform: translateY(-1px);
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
    padding: 0 10px;
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
    transform: translateY(-1px);
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
    margin-top: 0px;
    width: 100%;
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
    width: 95%;
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
    transform: translateY(-1px);
    }

    &:active {
    box-shadow: #8aa649 0 3px 7px inset;
    transform: translateY(1px);
    }
`;


export const HiddenImageButton = styled.button`
    align-items: center;
    appearance: none;
    background-color: #fca311;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#e19110 0 -3px 0 inset;
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
    width: 95%;
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
  box-shadow: #e19110 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #e19110 0 -3px 0 inset;
    }

    &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #e19110 0 -3px 0 inset;
    transform: translateY(-2px);
    }

    &:active {
    box-shadow: #e19110 0 3px 7px inset;
    transform: translateY(2px);
    }
`;