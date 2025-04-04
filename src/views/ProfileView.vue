<script setup>
import { computed } from 'vue'
import { useActivitiesStore } from '../stores/activities'

const store = useActivitiesStore()

const totalStats = computed(() => {
  return store.activities.reduce((stats, activity) => {
    stats.distance += activity.distance
    stats.duration += activity.duration
    stats.calories += activity.calories
    return stats
  }, { distance: 0, duration: 0, calories: 0 })
})

const activityTypes = computed(() => {
  const types = {}
  store.activities.forEach(activity => {
    types[activity.type] = (types[activity.type] || 0) + 1
  })
  const total = Object.values(types).reduce((sum, count) => sum + count, 0)
  return Object.entries(types).map(([type, count]) => ({
    type,
    count,
    percentage: Math.round((count / total) * 100)
  }))
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center space-x-4">
      <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p class="text-gray-500">Member since {{ new Date().toLocaleDateString() }}</p>
      </div>
    </div>

    <!-- Total Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Total Distance</h3>
        <p class="text-3xl font-bold text-orange-500">{{ totalStats.distance.toFixed(1) }} km</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Total Duration</h3>
        <p class="text-3xl font-bold text-orange-500">{{ totalStats.duration }} min</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Total Calories</h3>
        <p class="text-3xl font-bold text-orange-500">{{ totalStats.calories }} kcal</p>
      </div>
    </div>

    <!-- Activity Distribution -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Activity Distribution</h2>
      <div class="space-y-4">
        <div v-for="activity in activityTypes" :key="activity.type" class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">{{ activity.type }}</span>
            <span class="text-gray-900">{{ activity.count }} activities ({{ activity.percentage }}%)</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="h-2 rounded-full" 
              :style="{ width: `${activity.percentage}%` }"
              :class="{
                'bg-blue-500': activity.type === 'Run',
                'bg-green-500': activity.type === 'Bike',
                'bg-purple-500': activity.type === 'Swim'
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Achievements -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="p-4 border border-gray-200 rounded-lg">
          <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900">First Activity</h3>
          <p class="text-sm text-gray-500">Started your fitness journey</p>
        </div>
        <div class="p-4 border border-gray-200 rounded-lg">
          <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900">Activity Streak</h3>
          <p class="text-sm text-gray-500">Completed multiple activities</p>
        </div>
        <div class="p-4 border border-gray-200 rounded-lg">
          <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900">Goal Achieved</h3>
          <p class="text-sm text-gray-500">Reached your first milestone</p>
        </div>
      </div>
    </div>
  </div>
</template> 