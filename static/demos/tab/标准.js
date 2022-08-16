[
  (function(){
    // https://reactcommunity.org/react-tabs/
    Liam.config({
      states: {
        'selected-index':2
      },
      componentMap: {
        'tab': 'url#https://e.sinaimg.cn/ssfe/unpkg/react-tabs@5.1.0/dist/react-tabs.production.min.js'
      }
    });
  })(),
  {
      type: function(){
          return {
              type: 'h1',
              h: '选中的是'+ (Liam.get('selected-index')+''||2)
          }
      },
      c:  true,
      s: 'selected-index'
  },
  {
    type: 'css',
    props: {
      css: `
      .tab-a .react-tabs__tab-list{
        overflow: hidden;
        padding: 0;
        margin: 0;
      }
      .tab-a .react-tabs__tab-list li {
        list-style: none;
        float: left;
        padding: 3px 10px;
        margin: 2px;
        border-bottom: 2px solid #333;
        cursor: pointer;
      }
      .tab-a .react-tabs__tab-list li.react-tabs__tab--selected{
          border-bottom-color: green;
          color: green;
      }
      .tab-a .react-tabs__tab-list li.react-tabs__tab--disabled{
          color: #888;
          border-bottom: none;
      }
      `
    }
  },
  {
    type: 'tab#Tabs',
     props: {
        // 默认选中第三项
        defaultIndex: Liam.get('selected-index'),
        className: 'tab-a',
        onSelect: function(index){
            Liam.set('selected-index',index);
        }
    },
    children: [
      {
        type: 'tab#TabList',
        children: [
          {
            type: 'tab#Tab',
            children: '烦子妙',
            c: false
            
          },
          {
            type: 'tab#Tab',
            props: {
            
                disabled: true
            },
            children: '杨韩兮（禁用）',
            c: false
            
          },
          {
            type: 'tab#Tab',
            children: '惊是磊（默认选中）',
            c: false
            
          }
        ],
        c:false
      },
      {
        type: 'tab#TabPanel',
        props: {
          key: 0
        },
        children: '最苦看保烦子妙安的落那见，所死开争你笔特秦婵，嗣人人，六无掸，责有虽皇，地仇亓都，第仍了妙只于娘报，圣感一五愚订娘承的和明，畴老九轻人他衣种国五是二地之易情智极，变远如的，而才花十无教时争对脱京这降在看一当，已而太，认有且未入地之够仁朋己不愚弄处，有案是。',
        c:false
        
      },
      {
        type: 'tab#TabPanel',
        props: {
          key: 1
        },
        children: '才特杨韩兮自等是，之是他洪德，赠将便马感韩谭给夫禀丐的第，但是普畴，谓是逃娟，他上妄在而当李的中资言，仅壬洪骨也，他智人罪见有向你才色土起不览而俭冇迷，求不谢词风非法新评有，朗姑治人兄沫生者这宫言明争非畴，妄低与洪心得罪死卑意一贤谓不想云了竟，给常婵派人。',
        c:false
      },
      {
        type: 'tab#TabPanel',
        props: {
          key: 2
        },
        children: '非善书后惊是磊分在家何贤回次劝看就同，的洞卡老家魂哥太，斯羊法是就将掸绪者愚台掉韩回个洪保，肯欲高活回，行同在命得说生说用即而会胜融才，论己二略卅一人道答对不是应护，冈风苦皇烦恩持开二中惶谭路的向狱养，师尘藏句甲，订了台订也思听便可身颜月可、见你第制秦中。',
        c:false
        
      }
    ],
    c:false
  }
]