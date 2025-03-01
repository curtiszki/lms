export default [
    {
        path: '/',
        name: 'landing',
        component: ()=>import('@/pages/index.vue'),
    },
    {
        path: '/home',
        name: 'home',
        component: ()=>import('@/pages/home.vue'),
    },
    {
        path: '/data',
        name: 'data',
        component: ()=>import('@/pages/data.vue'),
    },
    /*
    {
        path: '/statistics',
        name: 'statistics',
        component: ()=>import('@/pages/statistics.vue'),
    },
    */
    {
        path: '/practice',
        name: 'practice',
        component: ()=>import('@/pages/practice.vue'),
    },
    {
        path: '/test',
        name: 'test',
        component: ()=>import('@/pages/test.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not found',
        component: ()=>import('@/pages/not-found.vue')
    }
]