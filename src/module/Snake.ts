class Snake {
    //蛇的容器
    element: HTMLElement
    //蛇头
    head: HTMLElement
    //蛇的身体（包括蛇头）
    bodies: HTMLCollection

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector("#snake > div") as HTMLElement
        this.bodies = this.element.getElementsByTagName("div")
    }

    //获取蛇的坐标
    get X() {
        return this.head.offsetLeft
    }

    get Y() {
        return this.head.offsetTop
    }

    //设置蛇头的坐标
    set X(value) {

        if (this.X === value) {
            return
        }

        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了")
        }

        //当蛇有身体时，左右移动，禁止掉头,当蛇头的位置等于第一个身体的位置时发生掉头，我们可以让蛇头往掉头方向的反方向移动
        if (this.bodies[1] && value === (this.bodies[1] as HTMLElement).offsetLeft) {
            //向左掉头
            if (this.X > value) {
                //向反方向移动10
                value = this.X + 10;
            } else {
                value = this.X - 10;
            }
        }

        this.checkEatSelf();

        //移动身体
        this.moveBody();
        //移动蛇头
        this.head.style.left = value + "px"


    }

    set Y(value) {

        if (this.Y === value) {
            return
        }

        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了")
        }

        //当蛇有身体时，上下移动，禁止掉头,当蛇头的位置等于第一个身体的位置时发生掉头，我们可以让蛇头往掉头方向的反方向移动
        if (this.bodies[1] && value === (this.bodies[1] as HTMLElement).offsetTop) {
            //向上掉头
            if (this.Y > value) {
                //向反方向移动10
                value = this.Y + 10;
            } else {
                value = this.Y - 10;
            }
        }

        //检查是否吃到自己
        this.checkEatSelf();

        //移动身体
        this.moveBody();

        //移动蛇头
        this.head.style.top = value + "px"


    }

    //蛇增加身体的方法
    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    //移动身体
    moveBody() {
        //从后往前，除去蛇头，后一个身体的位置等于前一个身体的位置
        for (let i = this.bodies.length-1; i > 0 ; i--) {
            // console.log(this.bodies);
            (this.bodies[i] as HTMLElement).style.left = (this.bodies[i-1] as HTMLElement).offsetLeft + "px";
            (this.bodies[i] as HTMLElement).style.top = (this.bodies[i-1] as HTMLElement).offsetTop + "px";
        }
    }

    checkEatSelf() {
        for (let i = 1; i < this.bodies.length ; i++) {
            let ele = (this.bodies[i] as HTMLElement);
            if (ele.offsetLeft === this.X && ele.offsetTop === this.Y) {
                throw new Error("吃到自己身体了")
            }
        }
    }
}

export default Snake