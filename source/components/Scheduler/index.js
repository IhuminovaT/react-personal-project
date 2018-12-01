// Core
import React, { Component } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TaskList from "../../components/TaskList";
import NewTask from "../../components/NewTask";
import Spinner from "../../components/Spinner";
import { filterTasksByMessage } from "../../instruments/helpers";

// Instruments
import Styles from "./styles.m.css";
import { api } from "../../REST"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

class Scheduler extends Component {
    state = {
        tasks:       [],
        searchValue: "",
    };

    componentDidMount () {
        this.setState({
            fetchInProgress: true,
        });

        api.fetchTasks()
            .then((data) => {
                this.setState({
                    fetchInProgress: false,
                    tasks:           data,
                });
                console.log("fetch data", data);
            });
    }

    _addNewTask = (message) => {
        const tasks = [...this.state.tasks];

        this.setState({
            fetchInProgress: true,
        });

        api.createTasks({ message })
            .then((data) => {
                this.setState({
                    fetchInProgress: false,
                });

                tasks.push(data);
                this.setState({
                    tasks,
                });
            });
    };

    _updateTask = (newTask) => {
        api.updateTask([newTask])
            .then((data) => {
                this.setState({
                    fetchInProgress: false,
                });

                this.setState({
                    tasks: this.state.tasks.map((task) => {
                        if (task.id == data[0].id) {
                            return data[0];
                        }

                        return task;
                    }),
                });
            });
    };

    _deleteTask = (deletedTask) => {
        api.deleteTask(deletedTask)
            .then(() => {
                this.setState({
                    fetchInProgress: false,
                });
                this.setState({
                    tasks: this.state.tasks.filter((task) => {
                        return task.id != deletedTask.id;
                    }),
                });
            });
    };

    _completeAllTasks = () => {
        const tasks = this.state.tasks.map((task) => {
            task.completed = true;

            return task;
        });

        api.updateTask(tasks)
            .then((data) => {
                this.setState({
                    fetchInProgress: false,
                });
                this.setState({
                    tasks: data,
                });
            });
    };

    _getUncompletedTasks = () => {
        return this.state.tasks.filter((task) => !task.completed);
    };

    _updateTasksFilter = (value) => {
        this.setState({
            searchValue: value,
        });
    };

    render () {
        const allTaskCompleted = !this._getUncompletedTasks().length;

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Spinner isSpinning = { this.state.fetchInProgress } />

                    <Header
                        searchValue = { this.state.searchValue }
                        _updateTasksFilter = { this._updateTasksFilter }
                    />

                    <section>
                        <NewTask _addNewTask = { this._addNewTask } />
                        <TaskList
                            tasks = { filterTasksByMessage(
                                this.state.tasks,
                                this.state.searchValue
                            ) }
                            _updateTask = { this._updateTask }
                            _deleteTask = { this._deleteTask }
                        />
                    </section>

                    <Footer
                        allTaskCompleted = { allTaskCompleted }
                        _completeAllTasks = { this._completeAllTasks }
                    />
                </main>
            </section>
        );
    }
}

export default Scheduler;
