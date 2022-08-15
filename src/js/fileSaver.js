import Liam from '@liam-js/liam';
var FileSaver = function (options) {
  var self = this;
  self.options = Object.assign(
    {},
    {
      on: function () {},
    },
    options
  );
  self.fileHandle = null;
  self.File = null;
  // 没有打开
};
FileSaver.prototype.open = function (cb) {
  var self = this;
  var on = self.options.on;
  // https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker
  const pickerOpts = {
    types: [
      {
        description: 'liam js schema',
        accept: {
          'application/javascript': ['.js'],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };

  // https下才能使用
  // 正在打开
  try {
    window
      .showOpenFilePicker(pickerOpts)
      .then(function (FileSystemFileHandles) {
        // 打开完成
        self.fileHandle = FileSystemFileHandles[0];
        on.apply(self, ['showOpenFilePicker']);
        cb && cb.call(self);
      });
  } catch (error) {
    console.log('window.showOpenFilePicker 需要在 https 下打开', error);
  }
};
FileSaver.prototype.saveAs = function (content, cb) {
  var self = this;
  var on = self.options.on;
  // https://developer.mozilla.org/en-US/docs/Web/API/window/showSaveFilePicker
  const pickerOpts = {
    // excludeAcceptAllOption: false,
    suggestedName: Liam.get('project-name').replace('.js', '') + '.js',
    types: [
      {
        description: 'liam js schema',
        accept: {
          'application/javascript': ['.js'],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };

  if (typeof window.showSaveFilePicker == 'undefined') {
    new Error(
      '您的浏览器暂不支持 showSaveFilePicker，或者页面没有使用 https'
    );
  }

  window.showSaveFilePicker(pickerOpts).then(function (FileSystemFileHandle) {
    // 打开完成
    self.fileHandle = FileSystemFileHandle;
    on.apply(self, ['showSaveFilePicker']);
    self.save(content, cb);
  });
};
FileSaver.prototype.save = function (content, cb) {
  var self = this;
  var on = self.options.on;

  var write = function () {
    // 准备写

    self.fileHandle.createWritable().then(function (writable) {
      // 可以写
      self.writable = writable;
      on.apply(self, ['createWritable', writable]);

      // 正在写
      writable.write(content).then(function (msg) {
        on.apply(self, ['write', msg]);
        // 写完
        writable.close().then(function (msg) {
          on.apply(self, ['close'], msg);
          // 关闭写
          writable = null;
          on.apply(self, ['save'], msg);
          cb && cb.call(self);
        });
      });
    });
  };

  // 没有有保存过，就另存
  // console.log(self.fileHandle);
  if (!self.fileHandle) {
    self.saveAs(content, cb);
  } else {
    write();
  }
};
FileSaver.prototype.set = FileSaver.prototype.save;
FileSaver.prototype.get = function (cb) {
  var self = this;
  var on = self.options.on;
  if (!self.fileHandle) {
    cb && cb.call(undefined);
    return;
  }
  self.fileHandle.getFile().then(function (File) {
    // 获取到的文件信息
    self.File = File;
    on.apply(self, ['getFile', File]);

    self.File.text().then(function (text) {
      // 获取到的文件内容
      self.text = text;
      on.apply(self, ['text', text]);
      cb && cb.call(self, text);
    });
  });
};

export default FileSaver;