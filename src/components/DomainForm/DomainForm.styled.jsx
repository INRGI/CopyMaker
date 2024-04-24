import styled from "@emotion/styled";
import { Field } from "formik";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: flex-start;
    height: 400px;
    width: 400px;
    margin-left: 20px;
    border: 1.5px solid;
    box-shadow: rgba(34, 34, 34, 0.35) 0px 5px 15px;
    border-radius: 5px;
`;

export const Title = styled.h3`
    font-size: 32px;
    font-weight: 700;
    line-height: 42px;
    text-align: center;
    margin: 0;
    margin-top: 30px;
`;

export const Input = styled(Field)`
    display: block;
    height: 50px;
    width: 276px;
    background-color: rgba(255,255,255,0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 0px;
    &::placeholder{
        color: black;
    }
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    }
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
  width: 300px;
  &:focus {
  box-shadow: #8aa649 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
    }

    &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
    transform: translateY(-2px);
    }

    &:active {
    box-shadow: #8aa649 0 3px 7px inset;
    transform: translateY(2px);
    }
`;