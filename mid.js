// 这段代码是一个用于发送ajax请求的函数，它的功能和参数如下：

// - `ajaxReq`是函数的名字，它有六个参数：`URL`, `DATA`, `PARAM`, `hideloadding`, `fn`, 和 `err`。
// - `URL`是请求的地址，如果没有传入这个参数，就会使用默认的地址，即`webRoot() + "/ServerAPI"`，其中`webRoot()`是一个获取网站根目录的函数。如果传入了`PARAM`参数，就会在默认地址后面加上这个参数作为查询字符串。如果传入了`URL`参数，就会直接使用这个参数作为请求地址。
// - `DATA`是请求的数据，它是一个对象，包含了要发送给服务器的键值对。
// - `PARAM`是请求的查询字符串，它是一个字符串，包含了要附加在请求地址后面的键值对，用`&`分隔。例如："name=Tom&age=20"。
// - `hideloadding`是一个布尔值，表示是否隐藏加载动画。如果为`false`或者没有传入这个参数，就会调用`JQ.wait('show')`来显示加载动画。`JQ.wait()`是一个自定义的函数，用于控制加载动画的显示和隐藏。
// - `fn`是请求成功后的回调函数，它接受一个参数`data`，表示服务器返回的数据。如果服务器返回的数据中有`TimeOut`属性为真，就表示请求超时，需要跳转到登录页面。否则，就调用回调函数，并传入服务器返回的数据。
// - `err`是请求失败后的回调函数，它接受两个参数`data`和`status`，表示错误信息和错误状态。如果有错误信息，并且有传入回调函数，就根据错误状态来调用回调函数，并传入相应的错误信息。

// 下面是这段代码的逐行注释：

// ```javascript
// 定义一个发送ajax请求的函数
var ajaxReq = function (URL, DATA, PARAM,hideloadding, fn, err) {

        // 如果没有传入URL参数
        if (!URL.length) {
            // 如果有传入PARAM参数
            if (PARAM != undefined)
                // 使用默认地址加上查询字符串作为请求地址
                URL = webRoot() + "/ServerAPI?" + PARAM + "" ;
            else
                // 使用默认地址作为请求地址
                URL = webRoot() + "/ServerAPI";
        }
        else {
            // 如果有传入URL参数，直接使用它作为请求地址
            URL = URL

        }
        // 如果没有传入hideloadding参数或者它为false
        if (!hideloadding) {
            // 显示加载动画
            JQ.wait('show');
        }
        // 从本地存储中获取Token值
        var Token = window.localStorage.getItem("Token");
        // 如果Token值不存在
        if (Token == undefined) {
            // 将Token值设为空字符串
            Token = '';
        }
        // 调用jQuery的ajax方法发送请求
        $.ajax({
            // 设置请求类型为POST
            type: "POST",
            // 设置请求地址
            url: URL,
            // 设置请求数据
            data: DATA,
            // 设置返回数据类型为json
            dataType: "json",
            // 设置请求头中的Token值
            headers: {
                Token: Token
            },
            // 设置请求超时时间为10秒
            timeout: 10 * 1000,
            // 设置请求成功后的回调函数
            success: function (data) {
                // 如果服务器返回的数据存在，并且有TimeOut属性为真
                if (data != undefined && data.TimeOut) {
                    // 跳转到登录页面
                    top.location.href = retLogin();
                }
                else {
                    // 隐藏加载动画
                    JQ.wait('hide');
                    // 调用回调函数，并传入服务器返回的数据
                    fn(data);
                }
            },
            // 设置请求失败后的回调函数
            error: function (data, status) {
                // 隐藏加载动画
                JQ.wait('hide');
                // 如果有错误信息，并且有传入回调函数
                if (data) {
                    if (err) {
                        // 如果错误状态是超时或者错误
                        if (status == 'timeout' || status == 'error')
                            // 调用回调函数，并传入"网络连接超时"作为错误信息
                            err("网络连接超时");
                        else
                            // 调用回调函数，并传入错误信息
                            err(data.responseText);
                    }
                }
            }
        });
    }
