<template>
    <div class="goods-list">
        <ed-tab
            v-model="tabVal"
            :options="tabOptions"
            @change="tabChangeHandler"
            :class="{active: strikyFlag}"
        ></ed-tab>
        <ed-pull-refresh
            v-model="refreshing"
            @refresh="onRefresh"
            :style="{marginTop: strikyFlag ? 40 : 0}"
        >
            <ed-load-more
                v-model="loading"
                :finished="finished"
                @load="onLoad"
            >
                <ul>
                    <li class="flex company-item" v-for="(item, index) in listData" :key="index" @click="gotoDetail(listData)">
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
            </ed-load-more>
        </ed-pull-refresh>
    </div>
</template>

<script type="text/ecmascript-6">
	import {URL} from '@/utils/serviceAPI.js';
	import listData from '../../mock/goods';
	import EdTab from '@/components/ed-tab';
	import EdSwiper from '@/components/ed-swiper';
	import EdPullRefresh from '@/components/ed-pull-refresh'
	import EdLoadMore from './ed-load-more/index';
	import {ScrollTools} from './utils/index.js';

	export default {
		data() {
			return {
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
				listData: [],
				refreshing: false,
				loading: false,
				finished: false,
                strikyFlag: false
			};
		},
		created() {
		},
		mounted() {
			this.scroller = ScrollTools.getScrollEventTarget(this.$el);
			window.addEventListener('scroll', (event) => {
			    let scrolltop = ScrollTools.getScrollTop(this.scroller);
				this.strikyFlag = scrolltop >= 56;
			}, false);
		},
		methods: {
			tabChangeHandler(index) {
				this.swiperVal = index
			},
			swiperChangeHandler(index) {
				this.tabVal = index;
			},
			gotoDetail(goodData) {
				this.$router.push({name: 'Goods', query: {goodData}})
			},
			onRefresh() {
				setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        const text = this.listData.length + 1;
                        this.listData.unshift(text < 10 ? '0' + text : text);
                    }
				    this.refreshing = false;
				}, 500);
            },
			onLoad() {
				setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        const text = this.listData.length + 1;
                        this.listData.push(text < 10 ? '0' + text : text);
                    }
                    this.loading = false;

                    if (this.listData.length >= 40) {
                        this.finished = true;
                    }
                }, 800);
			}
		},
		components: {
			EdTab,
			EdSwiper,
			EdPullRefresh,
			EdLoadMore
		}
	};
</script>

<style lang="scss">
    @import "../assets/scss/_mixins";

    .ed-tab {
        &.active {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 99;
        }
    }

    .goods-list {
        .ed-swiper-wrapper {
            overflow-y: scroll;
        }
        .company-item {
            margin-top: rem(10);
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
