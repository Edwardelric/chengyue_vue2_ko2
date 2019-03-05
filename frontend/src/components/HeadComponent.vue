<template>
    <div class="header-wrapper">
        <van-row class="header" type="flex" align="center">
            <van-col span="3" class="logo">
                <img src="../assets/images/home/home.jpeg" @click="goTo"/>
            </van-col>
            <van-col span="18">
                <!--<div class="header-search">-->
                    <!--&lt;!&ndash;<div class="search-type">&ndash;&gt;-->
                        <!--&lt;!&ndash;<span @click="showPopup = true">{{areaName}}</span>&ndash;&gt;-->
                        <!--&lt;!&ndash;<van-icon name="arrow-down" />&ndash;&gt;-->
                        <!--&lt;!&ndash;<span>|</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->

                    <!--<van-icon name="search" class="search-icon"/>-->

                    <!--<div class="search-input">-->
                        <!--<input type="text" placeholder="请输入搜索内容" v-model="searchVal">-->
                        <!--<van-icon name="clear" class="clear-btn" v-if="searchVal.length" @click="clearSearchVal"/>-->
                    <!--</div>-->
                <!--</div>-->
                <div class=" header-search" style="display: flex; align-items: center;background: rgb(255, 255, 255);border-radius: 4px;">

                        <div class="van-cell1">
                            <van-icon name="search" class="search-icon"/>
                            <div class="search-input">
                                <input type="text" placeholder="请输入搜索内容" v-model="searchVal">
                            </div>
                        </div>

                </div>
            </van-col>
            <van-col span="3" class="login">
                <router-link to="/login">登录</router-link>
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
                searchVal: '请输入搜索内容请输入搜索内容请输入搜索内容',
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

    .van-cell1 {
        width: 100%;
        flex: 1;
        display: flex;
        padding: 5px 10px;
        line-height: 24px;
        position: relative;
        background-color: #fff;
        color: #323233;
        font-size: 14px;
        overflow: hidden;
    }
    .header {
        height: rem(58);
        padding: 0  rem(16);
        background: $green;
        color: $white;
        font-size: rem(14);
        .logo {
            margin-right: 10px;
            img {
                width: 90%;
                border-radius: 50%;
            }
        }
        .header-search {
            display: flex;
            align-items: center;
            /*padding: 5px 10px;*/
            border-radius: 4px;
            background: $blue;
            .search-type {
                display: flex;
                align-items: center;
                color: $gray-lighter;
                font-size: rem(12);
                i {
                    margin-left: rem(3);
                }
                span:nth-of-type(2) {
                    padding: 0 rem(10) 0 rem(5);
                }
            }
            .search-icon {
                display: block;
                margin-right: rem(5);
                color: $gray-lighter;
                font-size: rem(16);
                line-height: inherit;
            }
            .search-input {
                flex: 1;
                display: flex;
                align-items: center;
                text-align: left;
                input {
                    width: 100%;
                    border: 0;
                    margin: 0;
                    padding: 0;
                    resize: none;
                    color: #323233;
                }
                .clear-btn {
                    color: $gray-lighter;
                    font-size: rem(16);
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
