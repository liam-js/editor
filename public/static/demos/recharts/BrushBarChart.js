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
          type: 'rc#BarChart',
          props: {
            width: 500,
            height: 300,
            data: [
              {
                name: '1',
                uv: 300,
                pv: 456
              },
              {
                name: '2',
                uv: -145,
                pv: 230
              },
              {
                name: '3',
                uv: -100,
                pv: 345
              },
              {
                name: '4',
                uv: -8,
                pv: 450
              },
              {
                name: '5',
                uv: 100,
                pv: 321
              },
              {
                name: '6',
                uv: 9,
                pv: 235
              },
              {
                name: '7',
                uv: 53,
                pv: 267
              },
              {
                name: '8',
                uv: 252,
                pv: -378
              },
              {
                name: '9',
                uv: 79,
                pv: -210
              },
              {
                name: '10',
                uv: 294,
                pv: -23
              },
              {
                name: '12',
                uv: 43,
                pv: 45
              },
              {
                name: '13',
                uv: -74,
                pv: 90
              },
              {
                name: '14',
                uv: -71,
                pv: 130
              },
              {
                name: '15',
                uv: -117,
                pv: 11
              },
              {
                name: '16',
                uv: -186,
                pv: 107
              },
              {
                name: '17',
                uv: -16,
                pv: 926
              },
              {
                name: '18',
                uv: -125,
                pv: 653
              },
              {
                name: '19',
                uv: 222,
                pv: 366
              },
              {
                name: '20',
                uv: 372,
                pv: 486
              },
              {
                name: '21',
                uv: 182,
                pv: 512
              },
              {
                name: '22',
                uv: 164,
                pv: 302
              },
              {
                name: '23',
                uv: 316,
                pv: 425
              },
              {
                name: '24',
                uv: 131,
                pv: 467
              },
              {
                name: '25',
                uv: 291,
                pv: -190
              },
              {
                name: '26',
                uv: -47,
                pv: 194
              },
              {
                name: '27',
                uv: -415,
                pv: 371
              },
              {
                name: '28',
                uv: -182,
                pv: 376
              },
              {
                name: '29',
                uv: -93,
                pv: 295
              },
              {
                name: '30',
                uv: -99,
                pv: 322
              },
              {
                name: '31',
                uv: -52,
                pv: 246
              },
              {
                name: '32',
                uv: 154,
                pv: 33
              },
              {
                name: '33',
                uv: 205,
                pv: 354
              },
              {
                name: '34',
                uv: 70,
                pv: 258
              },
              {
                name: '35',
                uv: -25,
                pv: 359
              },
              {
                name: '36',
                uv: -59,
                pv: 192
              },
              {
                name: '37',
                uv: -63,
                pv: 464
              },
              {
                name: '38',
                uv: -91,
                pv: -2
              },
              {
                name: '39',
                uv: -66,
                pv: 154
              },
              {
                name: '40',
                uv: -50,
                pv: 186
              }
            ],
            margin: {
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
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
              type: 'rc#Legend',
              props: {
                verticalAlign: 'top',
                wrapperStyle: {
                  lineHeight: '40px'
                }
              },
              
            },
            {
              type: 'rc#ReferenceLine',
              props: {
                y: 0,
                stroke: '#000'
              },
              
            },
            {
              type: 'rc#Brush',
              props: {
                dataKey: 'name',
                height: 30,
                stroke: '#8884d8'
              },
              
            },
            {
              type: 'rc#Bar',
              props: {
                dataKey: 'pv',
                fill: '#8884d8'
              },
              
            },
            {
              type: 'rc#Bar',
              props: {
                dataKey: 'uv',
                fill: '#82ca9d'
              },
              
            }
          ],
          
        }
      ],
      
    }
  }
]