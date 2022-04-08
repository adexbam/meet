import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';

describe('<Eventlist /> component', () => {
    test('should render correct number of events', () => {
        const EventListWrapper = shallow(<EventList events={[{}, {}, {}, {}]}/>);
        expect(EventListWrapper.find(Event)).toHaveLength(4);
    })
})