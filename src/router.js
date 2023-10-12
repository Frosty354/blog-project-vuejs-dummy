import {createRouter,createWebHistory} from 'vue-router'
import Authenticate from './views/Authenticate.vue'
import Signup from './views/Signup.vue'
import Blogs from './views/Blogs.vue'
import store from './store'


const routes=[
    {path:'/login',component:Authenticate},
    {path:'/signup', component:Signup},
    {path: '/blogs', component: Blogs, meta: { requiresAuth: true }},
]
const router= createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Check if the user is authenticated (replace this with your authentication logic)
      const isAuthenticated = store.state.isAuthenticated; /* check from vuex state if the user is authenticated */
  
      if (isAuthenticated) {
        // User is authenticated, allow the navigation to the protected route
        next();
      } else {
        // User is not authenticated, redirect to the authentication route
        next('/login');
      }
    } else {
      // For routes that don't require authentication, allow the navigation
      next();
    }
  });


  
export default router;