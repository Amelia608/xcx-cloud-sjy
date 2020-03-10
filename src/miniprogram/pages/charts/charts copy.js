import * as echarts from "../../ec-canvas/echarts";
const app=getApp();

let chart = null;
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

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
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  },
  onLoad() {},
  onReady() {
    setTimeout(function() {
      // 获取 chart 实例的方式
      initChart()
      console.log(chart);
    }, 2000);
  }
});
