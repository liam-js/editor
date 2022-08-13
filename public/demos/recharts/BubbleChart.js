[
  (function(){
    Liam.config({
      componentMap: {
        'rc': 'npm#recharts@2.1.10'
      }
    });
  })(),
  {
    type: 'div',
    props: {
      className: 'rechart-item',
      style: {
        height: '300px',
        margin: '10px',
        border: '1px dashed #666'
      }
    },
    children: {
      type: 'div',
      props: {
        style: {
          backgroundColor: '#fff',
          border: '1px solid #999',
          margin: 0,
          padding: 10
        }
      },
      children: [
        {
          type: 'p',
          children: [
            '{data.hour}'
          ],
          
        },
        {
          type: 'p',
          children: [
            {
              type: 'span',
              children: [
                'value:'
              ],
              
            },
            '{data.value}'
          ],
          
        }
      ],
      
    }
  }
]