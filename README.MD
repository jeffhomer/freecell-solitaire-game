# Freecell Solitaire
Freecell solitaire application coded in HTML and Javascript

## Features
- Fully functional with respect to the logic/rules of the classic game
- Cards are dealt randomly each time the game is loaded
- Double-click cards to automatically move them to either their foundation space or an empty free cell, if available.
- Drag a card to any available space. If the position is not allowed, the card will return to its original space.
- The play area and all objects will scale with the window size if the width is smaller than it's maximum size.
- Data is loaded via the JSON file ```resources/data.json```. This is loaded simply like a javascript file, as to not rely on hosting the JSON file and requesting its contents via a RESTful interface.
- Implemented singleton classes to guarantee only one instance of game, event manager, and state manager classes at any given time.
- No external APIs or libraries were used other than core javascript and html
- All functionality for state and event management was custom-coded

## Possible Improvements
- Aesthetics:
  - Welcome and win screens could include animations and nicer font
  - Cards could be rendered using actual playing card image assets
  - Dealing could be performed using an animation
- Functionality:
  - Valid moves could be highlighted before you let go of the mouse
  - Time or total number of moves could be displayed
  - Undo button
  - Choice of random seed
