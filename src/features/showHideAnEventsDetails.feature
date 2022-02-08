Feature: Show/Hide an event's details

Scenario: When an event element is collapsed by default
Given user is on main page
When the user hasn’t clicked on an event
Then the event details is collapsed by default.

Scenario: User can expand an event to see its details
Given the user is interested in an event
When the user clicks on an event
Then the event details should expand

Scenario: User can collapse an event to hide its details
Given user alredy clicked to expand an event
And the event details is expanded to the user
When the user selects a hide details
Then event should be collapsed
And the user should have a collapsed event