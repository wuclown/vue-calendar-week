import Hammer from "hammerjs"
import "./styles.less"
const weekList = ["一", "二", "三", "四", "五", "六", "日"]
export default {
    name: "VueCalendarWeek",
    props: {
        // 日期
        value: {
            type: Date,
            default: () => new Date()
        },
        // 切换动画
        animation: {
            type: Number,
            default: 500
        },
        // 滑动阀值
        threshold: {
            type: Number,
            default: 50
        },
        // 当前选中文字
        today: {
            type: String,
            default: "今"
        }
    },
    data() {
        return {
            list: [],
            // Calendar X轴位置
            translateX: 0,
            // 过渡时间
            duration: 0,
            // 下标
            index: 1,
            // 滑动数量
            slidenum: 0,
            // 控制页面preventDefault
            touchmove: true,
            // 等待滑动动画完成
            waiting: false
        }
    },
    mounted() {
        this.width = this.$el.clientWidth
        this.calculate()
        this.calculateDateList()
        const hammer = new Hammer(this.$refs.group)
        hammer.on("panleft", this.panleft)
        hammer.on("panright", this.panright)
        hammer.on("panend", this.panend)
        document.addEventListener(
            "touchmove",
            event => {
                !this.touchmove ? event.preventDefault() : null
            },
            { passive: false }
        )
    },
    destroyed() {
        // 清楚定时器
        this.cleatTime ? clearTimeout(this.cleatTime) : null
    },
    methods: {
        panleft(e) {
            if (this.waiting) return
            const { x, y } = e.center
            const unknown = Math.abs(x) + Math.abs(y)
            this.duration = 0
            if (unknown > 0) {
                this.touchmove = false
                this.translateX = -(this.width - e.deltaX)
            }
        },
        panright(e) {
            if (this.waiting) return
            const { x, y } = e.center
            const unknown = Math.abs(x) + Math.abs(y)
            this.duration = 0
            if (unknown > 0) {
                this.touchmove = false
                this.translateX = -(this.width - e.deltaX)
            }
        },
        panend(e) {
            if (this.waiting) return
            this.touchmove = true
            this.duration = this.animation
            if (e.deltaX > this.threshold) {
                // 右滑动
                this.index = 0
                this.slidenum -= 1
                this.waiting = true
                this.recovery()
            } else if (e.deltaX < -this.threshold) {
                // 左滑动
                this.index = 2
                this.slidenum += 1
                this.waiting = true
                this.recovery()
            }
            this.calculate()
        },
        recovery() {
            this.cleatTime = setTimeout(() => {
                this.duration = 0
                this.index = 1
                this.waiting = false
                this.calculateDateList()
                this.calculate()
                this.$emit("change", this.list)
            }, this.animation)
        },
        calculate() {
            const x = this.width * this.index
            this.translateX = -x
        },
        calculateDateList() {
            const page = this.dateBefore(this.value, this.slidenum * 7)
            let day = this.value.getDay()
            day = day === 0 ? 7 : day
            let dayList = []
            let list = []
            for (var i = 1; i <= 21; i++) {
                const d = i - day - 7
                const date = this.dateBefore(page, d)
                list.push(date)
                if (i % 7 === 0) {
                    dayList.push(list)
                    list = []
                }
            }
            this.list = dayList
        },
        dateBefore(date = new Date(), num = 1) {
            let day = new Date(date)
            const dateBefore = new Date(day.setDate(day.getDate() + num))
            return dateBefore
        },
        repair(date) {
            let day = date.getDate()
            day = day < 10 ? `0${day}` : day
            return day
        },
        format(date = new Date()) {
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()
            return `${year}/${month}/${day}`
        },
        clickDay(item) {
            this.$emit("input", item)
            this.$emit("click", item)
            this.slidenum = 0
        },
        calendarsSlider(data) {
            return (
                <div class="calendars-slider-week">
                    {data.map(item => {
                        const today = this.format() === this.format(item)
                        const is = this.format(this.value) === this.format(item)
                        const active = is ? "active" : null
                        let text = today ? this.today : this.repair(item)
                        text = this.today ? text : this.repair(item)
                        return (
                            <label class={["day", active]}>
                                <span onClick={() => this.clickDay(item)}>
                                    {text}
                                </span>
                            </label>
                        )
                    })}
                </div>
            )
        }
    },
    render() {
        return (
            <div class="clown-calendar-week">
                <div class="head">
                    {weekList.map(item => (
                        <span class="week" key={item}>
                            {item}
                        </span>
                    ))}
                </div>
                <div class="content">
                    <div
                        class="group-date"
                        ref="group"
                        style={{
                            transform: `translateX(${this.translateX}px)`,
                            "transition-duration": `${this.duration}ms`
                        }}
                    >
                        {this.list.map(item => this.calendarsSlider(item))}
                    </div>
                </div>
            </div>
        )
    }
}
