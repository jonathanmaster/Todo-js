//esta clase me arroga toda la lista de todos

import { Todo } from "./todo.class";

export class TodoList{

    constructor(){
        this.cargarLocalStorage()
    }

    nuevoTodo(todo){
        this.todo.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id){
        this.todo = this.todo.filter(todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id){

        for(const todo of this.todo){

            console.log(id, todo.id);
            if (todo.id === id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();

                break
            }
        }
    }

    eliminarCompletados(){
        this.todo = this.todo.filter(todo => !todo.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todo)); //cambiarlo a formato JSON
    }

    cargarLocalStorage(){

        this.todo = localStorage.getItem('todo') ? this.todo = JSON.parse(localStorage.getItem('todo')) //necesitamos recuperarlo
                                                 : this.todo = [];

        this.todo = this.todo.map(obj => Todo.fromJson(obj));
    }


}
