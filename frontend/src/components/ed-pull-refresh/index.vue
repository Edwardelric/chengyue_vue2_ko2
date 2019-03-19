<template>
    <div class="ed-pull-refresh">
        <div
            class="ed-pull-refresh-track"
            :style="style"
            @touchstart="touchStartHandler"
            @touchmove="touchMoveHandler"
            @touchend="touchEndHandler"
        >
            <div class="ed-pull-refresh-head">
                <slot :name="status">
                    <div class="refresh-txt">
                        <div
                            v-if="status === 'pulling' || status === 'loosing'"
                            v-text="text"
                        ></div>

                        <div v-if="status === 'loading'">
                            <!--<ed-spinner />-->
                            <span v-text="text"/>
                        </div>
                    </div>
                </slot>
            </div>
            <slot/>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	import {ScrollTools, Touch} from '../utils/index.js';
    import EdSpinner from '../ed-spinner/index'

	export default {
		name: 'EdPullRefresh',
		mixins: [Touch],
		props: {
			disabled: {
			    type: Boolean,
                default: false
            },
			value: {
				type: Boolean,
				default: false,
                required: true
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
			headHeight: {
				type: Number,
				default: 50
			}
		},
		data() {
			return {
				status: 'normal',
                height: 0,
                duration: 0
			};
		},
		mounted() {
			this.scrollEventTarget = ScrollTools.getScrollEventTarget(this.$el);
		},
		methods: {
			touchStartHandler(event) {
				if (!this.untouchable && this.getCeiling()) {
					this.duration = 0;
					this.touchStart(event);
				}
			},
			touchMoveHandler(event) {
				if (this.untouchable) {return;}
				this.touchMove(event);
				if (!this.ceiling && this.getCeiling()) {
					this.duration = 0;
					this.startY = event.touches[0].clientY;
					this.deltaY = 0;
				}
				if (this.ceiling && this.deltaY >= 0) {
					if (this.touchMoveDirection === 'vertical') {
						this.getStatus(this.ease(this.deltaY));
						event.cancelable && event.preventDefault();
                    }
				}
			},
			touchEndHandler() {
				if (!this.untouchable && this.ceiling && this.deltaY) {
					this.duration = this.animationDuration;
					if (this.status === 'loosing') {
						this.getStatus(this.headHeight, true);
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
			ease(height) {
				let headHeight = this.headHeight;;
				return height < headHeight
					? height
					: height < headHeight * 2
						? Math.round(headHeight + (height - headHeight) / 2)
						: Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4);
			},
			getStatus(height, isLoading) {
				this.height = height;
				const status = isLoading
					? 'loading' : height === 0
						? 'normal' : height < this.headHeight
							? 'pulling' : 'loosing';
				if (status !== this.status) {
					this.status = status;
				}
			}
		},
        components: {
			EdSpinner
        },
		computed: {
			style() {
				return {
					transition: `all ${this.duration}ms linear`,
					transform: `translate3d(0, ${this.height}px, 0)`
				}
			},
			untouchable() {
				return this.status === 'loading' || this.disabled;
			},
			text() {
				return this[`${this.status}Text`];
			}
		},
		watch: {
			value(val) {
	            this.duration = this.animationDuration;
                this.getStatus(val ? this.headHeight : 0, val);
			}
		}
	};
</script>

<style lang="scss">
    @import "../ed-css/_mixins.scss";

    .ed-pull-refresh {
        overflow: hidden;
        user-select: none;
        .ed-pull-refresh-track {
            position: relative;
            .ed-pull-refresh-head {
                position: absolute;
                left: 0;
                top: -50px;
                width: 100%;
                height: 50px;
                color: $gray;
                font-size: 14px;
                text-align: center;
                line-height: 50px;
            }
        }

    }
</style>