<template lang="pug">
  section
    .upper
      .top
        .left
          .title(v-if="mode == 'week'") 預約行事曆
          .switch-date(v-if="mode == 'day'")
            .btn-change-date.prevDay(@click="switchPrevDate") <
            .selected-date {{selectedDate.toLocaleDateString('en-ZA')}}
            .btn-change-date.nextDat(@click="switchNextDate") >
        .right
          .change-mode.clickable(@click="switchMode") {{mode == 'week' ? '週檢視' : '日檢視'}}
          .profile.clickable 莉

      .grid-container
        RouterLink.cell.calendar-icon.no-decoration(:to="{name: 'Months'}") 口
        .cell.cell-date(
          v-for="date in week"
          :class="[ { dot: date == today.toString() },{ 'selected': selectedDate == date.toString() && mode == 'day'} ]" ) {{date.toString().split(' ')[0][0]}} <br> {{date.getDate()}}
    
    .downer-main
      WeekMode.week-mode(v-if="mode == 'week'")
      DayMode.day-mode(
        v-if="mode == 'day'")
</template>

<script>
import WeekMode from "@/components/WeekMode"
import DayMode from "@/components/DayMode"
export default {
  components: {
    WeekMode,
    DayMode
  },
  computed: {
    mode: function() {
      return this.$store.state.mode;
    },
    week: function() {
      return this.$store.state.week
    },
    today: function() {
      return this.$store.state.today
    },
    selectedDate: function() {
      return this.$store.state.selectedDate
    }
  },
  methods: {
    switchMode() {
      this.$store.dispatch('switchMode');
    },
    switchPrevDate() {
      const prevDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate() );
      const newSelectedDate = new Date(prevDate.setDate(prevDate.getDate() - 1));
      this.$store.dispatch('changeSelectedDate', newSelectedDate);
      this.$store.dispatch('getWeek', this.$store.state.selectedDate);
    },
    switchNextDate() {
      const nextDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate() );
      const newSelectedDate = new Date(nextDate.setDate(nextDate.getDate() + 1));
      this.$store.dispatch('changeSelectedDate', newSelectedDate);
      this.$store.dispatch('getWeek', this.$store.state.selectedDate);
    }
  },
  mounted() {
    this.$store.state.selectedDate;
    this.$store.state.today;
    this.$store.dispatch('getWeek',this.$store.state.selectedDate)
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
.upper
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 13px 2px
  position: relative
  z-index: 10
  background-color: white
  min-height: 22vh
.top
  display: flex
  justify-content: space-between
  .left
    flex: 1
    display: flex
    justify-content: flex-start
    align-items: center
    .title
      font-size: 1.5em
      margin-left: 2em
    .switch-date
      display: flex
    .btn-change-date
      cursor: pointer
      display: inline-flex
      background-color: #505050
      color: white
      font-weight: 700
      width: 1em
      height: 1em
      padding: 3px
      border-radius: 50%
      justify-content: center
      align-items: center
      margin: 0 2em

  .right
    display: flex
    justify-content: space-between
    .change-mode, .profile
      cursor: pointer
      display: flex
      align-items: center
      padding: 10px 20px
      background-color: $secondary
      color: $primary
      border-radius: 20px
      margin: 10px
      &::after
        content: ''
        width: 0
        height: 0
        border-top: solid $triangle-width $primary
        border-left: solid $triangle-width transparent
        border-right: solid $triangle-width transparent
        margin-left: 10px

.grid-container
  display: grid
  grid-template-columns: repeat(8, 1fr)
  column-gap: 2px
  .calendar-icon
    cursor: pointer
    grid-column-start: 1
    grid-column-end: 2
    grid-row-start: 1
    grid-row-end: 3
    justify-self: center
    align-self: center
  .cell-date
    padding-top: 8px
    display: flex
    flex-direction: column
  .selected
    margin: 0 10px
    border-radius: 10px
    background-color: $primary
    color: white
.downer-main
  height: 78vh
  overflow: scroll
  position: relative
  z-index: 2
</style>