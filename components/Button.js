import React, { Component } from 'react'

class Button extends Component {
    render() {
        const className = (this.props.wide) ? "wide" : "";
        return (
            <button className={className}
                    onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

export default Button
