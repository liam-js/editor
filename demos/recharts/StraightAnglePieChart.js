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
        height: '200px',
        margin: '10px',
        border: '1px dashed #666'
      }
    },
    children: {
      type: 'rc#ResponsiveContainer',
      props: {
        width: '100%',
        height: '100%'
      },
      children: [
        {
          type: 'rc#PieChart',
          props: {
            width: 400,
            height: 400
          },
          children: [
            {
              type: 'rc#Pie',
              props: {
                dataKey: 'value',
                startAngle: 180,
                endAngle: 0,
                data: [
                  {
                    name: 'Group A',
                    value: 400
                  },
                  {
                    name: 'Group B',
                    value: 300
                  },
                  {
                    name: 'Group C',
                    value: 300
                  },
                  {
                    name: 'Group D',
                    value: 200
                  },
                  {
                    name: 'Group E',
                    value: 278
                  },
                  {
                    name: 'Group F',
                    value: 189
                  }
                ],
                cx: '50%',
                cy: '50%',
                outerRadius: 80,
                fill: '#8884d8',
                label: true
              },
              
            }
          ],
          
        }
      ],
      
    }
  }
]