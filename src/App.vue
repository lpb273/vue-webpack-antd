<template>
  <div id="app">
    <a-button type="primary">
      <router-link to="/tab1"> tab1 </router-link>
    </a-button>
    <a-button type="primary">
      <router-link to="/tab2"> tab2 </router-link>
    </a-button>
    <router-view />
  </div>
</template>
