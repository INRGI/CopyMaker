import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import Modal from 'react-modal';

export const Container = styled(Modal)`
    width: 100%;
    max-width: 450px;
    height: 320px;
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

export const MuiInput = styled(TextField)`
    z-index: 0;
`;

export const LinkContainer = styled.div`
    display: flex;
    gap: 5px;
    align-content: center;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    :first-child{
        margin-top: 0px;
    }
`;

export const LinkText = styled.p`
    font-size: 20px;
    padding: 0 8px;
    font-weight: 600;
    margin: 0;
`;

export const Button = styled.button`
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
    margin-left: 10px;

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
