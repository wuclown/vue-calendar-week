# vue-calendar-week

这是一个基于 hammerjs vue 滑动周日历组件（无限滚动）。

`npm i vue-calendar-week -S`

```
import VueCalendarWeek from "vue-calendar-week"
<VueCalendarWeek v-model="value" />
data{
    return {
        value : new Date()
    }
}
```

### 演示

[暂无 demo 显示》》]("")

### API

| 参数      | 说明                                         | 类型            | 默认值     | 版本 |
| --------- | -------------------------------------------- | --------------- | ---------- | ---- |
| v-model   | 日历初始化                                   | Date            | new Date() | -    |
| animation | 滑动切换动画                                 | Number          | 500        | -    |
| threshold | 滑动阀值                                     | Number          | 50         | -    |
| today     | 当前日期文字映射（设置为 null 显示当天日期） | String          | 今         | -    |
| click     | 日期点击事件                                 | Function(value) | -          | -    |
| change    | 日期切换事件                                 | Function(value) | -          | -    |

> 说明：  
> 1、不提供任何样式 props，自己随便改（宽度自动获取组件宽度）。  
> 2、公司项目使用，只测试微信浏览器。  
> 3、如果你使用的是 vue-jsx 我想你应该知道怎么做。
