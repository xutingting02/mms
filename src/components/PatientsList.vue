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
      <el-button type="primary" icon="el-icon-plus" @click="addPatientCard">新建病历</el-button>
    </el-col>
    <el-col :span="21" class="batch-group">
      <el-button size="mini" @click="batchDelete">删除</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="tableData"
    ref="list"
    stripe
    style="width: 100%"
    @selection-change="selectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      align="left"
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      align="left"
      prop="name"
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-button @click="handleRedirect(scope.row)" type="text" size="small">{{scope.row.name}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="left"
      prop="age"
      label="年龄"
      width="180">
    </el-table-column>
    <el-table-column
      align="left"
      prop="sex"
      label="性别"
      width="180">
      <template slot-scope="scope">
        {{scope.row.sex === '1' ? '男' : '女'}}
      </template>
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
    <span>操作会同时删除该用户的所有就诊记录，确认删除？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="deletePatientOk">确 定</el-button>
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

import { getPatientsList, deletePatient } from '@/api/patients'
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
      tableData: [
        {
          id: '1',
          age: '21'
        }
      ],
      dialogVisible: false,
      selectedId: [],
      totalSize: 0,
      page: 1
    }
  },
  methods: {
    handleRedirect: function (row) {
      this.$router.push('/manage/records?id=' + row.id)
    },
    handleEdit: function (index, row) {
      this.$router.push('/manage/addPatient/' + row.id)
    },
    handleDelete: function (index, row) {
      // 弹窗确认是否删除
      this.dialogVisible = true
      // this.$refs.list.clearSelection()
      // this.$refs.list.toggleRowSelection(row)
      this.selectedId = [row.id]
    },
    deletePatientOk: function () {
      this.dialogVisible = false
      deletePatient({
        id: this.selectedId.join('|')
      }).then(res => {
        this.renderList()
      })
    },
    addPatientCard: function () {
      this.$router.push('/manage/addPatient')
    },
    // 渲染列表
    renderList: function () {
      let params = {
        keyword: this.keyword,
        keywordType: this.keywordType,
        sex: this.sex,
        page: this.page
      }
      getPatientsList(params).then((res) => {
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
