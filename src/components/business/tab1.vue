<template>
  <div class="demo">
    tab1
    <img
      :src="img"
      alt=""
      srcset=""
    >
  </div>
</template>

<script>
import { login } from '@/http/request';

export default {
  data() {
    return {
      img: require('../../assets/images/1111.png'),
    };
  },
  mounted() {
    login({ a: 1 }).then((res) => {
      console.warn(res);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
