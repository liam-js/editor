[
  (function () {

    Liam.config({
      componentMap: {
        list: 'url#https://e.sinaimg.cn/u/0/92/361/6947228527649/react-virtual-list.production.min.js',
      },
    });
  })(),
  
  {
    type: 'css',
    props: {
      /* 第条信息的样式，注意样式高度要与 getItemSize 高度一致 */
      css: `
      .item-a{
        padding: 10px 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        font-size: 14px;
        font-weight 40;
        color: #1a2027;
        box-sizing: border-box;
        height: 50px;
        line-height: 35px;
        overflow: hidden;
        border-bottom: 1px solid #eee;
      }
      .item-a-odd{
        background: #eee;
      }
      `
    }
  },

  {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100vh'
      }
    },
    children: (function () {
      function LoadMore(props) {

        var hasNextPage = props.hasNextPage;
        var isNextPageLoading = props.isNextPageLoading;
        var items = props.items;
        var loadNextPage = props.loadNextPage;

        /* If there are more items to be loaded then add an extra row to hold a loading indicator. */
        var itemCount = hasNextPage ? items.length + 1 : items.length;

        /* Only load 1 page of items at a time. */
        /* Pass an empty callback to InfiniteLoader in case it asks us to load more than once. */
        var loadMoreItems = isNextPageLoading ? function () { } : loadNextPage;

        /* Every row is loaded except for our loading indicator row. */
        var isItemLoaded = function (index) { return !hasNextPage || index < items.length; };

        /* Render an item or a loading indicator. */
        const renderItem = function(info){
          const index = info.index;
          return props.renderItem({
            index: index,
            style: info.style,
            /* 是否已经加载了 */
            loaded: isItemLoaded(index),
            /* 该项内容 */
            item: items[index],
            /* 所有项 */
            items
          });
        }

        return {
          type: 'list#InfiniteLoader',
          props: {
            isItemLoaded: isItemLoaded,
            itemCount: itemCount,
            loadMoreItems: loadMoreItems
          },
          children: function (config) {
            var onItemsRendered = config.onItemsRendered;
            var ref = config.ref;
            
            return {
              type: 'list#AutoSizer',
              children: function(info){
                
                return {
                  type: 'list#VariableSizeList',
                  props: {
                    itemCount: itemCount,
                    onItemsRendered: onItemsRendered,
                    ref: ref,
                    width: info.width,
                    itemSize: props.getItemSize,
                    height: info.height,
                  },
                  children:renderItem,
                  r: 'children'
                }
              },
              r: 'children'
            };
          },
          r: 'children'
        }

      }
      const List = class extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            hasNextPage: true,
            isNextPageLoading: false,
            items: []
          };
        }
        _loadNextPage() {
          this.setState({ isNextPageLoading: true }, () => {
            this.props.getNextPage.call(this).then((info)=>{
              this.setState(state => ({
                hasNextPage: info.hasNextPage,
                isNextPageLoading: false,
                items: info.items
              }));
            });
          });
        };

        render() {
          const { hasNextPage, isNextPageLoading, items } = this.state;
          const getItemSize = (index) => {
            return this.props.getItemSize(index, items[index]);
          };
          return {
            type: LoadMore,
            props: {
              hasNextPage: hasNextPage,
              isNextPageLoading: isNextPageLoading,
              items: items,
              loadNextPage: this._loadNextPage.bind(this),
              getItemSize,
              renderItem: this.props.renderItem
            },
            c: true
          };
        }

      }

      return {
        type: List,
        props: {
          /* 获取每一项的尺寸，竖直滚动获取高度，水平滚动获取宽度 */
          getItemSize: function(index, item){
            console.log(index,item);
            return 50;
          },
          /* 获取下一页数据，返回 promise  */
          getNextPage: function(){
            const self = this;
            const state = self.state;
            const texts = ['里原派极行得', '我郭看讨要了馆', '而身谓没使', '廿则若上师有乡土何看作中到不看我', '罪回身皇国回娘如元肯相己问', '曾被啊', '是准论氏前慷气德使答无上弄彷君谓幕', '胜台大见流历舟终未国', '入仑中谋德辜认冷我才得五人价的九流', '回釜这国者马虑汪郭么极', '找人下报愚文最都订的', '同', '一韩要不与已心流龄百承才没怎自', '感自母在才而他天在设刑我欲向', '然是妄作罪无小救斗', '使县生什以承感德郭不的你', '哉生是狱不大虑俭她秦落十馆笔救', '我司时到自斯丹元幕败斯主磊老将苟付', '流身说够艳可量看有郭日用无', '种后此前不会音虽了见辜这', '次首最忧变马姑', '会主自智', '贼两非德老看极者', '之此然斯死是害常活视'];
            return new Promise(function(resolve){
              /* 模拟异步请求数据 */
              setTimeout(() => {
                resolve({
                  /* 模拟是否还有下一页 */
                  hasNextPage: state.items.length < 100,
                  /* 模拟返回的数据 */
                  items: [...state.items].concat(
                    texts.map(function () {
                      return {
                        name: texts[Math.round(Math.random() * (24 - 1)) + 1],
                      };
                    })
                  )
                });

            }, 1500);
            })
          },
          /* 渲染数据 */
          renderItem: function (info) {
            var index = info.index;
            var style = info.style;

            var content;
            if (info.loaded) {
              content = (index+1)+'.'+info.item.name;
            } else {
              content = '加载中...';
            }
            return { type: 'div', props: { style: style,className: 'item-a'+(index%2===0?' item-a-odd':'') }, children: content };
          }
        },
        c: true
      }
    })()
  },

];
