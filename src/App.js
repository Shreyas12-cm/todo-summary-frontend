import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import API from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

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

  const handleAdd = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const sendSummary = async () => {
    try {
      const res = await API.post('/todos/summarize');
      alert('Summary sent to Slack:\n\n' + res.data.summary);
    } catch (err) {
      alert('Failed to summarize.');
    }
  };

  return (
    <div className="App">
      <h1>Todo Summary Assistant</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
      <button onClick={sendSummary}>Summarize & Send to Slack</button>
    </div>
  );
}

export default App;
