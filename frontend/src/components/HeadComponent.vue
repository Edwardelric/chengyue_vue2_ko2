<template>
  <div>
    <van-row class="header" type="flex" align="center">
      <van-col span="3" class="logo">
        <img src="../assets/images/home/home.jpeg" @click="goTo"/>
      </van-col>
      <van-col span="18">
        <van-search placeholder="请输入搜索关键词" v-model="searchVal" class="search-input" style="background: #55cbc4"/>
      </van-col>
      <van-col span="3" class="login">
        <router-link to="/login">登录</router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
        searchVal: ''
      };
		},
    methods: {
      clearSearchVal() {
        // 清空input内容
		    this.searchVal = '';
      },
      goTo() {
        // 跳转路径
        this.$router.push({path: '/company/intro'});
      }
    }
	};
</script>

<style lang="scss">
  @import "../assets/scss/_mixins";

  .header {
    height: rem(58);
    padding: 0  rem(16);
    background: $green;
    color: $white;
    font-size: 14px;
    .logo {
      margin-right: 10px;
      img {
        width: 90%;
        border-radius: 50%;
      }
    }
    .search-input {
      padding: 0;
    }
    .login {
      text-align: right;
      a {
        color: #fff;
      }
    }
  }
</style>
