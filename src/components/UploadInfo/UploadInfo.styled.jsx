import styled from "@emotion/styled";

export const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    padding-left: 20px;
    padding-bottom: 5px;
    display: flex;
    gap: 20px;
    align-items: center;
`;

export const Text = styled.p`
    padding: 0;
    margin: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    font-size: 18px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`;

export const SupportText = styled.p`
    padding: 0;
    cursor: pointer;
    margin: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    font-size: 18px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    transition: color .15s,transform .15s;
    &:focus {
        color: #cb0404;
    }

    &:hover {
        color: #cb0404;
    transform: translateY(-1px);
    }
`;

