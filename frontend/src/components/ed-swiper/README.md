# EdSwiper

* 轮播 组件
 
## 可选的配置项：
### 公用属性

 配置项 | 类型 | 描述 | 默认值 
------------------|---------|-------------------------------- |-----
 animateType      | String  | 轮播类型swiper或depth             | swiper
 threshold        | Number  | 轮播滑动的阈值                     | 50
 autoplay         | Number  | 是否自动轮播,为0的时候为停止自动轮播   | 1600
 duration         | Number  | 轮播时长                          | 500
 showIndicators   | Boolean | 是否展示点                        | true
 timingFunction   | String  | 轮播运动类型                      | 'ease'

### swiper 轮播类型属性

 配置项 | 类型 | 描述 | 默认值 
------------------|---------|-------------------------------- |-----
 vertical         | Boolean | 是否垂直轮播                      | false 
 loop             | Boolean | 是否无缝轮播                       | true


### depth 轮播类型属性

 配置项 | 类型 | 描述 | 默认值 
------------------|---------|-------------------------------- |----- 
 depthSpaceBetween| Number  | 轮播图距离两边区域距离              | 0
 
