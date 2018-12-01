// Core
import React, { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskList from '../../components/TaskList';
import NewTask from '../../components/NewTask';
import Spinner from '../../components/Spinner';
import { filterTasksByMessage } from '../../instruments/helpers';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

class Scheduler extends Component {
    state = {
        tasks: [],
        searchValue: ''
    };

    componentDidMount() {
        this.setState({
            fetchInProgress: true
        });

        api.fetchTasks()
            .then(response => response.json())
            .then(data => {
                this.setState({
                    fetchInProgress: false,
                    tasks: data.data
                });
                console.log('fetch data', data);
            })
            .catch(e => {
                this.setState({
                    fetchInProgress: false
                });
                console.log('error', e);
            });
    }

    _addNewTask = (message) => {
        let tasks = [...this.state.tasks];

        this.setState({
            fetchInProgress: true
        });

        api.createTasks({ message: message })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    fetchInProgress: false
                });

                tasks.push(data.data);
                this.setState({
                    tasks
                });
            })
            .catch(e => {
                this.setState({
                    fetchInProgress: false
                });
                console.log('error', e);
            });

    };

    _updateTask = newTask => {
        api.updateTask([ newTask ])
            .then(response => response.json())
            .then(data => {
                this.setState({
                    fetchInProgress: false
                });

                this.setState({
                    tasks: this.state.tasks.map(task => {
                        if (task.id == data.data[0].id) return data.data[0];
                        return task;
                    })
                });
            })
            .catch(e => {
                this.setState({
                    fetchInProgress: false
                });
                console.log('error', e);
            });
    };

    _deleteTask = (deletedTask) => {
        api.deleteTask(deletedTask)
            .then(() => {
                this.setState({
                    fetchInProgress: false
                });
                this.setState({
                    tasks: this.state.tasks.filter(task => {
                        return (task.id != deletedTask.id);
                    })
                });
            })
            .catch(e => {
                this.setState({
                    fetchInProgress: false
                });
                console.log('error', e);
            });
    };

    _completeAllTasks = () => {
        const tasks = this.state.tasks.map(task => {
            task.completed = true;
            return task;
        });

        api.updateTask(tasks)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    fetchInProgress: false
                });
                this.setState({
                    tasks: data.data
                });
            })
            .catch(e => {
                this.setState({
                    fetchInProgress: false
                });
                console.log('error', e);
            });
    };

    _getUncompletedTasks = () => {
        return this.state.tasks.filter(task => !task.completed)
    };

    _updateSearchValue = (value) => {
        this.setState({
            searchValue: value
        });
    };

    render () {
        const allTaskCompleted = !this._getUncompletedTasks().length;

        return (
            <section className = { Styles.scheduler }>
                <main>
                    { this.state.fetchInProgress ? <Spinner /> : '' }

                    <Header searchValue = { this.state.searchValue }
                            _updateSearchValue = { this._updateSearchValue } />

                    <section>

                        <NewTask _addNewTask = { this._addNewTask } />
                        <TaskList tasks = { filterTasksByMessage(this.state.tasks, this.state.searchValue) }
                                  _updateTask = { this._updateTask }
                                  _deleteTask = { this._deleteTask } />

                    </section>

                    <Footer allTaskCompleted = { allTaskCompleted }
                            _completeAllTasks = { this._completeAllTasks }
                    />
                </main>
            </section>
        );
    }
}

export default Scheduler;