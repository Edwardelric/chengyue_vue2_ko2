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
                    {label: '玻璃', type: 0},
                    {label: '铝合金', type: 1},
                    {label: '钢化门', type: 2},
                ],
                options: {
                    canViewItemNum: 3,
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
