<template lang="pug">
  #app
    router-view
</template>


<script>
export default {
  name: 'App',
  data: () => ({}),
  
}
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
*
  margin: 0
  padding: 0
body
  // width: 70vw
  height: 100%
  margin: 0 auto
  position: relative
</style>
