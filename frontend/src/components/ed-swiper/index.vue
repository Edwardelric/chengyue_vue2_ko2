<template>
    <div class="ed-swiper-wrapper" :style="style">
        <SwiperItem
            v-model="val"
            v-bind="options"
        >
            <SwiperCell v-if="options.items" v-for="(item, index) in options.items" :key="index" :animateType="options.animateType">
                <slot v-if="item.src1">
                    <a :href="item.href"><img :src="item.src" /></a>
                </slot>
                <slot v-else name="swiperTmp" :$index="index"></slot>
            </SwiperCell>
        </SwiperItem>
        <SwiperIndicator
            v-if="options.showIndicators"
            v-model="val"
            v-bind="options"
        >
            <slot name="indicator"></slot>
        </SwiperIndicator>
    </div>
</template>

<script type="text/ecmascript-6">
    import SwiperItem from './swiperItem.vue';
    import SwiperCell from './swiperCell.vue';
    import SwiperIndicator from './SwiperIndicator.vue';

	export default {
        name: 'EdSwiper',
        props: {
            value: {
                type: Number,
                default: 0
            },
            options: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
		data() {
			return {
				val: this.value
            };
		},
        computed: {
            style() {
                if (this.options.height) {
                    return {
                        height: `${this.options.height}px`
                    }
                } else {
                	return {height: '100%'}
                }
            }
        },
        watch: {
        	val(newVal, oldVal) {
        	    if (newVal !== oldVal) {
        	    	this.$emit('change', newVal);
                }
            },
        	value(newVal, oldVal) {
                if (newVal !== oldVal) {
                	this.val = newVal;
                }
            }
        },
        components: {
            SwiperItem,
            SwiperCell,
            SwiperIndicator
        }
	};
</script>

<style lang="scss">
    .ed-swiper-wrapper {
        overflow: hidden;
        position: relative;
        width: 100%;
    }
</style>
