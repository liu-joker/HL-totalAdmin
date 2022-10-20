<template>
  <div class="row_item" :style="{backgroundColor:templateData.bgc}">
    <div class="row_item_left">
      <svg-icon :iconClass="templateData.svg"></svg-icon>
    </div>
    <div class="row_item_right">
      <label>{{templateData.title}}</label>
      <count-to class="card-panel-num" :startVal="0.00" :decimals="2" :endVal="Number(templateData.value)" :duration="3200"></count-to>
    </div>
  </div>
</template>

<script>
  import countTo from 'vue-count-to';
  export default {
    name:'cardPanel',
    components:{
      countTo
    },
    data(){
      return {
        templateData:''
      }
    },
    props:['Fdata'],
    created(){
      this.templateData=this.Fdata
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .row_item{
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #9aaabf;
    padding: 5px 20px;
    align-items: center;
    border-radius: 3px;

  > .row_item_left{
    font-size: 2rem;
  }
  > .row_item_right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  label {
    min-width: 100%;
    font-size: 0.8rem
  }
  .card-panel-num {
    font-size: 1.2rem;
  }
  }
  }
</style>
