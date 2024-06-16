import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
    justify-content: flex-start;
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

export const Domain = styled.li`
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    align-items: center;
    border: 0px solid;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 9px;
    border-radius: 5px;
    width: 80%;
    margin-left:5px;
    overflow: hidden;
`;

export const DomainDetail = styled(Link)`
    text-decoration: none;
    color: black;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;