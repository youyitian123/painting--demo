var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var lineWidth = 2


//调整宽高
autoSetCanvasSize(canvas)

// 监听用户点击
listenToUser(canvas)



//监听橡皮擦
var eraserEnabled = false
pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')

}

//自动调整画布大小
function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = setCanvasSize()

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight

        //画背景
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, pageWidth, pageHeight);
    }


}

//监听颜色按钮
red.onclick = function () {
    ctx.strokeStyle = 'red';

}


green.onclick = function () {
    ctx.strokeStyle = 'green';
}

blue.onclick = function () {
    ctx.strokeStyle = 'blue';
}
var colors = document.getElementsByClassName('colors')[0]
var colorsLi = colors.children
for (var i = 0; i < colorsLi.length; i++) {
    colorsLi[i].onclick = function () {
        for (var j = 0; j < colorsLi.length; j++) {
            colorsLi[j].classList.remove('active')
        }
        this.classList.add('active')
        ctx.strokeStyle = this.id
    }
}

//监听画笔大小


thin.onclick = function () {
    lineWidth = 2
}

thick.onclick = function () {
    lineWidth = 6
}


//清屏
clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

//下载
xiazai.onclick = function () {
    var url = canvas.toDataURL()
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = "我的画"
    a.target = '_blank'
    a.click()
}


//监听鼠标
function listenToUser(canvas) {
    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 10, y - 10, 20, 20)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX
            var y = a.touches[0].clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                ctx.clearRect(x - 10, y - 10, 20, 20)

            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false;
        }
    } else {
        //非触屏备

        // 点击鼠标
        canvas.onmousedown = function (a) {
            var x = a.clientX
            var y = a.clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        };

        // 移动鼠标
        canvas.onmousemove = function (a) {
            var x = a.clientX
            var y = a.clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)

            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        };

        //松开鼠标
        canvas.onmouseup = function () {
            using = false;
        };
    }
};


// 画线
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth
    ctx.lineTo(x2, y2)
    ctx.stroke()
}