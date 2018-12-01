// Core
import React, { PureComponent } from 'react';
import Checkbox from '../../theme/assets/Checkbox';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Star from '../../theme/assets/Star';


// Instruments
import Styles from './styles.m.css';

const colors = {
    color1: '#3b8ef3',
    color2: '#fff',
    color3: '#000'
};

export default class Task extends PureComponent {
    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    state = {
        editMode: false,
        message: this.props.message
    };

    messageInput = React.createRef();

    _resetMessage = () => {
        this.setState({
            message: this.props.message
        });
    };

    _toggleEditMode = () => {
        this.setState({
            editMode: !this.state.editMode
        }, () => {
            if (this.state.editMode) this.messageInput.current.focus();
        });
    };

    _updateTaskMessage = message => {
        this.props._updateTask({
            ...this._getTaskShape(this.props),
            message: message
        });
    };

    _toggleTaskCompeting = e => {
        e.preventDefault();

        this.props._updateTask({
            ...this._getTaskShape(this.props),
            completed: !this.props.completed
        });
    };

    _toggleTaskFavorite = e => {
        e.preventDefault();

        this.props._updateTask({
            ...this._getTaskShape(this.props),
            favorite: !this.props.favorite
        });
    };

    _deleteTask = () => {
        this.props._deleteTask(this._getTaskShape(this.props));
    };

    _handleOnChange = (e) => {
        this.setState({
            message: e.target.value
        });
    };

    _handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value.length) {
            this._updateTaskMessage(e.target.value);
            this._toggleEditMode();
        }
        if (e.key === 'Escape') {
            this._resetMessage();
            this._toggleEditMode();
        }
    };

    componentWillUpdate(nextProps) {
        if (this.props.message != nextProps.message) {
            this.setState({
                message: nextProps.message
            });
        }
    }

    render () {

        const { completed, favorite } = this.props;

        return (
            <li className = { `${Styles.task} ${completed ? Styles.completed : ''}` } >
                <div className = { Styles.content } >
                    <Checkbox className = { Styles.toggleTaskCompletedState }
                              color2 = { colors.color2 }
                              color1 = { colors.color1 }
                              checked = { completed }
                              onClick = { this._toggleTaskCompeting }
                    />

                    <input type = "text"
                           value = { this.state.message }
                           disabled = { !this.state.editMode }
                           onKeyDown = { this._handleKeyDown }
                           onChange = { this._handleOnChange }
                           ref = { this.messageInput }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star inlineBlock
                          className = { Styles.toggleTaskFavoriteState }
                          checked = { favorite }
                          color1 = { colors.color1 }
                          color2 = { colors.color3 }
                          onClick = { this._toggleTaskFavorite }
                    />
                    <Edit inlineBlock className = { Styles.updateTaskMessageOnClick }
                          color1 = { colors.color1 }
                          color2 = { colors.color3 }
                          onClick = { this._toggleEditMode }
                    />
                    <Remove inlineBlock
                            color1 = { colors.color1 }
                            color2 = { colors.color3 }
                            onClick = { this._deleteTask }
                    />
                </div>
            </li>
        );
    }
}
