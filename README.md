# guide4you-module-function-caller-button
A generic button that calls an (argumentless) function

The generic button is implemented in `FunctionCallerButton.js`as an abstract class.
In order to use it you derive buttons. The example has a confirm button and a discard
button that are activated/deactivated every 5 seconds.

Clicking an active button only opens an alert showing either *CONFIRM* or *DISCARD*.

Creating other buttons and putting the example ones to actual use should be
quite straightforward. 
