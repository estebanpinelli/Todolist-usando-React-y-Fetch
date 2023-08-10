import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/estebanpinelli")
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
    const nuevaTarea = { label: data, done: false };
    setTodo([...todo, nuevaTarea]);
    setData("");

    // Guardar la nueva lista de tareas en la API
    fetch("https://assets.breatheco.de/apis/fake/todos/user/estebanpinelli", {
      method: "PUT",
      body: JSON.stringify([...todo, nuevaTarea]),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deleteTodo = (index) => {
    const listaActualizada = [...todo];
    listaActualizada.splice(index, 1);
    setTodo(listaActualizada);

    // Guardar la lista de tareas actualizada en la API
    fetch("https://assets.breatheco.de/apis/fake/todos/user/estebanpinelli", {
      method: "PUT",
      body: JSON.stringify(listaActualizada),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="col-6 text-center">
      <div className="m-3">
        <h1>Lista de Tareas</h1>
        <input type="text" name="text" value={data} onChange={handleChange} />
        <button onClick={addTodo}>
          <i className="far fa-save"></i>
        </button>
      </div>
      <ul>
        {todo.map((tarea, index) => (
          <div className="form-check text-start border-bottom border-3" key={index}>
            <input className="form-check-input" type="checkbox" value="" id={`checkbox-${index}`} />
            <label className="form-check-label" htmlFor={`checkbox-${index}`}>
              <h4>{tarea.label}</h4>
            </label>
            <button onClick={() => deleteTodo(index)}>Eliminar</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;