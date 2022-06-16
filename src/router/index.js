import { createRouter,createWebHistory,createWebHashHistory } from "vue-router";

const routes = [
    {
        path:"/",
        component:()=>import("@/views/layout/index.vue"),
        redirect:"/index",
        children:[
            {
                path:"/index",
                component:()=>import("@/views/index/index.vue")
            }
        ]
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

router.beforeEach((to,from,next)=>{
    next();
})

export default router;