<template lang="html">
<div>
  <Bread :breadList="breadList"></Bread>
  <Records-list></Records-list>
</div>
</template>

<script>
import RecordsList from '@/components/RecordsList'
import Bread from '@/components/Bread'
export default {
  components: {
    RecordsList,
    Bread
  },
  data: function () {
    return {
      breadList: [
        {
          id: '1',
          name: '就诊记录',
          path: '/manage/records'
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
