<template>
    <van-swipe :autoplay="3000" indicator-color="white" class="van-swiper">
        <van-swipe-item v-for="(item, index) in imgLists" :key="index">
          <img :src="item" />
        </van-swipe-item>
    </van-swipe>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			imgLists: {
		    	type: Array,
                default: []
			}
        },
		data() {
			return {};
		},
        created() {}
	};
</script>

<style lang="scss" scoped>
    @import "../assets/scss/_mixins";

    .van-swiper{
        overflow: hidden;
        height: rem(140);
        box-shadow: 1px 1px 20px $gray, -1px -1px 20px $gray;
        background: $gray;
        img {
            display: block;
            margin: 0 auto;
            height: 100%;
        }
    }
</style>
