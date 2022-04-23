import {createWebHistory, createRouter} from 'vue-router'
import TaskDashboard from '../components/Dashboard/TaskDashboard'
import NewTaskForm from '../components/NewTask/NewTaskForm'
import TaskComponent from '../components/Task/TaskComponent'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: TaskDashboard
        },
        {
            path: '/newTask',
            component: NewTaskForm
        },
        {
            path: '/task/:id',
            component: TaskComponent
        },
    ]
})

export{router}