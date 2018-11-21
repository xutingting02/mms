<template lang="html">
<div>
  <Bread :breadList="breadList"></Bread>
  <div class="add-patient">
    <el-form ref="form" :model="form" label-width="100px" label-position="left">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="日期">
        <el-col>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.address"></el-input>
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
import { addPatient, getPatientById } from '@/api/patients'
export default {
  components: {
    Bread
  },
  data () {
    return {
      form: {
        name: '',
        age: '',
        sex: '1',
        address: '',
        phone: '',
        desc: '',
        date: Date.now()
      },
      isEdit: false,
      breadList: [
        {
          id: '1',
          name: '病历管理',
          path: '/manage/patients'
        },
        {
          id: '2',
          name: '新建病历'
        }
      ]
    }
  },
  methods: {
    onSubmit () {
      addPatient({
        ...this.form,
        id: this.$route.params.id
      }).then((res) => {
        if (res.success) {
          this.$router.push('/manage/patients')
        }
      })
    },
    cancelSubmit () {
      this.$router.push('/manage/patients')
    }
  },
  created () {
    if (this.$route.params.id) {
      this.isEdit = true
      getPatientById({id: this.$route.params.id}).then((res) => {
        this.form = res
      })
      this.breadList[1].name = '编辑病历'
    }
  }
}
</script>

<style lang="css">
.add-patient {
  width: 500px;
  text-align: left;
}
</style>
