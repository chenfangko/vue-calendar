<template lang="pug">
section
  .grid-container
    .cell.cell-time(
      v-for="date in fullMonth"
      @click="changeTempSelected(date.fullDate)"
      :class="[ { dot: date.fullDate.setHours(0,0,0,0) == today }, {selected: date.fullDate.setHours(0,0,0,0) == tempSelected } , { 'this-month': date.fullDate.getMonth() == thisMonth }]") 
      span {{date.fullDate.getDate()}}
      
</template>

<script>
export default {
  props: {
    thisMonth: Number,
    nextMonth: Number,
  },
  data() {
    return {
      week: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      tempSelected: null,
    }
  },
  computed: {
    today: function() {
      return this.$store.state.today.setHours(0,0,0,0);
    },
    selectedDate: function() {
      return this.$store.state.selectedDate;
    },
    fullMonth: function() {
      return this.$store.state.fullMonth;
    },
  },
  methods: {
    changeTempSelected(fullDate) {
      this.tempSelected = fullDate.setHours(0,0,0,0);
      this.$emit('tempSelected', fullDate);
      console.log(fullDate);
    },
  },
  mounted() {
    this.tempSelected = this.$store.state.selectedDate.setHours(0,0,0,0);
    this.$store.dispatch('getFullMonth', this.$store.state.thisMonth)
  },
  beforeCreate: function() {
    this.$store.dispatch('getFullMonth', this.$store.state.thisMonth)
  }
}
</script>

<style lang="sass" scoped>
*
    // outline: solid 1px red
.grid-container
  display: grid
  width: 80%
  margin: 0 auto
  grid-template-columns: repeat(7, 1fr)
  grid-template-rows: repeat(5, 5em)
  column-gap: 2px
  row-gap: 2px
  .cell
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    color: $font-grey-light
    font-weight: 600
  .this-month
    color: $font-grey-dark
  .selected span
      color: #fff
      position: relative
  .selected::before
    content: ''
    background-color: $primary
    width: 1em
    height: 1em
    padding: 1em
    border-radius: 50%
    position: absolute
  .dot::after
    bottom: 5px

</style>