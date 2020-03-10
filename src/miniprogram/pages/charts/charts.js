import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function setOption(chart) {
  var option = {
    title: {
      text: "",
      subtext: ""
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
    },

    legend: {
      data: ["成交金额", "成交笔数"]
    },
    color: ["#FF7F45", "#5889FF"],
    grid: {
      right: "10%"
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: false,
          lineStyle: {
            color: "#EBEEF5"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#909399"
          }
        },
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        axisLabel: {
          show: true,
          textStyle: {
            color: "#909399"
          }
        }
      }
    ],
    yAxis: [
      {
        axisTick: {
          alignWithLabel: false,
          lineStyle: {
            color: "#909399"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#909399"
          }
        },
        type: "value",
        name: "成交笔数（件）",
        min: 0,
        position: "right",
        max: 50,
        splitNumber: 5,
        interval: 10,
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: "#909399"
          }
        }
      },
      {
        axisTick: {
          alignWithLabel: false,
          lineStyle: {
            color: "#EBEEF5"
          }
        },
        axisLine: {
          lineStyle: {
            color: "#909399"
          }
        },
        type: "value",
        name: "成交金额（元）",
        min: 0,
        position: "left",
        max: 500,
        splitNumber: 5,
        interval: 100,
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            color: "#909399"
          }
        }
      }
    ],
    series: [
      {
        name: "成交金额",
        type: "line",
        yAxisIndex: 1,
        data: [100, 200, 240, 300, 450, 500, 600, 100],
        smooth: true
      },
      {
        name: "成交笔数",
        type: "line",
        yAxisIndex: 0,
        data: [10, 23, 12, 1, 33, 7, 10],
        smooth: true
      }
    ]
  };
  chart.setOption(option);
}

Page({
  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.init()
  },


  data: {
    tabList: [{ code: 7 }, { code: 15 }, { code: 30 }],
    tabIndex: 0,
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false
  },

  // 点击按钮后初始化图表
  init: function () {
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  tabClick({ currentTarget }) {
    this.setData({ tabIndex: currentTarget.dataset.index });
    console.log(currentTarget);
    this.init()
  }
});
