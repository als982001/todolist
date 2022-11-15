import React from "react";
import Reacto, { ReactFragment } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { IToDo, toDoState, categories } from "../atoms";

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

  return (
    <li>
      <span>{text}</span>
      {existedCategories.map((existed) =>
        existed !== category ? (
          <button name={existed} onClick={onClick}>
            {existed}
          </button>
        ) : null
      )}
    </li>
  );
}

export default ToDo;
