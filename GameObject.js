// Parent class for game objects. Children must implement update();
class GameObject{
    constructor(){}

    update(){}
}

// Card class
class Card extends GameObject{
    constructor(index,pile){
        super();
        
        // Get context
        this.ctx = Game.getInstance().canvas.getContext("2d");

        // Get card index [0-51], number [0-12], suit [0-3]
        this.index = index;
        this.number = index % 13;
        this.suit = Math.floor(this.index/13);

        // Set normalized width, height and position
        this.pos = [0,0];

        // Get information about suits and color
        this.getCardText();
        this.getCardColor();

        // Is card at the bottom of a stack
        this.isMoveable = true;
        this.pile = pile;
        pile.cards.push(this);
        //pile.addCard(this);
    }

    // Use static get so that other objects can get card width and height
    static get width(){
        return 1.0/10;
    }

    static get height(){
        return 2.0/10;
    }

    // Get text associated with card (Ace-King) of ([Suits])
    getCardText(){
        var suits = Card.getSuits();
        switch(this.number){
            case 12:
                var card = "K";
                break;
            case 11:
                var card = "Q";
                break;
            case 10:
                var card = "J";
                break;
            case 0:
                var card = "A";
                break;
            default:
                var card = (this.number+1).toString();
                break;
        }
        this.text = card + " of " + suits[this.suit];
    }

    // Get card color assuming suit order is alternating (black,red,black,red)
    getCardColor(){
        var colors = Card.getColors();
        this.color = colors[this.suit % 2];
    }

    // Static method for get suits and colors so that other objects can get them
    static getSuits(){
        return ["Clubs","Diamonds","Spades","Hearts"];
    }

    static getColors(){
        return ["black","red"];
    }

    // Draw card to screen
    update(){
        // Scale coordinates
        var game = Game.getInstance();
        var pos_scaled = [this.pos[0]*game.width,this.pos[1]*game.height];
        var width_scaled = Card.width*game.width;
        var height_scaled = Card.height*game.height;

        // Area
        this.ctx.fillStyle='white'
        this.ctx.fillRect(pos_scaled[0],pos_scaled[1],width_scaled,height_scaled);

        // Border
        this.ctx.strokeStyle=this.color;
        this.ctx.strokeRect(pos_scaled[0],pos_scaled[1],width_scaled,height_scaled);

        // Card type
        this.ctx.font = Math.floor(game.height/50).toString() + "px Arial";
        this.ctx.fillStyle=this.color;
        this.ctx.textAlign="center";
        this.ctx.fillText(this.text,pos_scaled[0]+width_scaled/2,pos_scaled[1]+10);
    }
    
    // Move back to last valid position
    resetPosition(){
        this.pile.resetPosition(this);
    }

    // Check for collision with pile
    collidesWith(pile){
        if(this.pile==pile){return false;}
        var pilePos = pile.collisionArea;
        if (pilePos[0] < this.pos[0] + Card.width &&
            pilePos[0] + pilePos[2] > this.pos[0] &&
            pilePos[1] < this.pos[1] + Card.height &&
            pilePos[1] + pilePos[3] > this.pos[1]){
                return true;
            }
        return false;
    }
}

// Class for background image and pile markers
class GameSurface extends GameObject{
    constructor(){
        super();

        // Get context
        this.ctx = Game.getInstance().canvas.getContext("2d");
    }

    // Draw background and pile markers
    update(){
        // Game instance
        var game = Game.getInstance();

        // Area
        this.ctx.fillStyle='green'
        this.ctx.fillRect(0,0,game.width,game.height);

        // Free markers
        for(var i=0;i<game.freePiles.length;i++){
            this.drawMarker(game.freePiles[i],"FREE",'white');
        }
        
        // Foundation markers
        for(var i=0;i<game.foundationPiles.length;i++){
            this.drawMarker(game.foundationPiles[i],Card.getSuits()[i],Card.getColors()[i % 2]);
        }

        // Tableau markers
        for(var i=0;i<game.tableauPiles.length;i++){
            this.drawMarker(game.tableauPiles[i],"Tableau " + (i+1).toString(),'white');
        }
    }

    // Draw a marker for a pile, text, and color
    drawMarker(pile,text,color){
        this.ctx.strokeStyle = color;
        this.ctx.setLineDash([5,5]);
        this.ctx.strokeRect(pile.pos[0]*game.width,pile.pos[1]*game.height,Card.width*game.width,Card.height*game.height);
        this.ctx.setLineDash([]);

        this.ctx.font = Math.floor(game.height/50).toString() + "px Arial";
        this.ctx.textAlign="center";
        this.ctx.fillStyle='white';
        this.ctx.fillText(text.toUpperCase(),(pile.pos[0]+Card.width/2)*game.width,(pile.pos[1]+Card.height/2)*game.height);
    }
}

// Class for welcome/win text
class Text extends GameObject{
    constructor(text){
        super();
        var game = Game.getInstance();
        this.ctx = game.canvas.getContext("2d");
        this.text = text;

        // Place text near bottom of screen, horizontally centered
        this.pos = [0.5,0.75];
    }

    // Draw text to canvas
    update(){
        // Scale coordinates
        var game = Game.getInstance();

        // Write text
        var pos_scaled = [this.pos[0]*game.width,this.pos[1]*game.height];
        this.ctx.font = Math.floor(game.height/20).toString() + "px Arial";
        this.ctx.textAlign="center";
        this.ctx.fillText(this.text,pos_scaled[0],pos_scaled[1]);
    }
}