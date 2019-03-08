<template>
    <div class="load-refresh-wrapper"
        :style="transform"
        @touchstart="touchStartHandler"
        @touchmove="touchMoveHandler"
        @touchend="touchEndHandler"
    >
        <div class="refresh-wraper" v-if="enableRefresh">
            <div v-if="!refreshNoData">
                <span v-if="value">加载中...</span>
                <div v-if="!value">
                    <span v-if="refreshNoData">暂无更新数据</span>
                    <span v-if="!refreshNoData">
                        {{statusTxt ? statusTxt + '即可刷新...' : ''}}
                    </span>
                </div>
            </div>
        </div>
        <slot></slot>
        <div class="loadmore-wrapper" v-if="enableLoadMore">
            <div v-if="value">加载中...</div>
            <div v-if="!value">
                <span v-if="loadMoreNoData">无更多数据</span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {ScrollTools, Throttle, OnEvent, OffEvent, Touch} from '../utils/index.js';
    import EdSpinner from '../ed-spinner/index.vue';

	export default {
        name: 'EdLoadMore',
        mixins: [Touch],
        props: {
            value: {
                type: Boolean,
                default: false
            },
            duration: {
                type: Number,
                default: 300
            },
			immediateCheck: {
				type: Boolean,
				default: false
			},
			enableRefresh: {
				type: Boolean,
				default: true
			},
            enableLoadMore: {
                type: Boolean,
                default: true
            },
            distance: {
            	type: Number,
                default: 10
            },
            refreshNoData: {
                type: Boolean,
                default: false
            },
			loadMoreNoData: {
                type: Boolean,
                default: false
            }
        },
		data() {
			return {
                scrollEventTarget: '',
                binded: false,
                untouchable: false,
                moveDistance: 0,
                status: '',
                statusTxt: '',
				touched: false,
				additionalX: 50,
				direction: 'vertical'
            };
		},
        mounted() {
            this.scrollEventTarget = ScrollTools.getScrollEventTarget(this.$el);
                if (this.enableLoadMore) {
                    this.handler(true);
                if (this.immediateCheck) {
                    this.check();
                }
            }
        },
        components: {
            EdSpinner
        },
        methods: {
            touchStartHandler(event) {
            	this.touched = true;
                if (!this.untouchable && this.getCeiling() && this.enableRefresh) {
                    this.moveDistance = 0;
                    this.touchStart(event);
                }
            },
            touchMoveHandler(event) {
                if (this.untouchable && !this.enableRefresh) {return;}
                this.touchMove(event);
                if (!this.ceiling && this.getCeiling()) {
                    this.moveDistance = 0;
                    this.startY = event.touches[0].clientY;
                    this.deltaY = 0;
                }
                if (this.ceiling && this.deltaY >= 0 && this.direction === 'vertical') {
                    this.getStatus(this.ease(this.deltaY));
                    event.cancelable && event.preventDefault();
                }
            },
            touchEndHandler() {
                if (this.untouchable && !this.enableRefresh) {return;}
                if (this.ceiling && this.deltaY) {
                    if (this.status === 'loosing') {
                        this.getStatus(this.additionalX, true);
						this.$emit('input', true);
                        this.$emit('refresh');
                    } else {
                        this.getStatus(0);
                    }
                }
            },
            getCeiling() {
                this.ceiling = ScrollTools.getScrollTop(this.scrollEventTarget) === 0;
                return this.ceiling;
            },
            ease(moveDistance) {
                let additionalX = this.additionalX;
                return moveDistance < additionalX ? moveDistance : moveDistance < additionalX * 2 ? Math.round(additionalX + (moveDistance - additionalX) / 2) :  Math.round(additionalX * 1.5 + (moveDistance - additionalX * 2) / 4);
			},
            getStatus: function getStatus(moveDistance, isLoading) {
            	this.moveDistance = moveDistance;
                let status = isLoading ? 'loading' : moveDistance === 0 ? '' : moveDistance < this.additionalX * 1.5 ? 'pulling' : 'loosing';
                console.log(status, 1, this.status);
                if (status !== this.status) {
                    this.status = status;
                    this.statusTxt = ({pulling: '下拉', loosing: '释放'})[status];
                }
            },
            handler(flag) {
                if (this.binded !== flag) {
                    this.binded = flag;
                    (flag ? OnEvent : OffEvent)(this.scrollEventTarget, 'scroll', this.check);
                }
            },
            check() {
                if (this.value || this.loadMoreNoData) { return;}
                let reachBottom = false;
                let el = this.$el;
                let scrollEventTarget = this.scrollEventTarget;
                let viewportScrollTop = ScrollTools.getScrollTop(scrollEventTarget);
                let viewportBottom = viewportScrollTop + ScrollTools.getVisibleHeight(scrollEventTarget);
                if (scrollEventTarget === el) {
                    reachBottom = scrollEventTarget.scrollHeight - viewportBottom < this.distance;
                } else {
                    let elementBottom = ScrollTools.getElementTop(el) - ScrollTools.getElementTop(scrollEventTarget) + el.offsetHeight + viewportScrollTop;
                    reachBottom = viewportBottom + this.distance >= elementBottom;
                }
                if (reachBottom) {
                    this.$emit('input', true);
                    this.$emit('loadMore', 'loadMore');
                }
            }
        },
        computed: {
            transform() {
            	if (this.touched) {
            		return {
                        transition: `all ${this.duration}ms linear`,
                        transform: `translate3d(0, ${this.moveDistance}px, 0)`
                    }
				} else {
            		return {};
                }
            }
        },
        watch: {
            value(val) {
            	console.log('watchValue', val);
                if (this.getCeiling() && this.enableRefresh) {
                    this.getStatus(val ? this.additionalX : 0, val);
                }
            }
        }
	};
</script>

<style lang="scss">
    @import "../ed-css/_mixins.scss";
    .load-refresh-wrapper {
        position: relative;
        transform: translate3d(0px, 0px, 0px);
        .refresh-wraper {
            position: absolute;
            left: 0;
            top: rem(-50);
            width: 100%;
            height: rem(50);
            color: $gray;
            font-size: 14px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: column nowrap;
            p {
                line-height: rem(20);
            }
        }
        .loadmore-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: rem(40);
        }
    }
</style>
