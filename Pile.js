class Pile{
    constructor(index){
        this.cards = [];
        this.index = index;
        this.pos;
    }

    resetPosition(card){
        card.pos = this.pos;
    }
}

class FreePile extends Pile{
    constructor(index){
        super(index);
        var dx = 0.2/9;
        var dy = 0.05;
        this.pos = [(dx+0.1)*this.index,dy];
    }

    addCard(card){
        if(this.cards.lenth==0){
            card.pile = this;
            this.cards.push(card.pile.pop());
        }
    }
}

class FoundationPile extends Pile{
    constructor(index){
        super(index);
        var dx = 0.2/9;
        var dy = 0.05;
        this.pos = [(dx+0.1)*(this.index+4),dy];
    }
    
        addCard(card){
            if(card.suit==index && card.number == this.cards.lenth){
                card.pile = this;
                this.cards.push(card.pile.pop());
            }
        }
}

class TableauPile extends Pile{
    constructor(index){
        super(index);
        var dx = 0.2/9;
        var dy = 0.2;
        this.pos = [(dx+0.1)*this.index,dy];
    }
    
        addCard(card){
            if((this.cards.lenth==0) ||
                (this.cards.length > 0 && card.number+1 == this.cards[this.cards.length-1].number)){
                card.pile = this;
                this.cards.push(card.pile.pop());
            }
        }
        
        resetPosition(card){
            card.pos[0] = this.pos[0];
            card.pos[1] = this.pos[1] + this.cards.length*0.05;
        }
}