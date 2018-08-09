<template>
    
    <div class="gedan">
        <div class="header_gedan" ref="header">
            <div @click='goback'>
                <i class="iconfont">&#xe62f;</i>
                <span ref='headertext'>歌单</span>    
            </div>
        </div>
         <div class="wrapper" ref="wrapper">
<div class="content">
        <div class="gedan_con">
            <div class="gedan_div">
                <img width="100%" :src="listcon.coverImgUrl" alt="">
                <div class="flier"></div>
            <div class="gedan_text">{{listcon.name}}<br /><span><i class="iconfont">&#xe7c4;</i>{{listcon.playCount}}</span></div>
            </div>
            
        </div>
        <div class="song_list">
            <div class="song_title">
                <i class="iconfont">&#xe600;</i>
                <span>播放全部</span>
            </div>
            <div class="song_con">
                <div class="song_con_div" v-for='(item,index) in listsong' :key='index' @click='player(index,item.name,item.id,item.al.picUrl)'>
                    <div class="title">{{index+1}}</div>
                    <div class="song_title_ge">
                        <p>{{item.name}}</p>
                        <p ><span v-for='(iteim,indexa) in item.ar' :key='indexa'>{{iteim.name}}</span></p>
                    </div>
                </div>
            </div>
        </div>
</div>
         </div>
    </div>
</template>
<script>
import http from "@/utils/http";
import api from "@/utils/api";
import BScroll from 'better-scroll'
import { mapState ,mapActions } from 'vuex'

export default {
    name:'gedan',
    data(){
        return{
            listsong:[],
            listcon:[],
            options:{
            probeType:3,
            click: true,
            songurla:'',
            gedanid:'',
          }
        }
    },
    methods:{
        goback(){
            this.$router.push({path:'/'})
        },
       ...mapActions({
  
       saveurl: 'saveurl' ,
       saveimg: 'saveimg',
       savename: 'savename',
       savegedanid: 'savegedanid',
       saveyinyueindex: 'saveyinyueindex',
       savelyric:'savelyric'
     }),

    fetchData: async function(index) {
      let params = {
          id:index
      };
      const res = await http.get(api.detail, params);
      if (res.data.code == 200) {
        this.listsong=res.data.playlist.tracks;
        this.listcon=res.data.playlist;
      }
     
      
    },
      fetchgq: async function(index) {
      let params = {
          id:index
      };
      const res = await http.get(api.music, params);
       var that=this;
      if (res.data.code == 200) {
        this.songurla=res.data.data[0].url;
       
       
        
       
      }else{
           this.songurla="http://music.163.com/song/media/outer/url?id="+index+".mp3";
          
      }
       this.add();
       this.fclyric(sessionStorage.id);
    },
    fclyric: async function(index) {
      let params = {
          id:index
      };
      const res = await http.get(api.lyric, params);
       var that=this;
      if (res.data.code == 200) {
       console.log(res.data.lrc.lyric);
       this.savelyric(res.data.lrc.lyric);
       
      }
      
    },
    add(){
       this.$store.commit('switch_true');
      this.saveurl(this.songurla);
      this.saveimg(sessionStorage.img);
       this.savename(sessionStorage.name);
        this.savegedanid(this.gedanid);
        
         
    },
    player(indexdj,name,id,img){
         
         this.saveyinyueindex(indexdj);
        sessionStorage.name=name;
        sessionStorage.id=id;
        sessionStorage.img=img;
        this.fetchgq(sessionStorage.id);
        
       
    }
    },
     mounted() {
    //this.fetchData();
  },
  created(){
      
      this.fetchData(this.$route.query.index);
      this.gedanid=this.$route.query.index;
       this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.wrapper,this.options);
              this.scroll.on('scroll', (pos) => {
                  if(pos.y<-200){
                      this.$refs.header.style.background ='rgba(0, 0, 0, 0.5)';
                      this.$refs.headertext.innerHTML=this.listcon.name
                  }else{
                       this.$refs.header.style.background ='rgba(0, 0, 0, 0)';
                       this.$refs.headertext.innerHTML='歌单';
                  }
                
               
               
              }) 
      })
  }

}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.gedan{
    position: fixed;
    z-index: 11;
    width: 100%;
    height: 100%;
    background: $color-song-list;
}
.header_gedan{
    position: fixed;
    width: 100%;
    height: 44px;
    line-height: 44px;
    z-index: 3;
     color: $color-h-text;
     padding-left: 10px;
     i{
         margin-right: 5px;
     }
}
.gedan_con{
   position: relative;
  
    width: 100%;
    color: $color-h-text;
    .gedan_div{
        position: relative;
        
        .flier{
            background: rgba(0, 0, 0, 0.3);
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            bottom: 0px;
        }
        .gedan_text{
            position: absolute;
            bottom: 20px;
            width: 100%;
            left: 10px;
            span{
                font-size: 12px;
                i{
                    margin-right: 5px;
                }
               
            }
        }
    }
}
.song_list{
    border-radius: 10px 10px 0 0;
    position: relative;
    top:-10px;
  background: $color-song-list;
}
.song_con_div{
    display: flex;
    border-bottom: 1px solid  $color-border;
    .song_title_ge{
        flex: 1;
        padding:10px 0;
    
    }
    .song_title_ge p:nth-child(2){
        color: $color-font;
        font-size: 12px;
    }
    .title{
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
    }
}
.song_title{
    padding: 10px;
    border-bottom: 1px solid $color-border;
    
    i{
        margin-right: 5px;
    }
}
.wrapper{
  top: 0px;
}
</style>


