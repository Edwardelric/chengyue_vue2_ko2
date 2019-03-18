<template>
    <div class="home">
        <HeadComponent></HeadComponent>
        <!--<NavComponent></NavComponent>-->
        <!--<FilterBar></FilterBar>-->
        <!--<SwiperComponent></SwiperComponent>-->
        <ListComponent></ListComponent>
        <!--<TabBar></TabBar>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import HeadComponent from '@/components/HeadComponent';
    import NavComponent from '@/components/NavComponent';
    import SwiperComponent from '@/components/SwiperComponent';
    import FilterBar from '@/components/FilterBar';
    import ListComponent from '@/components/ListComponent';
    import TabBar from '@/components/TabBar';

    export default {
		data() {
			return {};
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
			ListComponent,
			TabBar
        }
	};
</script>

<style lang="scss" scoped>
    .home {
        height: 100%;
        background: #fff;
    }
</style>
