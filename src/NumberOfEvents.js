import React, { Component } from 'react';

export default class NumberOfEvents extends Component {
    
    render() {
        const {numberOfEvents} = this.props;
        return (
            <div className='numberOfEvents'>
                <label>Number of Events: </label>
                <input
                    type='text'
                    className='event-number-input'
                    value={numberOfEvents}
                    onChange={this.props.updateInputChange}
                />
            </div>
        )
    }
}
