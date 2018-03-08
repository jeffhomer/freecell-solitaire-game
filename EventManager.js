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
        window.addEventListener("resize",this.handleWindowResize);
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
                if(card.isMoveable && 
                    clickPos[0] < card.pos[0] + card.width &&
                    clickPos[0] > card.pos[0] &&
                    clickPos[1] < card.pos[1] + card.height && 
                    clickPos[1] > card.pos[1]){
                        this.selectedCard = card;
                        this.prevMousePos = clickPos;
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
            this.selectedCard = null;
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