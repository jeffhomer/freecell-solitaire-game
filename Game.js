var game;

class Game {

    constructor(){
        // Canvas properties
        this._width;
        this._height;
        this.canvas = document.getElementById("gameCanvas");
        this.width = 800;
        this.height = 600;

        // Array of game objects
        this.gameObjects = [];

        // Piles
        this.freePiles = [];
        this.foundationPiles = [];
        this.tableauPiles = [];

        // Set state to welcome
        //StateManager.getInstance();
    }

    get width(){
        return this._width;
    }

    set width(w){
        this._width = w;
        this.canvas.width = w;
    }

    get height(){
        return this._height;
    }

    set height(h){
        this._height = h;
        this.canvas.height = h;
    }

    static getInstance(){
        if(game==null){
            game = new Game();
        }
        return game;
    }

    initPiles(){
        // Four free piles
        for(var i=0;i<4;i++){
            this.freePiles.push(new FreePile(i));
        }
        
        // Four foundation piles
        for(var i=0;i<4;i++){
            this.foundationPiles.push(new FoundationPile(i));
        }
        
        // Eight tableau piles
        for(var i=0;i<8;i++){
            this.tableauPiles.push(new TableauPile(i));
        }

        // Shuffle deck
        var indices = new Array(52);
        for(var i=0;i<52;i++){
            indices[i] = i;
        }
        for(var i=indices.length-1;i>0;i--){
            var j = Math.floor(Math.random()*(i+1));
            [indices[i],indices[j]] = [indices[j],indices[i]];
        }
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

    update(){
        this.canvas.getContext("2d").clearRect(0,0,this.width,this.height);
        for (var index in this.gameObjects){
            this.gameObjects[index].update();
        }
    }
}