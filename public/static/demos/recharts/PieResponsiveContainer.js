[
  (function(){
    Liam.config({
      componentMap: {
        'rc': 'url#https://e.sinaimg.cn/ssfe/unpkg/recharts@2.1.10/umd/Recharts.js'
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
          width: '100%',
          height: 300
        }
      },
      children: [
        {
          type: 'rc#ResponsiveContainer',
          children: [
            {
              type: 'rc#PieChart',
              children: [
                {
                  type: 'rc#Pie',
                  props: {
                    dataKey: 'value',
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
                      }
                    ],
                    fill: '#8884d8',
                    label: true
                  },
                  
                }
              ],
              
            }
          ],
          
        }
      ],
      
    }
  }
]