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
                <p className="summary">{event.summary}</p>
                <button 
                    className="details-btn"
                    onClick={this.handletoggle}
                >
                {toggle ? 'Hide' : 'Show'}  
                </button>
                {toggle && (
                    <p className="description"
                    >
                        {toggle ? event.description : null}
                    </p>
                )}
            </div>
        );
    }
}
export default Event;