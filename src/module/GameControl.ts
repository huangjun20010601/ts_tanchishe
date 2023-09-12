import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
class GameControl {
    snake: Snake
    food: Food
    scorePanel: ScorePanel

    //创建一格属性来存储蛇的移动方向（也就是按键的方向）
    direction: string = 'ArrowRight'

    //记录游戏是否结束
    isLive = true

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init()
    }

    //游戏的初始化方法，调用后游戏即将开始
    init() {
        //绑定键盘按键按下的事件
        //addEventListener中this.keydownHandler是回调函数，当按键按下触发时才会调用。
        //回调函数中的this不是GameControl实例对象，而是调用这个回调函数的那个对象，即document对象
        // 可以通过bind绑定this
        //也可以通过箭头函数
        /**
         * keydownHandler = (event: KeyboardEvent) => {
         *         console.log(this)
         *         this.direction = event.key
         *     }
         */
        document.addEventListener("keydown",this.keydownHandler.bind(this))

        this.run()
    }

    //创建一格键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        //console.log(this) // document对象
        this.direction = event.key
    }

    //创建一个控制蛇移动的方法
    run() {
        //获取蛇现在的坐标
        let X = this.snake.X
        let Y = this.snake.Y

        // 根据按键方向来修改X值和Y值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移动 top 减少
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动 top 增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动 left 减少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动 left 增加
                X += 10;
                break;
        }

        //检查蛇是否吃到了食物
        this.checkEat(X, Y)

        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (e) {
            alert(e.message)
            this.isLive = false
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    //检查蛇是否吃到了食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            //将食物位置重置
            this.food.change()
            //分数加1
            this.scorePanel.addScore()
            //蛇要增加一节
            this.snake.addBody()
        }
    }
}

export default GameControl