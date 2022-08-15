[
    {
        type: 'div',
        props: {
            style: {
                display: 'flex',
                'flex-direction': 'column',
                height: '300px',
                overflow: 'auto',
                border: '1px solid #333'
            }
        },
        children: [
            {
                type: 'div',
                props: {
                    style: {
                        height:'50px',
                        padding: '5px',
                        background: '#eee',
                        margin: '10px',
                    }
                    
                },
                h: '50px'
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