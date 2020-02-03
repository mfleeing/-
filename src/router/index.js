import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Play from '../views/Play.vue'
import Plays from '../views/Plays.vue'
import api from '../views/api.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'api',
        component: api,
        children: [{
                path: 'play',
                name: 'play',
                component: Play,
            },

        ]
    },
    {
        path: '/plays',
        name: 'plays',
        component: Plays,
    },
    {
        path: '/api',
        name: 'api',
        component: api,
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router