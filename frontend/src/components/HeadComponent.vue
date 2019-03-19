<template>
    <div class="header-wrapper">
        <van-row class="header" type="flex" align="center">
            <van-col span="3" class="logo">
                <img src="../assets/images/home/home.jpeg" @click="goTo"/>
                <!--登录-->
            </van-col>
            <van-col span="18">
                <div class="search">
                    <div class="area">
                        <span @click="showPopup = true">{{areaName}}</span>
                        <van-icon name="arrow-down" />
                        <span>|</span>
                    </div>
                    <div class="search-icon-wrap">
                        <van-icon name="search" class="search-icon"/>
                    </div>
                    <div class="search-input">
                        <input type="text" placeholder="请输入搜索内容" v-model="searchVal">
                        <van-icon name="clear" class="clear-btn" v-if="searchVal.length" @click="clearSearchVal"/>
                    </div>
                </div>
            </van-col>
            <van-col span="3" class="login">
                <router-link to="/login">搜索</router-link>
            </van-col>
        </van-row>
        <van-popup v-model="showPopup" position="bottom">
            <van-area :area-list="area" @confirm="confirm" @cancel="cancel"/>
        </van-popup>
    </div>
</template>

<script type="text/ecmascript-6">
    import area from '../../mock/area'

	export default {
		data() {
			return {
                searchVal: '',
				area,
				areaData: [],
				showPopup: false
			};
        },
        methods: {
			confirm(item) {
			    this.areaData = item;
			    this.showPopup = false;
            },
            cancel(item) {
				this.showPopup = false;
            },
            clearSearchVal() {
                // 清空input内容
                this.searchVal = '';
            },
            goTo() {
                // 跳转路径
                this.$router.push({path: '/company/intro'});
            }
        },
        computed: {
			areaName() {
				if (this.areaData[this.areaData.length - 1]) {
					return this.areaData[this.areaData.length - 1].name;
                } else {
					return '上海';
                }
            }
        }
	};
</script>

<style lang="scss">
    @import "../assets/scss/_mixins";

    /*.header-wrapper {*/
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        /*z-index: 100;*/
        /*width: 100%;*/
    /*}*/
    .header {
        height: rem(58);
        padding: 0 rem(16);
        background: $green;
        color: $white;
        font-size: 14px;
        .logo {
            width: 32px;
            height: 32px;
            margin-right: 10px;
            line-height: 32px;
            img {
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }
        }
        .search {
            display: flex;
            padding: 4px 10px;
            border-radius: 4px;
            background: $white;
            color: $gray;
            line-height: 24px;
            .area {
                display: flex;
                align-items: center;
                color: $gray-lighter;
                font-size: 12px;
                span:nth-of-type(2) {
                    padding: 0 5px;
                }
            }
            .search-icon-wrap {
                margin-right: 5px;
                i {
                    display: block;
                    color: #323233;
                    font-size: 16px;
                    line-height: inherit;
                }
            }
            .search-input {
                flex: 1;
                display: flex;
                align-items: center;
                input {
                    display: block;
                    width: 100%;
                    margin: 0;
                    padding: 0;
                    transform: translateY(1px);
                    border: 0;
                    color: #323233;
                    resize: none;
                    background-color: transparent;
                }
                .clear-btn {
                    display: block;
                    margin-left: 10px;
                    color: $gray-lighter;
                    font-size: 16px;
                    line-height: inherit;
                }
            }
        }
        .login {
            text-align: right;
            a {
                color: #fff;
            }
        }
    }
</style>
