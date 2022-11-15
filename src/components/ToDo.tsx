import React from "react";
import styled from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { IToDo, toDoState, categories } from "../atoms";

const Li = styled.li`
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 50%;
`;

const ToDoName = styled.div`
  display: flex;
  justify-content: center;

  span {
    font-size: 20px;
  }
`;
const Btns = styled.div`
  display: flex;
  justify-content: center;
`;

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const existedCategories = useRecoilValue(categories);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }, // name: 클릭한 카테고리(변경할 카테고리)
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  // Local Storage Ver ==================
  const onClickLocal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    const oldToDosString = localStorage.getItem(category);
    let oldToDos: IToDo[] =
      oldToDosString !== null ? JSON.parse(oldToDosString) : [];

    const newToDoString = localStorage.getItem(name);
    let newToDos: IToDo[] =
      newToDoString !== null ? JSON.parse(newToDoString) : [];

    const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
    const newToDo = { text, id, category: name as any };

    oldToDos.splice(targetIndex, 1);
    newToDos.splice(0, 0, newToDo);

    localStorage.setItem(category, JSON.stringify(oldToDos));
    localStorage.setItem(name, JSON.stringify(newToDos));
  };

  // ================================

  return (
    <Li>
      <ToDoName>
        <span>{text}</span>
      </ToDoName>
      <Btns>
        {existedCategories.map((existed) =>
          existed !== category ? (
            <button name={existed} onClick={onClickLocal}>
              {existed}
            </button>
          ) : null
        )}
      </Btns>
    </Li>
  );
}

export default ToDo;
