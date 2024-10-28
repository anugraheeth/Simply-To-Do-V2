import React, { useState, useEffect } from "react";
import trash from './assets/trash.png';
import edt from './assets/edit.png';

function Todo() {

    //statefull variables
    const [tasks, setTasks] = useState([]);
    const [newtask, setNewTask] = useState("");
    const [draggedIndex, setDraggedIndex] = useState(null);

    //useeffect to load the stored data to task list when mounted
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("tasks"));
        if (stored) {
            setTasks(stored);
        }
    }, []);


    //to take task name from input
    function inputTask(e) {
        setNewTask(e.target.value);
    }

    //updates the statefull variables and stores in the localstorage
    function add() {
        if (newtask !== "") {
            setTasks(prevTasks => {
                const updatedTasks = [...prevTasks, newtask];
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                return updatedTasks;
            });
            setNewTask("");
        }
    }

    //to edit the function name
    function edit(index){
        const value = tasks.filter((_,i) => i===index);
        setNewTask(value);
        removeTask(index);
    }

    //removes the task from taskslist
    function removeTask(index) {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter((_, i) => i !== index);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    }

    //drag event handler functions
    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (index) => {
        const newTasks = [...tasks];
        const [removed] = newTasks.splice(draggedIndex, 1);
        newTasks.splice(index, 0, removed);
        setTasks(newTasks);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    
    return (
        <div className="container">
            <div className="status">
                <h1>Simply To Do 2.0</h1>
            </div>
            <div className="input">
                <input type="text" id="ip" onChange={inputTask} value={newtask} placeholder="Add Your Task" />
                <button id="new" onClick={add}>+</button>
            </div>
            <div>
                <ul className="task" id="task">
                    {tasks.map((task, index) =>
                        <li
                            key={index}
                            className="tsk"
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => {
                                                e.preventDefault();
                                                handleDragOver(index);
                                        }}
                        onDragEnd={handleDragEnd}
                        >
                            {task}
                            <div className="icons">
                            <img src={edt} alt="Edit task name" onClick = {() => edit(index)} />
                            <img src={trash} alt="trash" onClick={() => removeTask(index)} />
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
