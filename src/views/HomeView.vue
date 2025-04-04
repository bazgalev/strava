<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useActivitiesStore } from '../stores/activities'

const router = useRouter()
const store = useActivitiesStore()

const today = new Date()
const todayString = today.toISOString().split('T')[0]

const todayActivities = computed(() => {
  return store.activities.filter(activity => {
    const activityDate = new Date(activity.date).toISOString().split('T')[0]
    return activityDate === todayString
  })
})

const weeklyStats = computed(() => {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  
  return store.activities.reduce((stats, activity) => {
    const activityDate = new Date(activity.date)
    if (activityDate >= weekAgo) {
      stats.distance += activity.distance
      stats.duration += activity.duration
      stats.calories += activity.calories
    }
    return stats
  }, { distance: 0, duration: 0, calories: 0 })
})

const activityTypeCounts = computed(() => {
  const counts = {}
  store.activities.forEach(activity => {
    counts[activity.type] = (counts[activity.type] || 0) + 1
  })
  return counts
})

const recentActivities = computed(() => {
  return [...store.activities]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
})

const startActivity = () => {
  router.push('/activities')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Welcome back!</h1>
      <button 
        @click="startActivity" 
        class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
      >
        Start Activity
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Today's Activity -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Today's Activity</h2>
        <div v-if="todayActivities.length > 0" class="space-y-4">
          <div v-for="activity in todayActivities" :key="activity.id" class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="w-8 h-8 rounded-full flex items-center justify-center" 
                :class="{
                  'bg-blue-100 text-blue-600': activity.type === 'Run',
                  'bg-green-100 text-green-600': activity.type === 'Bike',
                  'bg-purple-100 text-purple-600': activity.type === 'Swim'
                }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span class="ml-3 text-gray-900">{{ activity.type }}</span>
            </div>
            <div class="text-right">
              <div class="text-gray-900">{{ activity.distance }} km</div>
              <div class="text-sm text-gray-500">{{ activity.duration }} min</div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <p class="text-gray-500">No activities today</p>
          <button 
            @click="startActivity" 
            class="mt-2 text-orange-500 hover:text-orange-600"
          >
            Start one now
          </button>
        </div>
      </div>

      <!-- Weekly Progress -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h2>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Distance</span>
            <span class="text-gray-900">{{ weeklyStats.distance.toFixed(1) }} km</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Duration</span>
            <span class="text-gray-900">{{ weeklyStats.duration }} min</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Calories</span>
            <span class="text-gray-900">{{ weeklyStats.calories }} kcal</span>
          </div>
        </div>
      </div>

      <!-- Activity Types -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Activity Types</h2>
        <div class="space-y-4">
          <div v-for="(count, type) in activityTypeCounts" :key="type" class="flex items-center justify-between">
            <span class="text-gray-600">{{ type }}</span>
            <span class="text-gray-900">{{ count }} activities</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activities -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
      <div class="space-y-4">
        <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center justify-between">
          <div class="flex items-center">
            <span class="w-8 h-8 rounded-full flex items-center justify-center" 
              :class="{
                'bg-blue-100 text-blue-600': activity.type === 'Run',
                'bg-green-100 text-green-600': activity.type === 'Bike',
                'bg-purple-100 text-purple-600': activity.type === 'Swim'
              }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <div class="ml-3">
              <div class="text-gray-900">{{ activity.type }}</div>
              <div class="text-sm text-gray-500">{{ new Date(activity.date).toLocaleDateString() }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-gray-900">{{ activity.distance }} km</div>
            <div class="text-sm text-gray-500">{{ activity.duration }} min</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 