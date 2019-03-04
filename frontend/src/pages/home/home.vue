<template>
  <div class="home">
    <HeadComponent></HeadComponent>
    <NavComponent></NavComponent>
    <SwiperComponent></SwiperComponent>
    <GoodsComponent></GoodsComponent>
  </div>
</template>

<script type="text/ecmascript-6">
  import HeadComponent from '@/components/HeadComponent';
  import NavComponent from '@/components/NavComponent';
  import SwiperComponent from '@/components/SwiperComponent';
  import GoodsComponent from '@/components/GoodsComponent';

	export default {
		data() {
			return {
        show: false,
        value: '',
        actions: [
          {
            name: '选项'
          },
          {
            name: '选项',
            subname: '描述信息'
          }
        ]
      };
		},
    methods: {
      onSelect() {

      }
    },
    mounted() {
		  setTimeout(() => {
		    this.show = true;
      }, 3000)
    },
    components: {
      HeadComponent,
      NavComponent,
      SwiperComponent,
      GoodsComponent
    }
	};
</script>

<style lang="scss" scoped>

</style>
