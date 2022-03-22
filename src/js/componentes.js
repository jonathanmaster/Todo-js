//metodo para crear en el html el todo

import { Todo } from "../classes";
import { todoList } from "../index";

//referencias en html
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const ulFiltros   = document.querySelector('.filters');
const anchorFiltro = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed': ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked': ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`

    //crear un elemento que lo contenga
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild); //solo el primer hijo tenga un div

    return div.firstElementChild;

};

//eventos
txtInput.addEventListener('keyup', ( event ) => {

    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {

        console.log(txtInput.value);
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }


});


divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; //para identificar que parte le di click
    const todoElemento = event.target.parentElement.parentElement; //hacer referencia al li
    const todoId = todoElemento.getAttribute('data-id'); //tener el id 

    if (nombreElemento.includes('input')) { //click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); //toggle agregar y quitar una clase
    }else if(nombreElemento.includes('button')){ //hay que barre el todo

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento); //eliminar del html

    }

})

btnBorrar.addEventListener('click', () =>{

    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i>=0; i--){

        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) { 
            divTodoList.removeChild(elemento);
        }

    }

})

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if (!filtro) {return};

    anchorFiltro.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden')
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden')
                }
                break;
            ;
        }

    }

})




