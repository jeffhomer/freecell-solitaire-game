var eventManager;

class EventManager{
    constructor(){
        this.prevMousePos = [0,0];
        this.selectedCard = null;

        // Attach callbacks
        document.onkeyup = this.handleKeyPress;
        var game = Game.getInstance();
        game.canvas.onmousedown = this.handleMouseDown;
        game.canvas.onmousemove = this.handleMouseMove;
        game.canvas.onmouseup = this.handleMouseUp;
        game.canvas.ondblclick = this.handleMouseClick;
        window.addEventListener("resize",this.handleWindowResize);

        // Initial window resize
        this.handleWindowResize();
    }
    
    static getInstance(){
        if(eventManager==null){
            eventManager = new EventManager();
        }
        return eventManager;
    }

    handleKeyPress(event){
        if(StateManager.getInstance().currentState == "Welcome"){
            if(event.which == 13){
                StateManager.getInstance().setCurrentState(1);
            }
        }
    }

    handleMouseDown(event){
        if(StateManager.getInstance().currentState == "Play"){
            var clickPos = EventManager.getMousePosition(event);
            var game = Game.getInstance();
            for (var index in game.gameObjects){
                var card = game.gameObjects[index];
                if(!(card instanceof Card)){continue;}
                if(card.isMoveable && 
                    clickPos[0] < card.pos[0] + Card.width &&
                    clickPos[0] > card.pos[0] &&
                    clickPos[1] < card.pos[1] + Card.height && 
                    clickPos[1] > card.pos[1]){
                        // Move card to last element in game objects array for rendering
                        game.gameObjects.push(game.gameObjects.splice(game.gameObjects.indexOf(card), 1)[0]);
                        this.selectedCard = card;
                        this.prevMousePos = clickPos;
                        return;
                }
            }
        }
    }

    handleMouseMove(event){
        if(this.selectedCard){
            var clickPos = EventManager.getMousePosition(event);
            this.selectedCard.pos[0] += clickPos[0] - this.prevMousePos[0];
            this.selectedCard.pos[1] += clickPos[1] - this.prevMousePos[1];
            Game.getInstance().update();
            this.prevMousePos = clickPos;
        }
    }

    handleMouseUp(event){
        if(this.selectedCard){
            // Check collision with piles
            var game = Game.getInstance();
            for(var i=0;i<game.freePiles.length;i++){
                if (this.selectedCard.collidesWith(game.freePiles[i])){
                    game.freePiles[i].addCard(this.selectedCard);
                }
            }
            for(var i=0;i<game.foundationPiles.length;i++){
                if (this.selectedCard.collidesWith(game.foundationPiles[i])){
                    game.foundationPiles[i].addCard(this.selectedCard);
                }
            }
            for(var i=0;i<game.tableauPiles.length;i++){
                if (this.selectedCard.collidesWith(game.tableauPiles[i])){
                    game.tableauPiles[i].addCard(this.selectedCard);
                }
            }

            // Reset position and make selection null
            this.selectedCard.resetPosition();
            this.selectedCard = null;
        }
        Game.getInstance().update();
    }
    
    handleMouseClick(event){
        if(StateManager.getInstance().currentState == "Play"){
            var clickPos = EventManager.getMousePosition(event);
            var game = Game.getInstance();
            for (var index in game.gameObjects){
                var card = game.gameObjects[index];
                if(!(card instanceof Card)){continue;}
                if(card.isMoveable && 
                    clickPos[0] < card.pos[0] + Card.width &&
                    clickPos[0] > card.pos[0] &&
                    clickPos[1] < card.pos[1] + Card.height && 
                    clickPos[1] > card.pos[1]){
                        // Move card to last element in game objects array for rendering
                        game.gameObjects.push(game.gameObjects.splice(game.gameObjects.indexOf(card), 1)[0]);
                       
                        // Add card to corresponding foundatin pile
                        var cardPile = card.pile;
                        game.foundationPiles[card.suit].addCard(card);
                        if(cardPile != card.pile){
                            game.update();
                            return;
                        }

                        // Add card to first available free pile
                        for(var i=0;i<game.freePiles.length;i++){
                            game.freePiles[i].addCard(card);
                            if(cardPile != card.pile){
                                game.update();
                                return;
                            }
                        }
                }
            }
        }
    }

    handleWindowResize(event){
        var game = Game.getInstance();
        game.width = Math.min(document.body.clientWidth,800);
        game.height = game.width * 600 / 800;
        game.update();
    }

    static getMousePosition(event){
        var game = Game.getInstance();
        var rect = game.canvas.getBoundingClientRect();
        return [(event.clientX-rect.left)/game.width,
            (event.clientY-rect.top)/game.height];
    }
}