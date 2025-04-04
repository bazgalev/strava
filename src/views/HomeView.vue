<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Welcome back!</h1>
      <p class="text-gray-600 mt-2">Track your progress and stay motivated</p>
    </div>

    <div class="grid grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Today's Activity</h2>
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <p class="text-4xl font-bold text-orange-500">{{ todayStats.distance }}</p>
            <p class="text-sm text-gray-600">km</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-orange-500">{{ todayStats.duration }}</p>
            <p class="text-sm text-gray-600">min</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-orange-500">{{ todayStats.calories }}</p>
            <p class="text-sm text-gray-600">kcal</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Weekly Progress</h2>
        <div class="h-40 flex items-end justify-between">
          <div v-for="day in 7" :key="day" class="flex flex-col items-center">
            <div class="w-8 bg-orange-500 rounded-b" :style="{ height: `${Math.random() * 100}%` }"></div>
            <span class="text-xs text-gray-600 mt-2">{{ ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][day-1] }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
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

    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-800">Recent Activities</h2>
        <button v-if="todayActivities.length === 0" @click="$router.push('/activities')" 
          class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          Start Activity
        </button>
      </div>

      <div v-if="todayActivities.length === 0" class="text-center text-gray-500 py-8">
        <p>No activities yet</p>
      </div>
      <div v-else class="space-y-4">
        <div v-for="activity in todayActivities" :key="activity.id" 
          class="border-b border-gray-200 pb-4 last:border-0">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-semibold text-gray-800">{{ activity.name }}</h3>
              <p class="text-sm text-gray-600">{{ formatTime(activity.date) }}</p>
            </div>
            <span :class="getActivityTypeClass(activity.type)" class="text-xs px-2 py-1 rounded">
              {{ activity.type }}
            </span>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-4">
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-lg font-bold text-gray-800">{{ activity.distance }}</p>
              <p class="text-xs text-gray-600">kilometers</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-lg font-bold text-gray-800">{{ activity.duration }}</p>
              <p class="text-xs text-gray-600">minutes</p>
            </div>
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-lg font-bold text-gray-800">{{ activity.calories }}</p>
              <p class="text-xs text-gray-600">calories</p>
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

const activityTypeCounts = computed(() => {
  const counts = {}
  activitiesStore.getActivities.forEach(activity => {
    counts[activity.type] = (counts[activity.type] || 0) + 1
  })
  return counts
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