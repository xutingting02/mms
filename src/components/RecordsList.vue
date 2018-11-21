<template>
<div>
  <el-row class="row-group">
    <el-col :span="6">
      <span>性别：</span>
      <el-select v-model="sex" placeholder="请选择" size="small">
        <el-option
          v-for="item in sexSource"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="10">
      <span>关键词查询：</span>
      <div class="keyword-wrapper">
        <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select" size="small">
          <el-select v-model="keywordType" slot="prepend" placeholder="请选择">
            <el-option label="姓名" value="name"></el-option>
            <el-option label="家庭地址" value="address"></el-option>
            <el-option label="联系方式" value="phone"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="renderList"></el-button>
        </el-input>
      </div>
    </el-col>
  </el-row>
  <el-row class="row-group">
    <el-col :span="3">
      <el-button type="primary" icon="el-icon-plus" @click="addRecord">新建就诊记录</el-button>
    </el-col>
    <el-col :span="21" class="batch-group">
      <el-button size="mini" @click="batchDelete">删除</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="tableData"
    stripe
    ref="list"
    style="width: 100%"
    @selection-change="selectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      align="left"
      prop="recordDate"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      align="left"
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      align="left"
      prop="phone"
      label="联系方式"
      width="180">
    </el-table-column>
    <el-table-column
      align="left"
      prop="address"
      label="地址">
    </el-table-column>
    <el-table-column
      align="left"
      prop="disease"
      label="病种">
    </el-table-column>
    <el-table-column
      align="left"
      prop="medicine"
      label="药物">
    </el-table-column>
    <el-table-column
      align="left"
      prop="price"
      label="价格">
    </el-table-column>
    <el-table-column label="操作" align="left">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row class="row-group">
    <el-pagination
      background
      :current-page.sync="page"
      @current-change="pageChange"
      layout="prev, pager, next"
      :total="totalSize">
    </el-pagination>
  </el-row>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
    <span>删除后无法恢复记录，确认删除？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="deleteRecordOk">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<style lang="css" scoped>
.row-group {
  margin: 20px 0;
  font-size: 14px;
}
.el-col {
  text-align: left;
}
.batch-group {
  background: #f5f7fa;
  padding: 5px 10px;
  height: 40px;
}
.keyword-wrapper {
  width: 250px;
  display: inline-block;
}
</style>

<script type="text/javascript">
import { getRecordsList, deleteRecord } from '@/api/records'
import { forEach } from 'lodash'
export default {
  data () {
    return {
      keyword: '',
      keywordType: 'name',
      sex: '0',
      sexSource: [
        {
          label: '不限',
          value: '0'
        },
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        }
      ],
      tableData: [],
      dialogVisible: false,
      selectedId: [],
      totalSize: 0,
      page: 1
    }
  },
  methods: {
    handleEdit: function (index, row) {
      this.$router.push('/manage/addRecord/' + row.id + '?patientId=' + this.$route.query.id)
    },
    handleDelete: function (index, row) {
      // 弹窗确认是否删除
      this.dialogVisible = true
      this.selectedId = [row.id]
    },
    deleteRecordOk: function () {
      this.dialogVisible = false
      deleteRecord({
        id: this.selectedId.join('|')
      }).then(res => {
        this.renderList()
      })
    },
    addRecord: function () {
      this.$router.push('/manage/addRecord?patientId=' + this.$route.query.id)
    },
    // 渲染列表
    renderList: function () {
      let params = {
        keyword: this.keyword,
        keywordType: this.keywordType,
        sex: this.sex,
        page: this.page,
        patientId: this.$route.query.id
      }
      getRecordsList(params).then((res) => {
        forEach(res.data, function (item) {
          // item = Object.assign(item, item.patient)
          item.name = item.patient.name
          item.address = item.patient.address
          item.phone = item.patient.phone
        })

        this.tableData = res.data
        this.totalSize = res.totalSize
      })
    },
    selectionChange: function (selection) {
      // selection为对象数组
      let selectedIds = []
      forEach(selection, function (item) {
        selectedIds.push(item.id)
      })
      this.selectedId = selectedIds
    },
    // 批量删除
    batchDelete: function () {
      this.dialogVisible = true
      this.selectionChange(this.$refs.list.selection)
    },
    pageChange: function () {
      // 刷新table
      this.renderList()
    }
  },
  watch: {
    sex: function () {
      this.renderList()
    }
  },
  created () {
    this.renderList()
  }
}
</script>
