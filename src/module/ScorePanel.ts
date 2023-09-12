class ScorePanel {
    //score和level用来记录分数和等级
    score = 0
    level = 1

    maxLevel: number
    upScore: number

    //分数和等级所在的元素，
    scoreEle: HTMLElement
    levelEle: HTMLElement

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById("score")!
        this.levelEle = document.getElementById("level")!
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    addScore() {
        this.scoreEle.innerHTML = ++this.score + ""
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }

    levelUp() {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ""
        }
    }
}

export default ScorePanel