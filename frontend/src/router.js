import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserDash from './views/UserDash'
import ErrorComponent from './views/Error'
import NewGrievance from './views/NewGrievance'
import Success from './views/Success'
import StatusForm from './views/StatusForm'
import PendingGR from './views/PendingGR'
import ClosedGR from './views/ClosedGR'
import AcceptedGR from './views/AcceptedGR'
import PendingCell from './views/PendingCell'
import ResolveGR from './views/ResolveGR'
import Contact from './views/Contact'
import Verification from './views/Verification'
import Profile from './views/Profile'
import store from './store'
import cellLogin from './views/LoginCell'
import adminlogin from './views/AdminLogin'
import addCell from './views/AddCell'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: UserDash
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/cellLogin',
      name: 'logincell',
      component: cellLogin
    },
    {
      path: '/createGR',
      name: 'create-grievance',
      component: NewGrievance
    },
    {
      path: '/404',
      name: '404',
      component: ErrorComponent
    },
    {
      path: '/success',
      name: 'success',
      props:true,
      component: Success
    },
    {
      path: '/status',
      name: 'status',
      component: StatusForm
    },
    {
      path: '/pending',
      name: 'pending',
      component: PendingCell
    },
    {
      path: '/submitted',
      name: 'submitted',
      component: PendingGR
    },
    {
      path: '/closed',
      name: 'closed-grievances',
      component: ClosedGR
    },
    {
      path: '/accepted',
      name: 'accepted',
      component: AcceptedGR
    },{
      path:'/resolve',
      name:'resolve',
      props:true,
      component:ResolveGR
    },
    {
      path:'/contact',
      name:'contact',
      component: Contact
    },
    {
      path:'/verify',
      name:'verify',
      props:true,
      component: Verification
    },
    {
      path:'/profile',
      name:'profile',
      props:true,
      component: Profile
    },
    {
      path : '/adminLogin',
      name : 'adminlogin',
      component : adminlogin
    },

    {
      path: '/addCell',
      name : 'addCell',
      component: addCell
    }
  ]
})

const privateRoutes = [
  "/dashboard",
  "/createGR",
  "/status",
  "/submitted",
  "/pending",
  "/closed",
  "/accepted",
  "/resolve",
  "/contact"
]

router.beforeEach((to,from, next) => {
  if(!to.matched.length){
    next('/404')
  }
  else{
    next()
  }
})

router.beforeEach((to,from, next) => {
  if(privateRoutes.indexOf(to.path) != -1){
    if(store.getters.isLoggedIn){
      next()
    }
    else{
      console.log("Unauthorized user")
      next('/')
    }
  }else{
    next()
  }
})

router.beforeEach((to,from,next) => {
  if(store.getters.isLoggedIn){
    if(to.path === '/'){
      next('/dashboard')
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

export default router
