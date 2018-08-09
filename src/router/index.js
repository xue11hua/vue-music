import Vue from 'vue'
import Router from 'vue-router'
import tuijian from '@/components/home/tuijian'
import paihang from '@/components/home/paihang'
import gedan from '@/components/gedan/gedan'
import player from '@/components/player/player'
import geshou from '@/components/home/geshou'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tuijian',
      component: tuijian
    },
    {
      path: '/paihang',
      name: 'paihang',
      component: paihang
    },
    {
      path: '/gedan',
      name: 'gedan',
      component: gedan
    },
    {
      path: '/player',
      name: 'player',
      component: player
    },
    {
      path: '/geshou',
      name: 'geshou',
      component: geshou
    },

  ]
})
