<template lang="pug">
section
    h1(@click="test") Week
    .flex-grid
        .col M
        .col T
        .col W
        .col T
        .col F
        .col S
        .col S
    .flex-grid
        .col(v-for="n in week") {{n}}
</template>

<script>
let d = new Date()
function getWeek(fromDate){
    let monday = new Date(fromDate.setDate( fromDate.getDate() - fromDate.getDay() + 1))
    let result = [new Date(monday)]
    while (monday.setDate(monday.getDate() + 1) && monday.getDay() !== 1) {
        result.push(new Date(monday))
    }
    return result
}
let today = new Date().toLocaleDateString('en-ZA')
let week = getWeek(new Date(today))


export default {
    data() {
        return {
            week: week,
        }
    },
    methods: {
        test() {
            console.log(d, d.getMonth(), Date.now(), d.getDate())
            console.log(week[7])
            console.log(getWeek(new Date(today)))
        }
    }
}
</script>

<style lang="sass" scoped>
.flex-grid
    display: flex
.col
    flex: 1
</style>