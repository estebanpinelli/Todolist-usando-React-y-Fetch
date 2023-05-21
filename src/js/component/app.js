import React, { useState, useEffect } from "react";

const App = () => {

    const [data, setData] = useState("");
    const [todo, setTodo] = useState([]);

    useEffect(() => { 
      fetch("https://assets.breatheco.de/apis/fake/todos/user/estebanpinelli", {
        method: "HEAD",
      })
        .then((resp) => {
          if (!resp.ok) {
            return fetch(
              "https://assets.breatheco.de/apis/fake/todos/user/estebanpinelli",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
              }
              
            )   .then(() => {

              window.location.reload();
            });;
            
          } else {
            return fetch(
              "https://assets.breatheco.de/apis/fake/todos/user/estebanpinelli"
            );
          }
        })
        .then((resp) => resp.json())
        .then((todo) => {

          setTodo(todo);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    

    const handleChange = (event) => {
      setData(event.target.value);
    };
  
    const addTodo = () => {
      let task = [...todo, { label:data, done: false }] 
      setTodo(task);
      setData("") 
    };
  
    const saveTodo =() => {
      fetch('https://assets.breatheco.de/apis/fake/todos/user/estebanpinelli', {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json"
        }
      })
    }

    const deleteTodo =() => {
      fetch('https://assets.breatheco.de/apis/fake/todos/user/estebanpinelli', {
        method: "DELETE",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json"
        }
   })   .then(resp => {
    console.log(resp.ok); })
    }

    return (
      <>
        <input type="text" name="text" value={data} onChange={handleChange} />
        <button onClick={addTodo}>Add Todo</button>
        <button onClick={saveTodo}>Save Todo</button>
        <button onClick={deleteTodo}>Delete Todo</button>
        <ul>
          {todo.map((todoItem, index) => {
            return <li key={index}>{todoItem.label}</li>;
          })}
        </ul>
      </>
    );
  };
      
export default App;