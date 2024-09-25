import React, { useEffect, useState } from "react";
//include images into your bundle
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
//create your first component
const Todos_List = () => {

	const [task, setTask] = useState([]);
	const [value, setValue] = useState("");

	const taskinHTML = task.map ((singleTask, i) => {
		return (
		<div className="row">
			<div className="col-10">
				<div className ="postask" key={i}>{singleTask}</div>
			</div>
			<div className ="col-2 pt-3"> <button onClick={() => deletetask(i)} className="Button_Remove"><FontAwesomeIcon className ="icon" icon={faXmark} style={{color: "#ff0000"}}/>
			</button></div>
		</div>)
	})

	const deletetask = (index) => {
		const newTask = task.filter((_, i) => i !== index)
		setTask (newTask)
	}

	const KeyDown = (event) => {
			if (event.key == "Enter") {
				const newTask =  ([...task, value]);
				setTask(newTask);
				setValue("");
		}
	}
	
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