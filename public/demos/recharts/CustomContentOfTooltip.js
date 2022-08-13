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
        className: 'custom-tooltip'
      },
      children: [
        {
          type: 'p',
          props: {
            className: 'label'
          },
          children: [
            '{`${label} : ${payload[0].value}`}'
          ],
          
        },
        {
          type: 'p',
          props: {
            className: 'intro'
          },
          children: [
            '{getIntroOfPage(label)}'
          ],
          
        },
        {
          type: 'p',
          props: {
            className: 'desc'
          },
          children: [
            'Anything you want can be displayed here.'
          ],
          
        }
      ],
      
    }
  }
]