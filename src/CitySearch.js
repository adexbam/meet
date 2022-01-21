import React, { Component } from 'react';

export default class CitySearch extends Component {
    constructor() {
        super();

        this.state = {
            query : '',
            suggestions: [],
            showSuggestions: undefined 
        }
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        this.setState({ 
            query: value,
            suggestions,
        });
    }

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false
        });

        this.props.updateEvents(suggestion);
    }

    render() {
        return (
            <div className="CitySearch">
                <input 
                    type="text" 
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={()=> {this.setState({showSuggestions: true})}}
                    placeholder='Search cities'
                />
                <ul className="suggestions" style={this.state.showSuggestions ? {} : {display: 'none'}}>
                    {this.state.suggestions.map((suggestion) => (
                        <li
                            key={suggestion}
                            onClick={()=> this.handleItemClicked(suggestion)}
                        >{suggestion}</li>
                    ))}
                    <li onClick={() => this.handleItemClicked('all')} key="all"><b>See all cities</b></li>
                </ul>
            </div>
        )
    }
}