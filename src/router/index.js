import Vue from 'vue'
import Router from 'vue-router'
import Manager_plan_lists from '@/components/manager/Manager_plan_lists'
import Manager_plan_details from '@/components/manager/Manager_plan_details'
import Plan_lists from '@/components/normal/Plan_lists'
import Login from  '@/components/Login'

import store from '@/store/index'
Vue.use(Router)





const router=new Router({
    mode: 'hash',
    routes: [
        {path: '/', name: 'Manager_plan_lists', component: Manager_plan_lists,meta: { navShow: true, cname: '一级页面' }},//管理端列表
        {path: '/manager_plan_details', name: 'Manager_plan_details', component: Manager_plan_details,meta: { navShow: true, cname: '一级页面' }},//管理端详情
        {path: '/plan_lists', name: 'Plan_lists', component: Plan_lists,meta: { navShow: true, cname: '一级页面' }},//负责人列表
        {path: '/login', name: 'Login', component: Login,meta: { navShow: true, cname: '一级页面' }},//负责人列表
        // {path: '/manager_plan_details', name: 'Manager_plan_details', component: Manager_plan_details,meta: { navShow: true, cname: '一级页面' }},//负责人详情
    ]
})
router.beforeEach((to, from, next) => {

    next();
});



export default router;