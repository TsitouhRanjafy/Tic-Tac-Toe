export class TurnMoveDico {
    map = new Map();

    addTurn(matchId,turnToMove){
        this.map.set(matchId,turnToMove);
    }

    getValue(key){
        return this.map.get(key)
    }

    hasKey(key) {
        return (this.map.has(key))? true : false;
    }

    clear() {
        this.map.clear();    
    }

    getThis(){
        return this.map;
    }
}