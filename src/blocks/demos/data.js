const all = {
      
  'layout':
  [
    '横排换行',
    '横排不换行',
    '横排居中',
    '横排均匀分布-两端不留白',
    '横排均匀分布',
    '横排按比例占满空间',
    '竖排换行',
    '竖排不换行',
    '竖排居中',
    '竖排均匀分布',
    '竖排均匀分布-上下两端不留白',
    '竖排按比例占满空间',
    '定位左上角',
    '定位右上角',
    '定位右下角',
    '定位左下角',
    '定位上部中间',
    '定位右部中间',
    '定位下部中间',
    '定位左部中间',
    '定位正中间',
    '水平垂直都居中',
    '固定在页面右部',
    '固定在页面左部',
    '固定在页面底部',
    '固定在页面顶部',
  ],
  text: [
        '标题一',
        '标题二',
        '标题三',
        '标题四',
        '标题五',
        '标题六',
        '副标题',
        '正文',
        '富文本',
  ],
  image: [
    '默认',
    '圆角',
    '固定宽高自适应',
    '拉伸填充',
    '缩放至完整显示',
    '覆盖裁剪'
  ],
  swiper: [
    '标准',
    '上下滚动',
    '一屏多帧',
    '自动分屏',
    '视觉差',
  ],
  tab: [
    '标准'
  ],
  headlessui: [
    'combobox',
    'dialog',
    'disclosure',
    'listbox',
    'menu',
    'popover',
    'radiogroup',
    'switch',
    'tabs',
  ],
  alert: [
    '普通',
    '带描述',
    '带状态',
    '多个按钮',
    '结果判断',
    '带输入框逻辑',
    '按钮文案修改',
    '获取点击结果',
    '两个按钮自定义文案',
    '两个按钮一个自定义文案一个默认',
  ],
  recharts: [
    'AreaChartConnectNulls',
    'AreaResponsiveContainer',
    'BarChartHasBackground',
    'BarChartNoPadding',
    'BarChartStackedBySign',
    'BiaxialBarChart',
    'BiaxialLineChart',
    'BrushBarChart',
    'BubbleChart',
    'ComposedChartWithAxisLabels',
    'ComposedResponsiveContainer',
    'CustomContentOfTooltip',
    'DashedLineChart',
    'LineBarAreaComposedChart',
    'LineChartAxisInterval',
    'LineChartConnectNulls',
    'LineChartWithReferenceLines',
    'LineChartWithXAxisPadding',
    'MixBarChart',
    'PieResponsiveContainer',
    'PositiveAndNegativeBarChart',
    'SameDataComposedChart',
    'ScatterAndLineOfBestFit',
    'ScatterChartWithLabels',
    'SimpleAreaChart',
    'SimpleBarChart',
    'SimpleLineChart',
    'SimpleRadarChart',
    'SimpleScatterChart',
    'SimpleTreemap',
    'SpecifiedDomainRadarChart',
    'StackedAreaChart',
    'StackedBarChart',
    'StraightAnglePieChart',
    'SynchronizedAreaChart',
    'SynchronizedLineChart',
    'TinyAreaChart',
    'TinyBarChart',
    'TinyLineChart',
    'VerticalComposedChart',
    'VerticalLineChart',
    'VerticalLineChartWithSpecifiedDomain',
  ],
  list: [
    '常见'
  ]


};
const categories = [];
let components = [];
for (const key in all) {
if (Object.hasOwnProperty.call(all, key)) {
  let items = all[key];
  items = items.map(function(item){
    return {
      category: key,
      title: item
    }
  });
  categories.push(key);
  components = components.concat(items);
  
}
}

export {
  all,
  categories,
  components
}