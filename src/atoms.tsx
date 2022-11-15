import { atom, selector } from "recoil";

/* export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
} */

export interface IToDo {
  text: string;
  id: number;
  category: string;
  // category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const categoryState = atom<string>({
  key: "category",
  default: "TO_DO",
});

export const categories = atom<string[]>({
  key: "existedCategory",
  default: ["TO_DO", "DOING", "DONE"],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);

    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
