<template>
    <EdTab
        v-model="selectedId"
        :items="items"
        :options="options"
        @change="changeFn"
    ></EdTab>
</template>

<script type="text/ecmascript-6">
  import EdTab from './ed-tab';
  import Condition from './FilterBar';

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
        }
      };
		},
    methods: {
      changeFn(...args) {
        console.log(args);
      }
    },
    mounted() {},
    components: {
      EdTab,
      Condition
    }
	};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/_mixins";

  .nav-flex {
    display: flex;
  }

</style>
