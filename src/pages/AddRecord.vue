<template lang="html">
<div>
  <Bread :breadList="breadList"></Bread>
  <div class="add-record">
    <el-form ref="form" :model="form" label-width="100px" label-position="left">
      <el-form-item label="日期">
        <el-col>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.recordDate" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="病种">
        <el-input v-model="form.disease"></el-input>
      </el-form-item>
      <el-form-item label="药物">
        <el-input v-model="form.medicine"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="cancelSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import Bread from '@/components/Bread'
import { addRecord, getRecordById } from '@/api/records'
export default {
  components: {
    Bread
  },
  data () {
    return {
      form: {
        price: '',
        medicine: '',
        disease: '',
        desc: '',
        recordDate: Date.now()
      },
      isEdit: false,
      breadList: [
        {
          id: '1',
          name: '就诊记录',
          path: '/manage/records'
        },
        {
          id: '2',
          name: '新建就诊记录'
        }
      ]
    }
  },
  methods: {
    onSubmit () {
      addRecord({
        ...this.form,
        patient: this.$route.query.patientId,
        id: this.$route.params.id
      }).then((res) => {
        if (res.success) {
          this.$router.push('/manage/records?id=' + this.$route.query.patientId)
        }
      })
    },
    cancelSubmit () {
      this.$router.push('/manage/records')
    }
  },
  created () {
    if (this.$route.params.id) {
      this.isEdit = true
      getRecordById({id: this.$route.params.id}).then((res) => {
        this.form = res
      })
      this.breadList[1].name = '编辑就诊记录'
    }
  }
}
</script>

<style lang="css">
.add-record {
  width: 500px;
  text-align: left;
}
</style>
