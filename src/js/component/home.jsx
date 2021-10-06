import React from "react";
import { AddTodo } from "./AddTodo.jsx";

//create your first component
const Home = () => {
	return (
		<div className="container-fluid mt-5 text-center">
			<h1>Fantastic Todo List</h1>
			<AddTodo />
		</div>
	);
};

export default Home;
