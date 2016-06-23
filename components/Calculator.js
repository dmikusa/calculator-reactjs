import React, { Component } from 'react'
import Button from './Button'

class Calculator extends Component {
    
    handleNumber(e) {
        console.log("number: " + e.target.textContent);
    }

    handleSign(e) {
        console.log("sign: " + e.target.textContent);
    }

    render() {
        return (
            <div id="calc-pane">
                <input type="text" defaultValue="0" />
                <div>
                    <Button onClick={this.handleSign} text="AC"/> 
                    <Button onClick={this.handleSign} text="+/-"/> 
                    <Button onClick={this.handleSign} text="%"/> 
                    <Button onClick={this.handleSign} text="&divide;"/> 
                </div>
                <div>
                    <Button onClick={this.handleNumber} text="7"/> 
                    <Button onClick={this.handleNumber} text="8"/> 
                    <Button onClick={this.handleNumber} text="9"/> 
                    <Button onClick={this.handleSign} text="&times;"/> 
                </div>
                <div>
                    <Button onClick={this.handleNumber} text="4"/> 
                    <Button onClick={this.handleNumber} text="5"/> 
                    <Button onClick={this.handleNumber} text="6"/> 
                    <Button onClick={this.handleSign} text="-"/> 
                </div>
                <div>
                    <Button onClick={this.handleNumber} text="1"/> 
                    <Button onClick={this.handleNumber} text="2"/> 
                    <Button onClick={this.handleNumber} text="3"/> 
                    <Button onClick={this.handleSign} text="+"/> 
                </div>
                <div>
                    <Button wide="true" onClick={this.handleNumber} text="0"/>
                    <Button onClick={this.handleNumber} text="."/> 
                    <Button onClick={this.handleNumber} text="="/> 
                </div>
            </div>
        );
    }
}

export default Calculator
