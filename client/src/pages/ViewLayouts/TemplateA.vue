<template>
  <div class="layout">
    <div class="header">
      System Preview
    </div>
<!--    <div class="container">-->
<!--      <grid-layout class="gridLayout"-->
<!--                   :layout.sync="ttlayout"-->
<!--                   v-if="!(typeof ttlayout==='undefined')"-->
<!--                   :col-num="15"-->
<!--                   :row-height="30"-->
<!--                   :is-draggable="true"-->
<!--                   :is-resizable="true"-->
<!--                   :vertical-compact="true"-->
<!--                   :use-css-transforms="true"-->
<!--                   :style="{height:'800px'}"-->
<!--      >-->
<!--        <grid-item-->
<!--          v-for="item in ttlayout"-->
<!--          :key="item.i"-->
<!--          :static="item.static"-->
<!--          :x="item.x"-->
<!--          :y="item.y"-->
<!--          :w="item.w"-->
<!--          :h="item.h"-->
<!--          :i="item.i"-->
<!--          :id="item.i"-->
<!--        >-->
<!--          <div id="chartA"></div>-->
<!--        </grid-item>-->
<!--      </grid-layout>-->
<!--    </div>-->
    <el-container v-on:click="getData">
      <el-main @click.native="getData">
              <grid-layout class="gridLayout"
                           :layout.sync="ttlayout"
                           v-if="!(typeof ttlayout==='undefined')"
                           :col-num="15"
                           :row-height="30"
                           :is-draggable="true"
                           :is-resizable="true"
                           :vertical-compact="true"
                           :use-css-transforms="true"
                           :style="{height:'800px'}"
              >
                <grid-item
                  v-for="item in ttlayout"
                  :key="item.i"
                  :static="item.static"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  :i="item.i"
                  :id="item.i"
                  @click.native.stop="getData(item.i)"
                >
                  <div id="chartA"></div>
                </grid-item>
              </grid-layout>
      </el-main>
      <el-aside width="200px" style="border-left: 2px solid #eee9e9">
        <el-divider><i class="el-icon-setting"></i></el-divider>
        <SettingSide></SettingSide>
      </el-aside>
    </el-container>
    <!--        <div class="mutiItem">-->
    <!--            <div class="left">-->
    <!--                <div id="t1">-->
    <!--                    <div id="chartA"></div>-->
    <!--                </div>-->
    <!--                <div id="t2">-->
    <!--                    <div id="chartC"></div>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            <div class="right">-->
    <!--                <div id="t3">-->
    <!--                    <div id="chartB"></div>-->
    <!--                </div>-->
    <!--                <div id='t4'>-->
    <!--                    <div id="chartD"></div>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--            &lt;!&ndash;图表 4&ndash;&gt;-->
    <!--        </div>-->
  </div>
</template>

<script>

import vegaEmbed from "vega-embed";
import * as d3 from "d3";
import VueGridLayout from 'vue-grid-layout';
import SettingSide from '../Settingside/SettingSide'
export default{
  data() {
    return {
      ModularInfo:{},
      chartStyle:{"chartA":{"width": 828,"height": 390},
        "chartB":{"width": 828,"height": 390},
        "chartC":{"width": 828,"height": 390},
        "chartD":{"width": 828,"height": 390}
      },
      layoutObj:{},
      ttlayout: [
        {"x":0,"y":0,"w":2,"h":2,"i":"0", static: false},
        // {"x":2,"y":0,"w":2,"h":4,"i":"1", static: true},
        // {"x":4,"y":0,"w":2,"h":5,"i":"2", static: false},
        // {"x":6,"y":0,"w":2,"h":3,"i":"3", static: false},
        // {"x":8,"y":0,"w":2,"h":3,"i":"4", static: false},
        // {"x":10,"y":0,"w":2,"h":3,"i":"5", static: false},
        // {"x":0,"y":5,"w":2,"h":5,"i":"6", static: false},
        // {"x":2,"y":5,"w":2,"h":5,"i":"7", static: false},
        // {"x":4,"y":5,"w":2,"h":5,"i":"8", static: false},
        // {"x":6,"y":3,"w":2,"h":4,"i":"9", static: true},
        // {"x":8,"y":4,"w":2,"h":4,"i":"10", static: false},
        // {"x":10,"y":4,"w":2,"h":4,"i":"11", static: false},
        // {"x":0,"y":10,"w":2,"h":5,"i":"12", static: false},
        // {"x":2,"y":10,"w":2,"h":5,"i":"13", static: false},
        // {"x":4,"y":8,"w":2,"h":4,"i":"14", static: false},
        // {"x":6,"y":8,"w":2,"h":4,"i":"15", static: false},
        // {"x":8,"y":10,"w":2,"h":5,"i":"16", static: false},
        // {"x":10,"y":4,"w":2,"h":2,"i":"17", static: false},
        // {"x":0,"y":9,"w":2,"h":3,"i":"18", static: false},
        // {"x":2,"y":6,"w":2,"h":2,"i":"19", static: false}
      ],
      draggable: true,
      resizable: true,
      index: 0,
      baseData: {
        //基本配置
        MetaConfig: {
          title: ""
        },
        style: {
          backgroundColor: "",
          fontColor: "" //字体颜色
        },
        data: [],
        button: {
          method: "template",
          title: "apply to all charts"
        }
      },
      selectChart:{}
    }
  },
  props:["layout"],
  computed:{
    // ...mapGetters(['layout'])
  },
  components: {
    //图表组件
    //chartA,
    //chartB,
    //chartC,
    //chartD
    GridLayout:VueGridLayout.GridLayout,
    GridItem:VueGridLayout.GridItem,
    SettingSide
  },
  watch:{
    layout:{
      handler(curval){
        console.log(curval)
      },
      deep: true
    },
    selectChart:{
      handler(newVal) {
        this.callReDraw(newVal.i,newVal.baseData)
      },
      deep:true
    }
  },
  mounted(){
    console.log('this.$store.state.layout',this.ttlayout);
    this.$store.commit("pushToTemplateData", {baseData: this.baseData, i: "template" });
    this.$store.commit("changeSelectId", "template");
  },
  methods:{
    // 选中焦点时的触发事件，之后要改变setting状态栏
    getData(id){
      console.log('getData')
      let re = /^[0-9]+.?[0-9]*/; //判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/
      if(!re.test(id)){
        this.$store.commit('changeSelectId','template');
        this.selectChart = this.$store.state.templateData;
        console.log('selectChart',this.selectChart);
        console.log(this.$store.state.selectChartId)
      }else{
        console.log('带参数的')
        this.$store.commit('changeSelectId',id);
        // this.selectChart = this.$store.state.chartArray[id]
        this.selectChart = {
          "baseData": {
            "MetaConfig": {
              "title": "降雨量"
            },
            "style": {
              "color": ["#69C0FF"]
            },
            "id": "this.id",
            "data": [
              {
                "name": "Mon",
                "value": "10"
              },
              {
                "name": "Tue",
                "value": "706"
              },
              {
                "name": "Wed",
                "value": "239"
              },
              {
                "name": "Thu",
                "value": 172
              }
            ],
            "datamappers": [
              {
                "Fieldname": "value",
                "Fieldtype": "num",
                "Mapfrom": null,
                "Alias": null
              },
              {
                "Fieldname": "name",
                "Fieldtype": "string",
                "Mapfrom": null,
                "Alias": null
              }
            ],
            "button": {
              "method": "startanalyzedata",
              "title": "Apply"
            },
            "mapperdatas": null
          }
        }
        console.log('selectChart',this.selectChart);
      }
    },
    callReDraw(id,newVal) {
      let that = this;
      if (id<2000) {
        that.$refs[id][0].reDraw(newVal);
      } else {
        console.log('背景颜色更改');
        document.getElementsByClassName("vue-grid-layout")[0].style.backgroundColor = newVal.style.backgroundColor;
      }
    },
    getModularInfo(m){
      let that = this
      this.layoutObj = JSON.parse(JSON.stringify(m))
      console.log(this.layoutObj)
      //this.calculateChartWH()
      //this.setBackgroundColor()
      this.adaptWidthHeight()
      this.generateGraph()

    },
    adaptWidthHeight(){
      //this.layoutObj.[chartA].data.height/width
      let that = this
      let chartList = Object.keys(that.chartStyle)
      chartList.forEach(function(d){
        if(that.layoutObj["config"][d] != undefined){
          //用vega model 自带的set方法
          that.layoutObj["config"][d]["data"]["height"] = that.chartStyle[d]["height"]
          that.layoutObj["config"][d]["data"]["width"] = that.chartStyle[d]["width"]
          let _layer = that.layoutObj["config"][d]["data"]["layer"]
          //console.log("_layer", _layer)
          _layer.forEach(function(v){
            v.height = that.chartStyle[d]["height"]
            v.width = that.chartStyle[d]["width"]
          })
        }
      })

    },
    setBackgroundColor(){
      let that = this
      for(let key in that.layoutObj["config"]){
        //key chartA chartB
        that.layoutObj["config"][key]["data"]["background"] = "#242E47"
      }
    },
    setAxisColor(){
      let that = this
      for(let key in that.layoutObj["layers"]){
        //key chartA chartB
        if(that.layoutObj["layers"][key]["encoding"]["x"]){
          if(!that.layoutObj["layers"][key]["encoding"]["x"]["axis"]){
            that.layoutObj["layers"][key]["encoding"]["x"]["axis"] = {
              "domainColor" : "white",
              "labelColor": "white",
              "tickColor": "white",
              "titleColor": "white",
              "gridColor": "white"
            }
          }
        }
        if(that.layoutObj["layers"][key]["encoding"]["y"]){
          if(!that.layoutObj["layers"][key]["encoding"]["y"]["axis"]){
            that.layoutObj["layers"][key]["encoding"]["y"]["axis"] = {
              "domainColor" : "white",
              "labelColor": "white",
              "tickColor": "white",
              "titleColor": "white",
              "gridColor": "white"
            }
          }
        }
      }
    },
    setHeaderColor(){

    },
    generateGraph(){
      let that = this
      let charts = Object.keys(that.layoutObj["config"])
      console.log(charts);
      charts.forEach(function(d){
        console.log(that.layoutObj["config"][d]["data"]);
        vegaEmbed("#" + d, that.layoutObj["config"][d]["data"])
      })
    }
  }

}

</script>
<style type="text/css">

.layout{
  width: 1800px;
  margin: 0 auto;
  height: 1000px;
  background-color: #ffffff;
  border-radius:5px
}
.header{
  padding: 0.5% 0 0.5% 2%;
  font-size: 25px;
  color:white;
  border-radius:5px;
}
.mutiItem{
  height: 95%;
  background-color: white;
}
.left{
  width: 50%;
  height: 100%;
  float: left;
}
.right{
  width: 50%;
  height: 100%;
  float: left;
}
#chartA,#chartB,#chartC,#chartD{
  height: 100% ;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

#t1,#t2,#t3,#t4{
  height:46%;
  width:96%;
  padding:2%
}
.el-aside {
  color: #333;
  text-align: center;
  height: 1180px;
}
.el-color-picker{
  z-index: 100;
}
/* Add space between Vega-Embed links  */
.container{
  height: 800px;
}
.gridLayout{
  width: 100%;
  height: 800px;
  border: 1px solid;
}
.grid{
  width: 50px;
  height: 50px;
}
.vue-grid-layout {
  height: 800px;
}
.container .vue-grid-item.vue-grid-placeholder {
  background: green;
}
/*控制背景颜色*/
.vue-grid-layout {
  background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>





