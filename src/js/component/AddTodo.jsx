import React from "react";

export const AddTodo = () => {
	const [newTodo, setNewTodo] = React.useState("");
	const [listOfTodos, setListOfTodos] = React.useState([]);

	React.useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/odeclasv")
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(data => setListOfTodos(data));
	}, []); //empty array means it will only run once

	const addTodoItem = e => {
		if (e.key === "Enter" && e.target.value != "") {
			let newList = [...listOfTodos, { label: newTodo, done: false }];
			setListOfTodos(newList);
			setNewTodo("");

			fetch("https://assets.breatheco.de/apis/fake/todos/user/odeclasv", {
				method: "PUT",
				body: JSON.stringify(newList),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(response => {
				if (response.ok) {
					fetch(
						"https://assets.breatheco.de/apis/fake/todos/user/odeclasv"
					)
						.then(response => {
							if (!response.ok) {
								throw new Error(response.statusText);
							}
							return response.json();
						})
						.then(data => setListOfTodos(data))
						.catch(error => console.error(error));
				}
			});
		}
	};

	const removeTodoItem = e => {
		let newList = listOfTodos.filter(item => {
			if (item.label !== e.target.value) {
				return item;
			}
		});

		setListOfTodos(newList);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/odeclasv", {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => console.log(response))
			.catch(error => console.error(error));
	};

	return (
		<>
			<input
				type="text"
				placeholder="Add Todo item"
				value={newTodo}
				onChange={e => setNewTodo(e.target.value)}
				onKeyUp={e => addTodoItem(e)}
			/>
			<div>
				<ul className="list-group list-group-flush">
					{listOfTodos.map((item, i) => {
						return (
							<li
								key={i}
								className="list-group-item d-flex justify-content-between align-items-center">
								{item.label}
								<button
									className="btn btn"
									value={item.label}
									onClick={removeTodoItem}>
									Done
								</button>
							</li>
						);
					})}
				</ul>
				<div className="todoCounts">
					Total Todos Left: {listOfTodos.length}
				</div>
			</div>
		</>
	);
};
