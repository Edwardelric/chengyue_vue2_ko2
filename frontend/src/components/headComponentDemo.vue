<template>
  <div>
    <van-row class="header" type="flex" align="center">
      <van-col span="21">
        <div class="header-search">
          <div class="search-type">
            <span @click="openActions">{{actions[selectedType].name || 渠道}}</span>
            <van-icon name="arrow-down" />
            <span>|</span>
          </div>
          <van-icon name="search" class="search-icon"/>
          <div class="search-input">
            <input type="text" placeholder="请输入搜索内容" v-model="searchVal">
            <van-icon name="clear" class="clear-btn" v-if="searchVal.length" @click="clearSearchVal"/>
          </div>
        </div>
      </van-col>
      <van-col span="3" class="login">
        <router-link to="/login">登录</router-link>
      </van-col>
    </van-row>
    <van-actionsheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
        show: false,
        actions: [
          {
            name: '渠道',
            subname: '(默认)',
            type: 0
          },
          {
            name: '招聘',
            type: 1
          },
          {
            name: '房源',
            type: 2,
            disabled: true
          },
          {
            name: '玻璃',
            type: 3,
            disabled: true
          }
        ],
        selectedType: 0,
        searchVal: ''
      };
		},
    methods: {
		  openActions() {
        // 显示上拉菜单
        this.show = true;
      },
      onSelect(item) {
        // 选择菜单
        this.show = false;
        this.selectedType = item.type || 0;
      },
      clearSearchVal() {
		    this.searchVal = '';
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
    .header-search {
      display: flex;
      align-items: center;
      padding:rem(5) rem(10) rem(5) rem(10);
      border-radius: 4px;
      background: $white;
      .search-type {
        display: flex;
        align-items: center;
        color: #969799;
        font-size: rem(12);
        i {
          margin-left: rem(3);
        }
        span:nth-of-type(2) {
          padding: 0 rem(10) 0 rem(5);
        }
      }
      .search-icon {
        margin-right: rem(5);
        color: #969799;
        font-size: rem(16);
      }
      .search-input {
        flex: 1;
        display: flex;
        align-items: center;
        text-align: left;
        input {
          width: 100%;
          color: #323233;
        }
        .clear-btn {
          color: #969799;
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
