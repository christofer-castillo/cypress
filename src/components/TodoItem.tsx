import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import styled from "styled-components";

const TodoItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: dodgerblue;
    color: white;
    width: 600px;
    font-size: 20px;
    border-radius: 1px;
    border: 2px solid black;
    padding: 10px;
`;

const TodoName = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

interface Props {
    name: string;
    onRemove: (id: string) => void;
    id: string;
}

const TodoItem = ({ name, onRemove, id }: Props) => {
    const [isComplete, setIsComplete] = React.useState<boolean>(false);
    const handleClick = () => setIsComplete(!isComplete);

    return (
        <TodoItemContainer>
            <IconButton sx={{ padding: '12px' }} onClick={handleClick} >
                {isComplete ? <CheckBoxIcon fontSize={"medium"} data-test="filled-check" aria-label={'checked'} /> : <CheckBoxOutlineBlankIcon fontSize={"medium"} data-test={"empty-check"} />}
            </IconButton>
            <TodoName>
                {!isComplete ? <div>{name}</div> : <div style={{ textDecoration: 'line-through' }}>{name}</div>}
            </TodoName>
            <IconButton size="large" aria-label="Delete" onClick={() => onRemove(id)} data-test="delete-todo" >
                <DeleteIcon />
            </IconButton>
        </TodoItemContainer>
    )
};

export default TodoItem;
