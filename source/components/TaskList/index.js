import React, { Component } from 'react';
import Task from '../../components/Task';
import { sortTasksByGroup } from '../../instruments/helpers';

class TaskList extends Component {
    render() {
        return(
            <div>
                <ul>
                    <div>
                        {
                            sortTasksByGroup(this.props.tasks).map(task => {
                                    return (
                                        <Task key = { task.id }
                                              id = { task.id }
                                              completed = { task.completed }
                                              favorite = { task.favorite }
                                              message = { task.message }

                                              _updateTask = { this.props._updateTask }
                                              _deleteTask = { this.props._deleteTask }
                                        />
                                    );
                                })
                        }
                    </div>
                </ul>
            </div>
        )
    }
}

export default TaskList;
