import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

const event = extractLocations(mockData);

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    let AppWrapper;
    let EventWrapper;
    beforeAll(()=> {
        AppWrapper = mount(<App />)
        EventWrapper = shallow(<Event event={event}/>);
    })
    test('When an event element is collapsed by default', ({ given, when, then }) => {
        given('user is on main page', () => {
            
        });
        when('the user hasn’t clicked on an event', async() => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });

        then('the event details is collapsed by default.', () => {
            expect(EventWrapper.find('.details-btn')).toHaveLength(1);
        });
    });
    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('the user is interested in an event', () => {
            expect(EventWrapper.find('.details-btn')).toHaveLength(1);
        });

        when('the user clicks on an event', () => {
            EventWrapper.find('.details-btn').at(0).simulate('click');
            expect(EventWrapper.state('toggle')).toBe(true);
        });

        then('the event details should expand', () => {
            expect(EventWrapper.find('.description')).toHaveLength(1);
        });
    });
    test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
        given('user alredy clicked to expand an event', () => {
            expect(EventWrapper.find('.description')).toHaveLength(1);
        });

        and('the event details is expanded to the user', () => {
            expect(EventWrapper.find('.description')).toHaveLength(1);
        });

        when('the user selects a hide details', () => {
            EventWrapper.find('.details-btn').simulate('click');
        });

        then('event should be collapsed', () => {
            expect(EventWrapper.state('toggle')).toBe(false);
        });

        and('the user should have a collapsed event', () => {
            expect(EventWrapper.find('.hide-details')).toHaveLength(0);
        });
    });
});