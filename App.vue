<!--
 * @Author: wyj
 * @Date: 2019-11-12 22:12:13
 * @LastEditors  : wyj
 * @LastEditTime : 2019-12-18 10:27:24
 * @Description: 
 -->
<template>
    <VueCalendarWeek />
</template>
<script>
import VueCalendarWeek from "./app/index.js"
export default {
    components: {
        VueCalendarWeek
    },
    data() {
        return {
            value: 0
        }
    }
}
</script>
