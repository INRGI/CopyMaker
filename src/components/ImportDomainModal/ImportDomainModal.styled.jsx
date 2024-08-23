import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import Modal from "react-modal";

export const Container = styled(Modal)`
  width: 100%;
  max-width: 350px;
  height: 150px;
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
  font-size: 24px;
`;

export const FileInputLabel = styled.label`
  align-items: center;
  appearance: none;
  background-color: #fca311;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #e19110 0 -3px 0 inset;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 35px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
  width: 150px;

  &:focus {
    box-shadow: #e19110 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #e19110 0 -3px 0 inset;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #e19110 0 -3px 0 inset;
    transform: translateY(-1px);
  }

  &:active {
    box-shadow: #e19110 0 3px 7px inset;
    transform: translateY(1px);
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const ImportButton = styled(FileInputLabel)`
  background-color: #a7c957;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
  &:focus {
    box-shadow: #8aa649 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #8aa649 0 -3px 0 inset;
    transform: translateY(-1px);
  }

  &:active {
    box-shadow: #8aa649 0 3px 7px inset;
    transform: translateY(1px);
  }
`;
