import React from "react";
import styled from "styled-components";

const TodoInput = styled.input`
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 12px 20px;
    margin: 8px 0;
    border-radius: 5px;
    border: 0;
    min-width: 400px;
`;

const Label = styled.label`
    width: 100%;
    font-size: 30px;
    display: flex;
    justify-content: center;
`;

interface Props {
    id: string;
    dataTag?: string;
    placeholder?: string;
    type?: string;
    labelText: string;
    value?: string | undefined;
    onChange?: React.ChangeEventHandler;
    maxlength: number;
}

const Input = ({ id, dataTag, placeholder, type, labelText, value, onChange, maxlength }: Props) => {
    return (
        <>
            <Label htmlFor={id}>{labelText}</Label>
            <TodoInput id={id} data-test={dataTag} placeholder={placeholder} type={type || 'text'} value={value} onChange={onChange} maxLength={maxlength} />
        </>
    );
};

export default Input;