import * as echarts from "../../ec-canvas/echarts";
import jsonData from "./data";

const app = getApp();

function setOption(chart, option) {
  chart.setOption(option);
}

Page({
  onReady: function() {
    // 获取组件
    this.ecComponent = this.selectComponent("#mychart-dom-bar");
    this.init();
  },

  data: {
    tabList: [{ code: 7 }, { code: 15 }, { code: 30 }],
    tabIndex: 0,
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    list: jsonData.week
  },

  // 点击按钮后初始化图表
  init: function() {
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      this.drawLine(chart);
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
  drawLine(chart) {
    let date = this.data.list.map(el => el.dateTime);
    let data1 = this.data.list.map(el => el.amount);
    let data2 = this.data.list.map(el => el.quantity);
    function calcMax(arr) {
      let max = Math.max.apply(null, arr);
      return Math.ceil(max / 10) * 10;
    }
    let splitNumber = 5;
    let maxData1 = calcMax(data1);
    let maxData2 = calcMax(data2);
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
          data: date,
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
          max: maxData2,
          splitNumber: splitNumber,
          interval: maxData2 / splitNumber,
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
          max: maxData1,
          splitNumber: splitNumber,
          interval: maxData1 / splitNumber,
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
          data: data1,
          smooth: true
        },
        {
          name: "成交笔数",
          type: "line",
          yAxisIndex: 0,
          data: data2,
          smooth: true
        }
      ]
    };
    chart.setOption(option);
  },
  tabClick({ currentTarget }) {
    let arr = ["week", "half", "month"];
    let { index } = currentTarget.dataset;
    let data = jsonData[arr[index]];
    console.log(data);
    this.setData({ tabIndex: currentTarget.dataset.index, list: data });
    this.init();
  }
});
