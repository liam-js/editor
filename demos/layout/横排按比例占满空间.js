[
    {
        type: 'div',
        props: {
            style: {
                display: 'flex',
                height: '100px',
                overflow: 'auto',
                border: '1px solid #333'
            }
        },
        children: [
            {
                type: 'div',
                props: {
                    style: {
                        width:'100px',
                        padding: '5px',
                        background: '#eee',
                        margin: '10px',
                    }
                    
                },
                h: '100px'
            },
            {
                type: 'div',
                props: {
                    style: {
                        flex: 2,
                        padding: '5px',
                        background: '#eee',
                        margin: '10px',
                    }
                    
                },
                h: 'flex:2'
            },
            {
                type: 'div',
                props: {
                    style: {
                        flex: 8,
                        padding: '5px',
                        background: '#eee',
                        margin: '10px',
                    }
                    
                },
                h: 'flex:8'
            }
        ]
    }
]