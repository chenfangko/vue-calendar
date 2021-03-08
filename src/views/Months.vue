<template lang="pug">
  section
    .upper
      .top
        .top-item.left 選擇日期
        RouterLink.top-item.right.no-decoration(:to="{name: 'Calendar'}") Ｘ
      .middle {{tempFullDate? tempFullDate.getFullYear() : selectedDate.getFullYear()}} / {{tempFullDate ? tempFullDate.getMonth() + 1: selectedDate.getMonth() + 1}}
      .grid-container
        .cell.cell-date(
          v-for="date in week") {{date.toString().split(' ')[0][0]}}
    
    .downer-main
      .months
        Month.month(
          @tempSelected='tempSelected'
          :thisMonth="thisMonth")
        Month.month(
          @tempSelected='tempSelected'
          :nextMonth="thisMonth + 1")
      .confirmSelect(@click="changeSelectedDate") 選擇
</template>

<script>
import Month from "@/components/Month"
export default {
  data() {
    return {
      tempFullDate: null
    }
  },
  components: {
    Month,
  },
  computed: {
    week: function() {
      return this.$store.state.week
    },
    today: function() {
      return this.$store.state.today
    },
    selectedDate: function() {
      return this.$store.state.selectedDate
    },
    thisMonth: function() {
      return this.$store.state.thisMonth
    }
  },
  methods: {
    tempSelected(date) {
      this.tempFullDate = date
    },
    changeSelectedDate() {
      const newSelectedDate = this.tempFullDate;
      this.$store.dispatch('changeSelectedDate', newSelectedDate);
      this.$store.dispatch('getWeek', newSelectedDate);
      this.$router.back();
    }
  },
  mounted() {
    this.$store.state.today;
    this.$store.state.thisMonth;
  },
  beforeCreate: function() {
    this.$store.dispatch('getWeek', this.$store.state.today);
  }
}
</script>

<style lang="sass" scoped>
$triangle-width: 6px
*
  // outline: solid 1px red
section
    width: 100vw
.upper
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px
  position: relative
  z-index: 10
  background-color: white
  height: 22vh
.top
  display: flex
  justify-content: space-between
  .top-item
      margin: 20px
  .right
    cursor: pointer
.grid-container
  display: grid
  grid-template-columns: repeat(7, 1fr)
  column-gap: 2px
  width: 80%
  margin: 0 auto
  .cell-date
    padding-top: 8px
    display: flex
    flex-direction: column
.downer-main
  height: 78vh
  overflow: scroll
  position: relative
  z-index: 2
  .months
    height: 90%
    display: flex
    flex-direction: column
    align-items: center
    overflow: scroll
.confirmSelect
  cursor: pointer
  position: fixed
  bottom: 2em
  left: 50%
  transform: translateX(-50%)
  background-color: $primary
  color: #fff
  padding: 5px 50px
  border-radius: 10px
  box-shadow: 0px 3px 5px 0.5px rgba(0, 0, 0, 0.3)

</style>