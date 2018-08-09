<template>
    <div>
        <div class="bottom_play">
            <div @click='bftc' :class="isplay?'img':'img pause'"><img width="40px" :src="songimg" alt=""></div>
            <div @click='bftc' class="text">{{songname}}</div>
            
               <div class="icon" v-if='!isplay' @click="play"><i class="iconfont">&#xe600;</i></div>
                <div class="icon" v-else @click="play"><i class="iconfont">&#xe76a;</i></div>
            <div class="icon" @click='tabclons'><i class="iconfont">&#xe63d;</i></div>
    </div>
    <div class="tab_list" v-show='listtab'>
        <div class="tab_list_div">
            <div class="tab_head">
                <span class="icon"><i class="iconfont">&#xe623;</i></span>
                <span class="text">顺序播放{{this.listsong.length}}首</span>
                <span class="icon"><i class="iconfont">&#xe8c1;</i> </span>
            </div>
            <div class="tab_liebiao">
                 <div class="wrapper" ref="wrappera">
                
                      <ul class="content">
                           <li v-for="(item,index) in listsong" :key='index' :class="yinyueindex==index?'tab_div zplay':'tab_div'" @click='player(index,item.name,item.id,item.al.picUrl)'>
                        <span class="icon"><i class="iconfont">&#xe635;</i></span>
                        <span class="text">{{item.name}}</span>
                        <span class="icon"><i class="iconfont">&#xe6b5;</i></span>
                    </li>
                      </ul>
                   
                 
                 </div>
                 <div class="close" @click='close'>
                        关闭
                </div>
            </div>
           
        </div>
        
        
    </div>

     <div class="player" v-show="playfq">
        <div class="play_bj">
            <img :src="songimg" alt="">
            <div></div>
        </div>
        <div class="top">
            <div @click="gbbftc"><i class="iconfont">&#xe63c;</i></div>
            <div>
                <h1>{{songname}}</h1>
                <p></p>
            </div>
        </div>
        <div class="model" @click='qhgcfn'>
            <div  :class="isplay?'model_div':'model_div pause'" v-show="isgcqh">
                <img width="100%" :src="songimg" alt="">
            </div>
             <div v-show='!isgcqh' class="gecigd">
                  <div class="wrapper" ref="wrapperb">
                 
              <ul class="content" ref="lyricList">
                  <li v-for='(item,index) in lyric' :key='index' :class="parseInt(item.t)<=parseInt(dqshijianid)?'dqclass':''">{{item.c}}</li>
              </ul>
                 
                  </div>
            
        </div>
            
        </div>
       

        <div class="bottom">
            <div class="bottom_tjd">
                <div class="div_r">
                    <span>{{dqshijian | format}}</span>
                     <span>{{zyinyuetime | format}}</span>
                    <div class="div_l">
                        <div></div>
                        <div ref="jdt"></div>
                        <div ref="jtdzt"></div>
                    </div>
                    
                </div>
            </div>
            <div class="bottom_btn">
                <div><i class="iconfont">&#xe623;</i></div>
                <div @click='syqyin'><i class="iconfont">&#xe6e1;</i></div>
                 <div v-if='!isplay' @click="play"><i class="iconfont">&#xe600;</i></div>
                <div v-else @click="play"><i class="iconfont">&#xe76a;</i></div>
                <div @click='xyqyin'><i class="iconfont">&#xe718;</i></div>
               
                <div><i class="iconfont">&#xe628;</i></div>
            </div>
        </div>
        <audio id="music-audio" ref="audio" :src='songurl' autoplay="autoplay"></audio>
    </div>
    </div>
    
</template>
<script>
import http from "@/utils/http";
import api from "@/utils/api";
import moment from 'moment'
import BScroll from 'better-scroll'
import { mapState ,mapActions } from 'vuex'
export default {
    data(){
        return{
            listtab:false,
            // playfq:false,
             //name:'',
            id:'',
            //img:'',
            //songurl:[],
            isplay:false,
            zyinyuetime:'',
            dqshijian:'',
            time:'',
            listsong:[],
            songurla:'',
            options:{
            probeType:3,
            click: true,
           
          },
           isgcqh:false,
           dqshijianid:''
           
        }
    },
  
   computed:{
        playfq(){
           return this.$store.state.show;
            
        },
         songurl(){
           return this.$store.state.url;
            
        },
         songname(){
           return this.$store.state.name;
            
        },
         songimg(){
           return this.$store.state.img;
            
        },
         gedanid(){
           return this.$store.state.gedanid;
            
        },
         yinyueindex(){
           return this.$store.state.yinyueindex;
            
        },
        lyric(){
            var medisArray = new Array();
            var medis=this.$store.state.lyric;
            var medises = medis.split("\n");
          
            medises.forEach(function(item,index){
               
                var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
                medisArray.push({

                t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(0),
                c: item.substring(item.indexOf("]") + 1, item.length)
                });
            })
           
             return medisArray;
        }
    },
      
    methods:{
        tabclons(){
            this.listtab=true
        },
        close(){
            console.log('111');
           this.listtab=false
        },
        bftc(){
            //this.playfq=true;
             this.add()
        },
        gbbftc(){
             //this.playfq=false;
             this.odd()
        },
         goback(){
            this.$router.go(-1);
        },
         add(){
         this.$store.commit('switch_true');
    },
     odd(){
         this.$store.commit('switch_false');
    },
    //获取列表
    fetchData: async function(index) {
      let params = {
          id:index
      };
      const res = await http.get(api.detail, params);
      if (res.data.code == 200) {
        this.listsong=res.data.playlist.tracks;
      
         this.scroll = new BScroll(this.$refs.wrappera,this.options);
         
      
      }
     
      
    },
    //下一曲
    xyqyin(){
        if(this.yinyueindex-1>=this.listsong.length){
            alert('没有了')
        }else{
            sessionStorage.id= this.listsong[this.yinyueindex+1].id;
         this.fetchgq(sessionStorage.id);
         sessionStorage.img=this.listsong[this.yinyueindex+1].al.picUrl;
            sessionStorage.name=this.listsong[this.yinyueindex+1].name;
           this.saveyinyueindex(this.yinyueindex+1);
        }
         
    },
    //上一曲
    syqyin(){
        if(this.yinyueindex==0){
            alert('没有了')
        }else{
            sessionStorage.id= this.listsong[this.yinyueindex-1].id;
         this.fetchgq(sessionStorage.id);
         sessionStorage.img=this.listsong[this.yinyueindex-1].al.picUrl;
            sessionStorage.name=this.listsong[this.yinyueindex-1].name;
           this.saveyinyueindex(this.yinyueindex-1);
        }
        
    },
    //切换歌词
    qhgcfn(){
        if(this.isgcqh){
            this.isgcqh=false;
        }else{
            this.isgcqh=true
        }
        
    },
      ...mapActions({
  
       saveurl: 'saveurl' ,
       saveimg: 'saveimg',
       savename: 'savename',
       savegedanid: 'savegedanid',
       saveyinyueindex: 'saveyinyueindex',
        savelyric:'savelyric'
     }),
       
    play(){
         const audio = this.$refs.audio;
         this.isplay=audio.paused;
         if(audio.paused){
             audio.play();
             
             this.fhsj();
         }else{
              audio.pause();
              clearInterval(this.time);
              
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
        //this.savegedanid(this.gedanid);
        
         
    },
     player(indexdj,name,id,img){
         
         this.saveyinyueindex(indexdj);
        sessionStorage.name=name;
        sessionStorage.id=id;
        sessionStorage.img=img;
        this.fetchgq(sessionStorage.id);
        
       
    },
    fhsj(){
        clearInterval(this.time);
       this.time=setInterval(()=>{
            
             const audio = this.$refs.audio;
              const jdt = this.$refs.jdt;
              const jtdzt = this.$refs.jtdzt;
              this.dqshijian=audio.currentTime;
              
             if(audio.ended){
                 clearInterval(this.time);
                  jdt.style.width= 0+'px';
                jtdzt.style.left= 0+'px';
                this.isplay=false;
                this.xyqyin();
             }else{
                 this.isplay=true;
                 jdt.style.width= this.dqshijian/this.zyinyuetime*200+'px';
            jtdzt.style.left= this.dqshijian/this.zyinyuetime*200+'px';
             }
           this.dqshijianid=this.dqshijian.toFixed(0);
          // this.$refs.lyricList.scrollToElement(1, 1000);
            
        },1000)
    }
    },
      created(){
      
        this.$nextTick(() => {
             // this.scroll = new BScroll(this.$refs.wrappera,this.options);
               this.scroll = new BScroll(this.$refs.wrapperb,this.options);
              
      })
    },
    filters:{//过滤器
  
          //return money/60
        format (interval) {
      interval = interval | 0
      let minute = interval / 60 | 0
      let second = interval % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    },
  	
  },
  watch:{
      songurl:function(){
           clearInterval(this.time);
           const audio = this.$refs.audio;
           const that=this;
           console.log(audio.readyState);
           if(audio.readyState==4){
                console.log(audio.duration);
                this.zyinyuetime=audio.duration;
                this.fhsj();

           }else{
               setTimeout(()=>{
                   console.log(audio.duration);
                that.zyinyuetime=audio.duration;
                that.fhsj();
               },1000)
           }
       
      },
      isplay:function(){
          console.log(this.isplay)
      },
      gedanid:function(){
          console.log(this.gedanid);
          this.fetchData(this.gedanid);
         

      },
      yinyueindex:function(){
          console.log(this.yinyueindex);
      }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
    .bottom_play{
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        display: flex;
        background: #fff;
        height: 60px;
        z-index: 11;
        line-height: 60px;
        .img{
            width: 40px;
            height: 40px;
            margin:0 10px;
            margin-top: 10px;
            border-radius: 50%;
            overflow: hidden;
             animation: rotate 10s linear infinite;
        }
         .pause{
    animation-play-state:paused;
}
       .text{
           flex: 1;
           
       }
       .icon{
           width: 40px;
           i{
               font-size: 30px;
           }
       }
    }
    .tab_list_div{
        position: absolute;
        bottom: 0px;
        width: 100%;
        background: #fff;
        color: #2e3030;
        
        
    }
    .close{
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
             position: absolute;
             bottom: 0px;
             z-index: 3;
             background: #fff;

        }
    .tab_list{
        position: absolute;
        z-index: 14;
        width: 100%;
        height: 100%;
        top: 0px;
        background-color:rgba(0,0,0,.3);
        .tab_head{
            width: 100%;
            
            display: flex;
            height: 40px;
            line-height: 40px;
            .text{
                flex: 1;
            }
            .icon{
                width: 60px;
                text-align: center;
            }
        }
        .tab_liebiao{
            height:240px;
            overflow: hidden;
            position: relative;
            
            .tab_div{
                display: flex;
                height: 40px;
                line-height: 40px;
                 span:nth-child(1) i{
                    display: none;
                }
                .text{
                    flex: 1;
                }
                .icon{
                    width: 40px;
                    text-align: center;
                    font-size: 24px;
                }
            }
            .zplay {
                color: red;
                span:nth-child(1) i{
                    display: block;
                }
            }
        }
    }

    .player{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: $color-song-list;
    z-index: 11;
    .play_bj{
        position: relative;
        width: 100%;
        height: 100%;
        filter:blur(30px);
        img{
            position: absolute;
            width: 100%;
            height: 100%;
        }
        
        div{
             position: absolute;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: .3;
        }
    }
}
.top{
   position: fixed;
  width: 100%;
  top: 0px;
   height: 44px;
  div:nth-child(2){
       position: absolute;
       width: 100%;
       text-align: center;
       top: 0px;
         padding: 10px 0;
         color: $color-h-text;
         font-size: 12px;
         h1{
              font-size: 16px;
         }
    }
    div:nth-child(1){
       position: absolute;
       width: 60px;
       text-align: center;
       top: 0px;
       height: 44px;
       line-height: 44px;
        padding: 10px 0;
         color: $color-h-text;
        z-index: 11;
         i{
             font-size: 24px;
         }
    }

}
.model{
    position: fixed;
    top: 24%;
    width: 100%;
    bottom: 170px;
    overflow: hidden;
    .gecigd{
        position: relative;
         width: 100%;
         height: 300px;
          color: #fff;
        ul{
            position: absolute;
            width: 100%;
            li{
                text-align: center;
               
            }
           
        }
         .dqclass{
                color: red;
            }
    }
    .model_div{
        width: 60%;
        margin:0 auto;
        border:15px solid rgba(140, 144, 151, .3);
        border-radius: 50%;
        animation: rotate 10s linear infinite;
       overflow: hidden;
       text-align: center;
    }
    .pause{
    animation-play-state:paused;
}
}
.bottom{
    position: absolute;
    bottom: 40px;
    width: 100%;
    .bottom_btn{
        display: flex;
        div{
            flex: 1;
            text-align: center;
            i{
                color: $color-h-text;
                font-size: 24px;
            }
        }
    }
    .bottom_tjd{
        width: 90%;
        margin:0 auto;
        height: 40px;
        .div_r{
            position: relative;
            width: 100%;
            color: #fff;
            span:nth-child(1){
                position: absolute;
                left: 0px;
                top: -6px;
            }
             span:nth-child(2){
                position: absolute;
                right:0px;
                top: -6px;
            }
        }
        .div_l{
            position: relative;
            width: 200px;
            margin:0 auto;
            div:nth-child(1){
                position: absolute;
                top:0px;
                left: 0px;
                width: 100%;
                height: 4px;
                background:rgba(0,0,0,.3);

            }
             div:nth-child(2){
                 position: absolute;
                top:0px;
                left: 0px;
                width: 0px;
                height: 4px;
                background:$color-header;
             }
              div:nth-child(3){
                   position: absolute;
                top:-5px;
                left:0px;
                width: 6px;
                height: 6px;
                border:4px solid #f1f1f1;
                border-radius: 50%;
                background:$color-header;
              }
        }
    }
}

.wrapper{
    top: 0px;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


