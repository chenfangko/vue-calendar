<template lang="pug">
  section
    .upper
      .left
        .title(v-if="mode == 'week'") 預約行事曆
        .switch-day(v-if="mode == 'day'") 日期
      .right
        .change-mode.clickable(@click="changeMode") {{modeText}}
        .profile.clickable 莉
    .main-calendar
      WeekMode(v-if="mode == 'week'")
      DayMode(v-if="mode == 'day'")
</template>

<script>
import WeekMode from "@/components/WeekMode"
import DayMode from "@/components/DayMode"
export default {
  data() {
    return {
      mode: 'week',
      modeText: '週檢視'
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
  outline: solid 1px red
.upper
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
    margin-left: 5px
</style>