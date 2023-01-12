<template>
  <div class="Listfooter">
    <Leftcontent />
    <Rightcontent />
  </div>
</template>

<script>
import Rightcontent from "./Rightcontent.vue";
import Leftcontent from "./Leftcontent.vue";

export default {
  name: "Listfooter",
  components: {
    Rightcontent,
    Leftcontent,
  },
  props: {
    msg: String,
  },
  
};
</script>


<style scoped>
.Listfooter {
  display: flex;
  height: 78%;
  /* background-image: url(../image/world_cup_main.png);
   */
  /* background-color: rgb(239,246,253); */
   background-color: rgb(242,242,242);
  /* background-size: 100% 100%; */
  /* flex-wrap: nowrap;
  flex-direction: row; */

  padding-top: 5px;
}
</style>
