<template>
    <div class="goods-list">
        <ed-tab
                v-model="tabVal"
                :options="tabOptions"
                @change="tabChangeHandler"
        ></ed-tab>
        <van-swipe
                :autoplay="0"
                :initial-swipe="swiperVal"
                :show-indicators="false"
                :loop="false"
                :touchable="true"
                @change="swiperChangeHandler"
        >
            <van-swipe-item>
                <!--<LoadMore-->
                <!--v-model="loading[0]"-->
                <!--:finished="finished[0]"-->
                <!--loadingText="加载中..."-->
                <!--finishedText="没有更多了"-->
                <!--@refresh="refresh(0)"-->
                <!--@load="load(0)"-->
                <!--&gt;-->
                <!--<ul>-->
                <!--<li class="flex company-item" v-for="(item, index) in listData[0]" :key="index" @click="gotoDetail(listData[0])">-->
                <!--<div class="company-logo"><img :src="item.logo"/></div>-->
                <!--<div class="intro">-->
                <!--<h5>{{item.product}}</h5>-->
                <!--<span>{{item.companyName}}</span>-->
                <!--<dl>-->
                <!--<dt>客户群: </dt>-->
                <!--<dd v-for="(subItem, subIndex) in item.client" :key="subIndex">{{subItem}}</dd>-->
                <!--</dl>-->
                <!--</div>-->
                <!--<div class="price">￥{{item.price}}-->
                <!--</div>-->
                <!--</li>-->
                <!--</ul>-->
                <!--</LoadMore>-->
                <van-pull-refresh
                        v-model="refreshing[0]"
                        @refresh="onRefresh(0)"
                >
                    <van-list
                            v-model="loading[0]"
                            :finished="finished[0]"
                            @load="onLoad"
                    >
                        <ul>
                            <li class="flex company-item" v-for="(item, index) in listData[0]" :key="index" @click="gotoDetail(listData[0])">
                                <div class="company-logo"><img :src="item.logo"/></div>
                                <div class="intro">
                                    <h5>{{item.product}}</h5>
                                    <span>{{item.companyName}}</span>
                                    <dl>
                                        <dt>客户群: </dt>
                                        <dd v-for="(subItem, subIndex) in item.client" :key="subIndex">{{subItem}}</dd>
                                    </dl>
                                </div>
                                <div class="price">￥{{item.price}}</div>
                            </li>
                        </ul>
                    </van-list>
                </van-pull-refresh>
            </van-swipe-item>
            <van-swipe-item style="height: 100%">1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
        </van-swipe>
    </div>
</template>

<script type="text/ecmascript-6">
	import {URL} from '@/utils/serviceAPI.js';
	import {Toast} from 'vant';
	import LoadMore from './ed-load-more/index';
	import listData from '../../mock/goods';
	import EdTab from '@/components/ed-tab';

	export default {
		data() {
			return {
				users: [
					{id: 0, name: '张三', age: 20},
					{id: 1, name: '李四', age: 22},
					{id: 2, name: '王五', age: 27},
					{id: 3, name: '张龙', age: 27},
					{id: 4, name: '赵虎', age: 27}
				],

				tabVal: 0,
				tabOptions: {
					items: [
						{label: '玻璃0'},
						{label: '铝合金1'},
						{label: '钢化门2'},
						{label: '铝合金3'},
						{label: '钢化门4'}
					],
					canViewItemNum: 3
				},
				swiperVal: 0,

				active: 0,
				refreshing: [
					false,
					false,
					false
				],
				loading: [
					false,
					false,
					false
				],
				finished: [
					false,
					false,
					false
				],
				listData: [
					listData.slice(),
					listData.slice(),
					listData.slice()
				]
			};
		},
		created() {
		},
		methods: {
			tabChangeHandler(index) {
				console.log('tabChange', index);
				this.swiperVal = index
			},
			swiperChangeHandler(index) {
				console.log('swiperChange', index);
				this.tabVal = index;
			},
			gotoDetail(goodData) {
				this.$router.push({name: 'Goods', query: {goodData}})
			},
			onRefresh(index) {
				setTimeout(() => {
					//this.listData[index].unshift(this.listData[index].length + 1);
					// 加载状态结束
					this.refreshing.splice(0, 1, false);
					// this.finished.splice(0, 1, true);
					// 数据全部加载完成
					// if (this.listData[index].length >= 2) {
					// 	this.options[index].loadMoreNoData = true;
					// }
				}, 500);
			},
			onLoad(index) {
				console.log('bb');
				setTimeout(() => {
					// for (let i = 0; i < 5; i++) {
					// 	this.listData[index].push(this.listData[index].length + 1);
					// }
					//加载状态结束
					this.loading.splice(0, 1, false);
					// this.finished.splice(0, 1, true);
					// 数据全部加载完成
					// if (this.listData[index].length >= 2) {
					// this.options[index].loadMoreNoData = true;
					// }
				}, 500);
			}
		},
		mounted() {},
		components: {
			LoadMore,
			EdTab
		}
	};
</script>

<style lang="scss">
    @import "../assets/scss/_mixins";

    .goods-list {
        height: 100%;
        .ed-swiper-wrapper {
            overflow-y: scroll;
        }
        .company-item {
            margin-bottom: rem(10);
            padding: 0 rem(16) rem(10) rem(16);
            border-bottom: rem(6) solid $gray;
            .company-logo {
                width: rem(60);
                img {
                    width: 100%;
                    border-radius: 50%;
                }
            }
            .intro {
                flex: 1;
                display: flex;
                flex-flow: column nowrap;
                justify-content: space-between;
                align-items: flex-start;
                padding-left: rem(14);
                color: #61687c;
                line-height: rem(26);
                h5 {
                    font-size: rem(16);
                }
                span {
                    font-size: rem(12);
                }
                dl {
                    color: $gray-lighter;
                    dt {
                        display: inline-block;
                        color: #61687c;
                    }
                    dd {
                        display: inline-block;
                        padding-right: rem(4);
                    }
                }
            }
            .price {
                color: #fc6c38;
                font-size: rem(16);
            }
        }
    }
</style>
