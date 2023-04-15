const BACKEND_ROOT_URL = 'http://localhost:3001'
import { Task } from "./class/Task.js"
import { Todos } from './class/Todos.js'

const todos = new Todos(BACKEND_ROOT_URL)

const list = <HTMLUListElement>document.querySelector('#todolist')
const input = <HTMLInputElement>document.querySelector('#newtodo')



input.disabled = true
todos.getTasks().then((tasks: Array<Task>) => {
    tasks.forEach(task => {
        renderTask(task)
    })
    input.disabled = false
}).catch(error => {
    alert(error)
})


input.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault()
        const text = input.value.trim()
        if (text !== '') {
            const json = JSON.stringify({ description: text })
            fetch(BACKEND_ROOT_URL + '/new', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
                .then(response => response.json())
                .then((response) => {
                    renderTask(response.task)
                    input.value = ''
                }, (error) => {
                    alert(error)
                })
        }
    }
})


input.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault()
        const text = input.value.trim()
        if (text !== '') {
            const list_item = document.createElement('li')
            list_item.setAttribute('class', 'list-group-item')
            list_item.innerHTML = text
            list.append(list_item)
            input.value = ''
        }
    }
})

input.addEventListener('keypress', event => {
    if (event.key === "Enter") {

        const text = input.value.trim()
        if (text !== '') {
            todos.addTask(text).then((task) => {
                input.value = ''
                input.focus()
                renderTask(<Task>task)

            })
        } event.preventDefault()
    }
})


const renderTask = (task: Task) => {
    const list_item = document.createElement('li')
    list_item.setAttribute('class', 'list-group-item')
    list_item.innerHTML = task.text
    list.append(list_item)
}

