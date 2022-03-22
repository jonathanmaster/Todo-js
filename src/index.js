import './styles.css';
import {Todo, TodoList} from './classes'
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

todoList.todo.forEach(crearTodoHtml); //para que se vea los todos creados

