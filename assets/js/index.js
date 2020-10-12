$(function () {
    // 1.获取用户基本信息
    getUserInfo();

    // 3.退出
    var layer = layui.layer;
    $('#btnOut').on('click', function () {
        // 询问框
        layer.confirm('确定要退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地存储
            localStorage.removeItem("token");
            // 页面跳转
            location.href = '/login.html';
            // 关闭询问框
            layer.close(index);
            
          });
    })
})

// 1.获取用户基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     // 有时候需要重新登录，因为token过期事件为12小时
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // console.log(res);
            renderAvatar(res.data)
        }
    })
}
// 2.封装用户头像渲染
function renderAvatar(user) {
    // 1.用户名（昵称优先，没有用username）
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 2.用户头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr("src", user.user_pic);
        $(".textImg").hide();
    } else {
        //没有头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".user-avatar").show().html(text);
    }
}