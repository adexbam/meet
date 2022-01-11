import { mockData } from './mock-data';

export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
};

export const extractEvents = (events) => {
    var extractEvents = events.map((event) => event);
    return extractEvents
}

export const getEvents = async () => {
    return mockData;
}