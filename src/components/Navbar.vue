<template>
  <b-navbar type="dark" class="custom-navbar">
    <b-container
      fluid
      class="d-flex justify-content-between align-items-center"
    >
      <b-navbar-brand href="#" class="text-white">Glare</b-navbar-brand>
      <b-navbar-toggle @click="toggleMenu">
        <template #default>
          <span v-if="!isMenuOpen">
            <span class="navbar-toggler-icon"></span>
          </span>
          <span v-else class="custom-close-icon text-white">&times;</span>
        </template>
      </b-navbar-toggle>
    </b-container>
  </b-navbar>

  <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>

  <transition name="slide">
    <div v-if="isMenuOpen" class="mobile-menu custom-navbar">
      <b-nav vertical>
        <b-nav-item href="#" class="text-white">Link 1</b-nav-item>
        <b-nav-item href="#" class="text-white">Link 2</b-nav-item>
        <b-nav-item href="#" class="text-white">Link 3</b-nav-item>
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
  BNavItem,
} from "bootstrap-vue-next";

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<style scoped>
.custom-navbar {
  background-color: #023c40 !important;
}

:deep(.navbar-brand),
:deep(.navbar-toggler) {
  transform: translateY(-2px);
}

:deep(.navbar-toggler) {
  display: block !important;
}

:deep(.navbar-toggler-icon) {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.custom-close-icon {
  font-size: 2.5rem;
  line-height: 1; /* Justera linjehöjden för bättre centrering */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.9rem;
  height: 2.4rem;
  margin-top: -10px;
}

:deep(.nav-link) {
  color: #fff !important;
  transition: transform 0.2s ease, color 0.2s ease;
}

:deep(.nav-link:hover),
:deep(.nav-link:focus) {
  color: #fff !important;
  transform: scale(1.02);
}

:deep(.nav-link:visited) {
  color: #fff !important;
}

.overlay {
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  height: calc(100% - 56px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1020;
}

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
