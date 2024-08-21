export interface ITodo {
  id: string,
  text: string,
  isDone: boolean,
  createdOn: string,
  selected: boolean
}

export interface ITodoRequest {
  text: string,
  isDone: boolean
}
