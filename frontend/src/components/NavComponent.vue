<template>
  <div class="nav-wrapper">
    <div class="nav-flex">
      <EdTab
        v-model="selectedId"
        :items="items"
        :options="options"
        @change="changeFn"
      ></EdTab>
      <div class="condition">
        <van-icon name="bar-chart-o" />
      </div>
    </div>
    <div class="condition-drawer" v-if="false">
      <h4>条件查询</h4>
      <ul>
        <li class="flex">
          <label>地区</label>
          <input placeholder="请选择省/市/区" @click="popupClick(0)"/>
        </li>
        <li class="flex">
          <label>行业</label>
          <input placeholder="请选择行业" @click="popupClick(1)"/>
        </li>
        <li class="flex">
          <label>规模</label>
          <input placeholder="请选择规模" @click="popupClick(2)"/>
        </li>
        <li class="flex">
          <label>学历</label>
          <input placeholder="请选择学历" @click="popupClick(3)"/>
        </li>
        <li class="flex">
          <label>期望薪水</label>
          <input placeholder="请选择薪水" @click="popupClick(4)"/>
        </li>
      </ul>
      <span>保存</span>
      <span>重置</span>
    </div>
    <van-popup v-model="provinceShow" position="bottom" class="own-popup">
      <ul class="flex btns">
        <li>取消</li>
        <li>确认</li>
      </ul>
      <div v-if="popupClickIndex === 0">
        <van-picker :columns="provinceColumns" @change="pickerChange" />
      </div>
      <div v-if="popupClickIndex === 1">
        <van-picker :columns="tradeColumns" @change="pickerChange" />
      </div>
      <div v-if="popupClickIndex === 2">
        <van-picker :columns="scaleColumns" @change="pickerChange" />
      </div>
      <div v-if="popupClickIndex === 3">
        <van-picker :columns="eduColumns" @change="pickerChange" />
      </div>
      <div v-if="popupClickIndex === 4">
        <van-picker :columns="salaryColumns" @change="pickerChange" />
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import EdTab from './ed-tab';

  const citys = {
    '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    '福建': ['福州', '厦门', '莆田', '三明', '泉州']
  };

	export default {
		data() {
			return {
        selectedId: 0,
        items: [
          {label: '招商', type: 0},
          {label: '招聘', type: 1},
          {label: '房源', type: 2},
          {label: '装潢', type: 3},
          {label: '二手车', type: 4},
          {label: '电器', type: 5},
          {label: '促销', type: 6}
        ],
        options: {
          canViewItemNum: 5,
          tabStyle: {
            color: '#61687c'
          },
          activeStyle: {
            color: '#55cbc4',
            fontSize: '15px'
          }
        },
        provinceColumns: [
          {
            values: Object.keys(citys),
            className: 'column1'
          },
          {
            values: citys['浙江'],
            className: 'column2',
            defaultIndex: 2
          }
        ],
        tradeColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        scaleColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        eduColumns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        salaryColumns: [
          {
            values: Object.keys(citys),
            className: 'column1'
          },
          {
            values: citys['浙江'],
            className: 'column2',
            defaultIndex: 2
          }
        ],
        provinceShow: false,
        popupClickIndex: 0
      };
		},
    methods: {
      changeFn(...args) {
        console.log(args);
      },
      popupClick(index) {
        this.provinceShow = true;
        this.popupClickIndex = index;
      },
      pickerChange(item) {

      }
    },
    mounted() {
    },
    components: {
      EdTab
    }
	};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/_mixins";

  .nav-wrapper {
    .nav-flex {
      display: flex;
      .condition {
        flex: 0 0 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border-bottom: 1px solid $green;
        background: $white;
        color:$green;
        font-size: 16px;
      }
    }
    .condition-drawer {
      position: absolute;
      top: 0;
      right: 0%;
      z-index: 999;
      width: 90%;
      height: 100%;
      background: $white;
      color: #61687c;
      font-size: 14px;
      h4 {
        padding: rem(20);
      }
      li {
        margin: 0 rem(20);
        padding: rem(10) 0;
        border-bottom: 1px solid #ebedf0;
        label {
          flex: 0 0 100px;
        }
        input {
          flex: 1;
        }
      }
      span {
        display: block;
        margin: rem(20);
        height: rem(40);
        border-radius: 4px;
        color: $white;
        text-align: center;
        line-height: rem(40);
        &:nth-of-type(1) {
          background: $green;
        }
        &:nth-of-type(2) {
          background: $gray;
        }
      }
    }
  }
</style>
