import React from 'react';
import TodoItem from './TaskItem';

export default (props) =>{
  return props.todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} toggleCompletion={props.toggleCompletion} delTodo={props.delTodo} />
  ));
}
