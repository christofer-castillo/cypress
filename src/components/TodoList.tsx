import React from 'react';
import TodoItem from 'components/TodoItem';
import styled from "styled-components";

const StyledTodoList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

interface ListItem {
    id: string;
    name: string;
}

interface Props {
    list: ListItem[];
    onRemove: (id: string) => void;
}

const TodoList = ({ list, onRemove }: Props) => {

    return (
        <StyledTodoList>
            {list.map(({ id, name }) => <TodoItem name={name} onRemove={onRemove} key={id} id={id} />)}
        </StyledTodoList>
    )
};

export default TodoList;