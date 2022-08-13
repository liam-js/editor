import Liam from '@liam-js/liam';
const liamJson = function(props){
      let messages = props.notices.map(function(item){
        return {
          type: 'p',
          children: '*'+item.message
        }
      });
      if(messages.length === 0){
        messages = '* 暂无消息';
      }
      return {
        type: 'div',
        props: {
          className: 'liam-notice'+(props.visible?' liam-notice-show':'')
        },
        children: [
          {
            type: 'div',
            props: {
              className: 'liam-notice-hd',
              onClick: function(){
                Liam.set('project-notice-visible',false);
              }
            },
            children: '消息'
          },
          {
            type: 'div',
            props: {
              className: 'liam-notice-bd',
            },
            children: messages
          }
        ]
      };
    };
export default liamJson;
  

