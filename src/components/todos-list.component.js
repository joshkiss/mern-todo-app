import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { DeleteTodo } from './delete-todo.component';
//import {DeleteTodo} from './delete-todo.component';


const Todo = props => (
	<tr>
		<td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
		<td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
		<td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
		<td>
			<p style={{marginLeft: 5}}>
				<Link to={"/edit/" + props.todo._id}>Edit</Link> 
			</p>
		</td>
	</tr>
)



export default class TodosList extends Component {
	constructor(props) {
		super(props);
		this.state = {todos: [], delete: this.deleteTodo};
		
	}


	componentDidMount() {
		axios.get('http://localhost:4000/todos/')
			.then(response => {
				this.setState({todos: response.data})
			})
			.catch(error => console.log(error));
	}

	deleteTodo = (id) => {
        
        //alert("Are you sure you want to delete?");
        axios.delete(`/update/${this.props.match.params.id}`)
        .then(res => {
            if(res.data){
                this.props.history.push('/');
            }
        })
        .catch(err => console.log(err, this.props))
    }

	todoList() {
		return this.state.todos.map((currentTodo, i) => <Todo todo={currentTodo} key={i} />)
	}


	render() {
		return (
			<div>
				<h3 align='center'>Todos List</h3>
				<table className="table table-striped" style={{marginTop: 20}}>
					<thead>
						<tr>
							<th>Description</th>
							<th>Responsible</th>
							<th>Priority</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.todoList()}
					</tbody>
				</table>
			</div>
		);
	}
}