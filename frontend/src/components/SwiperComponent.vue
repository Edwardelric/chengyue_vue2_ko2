<template>
    <div class="swiper-wrapper">
        <van-swipe :autoplay="3000" indicator-color="white" class="van-swiper">
            <van-swipe-item>
              <img src="http://images.baixingliangfan.cn/homeFloor/20180407/20180407181247_7554.jpg" />
            </van-swipe-item>
            <van-swipe-item>
              <img src="http://images.baixingliangfan.cn/homeFloor/20180407/20180407181216_8263.jpg" />
            </van-swipe-item>
            <van-swipe-item>
              <img src="http://images.baixingliangfan.cn/homeFloor/20180407/20180407181247_7554.jpg" />
            </van-swipe-item>
            <van-swipe-item>
              <img src="http://images.baixingliangfan.cn/homeFloor/20180407/20180407181316_6196.jpg" />
            </van-swipe-item>
            <van-swipe-item>
              <img src="http://images.baixingliangfan.cn/homeFloor/20180407/20180407181348_4054.jpg" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {};
		},
        created() {}
	};
</script>

<style lang="scss" scoped>
    @import "../assets/scss/_mixins";

    .swiper-wrapper {
        background: $white;
        padding: 0 rem(16);
        .van-swiper{
            overflow: hidden;
            height: rem(140);
            box-shadow: 1px 1px 20px $gray, -1px -1px 20px $gray;
            img {
                width: 100%;
            }
        }
    }
</style>
