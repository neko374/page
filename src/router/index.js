import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",//从定向
    redirect: "/index/index1"//自动加载home页面
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [//二级路由
      {
        path: "home1",
        component: () => import(/* webpackChunkName: "about" */ '../views/Home1.vue')
      },
      {
        path: "dwdlzhgl",
        component: () => import(/* webpackChunkName: "about" */ '../views/Dwdlzhgl.vue')
      },
      {
        path: 'userlxgl',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserLxgl.vue')
      },
      {
        path: 'userxxcx',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserXxcx.vue')
      },
      {
        path: 'userdwyqsd',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserDwyqsd.vue'),
      },
      {
        path: 'userjcyj',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserJcyj.vue'),
      },
      {
        path: 'userdwxxdr',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserDwxxdr.vue'),
      },
    ]
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue'),
    children: [//二级路由
      {
        path: 'index1',
        component: () => import(/* webpackChunkName: "about" */ '../views/Index1.vue')
      },
      {
        path: 'userwzxxgl',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserWzxxgl.vue')
      },
      {
        path: 'userxlgl',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserXlgl.vue')
      },
      {
        path: 'userylgl',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserYlgl.vue')
      },
      {
        path: 'zzjghrygl',
        component: () => import(/* webpackChunkName: "about" */ '../views/ZzjgHrygl.vue'),
      },
      {
        path: 'jbxxwh',
        component: () => import(/* webpackChunkName: "about" */ '../views/Jbxxwh.vue'),
      },
      {
        path: 'zbxxgl',
        component: () => import(/* webpackChunkName: "about" */ '../views/Zbxxgl.vue'),
      }
    ]
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: "应急救援队伍管理登录页面" },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { title: "应急救援队伍管理注册页面" },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/error',
    name: 'Error',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Error.vue')
  },
  {
    path: '/*',
    redirect: "/error"
  },
]

const router = new VueRouter({
  mode: 'history',//hash地址栏带#号
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, save) => {//滚动行为
    return { y: 0 }
  },
  routes
})


//全局导航 路由守卫
// router.beforeEach((to, from, next) => {
//   //存入缓存
//   const isLogin = sessionStorage.getItem("mytoken") ? true : false;
//   //to从哪里来 
//   if (to.path === "/login") {//如果进去其他页面必须从login页面进入  
//     next()
//   } else {//如果没有登录 直接调到登录页面
//     isLogin ? next() : next("/login")
//   }
// })
router.beforeEach((to, from, next) => {
  //存入缓存
  // const isLogin = sessionStorage.getItem("mytoken") ? true : false;
  //to从哪里来 
  if (to.path == "/home" || to.path == "/index/index1") {
    if (sessionStorage.getItem("mytoken")) {//如果缓存里有对应的key和value就可以访问页面
      next()
    } else {
      window.alert("请先登录")//没有直接跳到登录页面
      router.push("/login")
    }
  } else {
    next()
  }
})


//afterEach进入导航之后钩子函数 没有next  全局
router.afterEach((to, from) => {
  if (to.meta.title) {//title
    window.document.title = to.meta.title
  } else {
    window.document.title = "应急救援队伍管理首页"
  }
})

export default router
