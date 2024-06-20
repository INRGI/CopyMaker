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
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 9px;
    border-radius: 5px;
    max-width: 800px;
    width: 95%;
    margin-left:5px;
`;