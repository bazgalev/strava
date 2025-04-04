<template>
  <div class="container mx-auto px-4 py-6">
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="flex items-center space-x-4">
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-800">John Doe</h1>
          <p class="text-gray-600">Member since 2024</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Total Distance</h3>
        <p class="text-3xl font-bold text-orange-500">{{ totalStats.distance }}</p>
        <p class="text-sm text-gray-600">kilometers</p>
      </div>
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Total Time</h3>
        <p class="text-3xl font-bold text-orange-500">{{ totalStats.duration }}</p>
        <p class="text-sm text-gray-600">minutes</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-4">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Activity Types</h2>
      <div class="space-y-3">
        <div v-for="(count, type) in activityTypeCounts" :key="type" class="flex items-center justify-between">
          <div class="flex items-center">
            <span :class="getActivityTypeClass(type)" class="w-3 h-3 rounded-full mr-2"></span>
            <span class="text-gray-800">{{ type }}</span>
          </div>
          <span class="text-gray-600">{{ count }} activities</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useActivitiesStore } from '../stores/activities'

const activitiesStore = useActivitiesStore()

const totalStats = computed(() => activitiesStore.getTotalStats)

const activityTypeCounts = computed(() => {
  const counts = {}
  activitiesStore.getActivities.forEach(activity => {
    counts[activity.type] = (counts[activity.type] || 0) + 1
  })
  return counts
})

const getActivityTypeClass = (type) => {
  const classes = {
    Running: 'bg-green-500',
    Cycling: 'bg-blue-500',
    Walking: 'bg-yellow-500',
    Swimming: 'bg-purple-500'
  }
  return classes[type] || 'bg-gray-500'
}
</script> 