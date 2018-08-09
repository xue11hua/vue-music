<template>
    <div class="player">
        <div class="play_bj">
            <img :src="img" alt="">
            <div></div>
        </div>
        <div class="top">
            <div @click="goback"><i class="iconfont">&#xe63c;</i></div>
            <div>
                <h1>{{name}}</h1>
                <p></p>
            </div>
        </div>
        <div class="model">
            <div :class="isplay?'model_div':'model_div pause'">
                <img width="100%" :src="img" alt="">
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
                <div><i class="iconfont">&#xe6e1;</i></div>
                 <div v-if='!isplay' @click="play"><i class="iconfont">&#xe600;</i></div>
                <div v-else @click="play"><i class="iconfont">&#xe76a;</i></div>
                <div><i class="iconfont">&#xe718;</i></div>
               
                <div><i class="iconfont">&#xe628;</i></div>
            </div>
        </div>
        <audio id="music-audio" ref="audio" :src='listsong' autoplay="autoplay"></audio>
    </div>
</template>
<script>
import http from "@/utils/http";
import api from "@/utils/api";
import moment from 'moment'
export default {
    name:'player',
    data(){
        return{
            name:'',
            id:'',
            img:'',
            listsong:[],
            isplay:true,
            zyinyuetime:'',
            dqshijian:'',
            time:'',

        }
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        fetchData: async function(index) {
      let params = {
          id:index
      };
      const res = await http.get(api.music, params);
       var that=this;
      if (res.data.code == 200) {
        this.listsong=res.data.data[0].url;
       
       
        
       
      }else{
           this.listsong="http://music.163.com/song/media/outer/url?id="+index+".mp3";
          
      }
       setTimeout(()=>{
             const audio = this.$refs.audio;
        console.log(audio.duration);
        this.zyinyuetime=audio.duration;
        that.fhsj();
        },3000)
     
     
      
    },
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
    fhsj(){
       this.time=setInterval(()=>{
             const audio = this.$refs.audio;
              const jdt = this.$refs.jdt;
              const jtdzt = this.$refs.jtdzt;
              this.dqshijian=audio.currentTime;
             if(this.dqshijian==this.zyinyuetime){
                 clearInterval(this.time);
                  jdt.style.width= 0+'px';
                jtdzt.style.left= 0+'px';
                this.isplay=false;
             }else{
                 this.isplay=true;
                 jdt.style.width= this.dqshijian/this.zyinyuetime*200+'px';
            jtdzt.style.left= this.dqshijian/this.zyinyuetime*200+'px';
             }
           
            
        },1000)
    }
    },
    created(){
        this.name=sessionStorage.name;
        this.id=sessionStorage.id;
        this.img=sessionStorage.img;
        this.fetchData(this.id);
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

}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
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

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


