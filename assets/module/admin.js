/** 封装admin模块 */
layui.define(['layer'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;

    var admin = {
        // 获取本地存储表名
        getTableName: function () {
            return tableName;
        },
        // 缓存token
        putToken: function (access_token) {
            layui.data(admin.getTableName(), {
                key: 'access_token',
                value: access_token
            });
        },
        //缓存角色
        putRole: function (role) {
            layui.data(admin.getTableName(), {
                key: 'role',
                value: role
            });
        },
        // 获取缓存的token
        getToken: function () {
            return layui.data(admin.getTableName()).access_token;
        },
        //获取缓存的角色
        getRole: function () {
            return layui.data(admin.getTableName()).role;
        },
        // 清除token
        removeToken: function () {
            layui.data(admin.getTableName(), {
                key: 'access_token',
                remove: true
            });
        },
        //清除角色缓存
        removeRole: function () {
            layui.data(admin.getTableName(), {
                key: 'role',
                remove: true
            });
        },

        // 封装ajax请求
        req: function (url, data, success, method) {
            $.ajax({
                url: (base_server ? base_server : '') + url,
                data: data,
                type: method,
                beforeSend: function (request) {
                    //每次请求都带上本地缓存token
                    request.setRequestHeader("X-Access-Token", admin.getToken())
                },
                success: success
            });
        },
    };

    // 所有ew-event
    $('body').on('click', '*[ew-event]', function () {
        var event = $(this).attr('ew-event');
        if (event == 'closeDialog') {
            var id = $(this).parents('.layui-layer').attr('id').substring(11);
            layer.close(id);
        }
    });

    // 侧边栏点击事件
    $('body').on('click', '*[lay-href]', function () {
        try {
            var url = $(this).attr('lay-href');
            top.layui.jquery('iframe[name=body]').attr('src', url);
        } catch (e) {
        }
    });

    exports('admin', admin);
});
