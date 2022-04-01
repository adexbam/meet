import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    let NumberOfEventsWrapper;
    beforeAll(()=> {
        AppWrapper = mount(<App />);
        AppWrapper.setState({
            showWelcomeScreen: false,
        });
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    })

    test('When user hasn’t specified a number, 32 is the default number.', ({ given, and, when, then }) => {
        given('user is on main page', () => {
            AppWrapper.update();
        });

        and('wants to change number of events', () => {
            
        });

        when('the user hasn’t input number of event', () => {
            expect(AppWrapper.find('.numberOfEvents')).toHaveLength(1);
        });

        then('the number of event should be thirty-two by default.', () => {
            expect(NumberOfEventsWrapper.find('.event-number-input')).toHaveLength(1);
        });
    });
    test('User can change the number of events they want to see.', ({ given, when, then }) => {
        given('the user wants to change number of events', () => {
            expect(NumberOfEventsWrapper.find('.event-number-input')).toHaveLength(1);
        });

        when('the user inputs the number of events', () => {
            const numberObject = { target: { value: 40 }};
            NumberOfEventsWrapper.find('.event-number-input').simulate('change', numberObject);
        });

        then('the number of events should be user input', () => {
            NumberOfEventsWrapper.setState({
                numberOfEvents: 40
            });
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(40);
        });
    });
});