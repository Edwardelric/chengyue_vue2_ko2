<template>
    <div class="goods-list">
        <van-tabs v-model="active">
            <van-tab title="玻璃" class="list-van-tab">
                <LoadMore
                    v-model="loading[0]"
                    v-bind="options[0]"
                    @refresh="refresh(0)"
                    @loadMore="loadMore(0)"
                >
                    <ul>
                        <li class="flex goods-item" v-for="(item, index) in listData[0]" :key="index" @click="gotoDetail(listData[index])">
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
                </LoadMore>
            </van-tab>
            <van-tab title="铝合金">
                <LoadMore
                        v-model="loading[1]"
                        v-bind="options[1]"
                        @refresh="refresh(1)"
                        @loadMore="loadMore(1)"
                >
                    <ul>
                        <li class="flex goods-item" v-for="(item, index) in listData[1]" :key="index" @click="gotoDetail(listData[index])">
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
                </LoadMore>
            </van-tab>
            <van-tab title="钢化门">
                <LoadMore
                        v-model="loading[2]"
                        v-bind="options[2]"
                        @refresh="refresh(2)"
                        @loadMore="loadMore(2)"
                >
                    <ul>
                        <li class="flex goods-item" v-for="(item, index) in listData[2]" :key="index" @click="gotoDetail(listData[index])">
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
                </LoadMore>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
    import {URL} from '@/utils/serviceAPI.js';
    import {Toast} from 'vant';
    import LoadMore from './ed-load-more/index';
    import listData from '../../mock/goods';

	export default {
		data() {
			return {
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
			LoadMore
        }
	};
</script>

<style lang="scss">
    @import "../assets/scss/_mixins";

    .goods-list {
        ul {
            .goods-item {
                padding: rem(10) rem(16);
                border-bottom: 6px solid rgba(204, 204, 204, 0.6);
                background: $white;
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
    }
</style>
