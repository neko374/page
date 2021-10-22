<template>
  <div>
    <left-menu-2></left-menu-2>
    <!-- <router-view/> -->
    <army-base></army-base>
  </div>
</template>

<script>
import ArmyBase from "../components/ArmyBase.vue";
import LeftMenu2 from "../components/LeftMenu2.vue";

export default {
  components: { ArmyBase, LeftMenu2 },
};
</script>

<style>
</style>