var game;

// Main game class which holds game objects and display canvas (singleton)
class Game {

    constructor(){
        // Canvas properties
        this._width;
        this._height;
        this.canvas = document.getElementById("gameCanvas");
        this.width = 800;
        this.height = 600;
        this.aspectratio = 0.75;

        // Array of game objects
        this.gameObjects = [];

        // Piles
        this.freePiles = [];
        this.foundationPiles = [];
        this.tableauPiles = [];
    }

    get width(){
        return this._width;
    }

    // Make sure changes to game width also change canvas width
    set width(w){
        this._width = w;
        this.canvas.width = w;
    }

    get height(){
        return this._height;
    }

    // Make sure changes to game height also change canvas height
    set height(h){
        this._height = h;
        this.canvas.height = h;
    }

    // Static method to return unique instance of class
    static getInstance(){
        if(game==null){
            game = new Game();
        }
        return game;
    }

    // Initialize free, foundation and tableau piles
    initPiles(){
        // Four free piles
        this.freePiles = [];
        for(var i=0;i<4;i++){
            this.freePiles.push(new FreePile(i));
        }
        
        // Four foundation piles
        this.foundationPiles = [];
        for(var i=0;i<4;i++){
            this.foundationPiles.push(new FoundationPile(i));
        }
        
        // Eight tableau piles
        this.tableauPiles = [];
        for(var i=0;i<8;i++){
            this.tableauPiles.push(new TableauPile(i));
        }
    }

    // Shuffle and deal cards randomly
    shuffleAndDeal(){       
        // Generate ordered array
        var indices = new Array(52);
        for(var i=0;i<52;i++){
            indices[i] = i;
        }
        // Shuffle ordered array
        for(var i=indices.length-1;i>0;i--){
            var j = Math.floor(Math.random()*(i+1));
            [indices[i],indices[j]] = [indices[j],indices[i]];
        }
        // Create card objects and put them in tableaus using shuffled indices
        for(var i=0;i<indices.length;i++){
            var pile = this.tableauPiles[i % 8];
            var card = new Card(indices[i],pile);
            if(pile.cards.length>1){
                pile.cards[pile.cards.length-2].isMoveable = false;
            }
            this.gameObjects.push(card);
            card.resetPosition();
        }
    }

    // Update the game
    update(){
        // Clear canvas
        this.canvas.getContext("2d").clearRect(0,0,this.width,this.height);

        // Draw cards and background
        for (var index in this.gameObjects){
            this.gameObjects[index].update();
        }
    }
}