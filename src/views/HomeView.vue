<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Welcome back!</h1>
      <p class="text-gray-600">Track your progress and stay motivated</p>
    </div>

    <div class="grid grid-cols-1 gap-4 mb-6">
      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Today's Activity</h2>
        <div class="flex items-center justify-between">
          <div class="text-center">
            <p class="text-3xl font-bold text-orange-500">{{ todayStats.distance }}</p>
            <p class="text-sm text-gray-600">km</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-orange-500">{{ todayStats.duration }}</p>
            <p class="text-sm text-gray-600">min</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-orange-500">{{ todayStats.calories }}</p>
            <p class="text-sm text-gray-600">kcal</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <div v-if="todayActivities.length === 0" class="text-center text-gray-500 py-8">
          <p>No activities yet</p>
          <button @click="$router.push('/activities')" class="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg">
            Start Activity
          </button>
        </div>
        <div v-else class="space-y-4">
          <div v-for="activity in todayActivities" :key="activity.id" class="border-b border-gray-200 pb-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-gray-800">{{ activity.name }}</h3>
                <p class="text-sm text-gray-600">{{ formatTime(activity.date) }}</p>
              </div>
              <span :class="getActivityTypeClass(activity.type)" class="text-xs px-2 py-1 rounded">
                {{ activity.type }}
              </span>
            </div>
            <div class="mt-2 grid grid-cols-3 gap-4 text-center">
              <div>
                <p class="text-lg font-bold text-gray-800">{{ activity.distance }}</p>
                <p class="text-xs text-gray-600">km</p>
              </div>
              <div>
                <p class="text-lg font-bold text-gray-800">{{ activity.duration }}</p>
                <p class="text-xs text-gray-600">min</p>
              </div>
              <div>
                <p class="text-lg font-bold text-gray-800">{{ activity.calories }}</p>
                <p class="text-xs text-gray-600">kcal</p>
              </div>
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

const todayActivities = computed(() => activitiesStore.getTodayActivities)

const todayStats = computed(() => {
  return todayActivities.value.reduce((acc, activity) => {
    acc.distance += activity.distance
    acc.duration += activity.duration
    acc.calories += activity.calories
    return acc
  }, { distance: 0, duration: 0, calories: 0 })
})

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

const getActivityTypeClass = (type) => {
  const classes = {
    Running: 'bg-green-100 text-green-800',
    Cycling: 'bg-blue-100 text-blue-800',
    Walking: 'bg-yellow-100 text-yellow-800',
    Swimming: 'bg-purple-100 text-purple-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}
</script> 