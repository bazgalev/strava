<template>
  <div>
    <div class="bg-white rounded-lg shadow p-8 mb-8">
      <div class="flex items-center space-x-6">
        <div class="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-800">John Doe</h1>
          <p class="text-gray-600 mt-1">Member since 2024</p>
          <div class="mt-4 flex space-x-4">
            <div class="text-center">
              <p class="text-2xl font-bold text-orange-500">{{ totalStats.distance }}</p>
              <p class="text-sm text-gray-600">Total Distance</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-orange-500">{{ totalStats.duration }}</p>
              <p class="text-sm text-gray-600">Total Time</p>
            </div>
            <div class="text-center">
              <p class="text-2xl font-bold text-orange-500">{{ totalStats.calories }}</p>
              <p class="text-sm text-gray-600">Total Calories</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">Activity Distribution</h2>
        <div class="space-y-4">
          <div v-for="(count, type) in activityTypeCounts" :key="type" class="flex items-center">
            <div class="w-3/4">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-gray-700">{{ type }}</span>
                <span class="text-sm font-medium text-gray-700">{{ count }} activities</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div :class="getActivityTypeClass(type)" class="h-2.5 rounded-full" 
                  :style="{ width: `${(count / totalActivities) * 100}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">Recent Achievements</h2>
        <div class="space-y-4">
          <div class="flex items-center p-4 bg-gray-50 rounded-lg">
            <div class="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">First 5K Run</p>
              <p class="text-sm text-gray-500">Completed on March 15, 2024</p>
            </div>
          </div>
          <div class="flex items-center p-4 bg-gray-50 rounded-lg">
            <div class="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">Weekly Streak</p>
              <p class="text-sm text-gray-500">7 days of consecutive activities</p>
            </div>
          </div>
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

const totalActivities = computed(() => {
  return Object.values(activityTypeCounts.value).reduce((a, b) => a + b, 0)
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