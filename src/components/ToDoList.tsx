import React from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { categoryState, toDoSelector, categories } from "../atoms";
import AddCategory from "./AddCategory";
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

const SelectSpan = styled.span``;

const SelectDiv = styled.div`
  display: flex;
`;

const Select = styled.select`
  width: 100%;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const existedCategories = useRecoilValue(categories);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

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
        <AddCategory />
        <CreateToDo />
      </CategoryDiv>
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Wrapper>
  );
}

export default ToDoList;
