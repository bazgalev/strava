<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const currentPath = computed(() => route?.path || '/')

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Top Navigation -->
    <nav class="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <span class="text-2xl font-bold text-orange-500">Strava</span>
            </div>
          </div>
          <div class="flex items-center lg:hidden">
            <button @click="toggleMobileMenu" class="p-2 rounded-full text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex pt-16">
      <!-- Sidebar Navigation -->
      <aside class="hidden lg:block w-64 bg-white shadow-sm h-screen fixed left-0 top-16">
        <nav class="mt-5 px-2">
          <router-link 
            to="/" 
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100"
            :class="{ 'bg-gray-100 text-orange-500': currentPath === '/' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </router-link>
          <router-link 
            to="/activities" 
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100"
            :class="{ 'bg-gray-100 text-orange-500': currentPath === '/activities' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Activities
          </router-link>
          <router-link 
            to="/profile" 
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100"
            :class="{ 'bg-gray-100 text-orange-500': currentPath === '/profile' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </router-link>
        </nav>
      </aside>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="lg:hidden fixed inset-0 z-20">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" @click="toggleMobileMenu"></div>
        <div class="fixed inset-y-0 left-0 w-64 bg-white shadow-sm">
          <nav class="mt-5 px-2">
            <router-link 
              to="/" 
              class="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100"
              :class="{ 'bg-gray-100 text-orange-500': currentPath === '/' }"
              @click="toggleMobileMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </router-link>
            <router-link 
              to="/activities" 
              class="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100"
              :class="{ 'bg-gray-100 text-orange-500': currentPath === '/activities' }"
              @click="toggleMobileMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Activities
            </router-link>
            <router-link 
              to="/profile" 
              class="group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100"
              :class="{ 'bg-gray-100 text-orange-500': currentPath === '/profile' }"
              @click="toggleMobileMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-4 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </router-link>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <main class="flex-1 lg:ml-64 p-4 lg:p-8">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
