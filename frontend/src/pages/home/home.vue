<template>
    <div class="home">
        <HeadComponent></HeadComponent>
        <NavComponent></NavComponent>
        <FilterBar></FilterBar>
        <SwiperComponent></SwiperComponent>
        <!--<GoodsComponent></GoodsComponent>-->
        <TabBar></TabBar>
    </div>
</template>

<script type="text/ecmascript-6">
    import HeadComponent from '@/components/HeadComponent';
    import NavComponent from '@/components/NavComponent';
    import SwiperComponent from '@/components/SwiperComponent';
    import FilterBar from '@/components/FilterBar';
    import GoodsComponent from '@/components/GoodsComponent';
    import TabBar from '@/components/TabBar';

    export default {
		data() {
			return {
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
            onSelect() {}
        },
        mounted() {
        },
        components: {
            HeadComponent,
            NavComponent,
            SwiperComponent,
			FilterBar,
            GoodsComponent,
			TabBar
        }
	};
</script>

<style lang="scss" scoped></style>
