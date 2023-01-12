<template>
    <div id="gallery">
      <NavBar></NavBar>
      <ListHeader/>
      <ListFoot/>   
    </div>
  </template>
  
  <script>

  import ListFoot from "../../common/Gallery/ListFoot.vue";
  import ListHeader from "../../common/Gallery/ListHeader.vue";
  import NavBar from "../../common/NavBar/NavBar"
  
  export default {
    name: 'Gallery',
    components: {
      ListFoot,
      ListHeader,
      NavBar
    }
  }
  </script>
  
  <style>
  body, html {
      height: 100vh;  
      overflow: hidden;
  
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #gallery {
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
      /* background-color: rgb(63, 176, 241);	 */
      text-align: center;
      line-height: 50px;
  }
  </style>
  