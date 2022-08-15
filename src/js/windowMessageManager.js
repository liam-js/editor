
    function isOriginSameAsLocation(url) {
        var pageLocation = window.location;
        var URL_HOST_PATTERN = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/;
        var urlMatch = URL_HOST_PATTERN.exec(url) || [];
        var urlparts = {
            protocol: urlMatch[1] || "",
            host: urlMatch[2] || "",
            port: urlMatch[3] || "",
        };

        function defaultPort(protocol) {
            return {
                "http:": 80,
                "https:": 443,
            } [protocol];
        }

        function portOf(location) {
            return (
                location.port || defaultPort(location.protocol || pageLocation.protocol)
            );
        }

        return !!(
            urlparts.protocol &&
            urlparts.protocol == pageLocation.protocol &&
            urlparts.host &&
            urlparts.host == pageLocation.host &&
            urlparts.host &&
            portOf(urlparts) == portOf(pageLocation)
        );
    }
    var MM = function (popupWindow, options) {
        var self = this;
        self.url = "";
        if (typeof popupWindow === "string") {
            self.url = popupWindow;
            self.popupWindow = null;
        } else {
            self.popupWindow = popupWindow;
        }
        self.options = Object.assign({}, {
                name: '',
                widthRatio: 0.3,
                heightRatio: 0.7,
                autoFocus: true,
                // top-left top-center top-right right-center right-bottom bottom-center bottom-left left-center
                placement: 'top-right',
                crossOriginAlert: true,
                newTag: false
            },
            options
        );
        // 绑定的事件
        self.events = {};
        // 未准备好时事件存储
        self.readyEvents = [];
        // 事件计数id
        self.id = 0;
        // 判断接收消息的页面准备好没
        self.popupWindowReady = false;
        // 接收到对方的页面消息说明准备好了

        var prefix = "14B0CF90_77EE_4503_B996_EC75241E281B_";
        self.on(function (data) {
            // 如果收到心跳检测，马上回一条信息，说明还没关闭
            if (data === prefix + "CLOSE_HEARTCHECK") {
                self.post("");
            }
            // 收到信息，说明弹窗已经准备到接收信息了
            self.popupWindowReady = true;
            if (self.readyEvents.length === 0) {
                return;
            }
            // 把之前缓存的事件执行完
            for (let index = 0; index < self.readyEvents.length; index++) {
                const fn = self.readyEvents[index];
                try {
                    fn.call(self);
                } catch (error) {
                    console.log(error);
                }
            }
            self.readyEvents = [];
        });
        // 页面关闭时通知子页面，但不定关闭，子页面收到该信息后，还得自己检测，有三种情况，关闭、不关闭、刷新（新页面）
        window.addEventListener("beforeunload", function (e) {
            self.post(prefix + "CLOSE");
        });
    };

    MM.prototype.open = function () {
        var self = this;
        var options = self.options;
        if ((!this.popupWindow || this.popupWindow.closed) && this.url) {
            var screenWidth = window.screen.width;
            var screenHeight = window.screen.height;
            var width = options.widthRatio * screenWidth; //弹出窗口的宽度;
            var height = options.heightRatio * screenHeight; //弹出窗口的高度;
            //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
            var top = (screenHeight - height) / 2; //获得窗口的垂直位置;
            var left = (screenWidth - width) / 2; //获得窗口的水平位置;
            var setPositons = {
                "top-left": function () {
                    top = 0;
                    left = 0;
                },
                "top-center": function () {
                    top = 0;
                    // left = 0;
                },
                "top-right": function () {
                    top = 0;
                    left = screenWidth - width;
                },
                "right-center": function () {
                    // top = 0;
                    left = screenWidth - width;
                },
                "right-bottom": function () {
                    top = screenHeight - height;
                    left = screenWidth - width;
                },
                "bottom-center": function () {
                    top = screenHeight - height;
                    // left = 0;
                },
                "bottom-left": function () {
                    top = screenHeight - height;
                    left = 0;
                },
                "left-center": function () {
                    // top = 0;
                    left = 0;
                },
            };

            if (setPositons[options.placement]) {
                setPositons[options.placement]();
            }
            // 需要打开的话，说明还没ready
            self.popupWindowReady = false;

            var open = function () {
                self.popupWindow = window.open(
                    '',
                    options.name,
                    options.newTag?'':
                    'height=' +
                    height +
                    ',innerHeight=' +
                    height +
                    ',width=' +
                    width +
                    ',innerWidth=' +
                    width +
                    ',top=' +
                    top +
                    ',left=' +
                    left
                );
                // toolbar=no,menubar=no,scrollbars=auto,location=no,status=no,dependent=yes
                self.popupWindow.location.href = self.url;
            };

            if (options.crossOriginAlert && !isOriginSameAsLocation(self.url)) {
                if (window.confirm("注意：你将打开一个第三方页面，它可能会修改当前页面！")) {
                    open();
                } else {
                    self.close();
                }
            } else {
                open();
            }

            // var openner = this.popupWindow.opener;
            // var newOpener = {
            //   postMessage: openner.postMessage,
            //   closed: openner.closed
            // };
        }
    };

    // 监听接收消息
    MM.prototype.on = function (fn) {
        var self = this;
        var eventId = self.id++;
        var events = self.events;
        events[eventId] = function (e) {
            if (typeof fn === "function" && e.source === self.popupWindow) {
                fn(e.data);
            }
        };
        window.addEventListener("message", events[eventId], false);
    };
    // 发送消息
    MM.prototype.post = function (data) {
        var self = this;
        self.open();
        var popupWindow = self.popupWindow;
        if(self.options.autoFocus){
            popupWindow.focus();
        }
        
        if (popupWindow && popupWindow.postMessage) {
            self.ready(function () {
                popupWindow.postMessage(data, "*");
            });
        }
    };
    // 解绑接收消息
    MM.prototype.off = function (eventId) {
        var self = this;
        var events = self.events;
        if (eventId) {
            self._offItem(eventId);
        } else {
            for (const key in events) {
                if (Object.hasOwnProperty.call(events, key)) {
                    self._offItem(key);
                }
            }
        }
    };
    MM.prototype._offItem = function (eventId) {
        var events = this.events;
        window.removeEventListener("message", events[eventId], false);
        if (events[eventId]) {
            delete events[eventId];
        }
    };
    // 准备后处理
    MM.prototype.ready = function (fn) {
        fn = typeof fn === "function" ? fn : function () {};
        // popupWindowReady为true后，可能窗口被关闭了

        if (this.popupWindowReady) {
            fn();
        } else {
            this.readyEvents.push(fn);
        }
    };
    // 销毁
    MM.prototype.destroy = function (fn) {
        var self = this;
        self.off();
        self = null;
    };
    // 关闭窗口
    MM.prototype.close = function (fn) {
        this.popupWindow.close();
        this.popupWindow = null;
    };

export default MM;
