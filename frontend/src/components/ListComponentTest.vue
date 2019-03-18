<template>
    <div class="goods-list">
        <ed-tab
                v-model="tabVal"
                :options="tabOptions"
                @change="tabChangeHandler"
        ></ed-tab>
        <ed-swiper
                v-model="swiperVal"
                :options="swiperOptions"
                @change="swiperChangeHandler"
        >
            <template slot="swiperTmp" slot-scope="props">
                <LoadMore
                        v-model="loading[0]"
                        v-bind="options[0]"
                        @refresh="refresh(0)"
                        @loadMore="loadMore(0)"
                >
                    <p slot="refreshDesc" class="loading-bg">下拉加载</p>
                    <p slot="refreshNoData" class="loading-bg">开始加载</p>
                    <ul>
                        <li class="flex company-item" v-for="(item, index) in listData[props.$index]" :key="index" @click="gotoDetail(listData[props.$index])">
                            <div class="company-logo"><img :src="item.logo"/></div>
                            <div class="intro">
                                <h5>{{item.product}}</h5>
                                <span>{{item.companyName}}</span>
                                <dl>
                                    <dt>客户群: </dt>
                                    <dd v-for="(subItem, subIndex) in item.client" :key="subIndex">{{subItem}}</dd>
                                </dl>
                            </div>
                            <div class="price">￥{{item.price}}
                            </div>
                        </li>
                    </ul>
                    <p slot="loadMoreDesc" class="loading-bg">当前正在加载中...</p>
                    <p slot="loadMoreNoData" class="loadMoreNoData">暂无更多数据</p>
                </LoadMore>
            </template>
        </ed-swiper>
    </div>
</template>

<script type="text/ecmascript-6">
	import {URL} from '@/utils/serviceAPI.js';
	import {Toast} from 'vant';
	import LoadMore from './ed-load-more/index';
	import listData from '../../mock/goods';
	import EdTab from '@/components/ed-tab';
	import EdSwiper from '@/components/ed-swiper';

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
						// {label: '铝合金1'},
						// {label: '钢化门2'},
						// {label: '铝合金3'},
						// {label: '钢化门4'}
					],
					canViewItemNum: 3
				},
				swiperVal: 0,
				swiperOptions: {
					items: [
						{src: '/static/11.jpeg'},
						// {src: '/static/22.jpeg'},
						// {src: '/static/33.jpeg'},
						// {src: '/static/44.jpg'},
						// {src: '/static/55.jpg'}
					],
					autoplay: 0,
					loop: false
				},
				active: 0,
				listData: [
					listData.slice(),
					listData.slice(),
					listData.slice()
				],
				loading: [
					false,
					false,
					false
				],
				options: [
					{
						refreshNoData: false,
						loadMoreNoData: false
					}, {
						refreshNoData: false,
						loadMoreNoData: false
					}, {
						refreshNoData: false,
						loadMoreNoData: false
					},
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
			refresh(index) {
				console.log(1, this.loading);
				setTimeout(() => {
					this.listData[index].unshift(this.listData[index].length + 1);
					// 加载状态结束
					this.loading.splice(0, 1, false);
					// 数据全部加载完成
					// if (this.listData[index].length >= 2) {
					// 	this.options[index].loadMoreNoData = true;
					// }
				}, 1200);
			},
			loadMore(index) {
				setTimeout(() => {
					for (let i = 0; i < 5; i++) {
						this.listData[index].push(this.listData[index].length + 1);
					}
					// 加载状态结束
					this.loading.splice(0, 1, false);

					// 数据全部加载完成
					// if (this.listData[index].length >= 2) {
					// this.options[index].loadMoreNoData = true;
					// }
				}, 600);
			}
		},
		mounted() {},
		components: {
			LoadMore,
			EdTab,
			EdSwiper
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
