import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';
import { extractEvents } from '../api';

describe('<Event/> component', () => {
    let EventWrapper;
    beforeAll(()=> {
        let event = extractEvents(mockData);
        EventWrapper = shallow(<Event event={event}/>);
    })
    test('render events div', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });
    test("render summary of events", () => {
        expect(EventWrapper.find('.summary')).toHaveLength(1);
    });
    test("A collapsed button to show event details", () => {
        expect(EventWrapper.find('.details-btn')).toHaveLength(1);
    });
    test("User clicks button to see event details", () => {
        EventWrapper.find('.details-btn').at(0).simulate('click');
        expect(EventWrapper.state('toggle')).toBe(true);
    });
    test("Ensure event details is shown", () => {
        expect(EventWrapper.find('.description')).toHaveLength(1);
    });
    test("User clicks button to hide event details", () => {
        EventWrapper.find('.details-btn').simulate('click');
        expect(EventWrapper.find('.hide-details')).toHaveLength(0);
    });
})