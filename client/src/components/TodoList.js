import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import axios from 'axios';

function TodoList() {

  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
  }, [todos]);

  const addTodo = (todo) => {
    if (!todo.task_name || /^\s*$/.test(todo.task_name)) {
      return;
    }

    const todoNew = { 
      'task_name':todo.task_name, 
      'description':todo.description, 
      'is_complete':todo.is_complete
    };
    axios.post('http://localhost:5000/api/todo/', 
        todoNew, {
        headers: {'Content-Type': 'application/json'}
        })
    .then(response => console.log(response))
    .catch(error => {
      console.error('There was an error!', error);
    });

    fetch('http://localhost:5000/api/todo/', {
        method: 'GET',
        headers: {
            'Content-TYpe':'application/json'
        }
    })
    .then( resp => resp.json() )
    .then(data => {
      const newTodos = data;
      setTodos(newTodos);
    })
    .catch( console.warn );

  };

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.task_name || /^\s*$/.test(newValue.task_name)) {
      return;
    }

    const todoNew = { 
      'task_name':newValue.task_name, 
      'description':newValue.description, 
      'is_complete':newValue.is_complete
    };
    axios.put(`http://localhost:5000/api/todo/${todoId}`, 
        todoNew, {
        headers: {'Content-Type': 'application/json'}
        })
    .then(response => console.log(response))
    .catch(error => {
      console.error('There was an error!', error);
    });

    fetch('http://localhost:5000/api/todo/', {
        method: 'GET',
        headers: {
            'Content-TYpe':'application/json'
        }
    })
    .then( resp => resp.json() )
    .then(data => {
      const newTodos = data;
      setTodos(newTodos);
    })
    .catch( console.warn );

  };

  const removeTodo = (id) => {

    axios.delete(`http://localhost:5000/api/todo/${id}`)
    .then(response => console.log(response))
    .catch(error => {
      console.error('There was an error!', error);
    });

    fetch('http://localhost:5000/api/todo/', {
        method: 'GET',
        headers: {
            'Content-TYpe':'application/json'
        }
    })
    .then( resp => resp.json() )
    .then(data => {
      const newTodos = data;
      setTodos(newTodos);
    })
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.is_complete = !todo.is_complete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}

export default TodoList;
