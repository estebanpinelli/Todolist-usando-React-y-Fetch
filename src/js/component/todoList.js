import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [data, setData] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    // Cargar la lista de tareas almacenada en LocalStorage al cargar la página
    const savedTodo = localStorage.getItem("todo");
    if (savedTodo) {
      setTodo(JSON.parse(savedTodo));
    }
  }, []);

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const addTodo = () => {
    setTodo([...todo, { label: data, done: false }]);
    setData("");
  };

  useEffect(() => {
    // Guardar la lista de tareas en LocalStorage cada vez que cambie
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <>
      <input type="text" name="text" value={data} onChange={handleChange} />
      <button onClick={addTodo}>Add and save Todo</button>
      <ul>
        {todo.map((todoItem, index) => {
          return <li key={index}>{todoItem.label}</li>;
        })}
      </ul>
    </>
  );
};

export default TodoList;