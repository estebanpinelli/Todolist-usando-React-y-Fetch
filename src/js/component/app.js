import React, { useState, useEffect } from "react";
import TodoList from "./todoList";

const App = () => {

    const [data, setData] = useState("Escriba");

    // todo list del cliente.
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        // todo list del servidor >>
        fetch('https://assets.breatheco.de/apis/fake/todos/user/Pablofernandez', {
          method: "GET",
          headers: {
          }
        })
        .then(resp => {
          console.log(resp.ok);
          return resp.json();
        })
        .then(data => {
          console.log(data);
          setTodo(data) // seteando todo list del cliente con la del servidor.
        })
        .catch(error => {
          console.log(error);
        });
      }, []);
    
      // solo mantiene en 'data' lo que hay en el input text
    const handleChange = (event) => {
      setData(event.target.value);
    };
  
    const addTodo = () => {
      let tod = [...todo, { label:data, done: false }] // no está ni en el cliente ni en el servidor.
      setTodo(tod); // setea la nueva en el cliente.
      saveTodo(tod); // setea en el servidor.
    };
  
    const saveTodo =(tod) => {
      /// setear en el servidor el valor de `tod` 
      fetch('https://assets.breatheco.de/apis/fake/todos/user/Pablofernandez', {
        method: "PUT",
        body: JSON.stringify(tod),
        headers: {
          "Content-Type": "application/json"
        }
      })
    }

    return (
      <>
        <input type="text" name="text" value={data} onChange={handleChange} />
        <button onClick={addTodo}>Add Todo</button>
        <ul>
          {todo.map((todoItem, index) => {
            return <li key={index}>{todoItem.label}</li>;
          })}
        </ul>
      </>
    );
  };
      
export default App;