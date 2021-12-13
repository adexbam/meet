import React, { Component } from 'react'

export default class NumberOfEvents extends Component {
    state = {
        defNumber: 32,
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({
            defNumber: value,
        })
    }
    
    render() {
        const {defNumber} = this.state;
        return (
            <div className='event-number'>
                <input
                    type='text'
                    className='event-number-input'
                    value={defNumber}
                    onChange={this.handleInputChange}
                />
            </div>
        )
    }
}
