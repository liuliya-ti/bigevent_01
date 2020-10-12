//注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给 ajax 提供的配置对象
$.ajaxPrefilter(function (options) {
    // 1.在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    console.log(options.url);

    // 2.对需要权限的接口配置头信息
    // 必须以my开头才行
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            // 有时候需要重新登录，因为token过期事件为12小时
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 3.拦截所有响应，判断省份认证信息
    options.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem("token");
            // 页面跳转
            location.href = '/login.html'
        }
    }
})