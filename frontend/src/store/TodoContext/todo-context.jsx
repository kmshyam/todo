import { createContext } from "react";

const TodoContext = createContext({
  todos: [],
  pendingTodos: [],
  completedTodos: [],
  status: {},
  addTodoHandler: () => {},
  editTodoHandler: () => {},
  deleteTodoHandler: () => {},
  completeTodoHandler: () => {},
  revertTodoHandler: () => {},
});

export default TodoContext;
