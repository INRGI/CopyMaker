import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import Modal from 'react-modal';

export const Container = styled(Modal)`
    width: 100%;
    max-width: 350px;
    height: 220px;
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
`;

export const LinkText = styled.p`

`;