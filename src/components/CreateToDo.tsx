import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState, IToDo } from "../atoms";

interface IForm {
  toDo: string;
}

const Wrapper = styled.form`
  background-color: red;
  display: grid;
  grid-template-columns: 5fr 3fr;
`;

const Input = styled.input``;

const Btn = styled.button``;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);

    const oldToDosString = localStorage.getItem(category);
    const oldToDos: IToDo[] =
      oldToDosString !== null ? JSON.parse(oldToDosString) : [];
    const newToDos = [{ text: toDo, id: Date.now(), category }, ...oldToDos];

    localStorage.setItem(category, JSON.stringify(newToDos));

    setValue("toDo", "");
  };

  return (
    <Wrapper onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", {
          required: { value: true, message: "Please write a To Do" },
        })}
        placeholder="Write a to do"
      />
      <Btn>Add</Btn>
    </Wrapper>
  );
}

export default CreateToDo;
