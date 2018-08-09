<template>
<div>

    <div class="bj_xl"  ref="mybox">

    </div>
      <div class="wrapper" ref="wrapper">
<div class="content">


      <div class="lunbo">
           <div class="bj">
       <div class="bj_div"></div>
        <div class="bj_lunbo">
          <lunbo></lunbo>
        </div>
    </div>
      </div>
   
    <div class="list">
      <h1 class="title">推荐歌单</h1>
      <div class="list_div">
        <div v-for='(item,index) in list' :key='index' @click='tolist(item.id)'>
            <p class="list_img"><img width="100%" v-lazy="item.picUrl" alt=""></p>
            <p class="list_text">{{item.name}}</p>
            <p class="list_song"><i class="iconfont">&#xe7c4;</i>{{item.playCount}}</p>
        </div>
      </div>
    </div>
    <div class="list">
      <h1 class="title">推荐歌曲</h1>
      <div class="list_div">
        <div v-for='(item,index) in song' :key='index'>
            <p class="list_img"><img width="100%" v-lazy="item.picUrl" alt=""></p>
            <p class="list_text">{{item.name}} <br /><span>{{item.song.album.name | textfilter}}</span></p>
           
            <p class="list_song"><i class="iconfont">&#xe7c4;</i>{{item.playCount}}</p>
        </div>
      </div>
    </div>
    </div>
</div>
    </div>
</template>
<script>
import lunbo from '@/components/lunbo/lunbo'
import http from "@/utils/http";
import api from "@/utils/api";
import BScroll from 'better-scroll'
export default {
    name:'tuijian',
    data(){
        return{
          list:[],
          song:[],
          options:{
            probeType:3,
            click: true
          }
        }
    },
    components:{
    lunbo
  },
  methods: {
    fetchData: async function() {
      let params = {};
      const res = await http.get(api.personalized, params);
      if (res.data.code == 200) {
       
        res.data.result.forEach(function(ele,index){
          
          ele.playCount= parseInt(ele.playCount/10000)+'万'
        })
        this.list = res.data.result;
      }
      console.log(res);
    },
    fetchsong: async function() {
      let params = {};
      const res = await http.get(api.newsong, params);
      if (res.data.code == 200) {
       
        res.data.result.forEach(function(ele,index){
          
          ele.picUrl= ele.song.album.picUrl;
        })
        this.song = res.data.result;
      }
      console.log(res);
    },
    tolist:function(index){
      console.log('111');
      this.$router.push({path: '/gedan',query:{index:index}});
    }
  },
  mounted() {
       this.fetchData();
    this.fetchsong();
  },
  created(){
     this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.wrapper,this.options);
              this.scroll.on('scroll', (pos) => {
                this.$refs.mybox.style.height =100+pos.y+'px' ;
               
              }) 
      })
  },

  filters:{//过滤器
  	textfilter(money){
  		return money.substring(0, 4)+'...'
  	}
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.bj_xl{
  background: $color-header;
  width: 100%;
  height: 90px;
}
    .bj{
  position: relative;
 
  
  .bj_div{
    position: absolute;
    width: 100%;
    height: 20vh;
    background: $color-header;
    pointer-events: auto;
  }
  .bj_div{
    background:  $color-header;
    height: 20vh;
    
    width: 100%;
  }
  .bj_lunbo{
   width: 100%;
  
  }
}
.wrapper{
  top: 88px;
}
.list{
  .title{
    font-size: 14px;
    height: 60px;
    line-height: 60px;
    margin-left:5px;
  }
  .list_div{
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    width: 100%;
    div{
     width: 31%;
     padding: 0 1%;
     position: relative;
    
    }
    .list_text{
      font-size: 10px;
      margin-top: 5px;
      margin-bottom: 10px;
      span{
        color: $color-font;
      }
    }
    .list_img{
      width: 100%;
    }
    .list_song{
      position: absolute;
      top: 4px;
      right: 10px;
      color: $color-h-text;
      font-size: 12px;
      i{
        margin-right: 5px;
      }
      
    }
  }
}
</style>


