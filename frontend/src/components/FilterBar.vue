<template>
    <div class="filter-bar">
        <ul class="flex filter-tab">
            <li :class="{active: tabIndex === 0}" @click="tabIndex = 0">信用<van-icon name="arrow-down"/></li>
            <li :class="{active: tabIndex === 1}" @click="tabIndex = 1">综合<van-icon name="arrow-down"/></li>
            <li class="flex" :class="{active: tabIndex === 2}" @click="tabIndex = 2;">
                <div class="view-type" @click="viewType = viewType === 0 ? 1 : 0">
                    <van-icon name="qr" v-if="viewType === 0" />
                    <van-icon name="filter-o" v-if="viewType === 1"/>
                </div>
                <div class="flex" @click="showFilterContent = true">
                    <span>筛选</span>
                    <van-icon name="filter-o" />
                </div>
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
                        <dt></dt>
                        <dd v-for="(item, index) in education"
                            :key="index"
                            @click="filterClick(0, index)"
                            :class="{active: education[index].selected}"
                        >{{item.name}}</dd>
                    </dl>
                </van-collapse-item>
                <van-collapse-item title="待遇" name="salary">
                    <dl class="filter-item">
                        <dt></dt>
                        <dd v-for="(item, index) in salary"
                            :key="index"
                            @click="filterClick(1, index)"
                            :class="{active: salary[index].selected}"
                        >{{item.name}}</dd>
                    </dl>
                </van-collapse-item>
            </van-collapse>
            <div class="btn-groups">
                <p class="own-btns own-btns-primary" @click="confirm">确定</p>
                <p class="own-btns" @click="cancel">重设</p>
            </div>
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
				activeNames: ['industry'],
                showFilterContent: false,
				company,
				education,
				salary,
                viewType: 0
            }
        },
        created() {
        	this.init();
        },
        methods: {
        	init(flag) {
				this.company.forEach((item, index) => {
					if (item.value) {
                        item.value.forEach((subItem, subIndex) => {
                        	if (!flag) {
                        		// 初始化添加到obs
								this.$set(item.value[subIndex], 'selected', false);
                            } else {
                        		// 重置select为false
                        	    item.value[subIndex].selected = false;
                            }
                        });
                    }
				});
				let arr = [this.education, this.salary];
				arr.forEach((item, index) => {
					item.forEach((subItem, subIndex) => {
						if (!flag) {
							// 初始化天骄到obs
							this.$set(item[subIndex], 'selected', false);
                        } else {
							// 重置select为false
							item[subIndex].selected = false;
                        }

					})
				})
            },
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
            },
            confirm() {
			    this.showFilterContent = false;
            },
            cancel() {
        		// 重置
                this.init(true);
				this.showFilterContent = false;
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
                flex: 1;
                padding: rem(8) rem(10);
                border-radius: 6px;
                color: $gray-lighter;
                i {
                    vertical-align: middle;
                }
                &.active {
                    color: $green;
                    .view-type {
                        color: $gray;
                    }
                }
                &:last-of-type {
                    justify-content: flex-end;
                    text-align: right;
                }
                .view-type {
                    margin-right: rem(10);
                    padding-right: rem(6);
                    border-right: 2px solid $gray;
                    i {
                        font-size: 16px;
                        line-height: inherit;
                    }
                }
            }
            i {
                font-size: rem(14);
            }
        }
        .filter-content {
            position: fixed;
            top: 0;
            right: -92%;
            z-index: 100;
            width: calc(100% - 48px);
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
            .btn-groups {
                margin: rem(20) rem(10);
            }
        }
    }
</style>
