<template>
    <div class="filter-bar">
        <ul class="flex filter-tab">
            <li :class="{active: tabIndex === 0}" @click="tabIndex = 0">信用</li>
            <li :class="{active: tabIndex === 1}" @click="tabIndex = 1">综合</li>
            <li class="flex" :class="{active: tabIndex === 2}" @click="tabIndex = 2; showFilterContent = true">
                <span>筛选</span>
                <van-icon name="filter-o" />
            </li>
        </ul>
        <div class="own-mask" @click="showFilterContent = false" :class="{active: showFilterContent}"></div>
        <div class="filter-content" :class="{active: showFilterContent}">
            <van-collapse v-model="activeNames">
                <van-collapse-item title="公司" name="industry">
                    <dl class="filter-item" v-for="(item, index) in company" :key="index">
                        <dt>{{item.name}}</dt>
                        <dd v-for="(subItem, subIndex) in item.value"
                            :key="subIndex"
                            @click="filterCompanyClick(index, subIndex)"
                            :class="{active: company[index].value[subIndex].selected}"
                        >{{subItem.name}}</dd>
                    </dl>
                </van-collapse-item>
                <van-collapse-item title="学历" name="edu">
                    <dl class="filter-item">
                        <dt>学历</dt>
                        <dd v-for="(item, index) in education"
                            :key="index"
                            @click="filterClick(0, index)"
                            :class="{active: education[index].selected}"
                        >{{item.name}}</dd>
                    </dl>
                </van-collapse-item>
                <van-collapse-item title="待遇" name="salary">
                    <dl class="filter-item">
                        <dt>薪水</dt>
                        <dd v-for="(item, index) in salary"
                            :key="index"
                            @click="filterClick(1, index)"
                            :class="{active: salary[index].selected}"
                        >{{item.name}}</dd>
                    </dl>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import company from '../../mock/company'
	import education from '../../mock/education'
	import salary from '../../mock/salary'

    export default {
        data() {
        	return {
        		tabIndex: 0,
				activeNames: ['province'],
                showFilterContent: false,
				company,
				education,
				salary
            }
        },
        created() {
        	this.company.forEach((item, index) => {
        		if (item.value) {
        			this.company[index].value.forEach((subItem, subIndex) => {
        				this.$set(this.company[index].value[subIndex], 'selected', false);
                    });
                }
            });
            let arr = [this.education, this.salary];
            arr.forEach((item, index) => {
            	item.forEach((subItem, subIndex) => {
            		this.$set(item[subIndex], 'selected', false);
                })
            })
        },
        methods: {
			filterCompanyClick(clickIndex, clickSubIndex) {
				// 点击单选和反选
                if (!clickSubIndex) {
                	this.company[clickIndex].value.forEach((item, index) => {
                		if (!index) {
                			item.selected = true;
                        } else {
                			item.selected = false;
                        }
                    })
                } else {
                	this.company[clickIndex].value[0].selected = false;
					this.company[clickIndex].value[clickSubIndex].selected = !this.company[clickIndex].value[clickSubIndex].selected;
                }
            },
			filterClick(type, clickIndex) {
				// 学历和待遇单选和反选
                let tmp = [this.education, this.salary][type || 0];
				if (!clickIndex) {
					tmp.forEach((item, index) => {
						if (!index) {
							item.selected = true;
						} else {
							item.selected = false;
						}
					})
				} else {
					tmp[0].selected = false;
					tmp[clickIndex].selected = !tmp[clickIndex].selected;
				}
            }
        }
    }

</script>

<style lang="scss">
    @import "../assets/scss/_mixins";

    .filter-bar {
        position: relative;
        .filter-tab {
            align-items: center;
            padding: rem(10) rem(16);
            background: $white;
            color: $gray-lighter;
            font-size: rem(12);
            li {
                padding: rem(8) rem(10);
                border: 1px solid $gray-lighter;
                border-radius: 6px;
                color: $gray-lighter;;
                &.active {
                    border: 1px solid $green;
                    color: $green;
                }
            }
            i {
                font-size: rem(14);
            }
        }
        .filter-content {
            position: fixed;
            top: 0;
            right: -91%;
            z-index: 100;
            width: 90%;
            height: 100%;
            overflow-y: scroll;
            background: $white;
            transition: right 600ms;
            &.active {
                right: 0;
            }
            .filter-item {
                margin-bottom: rem(10);
                dt {
                    display: block;
                    margin-bottom: rem(4);
                }
                dd {
                    display: inline-block;
                    margin: rem(4) rem(6) rem(4) 0;
                    padding: rem(6) rem(8);
                    border: 1px solid $gray;
                    border-radius: 6px;
                    &.active {
                        border: 1px solid $green;
                        color: $green;
                    }
                }
            }
        }
    }
</style>
