import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title : {
        text: '订单统计',
        subtext: ''
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
    },
    grid: {
      right: '10%'
    },
    legend: {
        data:['成交金额','成交笔数']
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            axisTick: {
              alignWithLabel: false,
              lineStyle: {
                color: '#EBEEF5'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#909399'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#909399'
              }
            },
            splitLine: {
              show: false
            },
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel : {
                formatter: '{value}'
            }
        }
    ],
    series : [
        {
            name:'成交金额',
            type:'line',
            data:[11, 11, 15, 13, 12, 13, 10],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            },
            axisLine: {
              lineStyle: {
                color: '#909399'
              }
            },
        },
        {
            name:'成交笔数',
            type:'line',
            data:[1, -2, 2, 5, 3, 2, 0],
            markPoint : {
                data : [
                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            },
            axisLine: {
              lineStyle: {
                color: '#909399'
              }
            },
        }
    ]
};

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },
  onLoad(){
  },
  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  }
});
