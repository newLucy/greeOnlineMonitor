import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout'
import {checkSession} from '../api/user'
import store from '@/store/index.js'

Vue.use(Router)

/*       注意：
   !!!!!!新增路由时，请在allRoutes中添加路径
*/
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { requiresAuth: true } // 需要验证权限的页面
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('@/views/search/searchIndex'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'personal',
        component: () => import('@/views/personal-center/index'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/manage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'manage',
        component: () => import('@/views/user-management/index'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'feedback',
        component: () => import('@/views/online-feedback/index'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404')
  },
  {
    path: '/noPermission',
    name: 'noPermission',
    component: () => import('@/views/error/NoPermission')
  }
]

const routerObj = new Router({
  routes,
  // 回到上次离开页面时滚动的位置
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

const allRoutes = ['/home', '/search', '/personal/index', '/manage/index', '/feedback/index', '/login', '/404', '/noPermission']

routerObj.beforeEach((to, from, next) => {
  let path = to.path
  checkSession().then(res => {
    // session过期的情况
    if (path !== '/login' && !res.success) {
      routerObj.push('/login')
    } else if (allRoutes.indexOf(path) > -1) { // 存在这个页面
      if (to.matched.some(res => res.meta.requiresAuth)) { // 页面需要权限验证
        let permissionRoute = store.getters.permissionRoute
        if (!permissionRoute || permissionRoute.length === 0) { // 路由权限未获取，需要手动调用方法获取
          store.dispatch('menu/getMenuInfo').then(permissionRoute => {
            if (permissionRoute.indexOf(path) > -1) { // 拥有权限
              next()
            } else { // 没有权限
              routerObj.push('/noPermission')
            }
          })
        } else { // 已经获取到权限路由
          if (permissionRoute.indexOf(path) > -1) { // 拥有权限
            next()
          } else { // 没有权限
            routerObj.push('/noPermission')
          }
        }
      } else {
        next()
      }
    } else { // 不存在这个页面
      routerObj.push('/404')
    }
  })
})

export default routerObj
