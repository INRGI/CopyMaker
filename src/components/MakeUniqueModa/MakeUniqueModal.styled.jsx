
import styled from "@emotion/styled";
import { Field } from "formik";
import Modal from 'react-modal';

export const Container = styled(Modal)`
    width: 100%;
    max-width: 350px;
    height: 250px;
    background-color: white;
    border: 1px solid;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 5px;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
`;

export const Title = styled.h4`
    margin: 0;
    padding: 0;
    font-size: 24px;
`

export const Input = styled(Field)`
    display: block;
    height: 50px;
    width: 276px;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    border: 1px solid;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 20px;
    &::placeholder{
        color: black;
    }
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 10px;
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 300px;
   
`;

export const BtnBack = styled.button`
    align-items: center;
  appearance: none;
  background-color: #e63946;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#b22b36 0 -3px 0 inset;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 30px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 4px;
  padding-right: 4px;
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
  box-shadow: #b22b36 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #b22b36 0 -3px 0 inset;
    }

    &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #b22b36 0 -3px 0 inset;
    transform: translateY(-2px);
    }

    &:active {
    box-shadow: #b22b36 0 3px 7px inset;
    transform: translateY(2px);
    }
  
`;


export const ResultText = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 250px;
`;

export const ResultContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    max-width: 300px;
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
    padding: 5px 10px;
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
    width: 100%;
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