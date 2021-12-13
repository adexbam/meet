import React, { Component } from "react";


class Event extends Component { 
    state = {
        toggle: false,
        textButton: 'Show Details',
    }

    handletoggle = () => {
        this.setState({
            toggle: !this.state.toggle,
            textButton: 'Hide Details',
        })
    }

    render() {
        const {event} = this.props;
        const { toggle, textButton } = this.state;
        return (
            <div className="events">
                <p className="summary">{event.summary}</p>
                <button 
                    className="details-btn"
                    onClick={this.handletoggle}
                >
                {textButton}
                </button>
                {toggle && (
                    <p className={toggle ? "show-details" : "hide-details"}
                    >
                        {toggle ? event.description : null}
                    </p>
                )}
            </div>
        );
    }
}
export default Event;