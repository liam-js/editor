
import ReactDOM from 'react-dom/client';
import Liam from '@liam-js/liam';
import demos from '../blocks/demos/index';

Liam.config({
  render:function (schema, node) {
    // 根元素创建
    const RootElement = Liam.createElement(schema, true);
    ReactDOM.createRoot(node).render(RootElement);
  }
});
Liam.render(demos, document.querySelector('#root'));

