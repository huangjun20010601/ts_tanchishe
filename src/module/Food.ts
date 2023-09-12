//定义食物类food
class Food {
    //定义一个属性表示食物所对应的属性
    element: HTMLElement

    constructor() {
        //获取页面中的food元素并将其赋值给element
        this.element = document.getElementById("food")!
    }

    //定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }

    get Y() {
        return this.element.offsetTop
    }


    change() {
        // 生成一个随机的位置
        // 食物的位置最小是0，最大时290
        // 蛇移动一次就是一格，一格的大小就是10，所以就要求食物的坐标必须时整10
        let left = Math.floor(Math.random() * 30) * 10
        let top = Math.floor(Math.random() * 30) * 10

        this.element.style.left = left + "px"
        this.element.style.top = top + "px"

    }
}

export default Food