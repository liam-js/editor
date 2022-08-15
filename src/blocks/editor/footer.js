// import Liam from '@liam-js/liam';
const LiamJSON = function (props) {
  let statusText = '✓';
  let statusClass = ['status'];
  let nameText = props.name || '未命名';
  if(props.status === 'changed'){
    statusText = '*';
    statusClass.push('status-changed');
  }else{
    statusClass.push('status-saved');
  }
  return [
    {
      type: 'span',
      props: {
        className: statusClass.join(' '),
      },
      children: statusText,
    },
    {
      type: 'span',
      props: {
        className: 'name',
      },
      children: nameText,
    }
  ]
};

export default LiamJSON;
