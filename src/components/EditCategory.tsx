import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categories } from "../atoms";

interface ICategory {
  newCategory: string;
}

const Wrapper = styled.form`
  background-color: red;
  display: grid;
  grid-template-columns: 5fr 3fr;
`;

const Input = styled.input``;

const Btn = styled.button``;

function EditCategory() {
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const setCategories = useSetRecoilState(categories);
  const handleNewCategory = ({ newCategory }: ICategory) => {
    setCategories((oldCategories) => [...oldCategories, newCategory]);

    setValue("newCategory", "");
  };

  return (
    <Wrapper onSubmit={handleSubmit(handleNewCategory)}>
      <Input
        {...register("newCategory", {
          required: {
            value: true,
            message: "Write a new category",
          },
        })}
        placeholder="Write a new Category"
      />
      <Btn>Add New Category</Btn>
    </Wrapper>
  );
}

export default EditCategory;
