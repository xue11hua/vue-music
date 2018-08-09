import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    show:false,
    url:'',
    img:'',
    name:'',
    gedanid:'',
    yinyueindex:'',
    lyric:'',
  },
  mutations:{ //设置state值
    switch_true(state){//这里的state对应着上面这个state
        state.show =true;
        //你还可以在这里执行其他的操作改变state
    },
    switch_false(state){//这里的state对应着上面这个state
        state.show =false;
        //你还可以在这里执行其他的操作改变state
    },
    saveurl(state,url) {
        state.url = url;
       },
       saveimg(state,img) {
        state.img = img;
       },
       savename(state,name) {
        state.name = name;
       },
       savegedanid(state,gedanid) {
        state.gedanid = gedanid;
       },
       saveyinyueindex(state,yinyueindex){
           state.yinyueindex=yinyueindex;
       },
       savelyric(state,lyric){
        state.lyric=lyric;
       }

      

  },
//   getters:{ //获取state值
//     showurl(state) {
//         console.log(state.url)
//        }
      
// },
actions:{ //执行多个mutations
    saveurl({commit}, msg) {
        commit('saveurl', msg) // 提交到mutations中处理 
       },
       saveimg({commit}, msg) {
        commit('saveimg', msg) // 提交到mutations中处理 
       },
       savename({commit}, msg) {
        commit('savename', msg) // 提交到mutations中处理 
       },
       savegedanid({commit}, msg) {
        commit('savegedanid', msg) // 提交到mutations中处理 
       },
       saveyinyueindex({commit},msg){
           commit('saveyinyueindex',msg)
       },
       savelyric({commit},msg){
        commit('savelyric',msg)
       }

      
}
})
