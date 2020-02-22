<template>
  <div class="basicParam">
    <p>Unit Type: <span>{{basicInfo.unitType}}</span></p>
<!--    <p>Constant/Inverter: <span>{{basicInfo.frequency}}</span></p>-->
    <p>Cooling/Heating: <span>{{basicInfo.coolingHeating}}</span></p>
<!--    <p>Cooling Capacity: <span>{{basicInfo.coolingCapacity}}</span></p>-->
    <p>Model: <span>{{basicInfo.model}}</span></p>
  </div>
</template>

<script>
export default {
  name: 'BasicParameter',
  props: ['basicInfo']
}
</script>

<style lang="stylus" scoped>
  @import "~styles/variable.styl"
.basicParam {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;
  p {
    line-height: .4rem;
    margin: 0 .3rem .3rem 0;
    span {
      color: $bgColor;
    }
  }
}
</style>
