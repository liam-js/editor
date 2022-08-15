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
          type: 'rc#RadarChart',
          props: {
            cx: '50%',
            cy: '50%',
            outerRadius: '80%',
            data: [
              {
                subject: 'Math',
                A: 120,
                B: 110,
                fullMark: 150
              },
              {
                subject: 'Chinese',
                A: 98,
                B: 130,
                fullMark: 150
              },
              {
                subject: 'English',
                A: 86,
                B: 130,
                fullMark: 150
              },
              {
                subject: 'Geography',
                A: 99,
                B: 100,
                fullMark: 150
              },
              {
                subject: 'Physics',
                A: 85,
                B: 90,
                fullMark: 150
              },
              {
                subject: 'History',
                A: 65,
                B: 85,
                fullMark: 150
              }
            ]
          },
          children: [
            {
              type: 'rc#PolarGrid',
              
            },
            {
              type: 'rc#PolarAngleAxis',
              props: {
                dataKey: 'subject'
              },
              
            },
            {
              type: 'rc#PolarRadiusAxis',
              
            },
            {
              type: 'rc#Radar',
              props: {
                name: 'Mike',
                dataKey: 'A',
                stroke: '#8884d8',
                fill: '#8884d8',
                fillOpacity: 0.6
              },
              
            }
          ],
          
        }
      ],
      
    }
  }
]