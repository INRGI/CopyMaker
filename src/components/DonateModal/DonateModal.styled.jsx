import styled from "@emotion/styled";
import Modal from 'react-modal';

export const Container = styled(Modal)`
    width: 100%;
    max-width: 400px;
    height: 400px;
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
    font-size: 20px;
    text-align:center;
`
