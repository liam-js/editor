[
    {
        type: 'div',
        props: {
            style: {
                display: 'flex',
                overflow: 'auto',
                border: '1px solid #333'
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