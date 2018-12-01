import React, { Component } from "react";

class Header extends Component {
    _handleChange = (e) => {
        this.props._updateTasksFilter(e.target.value);
    };

    render () {
        return (
            <header>
                <h1>Планировщик задач</h1>

                <input
                    type = 'search'
                    placeholder = 'Поиск'
                    value = { this.props.searchValue }
                    onChange = { this._handleChange }
                />
            </header>
        );
    }
}

export default Header;
