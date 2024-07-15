import styled from "@emotion/styled";
import Modal from 'react-modal';

export const Container = styled(Modal)`
    width: 100%;
    max-width: 500px;
    height: 500px;
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
    justify-content: center;
`;

export const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 95%;
    padding: 5px;
    height: 500px;
    overflow-y: auto;
`;

export const Item = styled.li`
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    align-items: center;
    border: 0px solid;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 9px;
    padding: 7px;
    border-radius: 5px;
    max-width: 800px;
    width: 95%;
    cursor: pointer;
`;