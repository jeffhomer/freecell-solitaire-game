class Pile{
    constructor(index){
        this.cards = [];
        this.index = index;
        this.pos;
    }

    get collisionArea(){
        return [this.pos[0],this.pos[1],Card.width,Card.height];
    }
    
    addCard(){
        // Make next card in stack moveable
        if(this.cards.length>1){
            this.cards[this.cards.length-2].isMoveable = false;
        }
    }
    
    removeCard(){
        // Make next card in stack moveable
        if(this.cards.length>1){
            this.cards[this.cards.length-2].isMoveable = true;
        }
        return this.cards.pop();
    }

    resetPosition(card){
        card.pos[0] = this.pos[0];
        card.pos[1] = this.pos[1];
    }
}

class FreePile extends Pile{
    constructor(index){
        super(index);
        var dx = (1-8*Card.width)/(8+1);
        var dy = 0.05;
        this.pos = [dx+(dx+Card.width)*this.index,dy];
    }

    addCard(card){
        if(this.cards.length==0){
            card.pile.removeCard();
            card.pile = this;
            this.cards.push(card);
        }
        card.resetPosition();
    }
}

class FoundationPile extends Pile{
    constructor(index){
        super(index);
        var dx = (1-8*Card.width)/(8+1);
        var dy = 0.05;
        this.pos = [dx+(dx+Card.width)*(this.index+4),dy];
    }
    
        addCard(card){
            if(card.suit==this.index && card.number == this.cards.length){
                card.pile.removeCard();
                card.pile = this;
                super.addCard();
                this.cards.push(card);
            }
            card.resetPosition();
        }
}

class TableauPile extends Pile{
    constructor(index){
        super(index);
        var dx = (1-8*Card.width)/(8+1);
        var dy = 0.25;
        this.pos = [dx+(dx+Card.width)*this.index,dy];
    }
    
        get collisionArea(){
            if(this.cards.length==0){
                return super.collisionArea;
            } else{
                var pos = this.cards[this.cards.length-1].pos;
                return [pos[0],pos[1],Card.width,Card.height];
            }
        }
    
        addCard(card){
            if((this.cards.length==0) ||
                (card.number+1 == this.cards[this.cards.length-1].number &&
                card.suit % 2 != this.cards[this.cards.length-1].suit % 2)){
                card.pile.removeCard();
                card.pile = this;
                super.addCard();
                this.cards.push(card);
                this.cards[this.cards.length-2].isMoveable = false;
            }
            card.resetPosition();
        }
        
        resetPosition(card){
            card.pos[0] = this.pos[0];
            card.pos[1] = this.pos[1] + this.cards.length*0.05;
        }
}