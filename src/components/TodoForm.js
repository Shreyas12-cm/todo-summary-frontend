import React, { useState } from 'react';
import API from '../services/api';

const TodoForm = ({ onAdd }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await API.post('/todos', { content });
      onAdd(res.data); // Pass added todo to parent
      setContent('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
