import React from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryState, toDoSelector, categories, IToDo } from "../atoms";
import EditCategory from "./EditCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  margin: 0 auto;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
`;

const CategoryDiv = styled.div`
  height: 20vh;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  margin-bottom: 50px;
`;

const SelectDiv = styled.div`
  display: flex;
`;

const Select = styled.select`
  width: 100%;
`;

const MiniTitle = styled.h3`
  font-size: 22px;
  margin-bottom: 10px;
`;

const ToDos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 30vw;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const existedCategories = useRecoilValue(categories);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  // Local Storage
  const currentToDosString = localStorage.getItem(category);
  const currentToDos: IToDo[] =
    currentToDosString !== null ? JSON.parse(currentToDosString) : [];
  // =================================

  return (
    <Wrapper>
      <Title>To Dos</Title>
      <hr />
      <CategoryDiv>
        <SelectDiv>
          <Select value={category} onInput={onInput}>
            {existedCategories.map((existed) => (
              <option value={existed}>{existed}</option>
            ))}
          </Select>
        </SelectDiv>
        <EditCategory />
        <CreateToDo />
      </CategoryDiv>
      {/* <hr />
      <MiniTitle>To Dos</MiniTitle>
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))} */}
      <hr />
      <MiniTitle>To Dos Local ver</MiniTitle>
      <ToDos>
        {currentToDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDos>
    </Wrapper>
  );
}

export default ToDoList;
