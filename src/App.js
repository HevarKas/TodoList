import React, { useState } from "react";
import {
  useGetTodosQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "./api/apiSlice";
import "./App.css";

function App() {
  const { data } = useGetTodosQuery();
  const [todo, setTodo] = useState("");
  const [newEdit, setNewEdit] = useState("");
  const [edit, setEdit] = useState("");

  const [addTodo] = usePostTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      addTodo({ userId: 1, title: todo });
      setTodo("");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (newEdit !== "") {
      updateTodo({ userId: 1, id: edit.id, title: newEdit });
      setNewEdit("");
      setEdit("");
    }
  };

  return (
    <div className="app">
      <div className="add-form">
        <input
          type="text"
          value={edit ? (newEdit ? newEdit : edit.title) : todo}
          onChange={(e) =>
            edit ? setNewEdit(e.target.value) : setTodo(e.target.value)
          }
          placeholder={edit ? "Update..." : "Add..."}
        />
        <button
          className={edit ? "edit-btn" : "add-btn"}
          onClick={edit ? handleSave : handleSubmit}
        >
          {edit ? "Save" : "Add"}
        </button>
      </div>

      <header className="app-header">
        {data?.map((item) => (
          <div key={item.id}>
            <div className="box">
              <div className="title">
                <h3>{item.id}</h3>
                <h3>{item.title}</h3>
              </div>
              <div className="btn">
                <button
                  onClick={() => deleteTodo({ id: item.id })}
                  className="delete"
                >
                  Delete
                </button>
                <button onClick={() => setEdit(item)} className="Edit">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
