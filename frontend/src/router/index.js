import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/home';
import Register from '@/pages/register/register';
import Login from '@/pages/login/login';
import Goods from '@/pages/goods/goods';
import Intro from '@/pages/company/intro';


Vue.use(Router)

const routes =  [
	{
		path: '/',
		name: 'Home',
		meta: {
		  title: '首页'
		},
		component: Home
	}, {
		path: '/register',
		name: 'Register',
		meta: {
		  title: '注册'
		},
		component: Register
	}, {
		path: '/login',
		name: 'Login',
		meta: {
		  title: '登录'
		},
		component: Login
	}, {
		path: '/goods',
		name: 'Goods',
		meta: {
		  title: '商品详情'
		},
		component: Goods
	}, {
		path: '/company/intro',
		name: 'Intro',
		meta: {
		  title: '公司简介'
		},
		component: Intro
	}
];

const router = new Router({
	routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : "首页";
  next();
});

export default router;

