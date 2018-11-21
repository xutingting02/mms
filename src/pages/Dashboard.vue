<template lang="html">
<div class="dashboard">
  <div class="income-report">
    <el-row :gutter="20">
      <el-col :span="8">今日收入: <span class="income">{{ todayIncome }}</span>元</el-col>
      <el-col :span="8">本月收入: <span class="income">{{ monthIncome }}</span>元</el-col>
    </el-row>
  </div>
  <div>
    <div>收入报告</div>
    <div id="myChart" :style="{width: '800px', height: '500px'}"></div>
  </div>
</div>
</template>

<script>
import { getIncomeList } from '@/api/report'
import { forEach } from 'lodash'
import moment from 'moment'
export default {
  data () {
    return {
      todayIncome: 100,
      monthIncome: 3000,
      option: {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [],
          type: 'line'
        }]
      }
    }
  },
  created: function () {
    let _this = this
    getIncomeList().then(res => {
      let incomeArr = []
      let dateArr = []
      forEach(res.data, (item) => {
        dateArr.push(moment(item._id).format('l'))

        incomeArr.push(item.income)
      })
      _this.option = {
        xAxis: {
          type: 'category',
          data: dateArr
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: incomeArr,
          type: 'line'
        }]
      }
    })
  },
  watch: {
    option: function (value) {
      if (this.chart) {
        this.chart.setOption(value)
      }
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: this.dateArr
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.incomeArr,
          type: 'line'
        }]
      })
    }
  }
}
</script>

<style lang="css">
.dashboard {
  text-align: left;
  margin: 20px 10px;
}
.income-report {
  font-size: 16px;
  padding: 30px 10px;
  background: #F6F6F6;
  margin: 20px 0;
}
.income {
  color: #F9AD42;
  font-size: 20px;
}
</style>
