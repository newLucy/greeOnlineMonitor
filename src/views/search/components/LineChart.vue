<!--
  父组件传值说明：
    1. initData: {
          xAxisName: 横坐标名,
          yAxisName: 纵坐标名
       }
    2. updateData: {
          dataset: {
            dimensions: [横坐标键值, 系列1键值， 系列2键值， ...],
            source: [{dimensions中的键值所对应的键值对组成的对象}, ...]
          },
          highlight: 需要高亮显示的点对应的横坐标
       }
-->

<template>
  <div ref="line-chart" id="line" class="line-chart"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: ['initData', 'updateData', 'resizeFlag'],
  data () {
    return {
      myChart: null
    }
  },
  mounted () {
    this.myChart = echarts.init(this.$refs['line-chart'])
    // this.initChart()
    // this.updateChart()
  },
  watch: {
    updateData: {
      handler (val) {
        this.$nextTick(() => {
          this.myChart.clear()
          this.initChart()
          this.updateChart()
        })
      },
      deep: true,
      immediate: true
    },
    resizeFlag () {
      this.myChart.resize()
    }
  },
  methods: {
    updateChart () {
      // 找到故障那一刻的数据，为突出显示故障当时数据做准备
      const dataArray = this.updateData.dataset.source.filter(item => {
        return item.time === this.updateData.highlight
      })
      const data = dataArray.length > 0 ? dataArray[0] : {}

      // 设置默认选中的值
      const dimensions = this.updateData.dataset.dimensions

      this.myChart.setOption({
        dataset: this.updateData.dataset,
        legend: {
          data: dimensions.slice(1)
        },
        series: dimensions.map(item => {
          return {
            type: 'line',
            symbol: 'emptyCircle',
            symbolSize: 6,
            smooth: true,
            connectNulls: true,
            lineStyle: {
              width: 1
            },
            markPoint: {
              data: [{
                coord: [this.updateData.highlight, data[item]],
                symbol: data[item] ? 'emptyCircle' : 'none',
                symbolSize: 10
              }]
            }
          }
        }).slice(1)
      })
    },
    initChart () {
      this.myChart.setOption({
        title: {
          show: false
        },
        legend: {
          type: 'scroll',
          width: '86%',
          left: 'center',
          top: '0'
        },
        tooltip: {
          trigger: 'axis',
          confine: true
        },
        grid: {
          left: '5%',
          right: '2%',
          bottom: '15',
          top: '60',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // name: this.initData.xAxisName,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          // name: this.initData.yAxisName,
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: '#cfcfcf'
            }
          }
        },
        series: []
      })
    }
  },
}
</script>
<style>
  .line-chart {
    width: 100%;
    height:6rem;
  }
</style>
