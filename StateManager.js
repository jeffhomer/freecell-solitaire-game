var stateManager;

// State manager class (singleton)
class StateManager{
    constructor(){
        this.states = ["Welcome","Play","Win"];

        // Parse data in json file
        this.data = JSON.parse(data);

        // Set state to 0
        this.setCurrentState(0);
    }

    // Static method to return unique instance of class
    static getInstance(){
        if(stateManager==null){
            stateManager = new StateManager();
        }
        return stateManager;
    }

    // Set state and load appropriately
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

    // Load state 0: welcome message
    loadState0(){
        var game = Game.getInstance();
        game.gameObjects = [];
        game.gameObjects.push(new GameSurface());
        game.gameObjects.push(new Text(this.data[0].welcomemessage));
        game.initPiles();
        game.update();
    }

    // Load state 1: playing
    loadState1(){
        var game = Game.getInstance();
        game.gameObjects = [];
        game.gameObjects.push(new GameSurface());
        game.initPiles();
        game.shuffleAndDeal();
        game.update();
    }
    
    // Load state 2: win message
    loadState2(){
        var game = Game.getInstance();
        game.gameObjects = [];
        game.gameObjects.push(new GameSurface());
        game.gameObjects.push(new Text(this.data[0].winmessage));
        game.initPiles();
        game.update();
    }
}