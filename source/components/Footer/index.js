import React, { Component } from "react";
import Checkbox from "../../theme/assets/Checkbox";

import Styles from "../../components/Scheduler/styles.m.css";

const colors = {
    color1: "#3b8ef3",
    color2: "#fff",
    color3: "#000",
};

class Footer extends Component {
    render () {
        return (
            <footer>
                <Checkbox
                    className = { Styles.toggleTaskCompletedState }
                    color2 = { colors.color2 }
                    color1 = { colors.color3 }
                    checked = { this.props.allTaskCompleted }
                    onClick = { this.props._completeAllTasks }
                />
                <span className = { Styles.completeAllTasks }>
                    Все задачи выполнены
                </span>
            </footer>
        );
    }
}

export default Footer;
