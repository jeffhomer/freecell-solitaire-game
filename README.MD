# Freecell Solitaire
Freecell solitaire appllication coded in HTML and Javascript

## Features
- Double-click cards to automatically move them to either their foundation space or an empty free cell, if available.
- Drag a card to any available space. If the position is not allowed, the card will return to its original space.
- The play area and all objects will scale with the window size if the width is smaller than it's maximum size.
- Data is loaded via the JSON file ```resources/data.json```. This is loaded simply like a javascript file, as to not rely on hosting the JSON file and requesting its contents via a RESTful interface.
