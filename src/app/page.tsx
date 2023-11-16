"use client";

import React, { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState<
    { text: string; completed: boolean }[]
  >([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputText) return;
    setTodoList([...todoList, { text: inputText, completed: false }]);
    setInputText("");
  };

  function handleDelete(index: number) {
    const newTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(newTodoList);
  }

  function toggleComplete(index: number) {
    const newTodoList = [...todoList];
    newTodoList[index].completed = !newTodoList[index].completed;
    setTodoList(newTodoList);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <ul>
        {todoList.map((todo, index) => (
          <li
            key={index}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
            <button onClick={() => toggleComplete(index)}>
              {!todo.completed ? "Complete" : "Undo"}
            </button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
