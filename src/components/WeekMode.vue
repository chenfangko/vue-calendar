<template lang="pug">
section
  .grid-container
    .cell.cell-time(v-for="time in 24")
      .time {{time < 13 ? time : time - 12}}:00 {{time < 13 ? 'am' : 'pm'}}
    .cell.cell-slot(v-for="slot in 168")
      .slot-schedule
</template>

<script>


export default {
  data() {
    return {
      schedules: [{
        day: 1,
        from: 6,
        till: 8,
        title: '美甲',
        customer: '王小明'
      }]
    }
  },
}
</script>

<style lang="sass" scoped>
*
    // outline: solid 1px red
.grid-container
  display: grid
  background-color: #ddd
  grid-template-columns: repeat(8, 1fr)
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
    .slot-schedule
      align-self: center
</style>