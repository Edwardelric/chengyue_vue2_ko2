import Vue from 'vue';
import App from './App';
import router from './router';
import Ajax from './utils/http';
import {
	Row, Col,
	Icon,
	Swipe, SwipeItem,
	PullRefresh, List, Cell,
	Loading,
	NavBar,
	Field, Search, Button,
	Area, AddressEdit,
	Toast, Popup,
	Collapse, CollapseItem,
	Tab, Tabs
} from 'vant';

Vue.config.productionTip = false;

Vue.use(Ajax)
	.use(Row).use(Col)
	.use(Icon)
	.use(Swipe).use(SwipeItem)
	.use(PullRefresh).use(List).use(Cell)
	.use(Loading)
	.use(NavBar)
	.use(Field).use(Search).use(Button)
	.use(Area).use(AddressEdit)
	.use(Toast).use(Popup)
	.use(Collapse).use(CollapseItem)
	.use(Tab).use(Tabs)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});


