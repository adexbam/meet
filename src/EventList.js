import React, { Component } from 'react';
import Event from './Event';
import { WarningAlert }from "./Alert";

export default class EventList extends Component {
    render() {
        const {events, warningText} = this.props;
        return (
            <ul className="EventList">
                {!navigator.onLine ? (<WarningAlert text={warningText} />) : ('')}
                {events.map(event => 
                    <li key={event.id}>
                        <Event event={event} />
                    </li>
                )}
            </ul>
        )
    }
}
