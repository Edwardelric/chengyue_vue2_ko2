import Vue from 'vue';
import App from './App';
import router from './router';
import Ajax from './utils/http';
import {Row, Col, Icon, Swipe, SwipeItem, NavBar, Field, Card, Toast, Popup, Area, Collapse, CollapseItem, Tabbar, TabbarItem, Search} from 'vant';

Vue.config.productionTip = false;

Vue.use(Ajax)
	.use(Row).use(Col)
	.use(Icon)
	.use(Swipe).use(SwipeItem)
	.use(NavBar)
	.use(Toast)
	.use(Popup)
	.use(Area)
	.use(Collapse)
	.use(CollapseItem)
	.use(Tabbar).use(TabbarItem)
	.use(Search)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});


