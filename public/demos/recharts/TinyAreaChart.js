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
      type: 'rc#ResponsiveContainer',
      props: {
        width: '100%',
        height: '100%'
      },
      children: [
        {
          type: 'rc#AreaChart',
          props: {
            width: 200,
            height: 60,
            data: [
              {
                name: 'Page A',
                uv: 4000,
                pv: 2400,
                amt: 2400
              },
              {
                name: 'Page B',
                uv: 3000,
                pv: 1398,
                amt: 2210
              },
              {
                name: 'Page C',
                uv: 2000,
                pv: 9800,
                amt: 2290
              },
              {
                name: 'Page D',
                uv: 2780,
                pv: 3908,
                amt: 2000
              },
              {
                name: 'Page E',
                uv: 1890,
                pv: 4800,
                amt: 2181
              },
              {
                name: 'Page F',
                uv: 2390,
                pv: 3800,
                amt: 2500
              },
              {
                name: 'Page G',
                uv: 3490,
                pv: 4300,
                amt: 2100
              }
            ],
            margin: {
              top: 5,
              right: 0,
              left: 0,
              bottom: 5
            }
          },
          children: [
            {
              type: 'rc#Area',
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
      
    }
  }
]