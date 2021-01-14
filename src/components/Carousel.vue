<template>
  <!-- .bg 是另外增加頁面效果，可刪-->
  <div class="bg" :style="'background-image: url(' + carousels[config.show] + ')'"></div>
  <div class="container">
    <div class="carousel-wrap" @mouseenter.stop="config.toggleTimer = false" @mouseleave.stop="config.toggleTimer = true">
      <span>
        <transition-group name="slide-fade">
          <div class="item" v-for="(carousel, index) in carousels" :key="index" v-show="config.show == index">
            <a href="#">
              <img :src="carousel" />
            </a>
          </div>
        </transition-group>
      </span>
      <!-- arrows -->
      <div class="arrows-group" v-if="config.arrows">
        <a class="button-prev" href="#" @click.prevent="toPrev">
          <slot name="arrows-prev">
            <img src="https://akveo.github.io/eva-icons/outline/png/128/arrow-ios-back-outline.png" />
          </slot>
        </a>
        <a class="button-next" href="#" @click.prevent="toNext">
          <slot name="arrows-next">
            <img src="https://akveo.github.io/eva-icons/outline/png/128/arrow-ios-forward-outline.png" />
          </slot>
        </a>
      </div>
      <!-- dots -->
      <div class="dot-group" v-if="carousels.length > 0">
        <a v-for="(l, i) in carousels.length" :key="i" href="#" :class="{ active: config.show == i }" @click.prevent="config.show = i"></a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';

export default {
  setup(props, context) {
    let config = reactive({
      carouselName: 'carousel-next',
      show: 0,
      autoplay: false, // 是否自動輪播
      timer: null, // auto play
      timerDelay: 3000, // 自動輪播間隔秒數
      toggleTimer: true, // pause auto play
      minHeight: 580, // 抓最小高度
      arrows: true, // 是否要有箭頭，預設 true
      dots: true, // 是否要有小點，預設 true
    });
    const carousels = reactive(['https://picsum.photos/900/506?image=508', 'https://picsum.photos/900/506?image=1068', 'https://picsum.photos/900/506?image=509']);

    const toNext = () => {
      config.carouselName = 'carousel-next';
      config.show + 1 >= carousels.length ? (config.show = 0) : (config.show = config.show + 1);
    };

    const toPrev = () => {
      config.carouselName = 'carousel-prev';
      config.show - 1 < 0 ? (config.show = carousels.length - 1) : (config.show = config.show - 1);
    };
    // 自動輪播
    const autoPlay = () => {
      setInterval(() => {
        if (config.toggleTimer) {
          toNext();
        }
      }, config.timerDelay);
    };

    onMounted(() => {
      autoPlay();
    });

    return {
      config,
      carousels,
      toNext,
      toPrev,
    };
  },
};
</script>

<style scoped>
*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body,
.container {
  height: 100vh;
  overflow-y: hidden;
}

.container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  max-width: 900px;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  -webkit-filter: blur(8px);
  filter: blur(8px);
  -webkit-transition: background-image 0.5s;
  -o-transition: background-image 0.5s;
  transition: background-image 0.5s;
}

.carousel-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.carousel-wrap .item {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #000;
  color: #fff;
  opacity: 1;
}

.carousel-wrap .item:first-of-type {
  position: relative;
}

.carousel-wrap .item img {
  display: block;
  max-width: 100%;
}

.carousel-wrap .item a {
  display: block;
}

.carousel-wrap .button-prev,
.carousel-wrap .button-next,
.carousel-wrap .dot-group {
  position: absolute;
  z-index: 1;
}

.carousel-wrap .button-prev,
.carousel-wrap .button-next {
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.3s;
}

.carousel-wrap .button-prev:hover,
.carousel-wrap .button-next:hover {
  opacity: 0.7;
}

.carousel-wrap .button-prev img,
.carousel-wrap .button-next img {
  display: block;
  max-width: 50px;
}

.carousel-wrap .button-next {
  right: 0;
}

.carousel-wrap .dot-group {
  right: 0;
  bottom: 8px;
  left: 0;
  display: flex;
  justify-content: center;
}

.carousel-wrap .dot-group a {
  display: block;
  margin-right: 8px;
  margin-left: 8px;
  width: 16px;
  height: 16px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transition: 0.3s;
}

.carousel-wrap .dot-group a:hover,
.carousel-wrap .dot-group a.active {
  background: #fff;
}

.carousel-prev-enter-active,
.carousel-prev-leave-active,
.carousel-next-enter-active,
.carousel-next-leave-active {
  transition: transform 1s opacity;
  will-change: transform;
}

.carousel-next-enter,
.carousel-prev-leave-to {
  transform: translateX(100%);
}

.carousel-next-leave-to,
.carousel-prev-enter {
  transform: translateX(-100%);
}


/* prefix with transition name */
.slide-fade-enter-active {
  opacity: 1;
  z-index: 10;
}

.slide-fade-leave-active {
  opacity: 1;
}
</style>
