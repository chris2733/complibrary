<template>
  <div class="container-fluid">
    <div class="topbar">
      <h1 class="topbar-title">Component lib</h1>
      <a href="#nogo">Buttons</a>
      <a href="#nogo">Components</a>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
};
</script>

<style lang="scss">
.topbar {
  display: flex;
  &-title {
    flex-grow: 1;
  }
}
</style>
