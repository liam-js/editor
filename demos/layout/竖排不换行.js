[
    {
        type: 'div',
        props: {
            style: {
                display: 'flex',
                'flex-direction': 'column',
                overflow: 'auto',
                border: '1px solid #333',
                // 高度用于测试是否换行
                height: '200px'

            }
        },
        children: 'Loremipsumdolorsitametconsecteturadipisicingelit'.split('').map(function(item){
          return {
                type: 'div',
                props: {
                    style: {
                        padding: '5px',
                        background: '#eee',
                        margin: '10px',
                    }
                    
                },
                h: item
            }
        })
    }
]