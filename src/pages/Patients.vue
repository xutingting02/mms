<template lang="html">
<div>
  <Bread :breadList="breadList"></Bread>
  <Patients-list></Patients-list>
</div>
</template>

<script>
import PatientsList from '@/components/PatientsList'
import Bread from '@/components/Bread'
export default {
  components: {
    PatientsList,
    Bread
  },
  data: function () {
    return {
      breadList: [
        {
          id: '1',
          name: '病历管理',
          path: '/manage/patients'
        },
        {
          id: '2',
          name: '列表'
        }
      ]
    }
  }
}
</script>

<style lang="css">
</style>
