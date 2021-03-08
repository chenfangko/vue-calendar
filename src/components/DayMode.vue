<template lang="pug">
section
  .grid-container
    .cell.cell-time(v-for="time in 24")
      .time {{time < 13 ? time : time - 12}}:00 {{time < 13 ? 'am' : 'pm'}}
    .cell.cell-slot(v-for="slot in 24")

</template>

<script>


export default {
}
</script>

<style lang="sass" scoped>
*
    // outline: solid 1px red
.grid-container
  display: grid
  background-color: #ddd
  grid-template-columns: 1fr 7fr
  grid-template-rows: repeat(24, 5em)
  column-gap: 2px
  row-gap: 2px
  grid-auto-flow: column
  .cell
    background-color: #fff
  .cell-time, .cell-slot
    display: grid
    .time
      align-self: end
</style>