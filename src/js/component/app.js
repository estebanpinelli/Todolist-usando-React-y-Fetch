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

        let task = [...todo, { label: data, done: false }];
        setTodo(task);
        setData("");
        
        fetch('https://assets.breatheco.de/apis/fake/todos/user/estebanpinelli', {
          method: "PUT",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json"
          }
        });
      };

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
      <div className="col-6 text-center  " >
       <div className="m-3" >
       <h1>To Do List</h1>
        <input type="text" name="text" value={data} onChange={handleChange} />
        <button onClick={addTodo}><i className="far fa-save"></i></button>
        <button onClick={deleteTodo}><i className="fas fa-trash-alt"></i></button>
        </div>
        <ul>
          {todo.map((todoItem, index) => (
            <div className="form-check text-start border-bottom border-3  " key={index}>
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                <h4>{todoItem.label}</h4>
              </label>
            </div>
          ))}
        </ul>
      </div>
    )}

      
export default App;