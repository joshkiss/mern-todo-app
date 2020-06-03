import React, { Component } from 'react';
import axios from 'axios';
import {DeleteTodo} from './delete-todo.component';

export default class EditTodo extends Component {
    constructor(props){
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
            id: this.props.match.params.id
        }
    }


    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    async onDelete(e){
        e.preventDefault();
        //console.log('props : ' + this.props)
        //alert("Are you sure you want to delete?");
        await axios.delete('http://localhost:4000/todos/delete/' + this.props.match.params.id)
        .then(res => {
            console.log(res.data);
            console.log(this.props)
        })
        .catch(err => console.log(this.props));

        this.props.history.push('/');
    }


    async onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        console.log(obj, this.props);
        await axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id, obj)
        .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }


    componentDidMount(){
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                todo_description: response.data.todo_description,
                todo_responsible: response.data.todo_responsible,
                todo_priority: response.data.todo_priority,
                todo_completed: response.data.todo_completed
            })
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <h3 align='center'>Edit</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Description: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.todo_description}
                            onChange={this.onChangeTodoDescription}
                            />
                    </div>
                    <div className='form-group'>
                        <label>Responsible: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.todo_responsible}
                            onChange={this.onChangeTodoResponsible}
                            />
                    </div>
                    <div className='form-check form-check-inline'>
                        <input type='text'
                            className='form-check-input'
                            type="radio" 
                            name="priorityOptions" 
                            id="priorityLow" 
                            value="Low"
                            checked={this.state.todo_priority === 'Low'}
                            onChange={this.onChangeTodoPriority}
                            />
                        <label className='form-check-label'>Low</label>
                    </div>

                    <div className='form-check form-check-inline'>
                        <input type='text'
                            className='form-check-input'
                            type="radio" 
                            name="priorityOptions" 
                            id="priorityMedium" 
                            value="Medium"
                            checked={this.state.todo_priority === 'Medium'}
                            onChange={this.onChangeTodoPriority}
                            />
                        <label className='form-check-label'>Medium</label>
                    </div>

                    <div className='form-check form-check-inline'>
                        <input type='text'
                            className='form-check-input'
                            type="radio" 
                            name="priorityOptions" 
                            id="priorityHigh" 
                            value="High"
                            checked={this.state.todo_priority === 'High'}
                            onChange={this.onChangeTodoPriority}
                            />
                        <label className='form-check-label'>High</label>
                    </div>

                    <div className='form-check'>
                        <input type='checkbox'
                            id='completedCheckbox'
                            name="completedCheckbox"
                            className='form-check-input'
                            value={this.state.todo_completed}
                            checked={this.state.todo_completed}
                            onChange={this.onChangeTodoCompleted}
                            />
                        <label className='form-check-label' htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>

                    <br />

                    <div className='form-group'>
                        <input type='submit' value="Update Todo" className="btn btn-primary"/> 
                        <br />
                        <br />
                        <input type='submit' value="Delete Todo" onDelete={this.onDelete} className="btn btn-danger" onClick={this.onDelete}/>
                    </div>

                </form>
            </div>
        )
    }
}