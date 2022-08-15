var MM = function (opener) {
    var self = this;
    self.opener = opener;
    // 绑定的事件
    self.events = {};
    // 未准备好时事件存储
    self.readyEvents = [];
    // 事件计数id
    self.id = 0;
    // 父页面
    self.opener = opener;
    // 发一个空通知，让父页面知道我准备好了
    self.post('');

    // 收到父亲页面关闭通知时，关闭页面
    self.on(function (data) {
      var prefix = '14B0CF90_77EE_4503_B996_EC75241E281B_';
      // 如果收到任何信息，说明父页面还没关闭
      clearTimeout(self._heartcheckTimeoutCloseId);
      // 父页面是在beforeunload发出这知消息，不知道父页面是不是真的关闭了
      // 而且关闭了，closed也不是马上为false, 得过一会（具体数值不确定）才为true，所以interval检查最快
      // 另外reload的情况，closed会一直为false，此时要尝试心跳检测，发信息给原来的页面，如果原来页面没刷新，则会返回消息
      if (data === prefix + 'CLOSE') {
        var count = 0;
        self.intervalId = setInterval(function () {
          if (count > 50) {
            clearInterval(self.intervalId);
          }
          if (opener.closed) {
            self.close();
          }
        }, 20);

        // reload
        setTimeout(function () {
          self.post(prefix + 'CLOSE_HEARTCHECK');
        }, 100);
        self._heartcheckTimeoutCloseId = setTimeout(function () {
          self.close();
        }, 200);
      }
    });
  };

  // 监听接收消息
  MM.prototype.on = function (fn) {
    var self = this;
    var eventId = this.id++;
    var events = self.events;
    events[eventId] = function (e) {
      if (typeof fn === 'function' && e.source === self.opener) {
        fn(e.data);
      }
    };
    window.addEventListener('message', events[eventId], false);
  };
  // 发送消息
  MM.prototype.post = function (data) {
    var opener = this.opener;
    if (opener && !opener.closed && opener.postMessage) {
      opener.postMessage(data, '*');
    } else {
      console.log('window.opener is closed');
    }
  };
  // 解绑接收消息
  MM.prototype.off = function (eventId) {
    var events = this.events;
    if (eventId) {
      this._offItem(eventId);
    } else {
      for (const key in events) {
        if (Object.hasOwnProperty.call(events, key)) {
          this._offItem(key);
        }
      }
    }
  };
  MM.prototype._offItem = function (eventId) {
    var events = this.events;
    window.removeEventListener('message', events[eventId], false);
    if (events[eventId]) {
      delete events[eventId];
    }
  };
  // 准备后处理
  MM.prototype.ready = function (fn) {
    fn = typeof fn === 'function' ? fn : function () {};
    if (this.openerReady) {
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
    window.close();
  };

export default MM;

