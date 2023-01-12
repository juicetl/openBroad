<template>
  <div class="panel-box">
    <div class="data-panel" v-if="line2.length > 0">
      <div style="display: flex;flex-direction: column;margin-right: 1rem;justify-content: center" v-for="item in line1">
        <h3>{{item.title}}</h3>
        <p class="panel-number" :style="{color:item.color}">{{item.data}}</p>
        <p>{{item.desc}}</p>
      </div>
    </div>
    <div class="data-panel" v-if="line2.length > 0">
      <div style="display: flex;flex-direction: column;margin-right: 1rem" v-for="item in line2">
        <h3>{{item.title}}</h3>
        <p class="panel-number" :style="{color:item.color}">{{item.data}}</p>
        <p>{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataPanel",
  props:{
    line1:{default:[]},
    line2:{default:[]}
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.panel-box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1)
}
.data-panel{
  display: flex;
  margin-bottom: 1rem;
}
.panel-number{
  font-size: 20px;
}
</style>
