$(function () {
    // 互斥锁、节流阀
    var flag = true
    // 1.显示隐藏电梯导航
    var top = $(".recommend").offset().top
    function toggleTool() {
        if ($(document).scrollTop() >= top) {
            $(".fixedtool").fadeIn()
        } else {
            $(".fixedtool").fadeOut()
        }
    }
    // 刷新页面，调用函数，如果距离顶部距离足够则需要显示固定电梯导航栏
    toggleTool()
    $(window).scroll(function () {
        toggleTool()
    // 3.滑动页面电梯导航自动添加current类
        if (flag) {
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // console.log(i)
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass()
                }
            })
        }
       
    })
    // 2.点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function () {
        flag = false
        var index = $(this).index()
        // 当我们每次点击小li 就需要计算出页面要去往的位置
        // 选出对应索引号的内容区的盒子 计算它的.offset().top
        var current = $(".floor .w").eq(index).offset().top
        $("html,body").stop().animate({
            scrollTop: current
        }, function () {
            flag = true
        })
        // 点击li给当前li添加背景颜色，其余兄弟取消背景颜色 排他思想
        $(this).addClass("current").siblings().removeClass()
    })
})