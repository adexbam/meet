import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

export default class NumberOfEvents extends Component {
    
    render() {
        const {errorText, numberOfEvents} = this.props;
        return (
            <div className='numberOfEvents'>
                <div className='error-alert'>
                <ErrorAlert text={errorText}/>
                </div>
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
