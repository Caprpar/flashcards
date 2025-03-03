<template>
  <b-navbar type="dark" class="custom-navbar">
    <b-container
      fluid
      class="d-flex justify-content-between align-items-center"
    >
      <!-- Name/logo -->
      <b-navbar-brand href="#" class="text-white">Glare</b-navbar-brand>
      <!-- Hamburgermenu toggle-->
      <b-navbar-toggle @click="toggleMenu">
        <template #default>
          <span v-if="!isMenuOpen">
            <span class="navbar-toggler-icon" />
          </span>
          <span v-else class="custom-close-icon text-white">&times;</span>
        </template>
      </b-navbar-toggle>
    </b-container>
  </b-navbar>

  <!-- Dark overlay is pressable to close menu-->
  <div v-if="isMenuOpen" class="overlay" @click="closeMenu" />

  <!-- Hamburgermenu slides in from the right -->
  <transition name="slide">
    <div v-if="isMenuOpen" class="mobile-menu custom-navbar">
      <b-nav vertical>
        <b-nav-item :to="'/'" class="text-white">Home</b-nav-item>
        <b-nav-item :to="'/createDeck'" class="text-white">
          Add Deck</b-nav-item
        >
        <b-nav-item :to="'/edit'" class="text-white"
          >Customize Decks</b-nav-item
        >
        <b-nav-item :to="'/statistics/1'" class="text-white"
          >Stastistics</b-nav-item
        >
      </b-nav>
    </div>
  </transition>
</template>

<script setup>
  import { ref } from "vue";
  import {
    BNavbar,
    BContainer,
    BNavbarBrand,
    BNavbarToggle,
    BNav,
    BNavItem
  } from "bootstrap-vue-next";

  // Hamburgermenu toggle logic
  const isMenuOpen = ref(false);

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }

  function closeMenu() {
    isMenuOpen.value = false;
  }
</script>

<style scoped>
  /* Navbar backgroundcolor */
  .custom-navbar {
    background-color: #023c40 !important;
  }

  /* Hamburgermenu toggle */
  :deep(.navbar-brand),
  :deep(.navbar-toggler) {
    transform: translateY(-2px);
  }

  /* Hamburgermenu toggle always shows */
  :deep(.navbar-toggler) {
    display: block !important;
  }

  /* Bootstraps own hamburgermenu icon */
  :deep(.navbar-toggler-icon) {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  }

  /* X icon matches bootstraps hamburgermenu icon dimensions */
  .custom-close-icon {
    font-size: 2.5rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.9rem;
    height: 2.4rem;
    margin-top: -10px;
  }

  /* Links */
  :deep(.nav-link),
  :deep(.nav-link:visited) {
    color: #fff !important;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  :deep(.nav-link:hover),
  :deep(.nav-link:focus) {
    color: #fff !important;
    transform: scale(1.02);
  }

  /* Dark overlay next to open hamburgermenu */
  .overlay {
    position: fixed;
    top: 56px;
    left: 0;
    width: 100%;
    height: calc(100% - 56px);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1020;
  }

  /* Hamburgermenu */
  .mobile-menu {
    position: fixed;
    top: 56px;
    right: 0;
    width: 75%;
    max-width: 250px;
    height: calc(100% - 56px);
    background-color: #023c40;
    padding: 1rem;
    z-index: 1030;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  }

  /* Hamburgermenu animation */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
  .slide-enter-to,
  .slide-leave-from {
    transform: translateX(0);
  }
</style>
