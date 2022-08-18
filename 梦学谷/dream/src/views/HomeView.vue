
<template>
<div>
  22
</div>
</template>

<script>
import http from '../utils/http'
export default {
  name: '',
  components: {},
  data () {
    return {
    }
  },
  created () { 
    http.post('/user/login',{username: "admin", password: "123456"}).then(res =>{
      console.log(res);
    })
  },
  mounted () { },
  methods: {}
}
</script>
<style scoped lang='scss'>

</style>

