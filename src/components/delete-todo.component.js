import React, {Component} from 'react';
import axios from 'axios';
import Todo from './todos-list.component';

export class DeleteTodo extends Component {

    constructor(props) {
        super(props);

        
    }

    deleteTodo = (e) => {
        e.preventDefault();
        //alert("Are you sure you want to delete?");
        axios.delete(`/todos/${this.props.deleteId}`)
        .then(res => {
            if(res.data){
                this.props.history.push('/');
            }
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
        <div className='form-group'>
            <input type='submit' value="Delete" className="btn btn-danger" onClick={this.deleteTodo}/>
        </div>
        )
    }

}