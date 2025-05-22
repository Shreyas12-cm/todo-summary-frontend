import React, { useEffect, useState } from 'react';
import API from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  };

  const handleAdd = async () => {
    if (!content.trim()) return;
    try {
      const res = await API.post('/todos', { content });
      setTodos([res.data, ...todos]);
      setContent('');
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const handleSummarize = async () => {
    try {
      const res = await API.post('/todos/summarize');
      alert('Summary sent to Slack:\n\n' + res.data.summary);
    } catch (err) {
      alert('Failed to summarize');
    }
  };

  return (
    <div className="App">
      <h1>Todo Summary Assistant</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            background: '#eee',
            padding: '8px',
            borderRadius: '6px',
            marginBottom: '6px'
          }}>
            <span>{todo.content}</span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSummarize} style={{ marginTop: '20px' }}>Summarize & Send to Slack</button>
    </div>
  );
}

export default App;
