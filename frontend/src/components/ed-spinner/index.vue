<template>
    <div
        class="ed-loading"
        :style="style"
    >
        <span class="ed-loading-spinner ed-loading--spinner">
            <i v-for="(item, index) in (type === 'spinner' ? 12 : 0)" :key="index"/>
            <svg
                v-if="type === 'circular'"
                :class="b('circular')"
                viewBox="25 25 50 50"
            >
                <circle cx="50" cy="50" r="20" fill="none" />
            </svg>
        </span>
    </div>
</template>

<script type="text/ecmascript-6">
	const DEFAULT_COLOR = '#c9c9c9';
	export default {
        name: 'edSpinner',
        props: {
        	size: {
        		type: String,
                default: 'circular'
            },
            color: {
        		type: String,
                default: DEFAULT_COLOR
            }
        },
		data() {
			return {};
		},
        computed: {
        	colorType() {
        		const {color} = this;
				return color === 'white' || color === 'black' ? color : '';
            },
            style() {
        		return {
					color: this.color === 'black' ? DEFAULT_COLOR : this.color,
					width: this.size,
					height: this.size
                }
            }
        }
	};
</script>

<style lang="scss" scoped>
  .ed-loading {
      position: relative;
      width: 30px;
      height: 30px;
      z-index: 0;
      line-height: 0;
      vertical-align: middle;
      &.circle {
          width: 16px;
          height: 16px;
      }
      .ed-loading-spinner {
          z-index: -1;
          width: 100%;
          height: 100%;
          position: relative;
          display: inline-block;
          box-sizing: border-box;
          animation: van-rotate 0.8s linear infinite;
      }
      .ed-loading--spinner {
          animation-timing-function: steps(12);
          i {
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              position: absolute;

              &::before {
                  width: 2px;
                  height: 25%;
                  content: ' ';
                  display: block;
                  margin: 0 auto;
                  border-radius: 40%;
                  background-color: currentColor;
              }
          }
      }
  }
</style>
