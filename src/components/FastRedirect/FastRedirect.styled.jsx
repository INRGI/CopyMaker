import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: 250px;
  width: 100%;
  max-width: 190px;
  border-radius: 16px;
  box-shadow: 0 30px 30px -25px rgba(65, 51, 183, 0.25);
  background-color: #fff;
  overflow-y: auto;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;
export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const Domain = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  align-items: center;
  border: 0px solid;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 5px;
  padding: 5px;
  border-radius: 5px;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const DomainDetail = styled(Link)`
  text-decoration: none;
  color: black;
  width: 150px;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Title = styled.p`
    font-size: 25px;
    font-weight: bold;
    margin: 0;
`;