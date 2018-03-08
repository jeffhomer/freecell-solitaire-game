var stateManager;

class StateManager{
    constructor(){
        this.states = ["Welcome","Play","Win"];
        this.data = JSON.parse(data);
        this.setCurrentState(0);
    }

    static getInstance(){
        if(stateManager==null){
            stateManager = new StateManager();
        }
        return stateManager;
    }

    setCurrentState(stateIndex){
        this.currentState = this.states[stateIndex];
        switch(this.currentState){
            case "Welcome":
                this.loadState0();
                break;
            case "Play":
                this.loadState1();
                break;
            case "Win":
                this.loadState2();
                break;
        }
    }

    loadState0(){
        var game = Game.getInstance();
        game.gameObjects = [];
        game.gameObjects.push(new GameSurface());
        game.gameObjects.push(new Text(this.data[0].welcomemessage));
        game.initPiles();
        game.update();
    }

    loadState1(){
        var game = Game.getInstance();
        game.gameObjects = [];
        game.gameObjects.push(new GameSurface());
        game.initPiles();
        game.shuffleAndDeal();
        game.update();
    }
    
    loadState2(){
        var game = Game.getInstance();
        game.gameObjects = [];
        game.gameObjects.push(new GameSurface());
        game.gameObjects.push(new Text(this.data[0].winmessage));
        game.initPiles();
        game.update();
    }
}