$(function () {
  // 全选
  $(".checkall").change(function () {
    $(".checkall, .j-checkbox").prop("checked", $(this).prop("checked"))
    if ($(this).prop("checked")) {
      $(".cart-item").addClass("check-cart-item")
    } else {
      $(".cart-item").removeClass("check-cart-item")
    }
  })
  $(".j-checkbox").change(function () {
    // :checked 选择器      :checked 查找被选中的表单元素。
    if ($(".j-checkbox:checked").length == $(".j-checkbox").length) {
      $(".checkall").prop("checked",true)
    } else {
      $(".checkall").prop("checked", false)
    }
    if ($(this).prop("checked")) {
      $(this).parents(".cart-item").addClass("check-cart-item")
    } else {
      $(this).parents(".cart-item").removeClass("check-cart-item")
    }
  })
  // 增加商品
  $(".increment").click(function () {
    var count = $(this).siblings(".itxt").val()
    count++
    $(this).siblings(".itxt").val(count)
    var p = $(this).parents(".p-num").siblings(".p-price").html() 
    p = "￥" + (p.substr(1) * count).toFixed(2)
    $(this).parents(".p-num").siblings(".p-sum").html(p)
    getSum()
  })
  // 减少商品
  $(".decrement").click(function () {
    var count = $(this).siblings(".itxt").val()
    if ($(this).siblings(".itxt").val() == 1) {
      return
    }
    count--
    $(this).siblings(".itxt").val(count)
    $(this).siblings(".itxt").val(count)
    var p = $(this).parents(".p-num").siblings(".p-price").html() 
    p = "￥" + (p.substr(1) * count).toFixed(2)
    $(this).parents(".p-num").siblings(".p-sum").html(p)
    getSum()
  })
  // 在文本框中修改商品数量
  $(".itxt").change(function () {
    // 拿到文本框修改后的值
    count = $(this).val()
    var p = $(this).parents(".p-num").siblings(".p-price").html() 
    p = "￥" + (p.substr(1) * count).toFixed(2)
    $(this).parents(".p-num").siblings(".p-sum").html(p)
    getSum()
  })

  getSum()
  // 封装总件数、求商品总和函数
  function getSum() {
    var count = 0
    var money = 0
    $(".itxt").each( function (i,ele) {
      count += parseInt($(ele).val())      
    })
    $(".amount-sum em").text(count)
    $(".p-sum").each(function (i, ele) {
      money += parseFloat($(ele).text().substr(1))
    })
    $(".price-sum").text("￥" + money.toFixed(2))
  }
  // 删除商品
  // 商品后面的删除按钮
  $(".p-action a").click(function () {
    $(this).parents(".cart-item").remove()
    // 每次删除都要重新计算商品数量
    getSum()
  })
  // 删除选中的商品
  $(".remove-batch").click(function () {
    $(".j-checkbox:checked").parents(".cart-item").remove()
    getSum()
  })
  // 删除所有商品
  $(".clear-all").click(function () {
    $(".cart-item").remove()
    getSum()
  })
})