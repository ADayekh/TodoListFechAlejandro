import React, { useEffect, useState } from "react";
//include images into your bundle
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
//create your first component
const Todos_List = () => {

	const [task, setTask] = useState([]);
	const [value, setValue] = useState("");
	const user = "aledayekh"

	const taskinHTML = task.map((singletask, index) => {
		return (
		<div className="row" key={index}>
			<div className="col-10">
				<div className ="postask">{singletask.label}</div>
			</div>
			<div className ="col-2 pt-3"> <button onClick={() => deletetask(singletask.id)} className="Button_Remove"><FontAwesomeIcon className ="icon" icon={faXmark} style={{color: "#ff0000"}}/>
			</button></div>
		</div>)
	})

	const deletetask = (id) => {
		//const newTask = task.filter((task) => task.id !== id);
		Delete_todos(id);
		//setTask (newTask);
	}

	const KeyDown = (event) => {
			if (event.key == "Enter") {
				const newTask =  {label: value, is_done: false};
				setTask([...task, newTask]);
				setValue("");
				Post_todos(user, newTask);

		}
	}
	
	const Get_todos = (user) => {
		fetch(`https://playground.4geeks.com/todo/users/${user}`, {method: "GET" , headers:{"Content-Type": "application/json"}}).then((response) => response.json()).then((data) => {
			setTask(data.todos);
			console.log (data)
		})
	}

	const Post_todos = (user, body) => {
		fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
			method: "POST", 
			body: JSON.stringify(body),
			headers:{"Content-Type": "application/json"}
		}).then((response) => response.json()).then((data) => {
			console.log (data);
		})
	}

	const Delete_todos = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE", 
			headers:{"Content-Type": "application/json"}
		}).then((response) => {const newTask = task.filter((task) => task.id !== id);
			setTask (newTask);
		}
	)
	}

	useEffect (() => {
		Get_todos(user)
	}, [])

	return (
		<div className="text-center pb-5">
			<h1 id="title" className="text-center mt-5">todos</h1>
			<div className ="Bloc">
				<input className ="createTask" placeholder="What needs to be done?" type="text" value={value} onKeyDown={KeyDown} onChange={(event)=> setValue(event.target.value)}></input>
				{taskinHTML} 
				<div className="Stock">
					 <p className="number fw-light">{task.length} item left</p>
				</div>
			</div>
		</div>
	);
};

export default Todos_List;