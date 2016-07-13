import React, { Component } from 'react'
import Button from './Button'

class Calculator extends Component {
    render() {
        return (
            <div id="calc-pane">
                <input type="text" value={this.props.value} readOnly={true} />
                <div>
                    <Button onClick={this.props.handleSign} text="AC"/>
                    <Button onClick={this.props.handleSign} text="+/-"/>
                    <Button onClick={this.props.handleSign} text="%"/>
                    <Button onClick={this.props.handleSign} text="&divide;"/>
                </div>
                <div>
                    <Button onClick={this.props.handleNumber} text="7"/>
                    <Button onClick={this.props.handleNumber} text="8"/>
                    <Button onClick={this.props.handleNumber} text="9"/>
                    <Button onClick={this.props.handleSign} text="&times;"/>
                </div>
                <div>
                    <Button onClick={this.props.handleNumber} text="4"/>
                    <Button onClick={this.props.handleNumber} text="5"/>
                    <Button onClick={this.props.handleNumber} text="6"/>
                    <Button onClick={this.props.handleSign} text="-"/>
                </div>
                <div>
                    <Button onClick={this.props.handleNumber} text="1"/>
                    <Button onClick={this.props.handleNumber} text="2"/>
                    <Button onClick={this.props.handleNumber} text="3"/>
                    <Button onClick={this.props.handleSign} text="+"/>
                </div>
                <div>
                    <Button wide="true" onClick={this.props.handleNumber} text="0"/>
                    <Button onClick={this.props.handleNumber} text="."/>
                    <Button onClick={this.props.handleSign} text="="/>
                </div>
            </div>
        );
    }
}

export default Calculator
