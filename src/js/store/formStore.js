import { EventEmitter } from "events";

class FormStore extends EventEmitter {
    constructor(){
        super();
        this.todos = [
            {
                id: 123456789,
                text: "First todo",
                complete: false
            },
            {
                id: 24689,
                text: "Second todo",
                complete: false
            }
        ];
    }
    getAll() {
        return this.todos;
    }

}


const formStore = new FormStore;

export default formStore;