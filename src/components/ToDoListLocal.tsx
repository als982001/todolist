import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryState, toDoSelector, categories, IToDo } from "../atoms";
import AddCategory from "./AddCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoListLocal() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const existedCategories = useRecoilValue(categories);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const currentToDosString = localStorage.getItem(category);
  const currentToDos: IToDo[] =
    currentToDosString !== null ? JSON.parse(currentToDosString) : [];

  return (
    <div>
      <h1>To Dos Local ver</h1>
      <hr />
      {/* {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))} */}
      {currentToDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoListLocal;
