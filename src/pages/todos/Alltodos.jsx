import React from "react";
import { useGetAllTodosQuery } from "../../services/todoService";

const Alltodos = () => {
  const response = useGetAllTodosQuery();
  console.log("res", response);
  return <div>hello</div>;
};

export default Alltodos;
