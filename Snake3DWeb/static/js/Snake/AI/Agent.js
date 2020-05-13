class SnakeAgent{
    constructor() {
        this.actions = ['a', 'w', 'd', 's', 'q', 'e'];
    }

    read_state(){
        let pos_x = snake.body[0].position.x,
            pos_y = snake.body[0].position.y,
            pos_z = snake.body[0].position.z;
        let state = [apple.object.position.x - pos_x]
    }
}

let agent = new SnakeAgent();


