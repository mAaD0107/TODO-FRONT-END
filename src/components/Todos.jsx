import React, {useEffect, useState} from 'react';
import TodoForm from './Form';
import Todo from './Todo';

function Todos() {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
    // enviar el post del todo
    fetchPost();
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
        //enviar el checked del todo
        
      }
      return todo;
    });
    setTodos(updatedTodos);
  };


  const url = 'http://localhost:8080/todos/2/items'
  const urlPost = 'http://localhost:8080/todos/ '

  const fetchApi = async () => {
    const response = await fetch(url)
    const responseJSON = await response.json()
    setTodos(responseJSON)
    console.log(responseJSON)
  }

 
 const fetchPost = async () => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': '*'},
        body: JSON.stringify({ title: 'React POST Request' })
    };
    const response = await fetch(urlPost, requestOptions);
    const data = await response.json();
    this.setState({ postId: data.id });
}


  
  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <>
      <h1>TODOS</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default Todos;