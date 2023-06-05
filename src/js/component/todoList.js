import React, { useState, } from "react";

const TodoList = () => {

	const [data, setData] = useState("");
	const [todo, setTodo] = useState([]);
  

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const addTodo = () => {
    setTodo([...todo, { data }]);
  };

  return (
    <>
      <input type="text" name="text" value={data} onChange={handleChange} />
      <button onClick={addTodo}>Add and save Todo</button>
      <ul>
        {todo.map((todoItem, index) => {
          return <li key={index}>{todoItem.data}</li>;
        })}
      </ul>
    </>
  );
};

export default TodoList;