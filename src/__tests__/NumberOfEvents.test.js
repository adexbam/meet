import React from "react";
import {shallow }from 'enzyme';
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents.js/> component', ()=>{
    let NumberOfEventsWrapper;
    test('should check for div', () => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        expect(NumberOfEventsWrapper.find('.event-number')).toHaveLength(1);
    });
    test('should render text input', () => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
        expect(NumberOfEventsWrapper.find('.event-number-input')).toHaveLength(1);
    })
    test('should have default value of 32', () => {
        const defaultNumber = NumberOfEventsWrapper.state('defNumber');
        expect(NumberOfEventsWrapper.find('.event-number-input').prop('value')).toBe(defaultNumber);
    })
    test('should change default number when input changes', () => {
        NumberOfEventsWrapper.setState({
            defNumber: 38
        })
        const numberObject = { target: { value: 40 }};
        NumberOfEventsWrapper.find('.event-number-input').simulate('change', numberObject);
        expect(NumberOfEventsWrapper.state('defNumber')).toBe(40);
        
    })
    
})