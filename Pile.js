// Parent pile class
class Pile{
    constructor(index){
        this.cards = [];
        this.index = index;
        this.pos;
    }

    // Get collision area for pile
    get collisionArea(){
        return [this.pos[0],this.pos[1],Card.width,Card.height];
    }
    
    // Add a card to the pile. This should be invoked before array is updated
    addCard(){
        // Make next card in stack moveable
        if(this.cards.length>0){
            this.cards[this.cards.length-1].isMoveable = false;
        }
    }
    
    // Remove a card from the pile. This should be invoked before array is updated
    removeCard(){
        // Make next card in stack moveable
        if(this.cards.length>1){
            this.cards[this.cards.length-2].isMoveable = true;
        }
        return this.cards.pop();
    }

    // Reset position of card to last valid position
    resetPosition(card){
        card.pos[0] = this.pos[0];
        card.pos[1] = this.pos[1];
    }
}

// Free slot
class FreePile extends Pile{
    constructor(index){
        super(index);

        // Set horizontal and vertical offsets of card using card dimensions and equal spacing
        var dx = (1-8*Card.width)/(8+1);
        var dy = 0.05;

        // Position of slot
        this.pos = [dx+(dx+Card.width)*this.index,dy];
    }

    // Add a card to the stack. This can only occur if there is no card in the stack.
    addCard(card){
        if(this.cards.length==0){
            card.pile.removeCard();
            card.pile = this;
            this.cards.push(card);
        }
        card.resetPosition();
    }
}

// Foundation pile
class FoundationPile extends Pile{
    constructor(index){
        super(index);
        
        // Set horizontal and vertical offsets of card using card dimensions and equal spacing
        var dx = (1-8*Card.width)/(8+1);
        var dy = 0.05;

        // Position of pile
        this.pos = [dx+(dx+Card.width)*(this.index+4),dy];
    }
    
    // Add a card to the pile. This can only occur if the suit is correct and the card number is the same as the stack length.
    addCard(card){
        if(card.suit==this.index && card.number == this.cards.length){
            card.pile.removeCard();
            card.pile = this;
            super.addCard();
            this.cards.push(card);
        }
        card.resetPosition();
        this.checkForWin();
    }

    // Check for a win condition and set the state accordingly.
    checkForWin(){
        var game = Game.getInstance();
        for(var index in game.foundationPiles){
            if(game.foundationPiles[index].cards.length!=13){return;}
        }
        StateManager.getInstance().setCurentState(2);
    }
}

// Tableau pile
class TableauPile extends Pile{
    constructor(index){
        super(index);
        
        // Set horizontal and vertical offsets of card using card dimensions and equal spacing
        var dx = (1-8*Card.width)/(8+1);
        var dy = 0.3;

        // Position of bottom card
        this.pos = [dx+(dx+Card.width)*this.index,dy];
    }
    
    // This child class has a unique collision area method because it refers to the top card in the stack, which is different from the stack position.
    get collisionArea(){
        if(this.cards.length==0){
            return super.collisionArea;
        } else{
            var pos = this.cards[this.cards.length-1].pos;
            return [pos[0],pos[1],Card.width,Card.height];
        }
    }

    // Add a card to the stack. This can only occur if the card number is one smaller than the last card in the stack, and if the suit is different.
    addCard(card){
        if((this.cards.length==0) ||
            (card.number+1 == this.cards[this.cards.length-1].number &&
            card.suit % 2 != this.cards[this.cards.length-1].suit % 2)){
            card.pile.removeCard();
            card.pile = this;
            super.addCard();
            this.cards.push(card);
        }
        card.resetPosition();
    }
    
    // This child class has a unique reset method because the top card position is different than the stack position.
    resetPosition(card){
        card.pos[0] = this.pos[0];
        card.pos[1] = this.pos[1] + (this.cards.length-1)*0.03;
    }
}