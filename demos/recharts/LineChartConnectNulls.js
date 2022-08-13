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
          width: '100%'
        }
      },
      children: [
        {
          type: 'rc#ResponsiveContainer',
          props: {
            width: '100%',
            'min-height': 200
          },
          children: [
            {
              type: 'rc#LineChart',
              props: {
                width: 500,
                height: 200,
                data: [
                  {
                    name: 'Page A',
                    uv: 4000
                  },
                  {
                    name: 'Page B',
                    uv: 3000
                  },
                  {
                    name: 'Page C',
                    uv: 2000
                  },
                  {
                    name: 'Page D'
                  },
                  {
                    name: 'Page E',
                    uv: 1890
                  },
                  {
                    name: 'Page F',
                    uv: 2390
                  },
                  {
                    name: 'Page G',
                    uv: 3490
                  }
                ],
                margin: {
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }
              },
              children: [
                {
                  type: 'rc#CartesianGrid',
                  props: {
                    strokeDasharray: '3 3'
                  },
                  
                },
                {
                  type: 'rc#XAxis',
                  props: {
                    dataKey: 'name'
                  },
                  
                },
                {
                  type: 'rc#YAxis',
                  
                },
                {
                  type: 'rc#Tooltip',
                  
                },
                {
                  type: 'rc#Line',
                  props: {
                    type: 'monotone',
                    dataKey: 'uv',
                    stroke: '#8884d8',
                    fill: '#8884d8'
                  },
                  
                }
              ],
              
            }
          ],
          
        },
        {
          type: 'rc#ResponsiveContainer',
          props: {
            width: '100%',
            height: 200
          },
          children: [
            {
              type: 'rc#LineChart',
              props: {
                width: 500,
                height: 200,
                data: [
                  {
                    name: 'Page A',
                    uv: 4000
                  },
                  {
                    name: 'Page B',
                    uv: 3000
                  },
                  {
                    name: 'Page C',
                    uv: 2000
                  },
                  {
                    name: 'Page D'
                  },
                  {
                    name: 'Page E',
                    uv: 1890
                  },
                  {
                    name: 'Page F',
                    uv: 2390
                  },
                  {
                    name: 'Page G',
                    uv: 3490
                  }
                ],
                margin: {
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }
              },
              children: [
                {
                  type: 'rc#CartesianGrid',
                  props: {
                    strokeDasharray: '3 3'
                  },
                  
                },
                {
                  type: 'rc#XAxis',
                  props: {
                    dataKey: 'name'
                  },
                  
                },
                {
                  type: 'rc#YAxis',
                  
                },
                {
                  type: 'rc#Tooltip',
                  
                },
                {
                  type: 'rc#Line',
                  props: {
                    connectNulls: true,
                    type: 'monotone',
                    dataKey: 'uv',
                    stroke: '#8884d8',
                    fill: '#8884d8'
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