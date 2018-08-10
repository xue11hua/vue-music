<template>
    <div class="pai">
        <ul class="paihang">
           
            <li class="paihang_li" v-for="(itm,index) in list" :key='index' @click='tolist(itm.id)'>
                <div><img width="100%" :src="itm.coverImgUrl" alt=""></div>
                <ul class="songlist">
                    <li v-for="(item,index) in itm.top" :key='index' v-if='index<5'>{{index+1}}、{{item.name}}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
import http from "@/utils/http";
import api from "@/utils/api";
const  YUNMUSIC_TOP=[0, 1, 2, 3, 4, 22, 23];
export default {
    name:'phb',
    data(){
        return{
            list:[],
           
        }
    },
    methods:{
        fetchData: async function(idx) {
      let params = {
          idx:idx
      };
      const res = await http.get(api.toplist, params);
      if (res.data.code == 200) {
       
       
        // this.list = res.data.playlist;
        let list = res.data.playlist;
          list.top = res.data.playlist.tracks.slice(0, 5);
          this.list.push(list);
      }
      console.log(this.list);
    },
     tolist:function(index){
      console.log('111');
      this.$router.push({path: '/gedan',query:{index:index}});
    }
    },
     mounted() {
         for (let i = 0; i < YUNMUSIC_TOP.length; i++) {
              this.fetchData(YUNMUSIC_TOP[i]);
         }
      
    
  },
}
</script>
<style lang="scss" scoped>

.pai{
    position:absolute;
    top: 88px;
    width: 100%;
    .paihang_li{
        display: flex;
        border-bottom:1px solid #e4e4e4;
        padding:3px 0;
        margin:0 5px;
        div{
            width: 100px;
            height: 100px;
        }
       
        .songlist{
            flex: 1;
            font-size: 12px;
            line-height: 20px;
            padding:0 20px;
        }
    }
}
</style>


