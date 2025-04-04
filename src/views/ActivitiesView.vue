<template>
  <div class="container mx-auto px-4 py-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Activities</h1>
      <button @click="showNewActivityForm = true" class="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        New Activity
      </button>
    </div>

    <div class="space-y-4">
      <div v-for="activity in activities" :key="activity.id" class="bg-white rounded-lg shadow p-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-gray-800">{{ activity.name }}</h3>
            <p class="text-sm text-gray-600">{{ formatDate(activity.date) }}</p>
          </div>
          <span :class="getActivityTypeClass(activity.type)" class="text-xs px-2 py-1 rounded">
            {{ activity.type }}
          </span>
        </div>
        <div class="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ activity.distance }}</p>
            <p class="text-xs text-gray-600">km</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ activity.duration }}</p>
            <p class="text-xs text-gray-600">min</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-800">{{ activity.calories }}</p>
            <p class="text-xs text-gray-600">kcal</p>
          </div>
        </div>
      </div>
    </div>

    <NewActivityForm v-if="showNewActivityForm" @close="showNewActivityForm = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useActivitiesStore } from '../stores/activities'
import NewActivityForm from '../components/NewActivityForm.vue'

const activitiesStore = useActivitiesStore()
const showNewActivityForm = ref(false)

const activities = computed(() => activitiesStore.getActivities)

const formatDate = (date) => {
  const options = { 
    weekday: 'long', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  }
  return new Date(date).toLocaleDateString('en-US', options)
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