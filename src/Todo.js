import React, { useState } from 'react'

function Todo() {
    const todoList = [
        {
            id: 0,
            text: 'Go through the book The Road to learn React',
            isCompleted: true,
        },
        {
            id: 1,
            text: 'Afterward go through this React Redux tutorial (and maybe through the book too)',
            isCompleted: false,
        },
        {
            id: 2,
            text: 'Learn the third complementary solution (e.g. Webpack) separately',
            isCompleted: false,
        },
        {
            id: 3,
            text: 'Apply your learnings for the complementary solution in this \
                    example application from this tutorial',
            isCompleted: false,
        }
    ]

    const [todos, setTodo] = useState(todoList);

    const addTodoItem = item => {
        item.id = todos.length
        item.isCompleted = false
        setTodo(todos.concat(item))
    }

    const completeTodo = id => {
        return setTodo(todos.map(todo => todo.id === id ?
            Object.assign({}, todo, {isCompleted : !todo.isCompleted}) : todo
        ));
    }

    const removeTodo = id => {
        setTodo(todos.filter(todo => todo.id !== id ))
    }
        
    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col-8">
                    <h1 className="text-center my-5">Todo</h1>
                    <TodoForm addTodoItem={addTodoItem} />
                    <TodoListEmpty todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} />
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

const withTodosEmpty = Component => props =>
    !props.todos.length
        ? <div className="text-center mt-3"><h5>You have nothing to do!</h5></div>
        : <Component { ...props } />;

const TodoListEmpty = withTodosEmpty(TodoList);

function TodoList({ todos, completeTodo, removeTodo }) {
    return (
        <table className="table mt-3">
            <TableHead />
            <TableBody todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} />
        </table>
    )
}

function TableHead() {
    return (
        <thead className="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
        </thead>
    )
}

function TableBody(props) {
    return (
        <tbody>
            {props.todos.map((todo, index) =>
                <tr key={todo.id}>
                    <td>{index+1}</td>
                    <td style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>{todo.text}</td>
                    <td>
                        {!todo.isCompleted ? (
                            <button onClick={() => props.completeTodo(todo.id)}
                                    className="btn btn-sm btn-outline-primary">
                                <i className="fas fa-minus"></i>
                            </button>
                        ) : (
                            <button onClick={() => props.completeTodo(todo.id)}
                                    className="btn btn-sm btn-primary">
                                <i className="fas fa-check"></i>
                            </button>
                        )}
                    </td>
                    <td>
                        {todo.isCompleted ? (
                            <button onClick={() => props.removeTodo(todo.id)}
                                    className="btn btn-sm btn-danger">
                                <i className="fas fa-trash"></i>
                            </button>
                        ) : ''}
                    </td>
                </tr>
            )}
        </tbody>
    )
}


function TodoForm(props) {
    const [todoItem, setTodoItem] = useState({text: ''})

    const handleChange = event => {
        setTodoItem({
            text: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!todoItem.text.length) return

        const newItem = {
            text: todoItem.text,
        }
        
        props.addTodoItem(newItem)
        setTodoItem({text:''})
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <div className="input-group input-group-lg">
                    <input type="text" value={todoItem.text} className="form-control" name="item"
                        onChange={handleChange} placeholder="Enter an item you want to do..." />
                </div>
            </fieldset>
        </form>
    )
}

// class Todo extends Component {
//     constructor(props) {
//         super(props)
    
//         this.state = {
//             text: '',
//             items: [],
//         }

//         this.handleChange = this.handleChange.bind(this)
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }

//     handleChange(e) {
//         this.setState({
//             text: e.target.value
//         })
//     }

//     handleSubmit(e) {
//         e.preventDefault()

//         if(!this.state.text.length) {
//             return
//         }

//         const newItem = {
//             text: this.state.text,
//             id: Date.now(),
//         }

//         this.setState({
//             items: this.state.items.concat(newItem),
//             text: '',
//         })
//     }
    
//     render() {
//         return (
//             <div className="container">
//                 <h3>Todo App</h3>
//                 <p>List of things to do.</p>
//                 <TodoList items={this.state.items} />
//                 <form onSubmit={this.handleSubmit}>
//                     {/* <label htmlFor="todo">Todo</label> */}
//                     <input type="text" name="todo" placeholder="Enter an item you want to do"
//                         value={this.state.text} onChange={this.handleChange} />
//                     <button>Add item #{this.state.items.length + 1}</button>
//                 </form>
//             </div>
//         )
//     }
// }

// class TodoList extends Component {
//     render() {
//         return (
//             <div>
//                 <ul>
//                     {this.props.items.map((item) => <li key={item.id}>{item.text}</li>)}
//                 </ul>
//             </div>
//         )
//     }
// }

export default Todo
