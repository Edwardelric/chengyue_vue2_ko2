<template>
    <div class="load-refresh-wrapper"
        :style="transform"
        @touchstart="touchStartHandler"
        @touchmove="touchMoveHandler"
        @touchend="touchEndHandler"
    >
        <slot :name="status">
            <div class="refresh-txt">
                <div
                    v-if="status === 'pulling' || status === 'loosing'"
                    v-text="finished ? finishedText : text"
                ></div>

                <div v-else v-text="text"></div>
            </div>
        </slot>
        <slot/>
        <slot name="reach-bottom">
            <span>{{value}}{{finished}}</span>
            <div class="load-txt"
                v-text="finished ? finishedText : '加载中...'"
            ></div>
        </slot>
        <!--<div class="refresh-wraper" v-if="enableRefresh">-->
            <!--<div v-if="!refreshNoData">-->
                <!--<span v-if="value"><van-loading />加载中...</span>-->
                <!--<div v-if="!value">-->
                    <!--<span v-if="refreshNoData">暂无更新数据</span>-->
                    <!--<span v-if="!refreshNoData">-->
                        <!--{{statusTxt ? statusTxt + '即可刷新...' : ''}}-->
                    <!--</span>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<slot></slot>-->
        <!--<div class="loadmore-wrapper" v-if="enableLoadMore">-->
            <!--<div v-if="value">加载中...</div>-->
            <!--<div v-if="!value">-->
                <!--<span v-if="loadMoreNoData">无更多数据</span>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {ScrollTools, Throttle, OnEvent, OffEvent, Touch} from '../utils/index.js';

	export default {
        name: 'EdLoadMore',
        mixins: [Touch],
        props: {
			immediateCheck: {
				type: Boolean,
				default: true
			},
            value: {
				type: Boolean,
				default: false
			},
            finished: {
			    type: Boolean,
                default: false
            },
			finishedText: {
			    type: String,
                default: '没有更多了'
            },
            pullingText: {
                type: String,
                default: '下拉即可加载'
            },
            loosingText: {
                type: String,
                default: '释放即可加载'
            },
            loadingText: {
                type: String,
                default: '加载中...'
            },
			animationDuration: {
				type: Number,
				default: 300
			},
            distance: {
            	type: Number,
                default: 10
            }
        },
		data() {
			return {
                scrollEventTarget: '',
                binded: false,
                moveDistance: 0,
                status: '',
				additionalX: 50,
				direction: 'vertical',
				duration: 0
            };
		},
        mounted() {
            this.scrollEventTarget = ScrollTools.getScrollEventTarget(this.$el);
            this.handler(true);
            if (this.immediateCheck) {
				//this.$emit('load', 'load');
            }
        },
        methods: {
            touchStartHandler(event) {
                if (!this.untouchable && this.getCeiling()) {
					this.duration = 0;
                    this.moveDistance = 0;
                    this.touchStart(event);
                }
            },
            touchMoveHandler(event) {
                if (this.untouchable) {return;}
				this.duration = 0;
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
                if (this.untouchable) {return;}
				this.duration = this.animationDuration;
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
                if (status !== this.status) {
                    this.status = status;
                }
            },
            handler(flag) {
                if (this.binded !== flag) {
                    this.binded = flag;
                    (flag ? OnEvent : OffEvent)(this.scrollEventTarget, 'scroll', this.check);
                }
            },
            check() {
                if (this.value || this.finished) { return;}
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
                console.log('reachBottom', reachBottom);
                if (reachBottom) {
                    this.$emit('input', true);
                    this.$emit('load');
                }
            }
        },
        computed: {
			untouchable() {
			    return this.status === 'loading' || this.disabled;
            },
			text() {
			    return this[`${this.status}Text`];
            },
            transform() {
                return {
                    transition: `all ${this.duration}ms linear`,
                    transform: `translate3d(0, ${this.moveDistance}px, 0)`
                }
			}
        },
        watch: {
            value(val) {
                if (this.getCeiling()) {
                	this.duration = this.animationDuration;
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
        .refresh-txt {
            position: absolute;
            left: 0;
            top: rem(-50);
            width: 100%;
            height: rem(50);
            color: $gray;
            font-size: 12px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: column nowrap;
            p {
                line-height: rem(20);
            }
        }
        .load-txt {
            display: flex;
            justify-content: center;
            align-items: center;
            height: rem(40);
            color: $gray;
            font-size: 12px;
        }
    }
</style>
