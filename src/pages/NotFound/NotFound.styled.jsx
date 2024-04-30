import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div`
    display: flex;
    margin-top: 30px;
    gap: 20px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    height: 380px;
    width: 100%;
    max-width: 700px;
    border-radius: 16px;
    box-shadow: 0 30px 30px -25px rgba(65, 51, 183, 0.25);
    background-color:#fff;
    padding-top:20px;
    overflow-y: auto;
`;

export const Title = styled.p`
  font-size: 32px;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
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
  height: 48px;
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
  margin: 10px;
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

