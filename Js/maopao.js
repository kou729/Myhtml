class BubbelSort {
    constructor(arr) {
        this.arr = arr
        this.initData(this.arr)
        this.myBubbleSortHTML(this.arr)
    }
    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    initItem(num, left, width, height, index) {
        let template =
            `<div class="item item-${index}" style="left: ${left*100}%; height: ${height*100}%; width: ${width*100}%;"><span>${num}</span></div>`;
        $('.container').append(template)
    }
    initData(arr) {
        const maxNum = Math.max.call(...arr)
        const baseHeight = 80 / 100
        const innerWidth = 1 / arr.length - 0.01
        let result = arr.map((item, index, arr) => {
            let obj = {}
            obj.height = item / maxNum * baseHeight
            obj.width = innerWidth
            obj.left = innerWidth * index + index * 0.01
            obj.index = index
            obj.num = item
            obj.baseHeight = baseHeight
            obj.innerWidth = innerWidth
            return obj
        })
        this.initHTML(result)
    }
    initHTML(infoArr) {
        infoArr.forEach(item => {
            this.initItem(item.num, item.left, item.width, item.height, item.index)
        })
    }
    async myBubbleSortHTML(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            $('h3').html(`第${i+1}轮`)
            for (let j = 0; j < arr.length - 1 - i; j++) {
                await this.sleep(130)
                this.changeInfo(arr[j], arr[j + 1], j, j + 1)
                if (arr[j] > arr[j + 1]) {
                    await this.sleep(130)
                    this.changeTip(arr[j], arr[j + 1], j, j + 1, true);
                    await this.sleep(130);
                    this.changeDom(j, j + 1);
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                    this.removeAllCss(j, j + 1)
                } else {
                    await this.sleep(130)
                    this.changeTip(arr[j], arr[j + 1], j, j + 1, false)
                }
                if (j + 1 === arr.length - 1 - i) {
                    this.finishCss(arr.length - 1 - i)
                }
            }
        }
        $('h4').html(`全部数组排序完毕`)
        return arr
    }

    changeTip(itemJ, itemK, j, k, flag) {
        if (flag) {
            $('h4').html(`${itemJ}比${itemK}要大，开始交换`)
            this.removeCurCss(j, k)
            this.addNextCss(j, k)
        } else {
            $('h4').html(`${itemJ}不比${itemK}大，不需要交换`)
            this.removeCurCss(j, k)
        }
    }

    changeInfo(itemJ, itemK, j, k) {
        $('h4').html(`比较${itemJ}和${itemK}`)
        this.addCurCss(j, k)
    }

    addCurCss(j, k) {
        $(`.item-${j}`).addClass('item-cur')
        $(`.item-${k}`).addClass('item-cur')
    }

    removeCurCss(j, k) {
        $(`.item-${j}`).removeClass('item-cur')
        $(`.item-${k}`).removeClass('item-cur')
    }

    addNextCss(j, k) {
        $(`.item-${j}`).addClass('item-next')
        $(`.item-${k}`).addClass('item-next')
    }

    removeAllCss(j, k) {
        $(`.item-${j}`).removeClass('item-next')
        $(`.item-${k}`).removeClass('item-next')
    }

    changeDom(j, k) {
        const leftJ = $(`.item-${j}`).css('left')
        const leftK = $(`.item-${k}`).css('left')
        $(`.item-${j}`).css('left', leftK)
        $(`.item-${k}`).css('left', leftJ)
        $(`.item-${j}`).addClass(`changing-j`)
        $(`.item-${k}`).addClass(`changing-k`)
        $('.changing-j').addClass(`item-${k}`).removeClass(`changing-j item-${j}`)
        $('.changing-k').addClass(`item-${j}`).removeClass(`changing-k item-${k}`)

    }

    finishCss(j) {
        $(`.item-${j}`).addClass(`item-finish`)
    }

}
new BubbelSort([1, 3, 2, 5, 16, 13, 7, 4, 9, 1, 2, 12, 2, 1, 3, 2, 5, 16, 13])