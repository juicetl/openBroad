<template>
  <div class="ListHeader">
    <div class="select">
      <span>publisher-type</span>
      <el-form ref="ni" :model="form" label-width="80px">
        <el-form-item label="出版类型">
          <el-select v-model="form.publishertype" placeholder="请选择活动区域" popper-append-to-body="false">
            <!-- <el-option label="区域一" value="News Media"></el-option> -->
            <el-option
              v-for="(item, i) in publisher"
              :key="i"
              :label="item"
              :value="item"
              style="font-size:16px;font-family:'Times New Roman'"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="select">
      <span>tasks</span>
      <br />
      <el-popover placement="bottom" width="400" trigger="click">
        <el-checkbox-group
          v-model="checktask"
        >
          <el-checkbox v-for="(task, ii) in tasks" :label="task" :key="ii"  style="font-size:18px;font-family:'Times New Roman'">{{
            task
          }}</el-checkbox>
        </el-checkbox-group>
        <el-button slot="reference">click 激活</el-button>
      </el-popover>
    </div>
    <div class="select">
      <span>chart-types</span>
      <br />
      <el-popover placement="bottom" width="400" trigger="click">
        <el-checkbox-group
          v-model="checkedchart"
        >
          <el-checkbox v-for="(chart, iii) in charttype" :label="chart" :key="iii"  style="font-size:18px;font-family:'Times New Roman'">{{
            chart
          }}</el-checkbox>
        </el-checkbox-group>
        <el-button slot="reference">click 激活</el-button>
      </el-popover>
    </div>

    <div class="select">
      <div class="buttom-span" @click="selectcontent"><span>筛选</span></div>
      
    </div>

    <div class="select">
      <div class="buttom-span" @click="selectcontent"><span>提交</span></div>
      <!-- <span>publisher-type</span> -->
      <!-- <div class="buttom-span"  @click="selectcontent"><span>提交</span></div> -->
    </div>
  </div>
</template>

<script>
import data from "../../../static/covid_data_e.json";
import { mapState } from "vuex";
export default {
  name: "ListHeader",
  props: {
    msg: String,
  },
  data() {
    return {
      checkedchart: [],
      checktask:[],
      form: {
        publishertype: "Please select !",
      },
      publisher: [
        "none",
        "News Media",
        "Individual",
        "Organization",
        "Government",
        "Company",
        "Social Media",
        "Academic",
      ],
      tasks:["more info","filter","disaggregate/distribution/proportion","extreme","disagg-by","compare","rank/sort","cluster/aggregate","trend","correlate"],
      charttype: [
        "none",
        "Map",
        "Table",
        "Bar",
        "Line",
        "Pie",
        "Scatter Plot",
        "Sunburst",
        "node-link",
      ],
    };
  },
  mounted() {
    let key = Object.getOwnPropertyNames(data);
    this.$store.commit("getcovidkey", key);
    this.init();
  },
  methods: {
    selectcontent() {
      console.log(this.checkedchart);
      let keydata = [];
      let publisher = []
      // let task = []
      let chart = []
      for (let i in data) {
        if (data[i]["publisher-type"].search(this.form.publishertype) != -1) {
          publisher.push(i);
          continue;
        }
        for(let j in this.checktask){
          // console.log(j)
          if (data[i]["Vis_task"].search(this.checktask[j]) != -1) {
          keydata.push(i);
        }
        }
        for(let j in this.checkedchart){
          if (data[i]["图形类"].search(this.checkedchart[j]) != -1) {
          
          chart.push(i);
        }
        }
      }
      console.log("KEY")
      console.log(keydata.length);
      this.$store.commit("getcovidkey", keydata);
    },
    init() {
      
      console.log(this.checkedchart);
    },
  },
};
</script>


<style scoped>
.ListHeader {
  height: 10%;
  text-align: center;
  line-height: 30px;
  font-family:'Times New Roman';
  display: flex;
}
.select {
  flex: 1 0 200px;
  /* background-color: aliceblue; */
  margin: -0.2vw;
  font-family: 'Times New Roman';
  font-size:16px;
}
.buttom-span {
  width: 120px;
  height: 40px;
  line-height: 40px;
  margin-top: 1vw;
  margin-right: 30px;
  background-color: rgb(142,170,255);
  float: left;
  /* font-family: sans-serif; */
  font-family:'Times New Roman';
  border-radius: 8px;
  font-size:18px;
  color:white;
  /* margin-left: 6vw; */
}
</style>
