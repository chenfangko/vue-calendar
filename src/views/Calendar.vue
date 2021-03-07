<template lang="pug">
  section
    .upper
      .top
        .left
          .title(v-if="mode == 'week'") 預約行事曆
          .switch-day(v-if="mode == 'day'") {{today}}
        .right
          .change-mode.clickable(@click="changeMode") {{modeText}}
          .profile.clickable 莉

      .grid-container
        .item.calendar-icon 口
        .item.item-day(
          v-for="day in days") {{day}}
        .item.item-date(
          v-for="date in week"
          :class="{ dot: date == todayDate}") {{date}}
    
    .downer-main
      WeekMode.week-mode(v-if="mode == 'week'")
      DayMode.day-mode(
        v-if="mode == 'day'")
</template>

<script>
function mod(n, m) {
  return ((n % m) + m) % m;
}
Date.prototype.getNormalDay = function() {
  return mod(this.getDay() - 1, 7);
}
function getWeek(fromDate){
    let monday = new Date(fromDate.setDate( fromDate.getDate() - fromDate.getNormalDay()))
    let result = [new Date(monday).toString().split(' ')[2]]
    while (monday.setDate(monday.getDate() + 1) && monday.getDay() !== 1) {
        result.push(new Date(monday).toString().split(' ')[2])
    }
    return result
}
let today = new Date().toLocaleDateString('en-ZA');
let week = getWeek(new Date(today));
let todayDate = today.split('/')[2]

import WeekMode from "@/components/WeekMode"
import DayMode from "@/components/DayMode"
export default {
  data() {
    return {
      mode: 'week',
      modeText: '週檢視',
      week: week,
      days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      today: today,
      todayDate: todayDate
    }
  },
  components: {
    WeekMode,
    DayMode
  },
  methods: {
    changeMode() {
      if(this.mode == 'week') {
        this.mode = 'day'
        this.modeText = '日檢視'
      }
      else {
        this.mode = 'week'
        this.modeText = '週檢視'
      }

    }
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
  height: 22vh
.top
  display: flex
  justify-content: space-between
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
  .left
    flex: 1
    display: flex
    justify-content: center
    align-items: center
    .switch-day
      &::before, &::after
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
      &::before
        content: '<'
      &::after
        content: '>'

.grid-container
  display: grid
  grid-template-columns: repeat(8, 1fr)
  .calendar-icon
    grid-column-start: 1
    grid-column-end: 2
    grid-row-start: 1
    grid-row-end: 3
    justify-self: center
    align-self: center
  .item-date
    margin-top: 10px
  .dot
    display: flex
    justify-content: flex-start
    flex-direction: column
    align-items: center
    &::after
      content: ''
      display: inline-block
      width: 5px
      height: 5px
      border-radius: 50%
      background-color: #3EDCCA
      justify-content: center
      margin-top: 5px

.downer-main
  height: 78vh
  overflow: scroll
  position: relative
  z-index: 2
</style>