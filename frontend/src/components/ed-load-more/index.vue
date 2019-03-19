<template>
    <div class="ed-load-more">
        <slot/>
        <div v-if="loading" :class="{'loading': loading}">
            <slot name="loading">
                <span
                    v-text="loadingText"
                    :class="{'loading-text': loadingText}"
                ></span>
            </slot>
        </div>
        <div
            v-if="finished && finishedText"
            v-text="finishedText"
            :class="{'finished-text': finishedText}"
        ></div>
    </div>
</template>

<script type="text/ecmascript-6">
	import {ScrollTools, OnEvent, OffEvent} from '../utils/index.js';

	export default {
		name: 'EdLoadMore',
        model: {
		    prop: 'loading'
        },
        props: {
		    loading: {
		    	type: Boolean,
                default: false
            },
            finished: {
		    	type: Boolean,
                default: false
            },
            loadingText: {
		    	type: String,
                default: '加载中...'
            },
            finishedText: {
		    	type: String,
                default: '没有更多了'
            },
            immediateCheck: {
		    	type: Boolean,
                default: true
            },
            offset: {
		    	type: Number,
                default: 300
            }
        },
		data() {
			return {};
		},
        mounted() {
			this.scroller = ScrollTools.getScrollEventTarget(this.$el);
			this.handler(true);
			if (this.immediateCheck) {
				this.$nextTick(this.check);
            }
        },
        methods: {
		    check() {
		    	if (this.loading || this.finished) { return }
		    	const el = this.$el;
		    	const {scroller} = this;
				const scrollerHeight = ScrollTools.getVisibleHeight(scroller);
				if (
					!scrollerHeight ||
					ScrollTools.getComputedStyle(el).display === 'none' ||
					el.offsetParent === null
                ) {
					return;
                }
				const scrollTop = ScrollTools.getScrollTop(scroller);
				const targetBottom = scrollTop + scrollerHeight;
				let reachBottom = false;
				if (el === scroller) {
					reachBottom = scroller.scrollHeight - targetBottom < this.offset;
				} else {
					const elBottom =
						ScrollTools.getElementTop(el) -
						ScrollTools.getElementTop(scroller) +
						ScrollTools.getVisibleHeight(el);
					reachBottom = elBottom - scrollerHeight < this.offset;
				}
				if (reachBottom) {
					this.$emit('input', true);
					this.$emit('load');
				}
			},
			handler(bind) {
				/* istanbul ignore else */
				if (this.binded !== bind) {
					this.binded = bind;
					(bind ? OnEvent : OffEvent)(this.scroller, 'scroll', this.check);
				}
			}
        },
        watch: {
			loading() {
				this.$nextTick(this.check);
            },
            finished() {
				this.$nextTick(this.check);
            }
        },
	};
</script>

<style lang="scss">
    @import "../ed-css/_mixins.scss";

    .ed-load-more {
        .loading, .loading-text, .finished-text {
            color: $gray;
            font-size: 12px;
            text-align: center;
            line-height: 50px;
        }
    }
</style>
