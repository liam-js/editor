
import Liam from '@liam-js/liam';

var getParam = function (key) {
  var params = window.location.search.split('?')[1];
  if (params) {
    var arr = params.split('&');
    for (var i = 0; i < arr.length; i++) {
      var data = arr[i].split('=');
      if (data[0] === key) {
        return data[1];
      }
    }
  }
};


let mode = getParam('mode');
if(['preview', 'demos'].indexOf(mode) === -1){
  mode = 'editor';
}
import('./blocks/'+mode+'/index').then(function(js){
  if(mode !=='preview'){
    Liam.render(js.default, document.querySelector('#root'));
  }
})

