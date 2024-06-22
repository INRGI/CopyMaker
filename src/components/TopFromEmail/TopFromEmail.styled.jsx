import styled from "@emotion/styled";

export const Container = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 90%;
    padding: 0;
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
    height: 40px;
    cursor: pointer;
`;

export const Input = styled.input`
    display: block;
    min-height: 50px;
    width: 85%;
    max-width: 300px;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    border: 0.5px solid;
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