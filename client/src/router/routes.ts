export default [
    {
        path: '/',
        name: 'landing',
        component: ()=>import('@/pages/index.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: ()=>import('@/pages/home.vue')
    }
]