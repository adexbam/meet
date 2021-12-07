import React, { Component } from 'react';

export default class CitySearch extends Component {
    constructor() {
        super();

        this.state = {
            query : '',
        }
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ query: value });
    }
    render() {
        return (
            <div className="CitySearch">
                <input 
                    type="text" 
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                />
                <ul className="suggestions"></ul>
            </div>
        )
    }
}
