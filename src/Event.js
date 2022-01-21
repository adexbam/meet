import React, { Component } from "react";


class Event extends Component { 
    state = {
        toggle: false,
    }

    handletoggle = () => {
        this.setState({
            toggle: !this.state.toggle,
        })
    }

    render() {
        const {event} = this.props;
        const { toggle } = this.state;
        return (
            <div className="event">
                <p className="summary summary_title">{event.summary}</p>
                <p className="summary">{'@' + event.location}</p>
                <p className="summary">{'Date and time: ' + event.originalStartTime.dateTime + ', Time-zone: ' + event.originalStartTime.timeZone}</p>
                <button 
                    className="details-btn"
                    onClick={this.handletoggle}
                >
                {toggle ? 'Hide' : 'Show'}  
                </button>
                {toggle && (
                    <div>
                        <p className="description">{toggle ? event.description : null}</p>
                        <p className="summary">{'End@' + event.end.dateTime}</p>
                    </div>

                )}
            </div>
        );
    }
}
export default Event;