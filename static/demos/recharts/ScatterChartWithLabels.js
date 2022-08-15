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
      type: 'rc#ResponsiveContainer',
      props: {
        width: '100%',
        height: '100%'
      },
      children: [
        {
          type: 'rc#ScatterChart',
          props: {
            width: 400,
            height: 400,
            margin: {
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }
          },
          children: [
            {
              type: 'rc#CartesianGrid',
              
            },
            {
              type: 'rc#XAxis',
              props: {
                type: 'number',
                dataKey: 'x',
                name: 'stature',
                unit: 'cm'
              },
              
            },
            {
              type: 'rc#YAxis',
              props: {
                type: 'number',
                dataKey: 'y',
                name: 'weight',
                unit: 'kg'
              },
              
            },
            {
              type: 'rc#Tooltip',
              props: {
                cursor: {
                  strokeDasharray: '3 3'
                }
              },
              
            },
            {
              type: 'rc#Scatter',
              props: {
                name: 'A school',
                data: [
                  {
                    x: 100,
                    y: 200,
                    z: 200
                  },
                  {
                    x: 120,
                    y: 100,
                    z: 260
                  },
                  {
                    x: 170,
                    y: 300,
                    z: 400
                  },
                  {
                    x: 140,
                    y: 250,
                    z: 280
                  },
                  {
                    x: 150,
                    y: 400,
                    z: 500
                  },
                  {
                    x: 110,
                    y: 280,
                    z: 200
                  }
                ],
                fill: '#8884d8'
              },
              children: [
                {
                  type: 'rc#LabelList',
                  props: {
                    dataKey: 'x'
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