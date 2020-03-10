
  var option = {
    title: {
      text: "订单统计",
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
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
    },
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
        },
        //网格样式
        splitLine: {
          show: true,
          lineStyle: {
            color: ["red"],
            width: 1,
            type: "solid"
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
        splitLine: {
          show: true,
          lineStyle: {
            color: ["blue"],
            width: 1,
            type: "solid"
          }
        },
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
        splitLine: {
          show: true,
          lineStyle: {
            color: ["orange"],
            width: 1,
            type: "solid"
          }
        },
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
