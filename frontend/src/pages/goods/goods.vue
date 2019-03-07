<template>
    <div class="goods-wrapper">
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        ></van-nav-bar>
        <SwiperComponent v-if="goodData && goodData.imgLists" :imgLists="goodData.imgLists"></SwiperComponent>
        <van-tabs v-model="active" sticky>
            <van-tab title="产品介绍" v-html="goodData.goodsIntro" class="goods-intro"></van-tab>
            <van-tab title="公司介绍">
                <div v-html="goodData.intro" class="goods-intro"></div>
            </van-tab>
        </van-tabs>
        <div class="btn-groups">
            <p class="own-btns own-btns-primary">联系方式: 18516286011</p>
        </div>
    </div>
</template>

<script>
    import { URL } from '@/utils/serviceAPI.js';
    import { Toast } from 'vant';
	import SwiperComponent from '@/components/SwiperComponent';

    export default {
        data() {
            return {
				active: 0,
                // goodId: '',
                // goodsInfo: {}
				goodData: {}
            }
        },
        created() {
        	this.goodData = this.$route.query.goodData;
        	console.log(this.goodData);
        },
        methods: {
            // getInfo() {
            //     console.log(this.goodId);
            //     this.$ajax.post(URL.getDetailGoodsInfo, {
            //         ID: this.goodId
            //     }).then(res => {
            //         if (!res.errorCode) {
            //             this.goodsInfo = res.result;
            //         } else {
            //             Toast.fail('获取商品数据失败');
            //         }
            //     }).catch(err => {
            //         Toast.fail('获取商品数据失败');
            //     });
            // },
            onClickLeft() {
                this.$router.go(-1);
            },
            // addGoodsToCart() {
            //
            // }
        },
        components: {
			SwiperComponent
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/_mixins";

    .goods-wrapper {
        .goods-intro {
            padding: rem(16) rem(16) rem(50) rem(16);
            color: #61687c;
            line-height: rem(26);
            text-indent: rem(22);
        }
        .btn-groups {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            .own-btns-primary {
                margin-bottom: 0;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
    }
</style>

