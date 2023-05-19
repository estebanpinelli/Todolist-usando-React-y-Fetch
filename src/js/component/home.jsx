import React, { useState, useEffect} from "react";

const Home = () => {
	
	useEffect (() => {

	fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });
});


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
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todo.map((todoItem, index) => {
          return <li key={index}>{todoItem.data}</li>;
        })}
      </ul>
    </>
  );
};

export default Home;