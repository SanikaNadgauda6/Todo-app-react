import React, { useEffect, useState } from "react";
import "./todo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    //fetch the todos from api & add it to the state
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((res) => res.json())
            .then((data) => {
                setTodos(data);
            });
    }, []);

    //deleting the specific todo using the id.
    const handleDelete = (id) => {
        console.log("Deleting this item", id);
        alert("Are you sure you want to delete the todo?");
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
        });
    }
    //editing the todo. 
    const handleEdit = (todo) => {
        setEditId(todo.id);
        setEditTitle(todo.title);
    }
    //after editing the todo, handle save 
    const handleSaveEdit = (id) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, title: editTitle };
            }
            return todo;
        });
        setTodos(updatedTodos);
        setEditId(null);
        setEditTitle("");
    }
    // add a new todo to the list
    const handleAddTodo = () => {
        if (newTodo.trim() === "") return;
        
        const newTodoItem = {
            userId: 1,
            id: todos.length + 1,
            title: newTodo,
            completed: false
        };

        setTodos([newTodoItem, ...todos]);
        setNewTodo("");
    }

    return (
        <div className="todo-container">
            <h2>Todo App</h2>
            <div className="form">
                <div className="form-input">
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Enter your Todo item" 
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div>
                <button className="btn-24" onClick={handleAddTodo}><span>Add Todo</span></button>
            </div>
            <div className="todo-list">
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            {editId === todo.id ? (
                                <>
                                    <input 
                                        type="text" 
                                        className="input-edit"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                    />
                                    <div className="wrap-save">
                                        <button className="button-save" onClick={() => handleSaveEdit(todo.id)}>
                                            <FontAwesomeIcon icon={faSave} className="save-icon" />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>{todo.title}</p>
                                    <div className="actions">
                                        <div className="wrap-edit">
                                            <button className="button-edit" onClick={() => handleEdit(todo)}>
                                                <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
                                            </button>
                                        </div>
                                        <div className="wrap-delete">
                                            <button className="button-delete" onClick={() => handleDelete(todo.id)}>
                                                <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo;
