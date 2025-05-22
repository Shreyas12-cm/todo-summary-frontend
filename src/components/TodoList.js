import React from 'react';
import API from '../services/api';

const TodoList = ({ todos, setTodos }) => {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>{todo.content}</span>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
