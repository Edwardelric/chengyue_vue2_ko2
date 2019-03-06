<template>
    <div class="list-wrapper">
        <div class="list-content">
        <LoadMore
                v-model="loading"
                v-bind="options"
                @refresh="refresh"
                @loadMore="loadMore"
        >
            <p slot="refreshDesc" class="loading-bg">下拉加载</p>
            <p slot="refreshNoData" class="loading-bg">开始加载</p>
            <ul v-if="listType === 0">
                <li class="flex company-item" v-for="(item, index) in listData" :key="index">
                    <div class="company-logo"><img src="../assets/images/home/home.jpeg"/></div>
                    <div class="intro">
                        <h5>灯泡渠道商</h5>
                        <span>这个是公司</span>
                        <dl>
                            <dt>地点: </dt>
                            <dd>上海市</dd>
                            <dt>成立:</dt>
                            <dd>2018</dd>
                        </dl>
                    </div>
                    <div class="price">￥100/单
                    </div>
                </li>
            </ul>
            <p slot="loadMoreDesc" class="loading-bg">当前正在加载中...</p>
            <p slot="loadMoreNoData" class="loadMoreNoData">暂无更多数据</p>
        </LoadMore>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {URL} from '@/utils/serviceAPI.js';
    import {Toast} from 'vant';
    import LoadMore from './ed-load-more/index';

	export default {
		data() {
			return {
                listType: 0,
				listData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				loading: false,
				options: {
					enableRefresh: true,
					additionalX: 50,
					duration: 300,
					refreshFinished: false,
					refreshClassName: 'refreshClassName',
					refreshNoData: 'refreshNoData',
					enableLoadMore: true,
					immediateCheck: false,
					distance: 10,
					loadMoreFinished: false,
					loadMoreClassName: 'loadMoreClassName',
					loadMoreNoData: 'loadMoreNoData'
				},
            };
		},
        methods: {
            gotoDetail(goodId) {
                this.$router.push({name: 'Goods', params: {goodId}})
            },
			refresh() {
				setTimeout(() => {
					for (let i = 0; i < 5; i++) {
						this.listData.unshift(this.listData.length + 1);
					}
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					if (this.listData.length >= 30) {
						this.options.refreshFinished = true;
					}
					console.log(this.list);
				}, 600);
			},
			loadMore(arg) {
				this.$ajax.post('https://www.easy-mock.com/mock/592e626b91470c0ac1fed9b6/products_1496212075258/moneylist#!method=post').then(res => {

				}).catch(err => {

				}).finally(() => {
					for (let i = 0; i < 5; i++) {
						this.listData.push(this.listData.length + 1);
					}
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					if (this.listData.length >= 30) {
						this.options.loadMoreFinished = true;
					}
				})
			}
        },
        mounted() {
        },
        components: {
			LoadMore
        }
	};
</script>

<style lang="scss" scoped>
    @import "../assets/scss/_mixins";

    .list-wrapper {
        flex: 1;
        display: flex;
        background: #fff;
    }
    .list-content {
        flex: 1;
        overflow-y: scroll;
        background: $white;
        &::-webkit-scrollbar{
            background-color:transparent;
        }
        .company-item {
            margin-bottom: rem(10);
            padding: 0 rem(16) rem(10) rem(16);
            border-bottom: rem(6) solid $gray;
            .company-logo {
                width: rem(60);
                height: rem(60);

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
                height: rem(60);
                padding-left: rem(14);
                color: #61687c;
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
                        &:first-of-type {
                            padding-right: rem(12);
                        }
                    }
                }
            }
            .price {
                color: #fc6c38;
                font-size: rem(16);
            }
        }
    }
    .refreshClassName {

    }
    .loading-bg {
        color: $green
    }
    .refreshClassName {
        color: $green;
    }
    .refreshNoData {
        color: $gray;
    }
    .loadMoreNoData {
        height: auto;
        background: transparent;
        color: $gray;
        font-size: 12px;
    }
</style>
