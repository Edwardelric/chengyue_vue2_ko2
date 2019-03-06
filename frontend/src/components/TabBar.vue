<template>
    <ul class="flex tabbar-wrapper">
        <li class="active">
            <van-icon name="wap-home"></van-icon>
            <p>首页</p>
        </li>
        <li>
            <van-icon name="friends-o"></van-icon>
            <p>公司</p>
        </li>
        <li>
            <van-icon name="setting-o"></van-icon>
            <p>我</p>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				active: 0
            };
		}
	};
</script>

<style lang="scss">
    @import "../assets/scss/_mixins";

    .tabbar-wrapper {
        width: 100%;
        height: rem(50);
        border-top: 1px solid $gray;
        background: $white;
        font-size: rem(16);
        li {
            flex: 1;
            color: #61687c;
            font-size: rem(12);
            text-align: center;
            i {
                font-size: rem(22);
            }
            &.active {
                color: $green;
            }
        }
    }
</style>
