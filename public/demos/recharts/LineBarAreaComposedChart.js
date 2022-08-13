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
          type: 'rc#ComposedChart',
          props: {
            width: 500,
            height: 400,
            data: [
              {
                name: 'Page A',
                uv: 590,
                pv: 800,
                amt: 1400,
                cnt: 490
              },
              {
                name: 'Page B',
                uv: 868,
                pv: 967,
                amt: 1506,
                cnt: 590
              },
              {
                name: 'Page C',
                uv: 1397,
                pv: 1098,
                amt: 989,
                cnt: 350
              },
              {
                name: 'Page D',
                uv: 1480,
                pv: 1200,
                amt: 1228,
                cnt: 480
              },
              {
                name: 'Page E',
                uv: 1520,
                pv: 1108,
                amt: 1100,
                cnt: 460
              },
              {
                name: 'Page F',
                uv: 1400,
                pv: 680,
                amt: 1700,
                cnt: 380
              }
            ],
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
              props: {
                stroke: '#f5f5f5'
              },
              
            },
            {
              type: 'rc#XAxis',
              props: {
                dataKey: 'name',
                scale: 'band'
              },
              
            },
            {
              type: 'rc#YAxis',
              
            },
            {
              type: 'rc#Tooltip',
              
            },
            {
              type: 'rc#Legend',
              
            },
            {
              type: 'rc#Area',
              props: {
                type: 'monotone',
                dataKey: 'amt',
                fill: '#8884d8',
                stroke: '#8884d8'
              },
              
            },
            {
              type: 'rc#Bar',
              props: {
                dataKey: 'pv',
                barSize: 20,
                fill: '#413ea0'
              },
              
            },
            {
              type: 'rc#Line',
              props: {
                type: 'monotone',
                dataKey: 'uv',
                stroke: '#ff7300'
              },
              
            },
            {
              type: 'rc#Scatter',
              props: {
                dataKey: 'cnt',
                fill: 'red'
              },
              
            }
          ],
          
        }
      ],
      
    }
  }
]