import { createRouter,createWebHistory } from "vue-router";

const routes = [
    {
        path:"/",
        component:()=>import("@/views/home.vue")
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