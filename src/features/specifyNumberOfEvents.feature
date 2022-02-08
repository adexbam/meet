Feature: Specify the number of events

Scenario: When user hasn’t specified a number, 32 is the default number.
Given user is on main page 
And wants to change number of events
When the user hasn’t input number of event
Then the number of event should be thirty-two by default.

Scenario: User can change the number of events they want to see.
Given the user wants to change number of events
When the user inputs the number of events
Then the number of events should be user input
