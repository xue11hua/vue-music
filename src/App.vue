<template>
  <div id="app">
    <div class="top_nav">
       <myheader></myheader>
        <mytab></mytab>
    </div>
    <div class="con_cen">
      <router-view/>
    </div>
    <playbottom></playbottom>
  </div>
</template>

<script>
import myheader from '@/components/header/myheader'
import mytab from '@/components/tab/tab'
import playbottom from '@/components/playbottom/playbottom'
export default {
  name: 'hello',
  data () {
    return {
     
    }
  },
  components:{
    myheader,
    mytab,
    playbottom
  }
}
</script>

<style>
*{
  margin:0;
  padding: 0;
}
a{
  text-decoration: none;
}
li{
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  
}
@font-face {
  font-family: 'iconfont';  /* project id 776952 */
  src: url('//at.alicdn.com/t/font_776952_s306jvfkzxl.eot');
  src: url('//at.alicdn.com/t/font_776952_s306jvfkzxl.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_776952_s306jvfkzxl.woff') format('woff'),
  url('//at.alicdn.com/t/font_776952_s306jvfkzxl.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_776952_s306jvfkzxl.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
  .router-link-exact-active span{
    border-bottom: 2px solid #fff;
    padding-bottom: 3px;
  }
  .top_nav{
    width: 100%;
    position: fixed;
    top: 0px;
    
    z-index: 1;
  }
  .wrapper{
  width: 100%;
  position:absolute;
  height: 100%;
  bottom: 0px;
  overflow: hidden;
  z-index: 2;
}
.content{
  min-height: 300px;
}


  
</style>
