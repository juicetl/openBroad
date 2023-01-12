<template>
  <div class="Rightcontent">
    <div class="chart">
      <span class="first">
        <h3>图形类:</h3>
      </span>
      <span class="second" v-for="(item, i) in this.imgkey[0]" :key="i" @click="selectchart(item)" :class="{'Color':mgeColor}">
        <p>{{ item }}</p>
        </span>
        
    </div>
    <div class="layout">
      <span class="first"><h3>可视化布局:</h3></span>
      <span class="second" v-for="(item, i) in this.imgkey[1]" :key="i"
        ><p>{{ item }}</p></span
      >
      <!-- <span></span> -->
    </div>
    <div class="colorboard">
      <span class="first"><h3>调色板:</h3></span>
    </div>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";
export default {
  name: "Rightcontent",
  components: {},
  data() {
    return {
      chartdata: {},
      mgeColor: false,
      // pwdColor: false
    };
  },
  computed: {
    ...mapState(["imgkey"]),
  },
  mounted() {
    console.log(this.imgkey);
  },
  methods: {
    selectchart(index){
      console.log(index)
      if(this.mgeColor == true)
      {
        this.mgeColor = false
        this.pwdColor = true
      }
      else{
        this.mgeColor = true
        this.pwdColor = false
      }
    },
  },
};
</script>
  
  
  <style scoped>
.Rightcontent {
  flex: 0.3 0 200px;
  
  display: flex;
  flex-direction: column;
  /* background-color: rgb(11, 86, 61, 1); */
  margin-right: 0.5vw;
  position: relative;
}
.chart {
  flex: 1;
  /* background-color: rgb(239, 246, 253); */
   /* background-color: rgb(242,242,242); */
   background-color:white ;
  font-size:16px;
 font-family: 'Times New Roman';
  /* position: relative;
  width: 100%; */
  
}
.layout {
  flex: 1;
  /* background-color: rgb(239, 246, 253); */
   /* background-color: rgb(242,242,242); */
    background-color:white ;
 font-family: 'Times New Roman';
  font-size:16px;
  /* position: relative;
  width: 100%;*/
} 
.colorboard {
  flex: 3;
  /* background-color: rgb(239, 246, 253); */
   /* background-color: rgb(242,242,242); */
    background-color:white ;
   font-family: 'Times New Roman';
   font-size:16px;
  width: 100%;
}
.first {
  float: left;
  margin: 2vw;
  margin-right: 0.5pt;
}
p {
  font-size: 20px;
  font-family: 'Times New Roman';
  font-weight: 350;
}
.second {
  float: left;
  /* margin: 0.5pt; */
  margin-top: 2vw;
  margin-left: 0.5vw;
  
}
.Color{
      background-color: #ffd700;
      color: #fff;
    }
</style>
  