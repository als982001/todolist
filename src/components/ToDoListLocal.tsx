import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryState, toDoSelector, categories, IToDo } from "../atoms";
import AddCategory from "./EditCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoListLocal() {
  const [category, setCategory] = useRecoilState(categoryState);
  const currentToDosString = localStorage.getItem(category);
  const currentToDos: IToDo[] =
    currentToDosString !== null ? JSON.parse(currentToDosString) : [];

  return (
    <div>
      <h1>To Dos Local ver</h1>
      <hr />
      {currentToDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoListLocal;
