import React, { Component } from 'react';

class NewTask extends Component {
    state = {
        message: ''
    };

    _handleClick = (e) => {
        e.preventDefault();
        if (!this.state.message.length) return;

        this.props._addNewTask(this.state.message);

        this.setState({
           message: ''
        });
    };

    _handleChange = e => {
        this.setState({
            message: e.target.value,
        });
    };


    render() {
        return (
            <form>
                <input type = "text"
                       maxLength = "50"
                       placeholder = "Описaние моей новой задачи"
                       value = { this.state.message }
                       onChange = { this._handleChange } />

                <button onClick = { this._handleClick } >
                    Добавить задачу
                </button>
            </form>
        )
    }
}

export default NewTask;