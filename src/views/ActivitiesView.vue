<script setup>
import { ref } from 'vue'
import { useActivitiesStore } from '../stores/activities'

const store = useActivitiesStore()

const newActivity = ref({
  type: 'Run',
  distance: 0,
  duration: 0,
  calories: 0,
  date: new Date().toISOString().split('T')[0]
})

const showForm = ref(false)

const addNewActivity = () => {
  store.addActivity({
    ...newActivity.value,
    calories: parseInt(newActivity.value.calories),
    distance: parseFloat(newActivity.value.distance),
    duration: parseInt(newActivity.value.duration)
  })
  showForm.value = false
  newActivity.value = {
    type: 'Run',
    distance: 0,
    duration: 0,
    calories: 0,
    date: new Date().toISOString().split('T')[0]
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Activities</h1>
      <button 
        @click="showForm = true"
        class="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
      >
        Add Activity
      </button>
    </div>

    <!-- Activity Form -->
    <div v-if="showForm" class="bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">New Activity</h2>
      <form @submit.prevent="addNewActivity" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Type</label>
          <select 
            v-model="newActivity.type"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option>Run</option>
            <option>Bike</option>
            <option>Swim</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Distance (km)</label>
          <input 
            type="number" 
            v-model="newActivity.distance"
            step="0.1"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input 
            type="number" 
            v-model="newActivity.duration"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Calories</label>
          <input 
            type="number" 
            v-model="newActivity.calories"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Date</label>
          <input 
            type="date" 
            v-model="newActivity.date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
        </div>
        <div class="flex justify-end space-x-3">
          <button 
            type="button"
            @click="showForm = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>

    <!-- Activities List -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="activity in store.activities" :key="activity.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span class="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
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
                {{ activity.type }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ new Date(activity.date).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ activity.distance }} km
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ activity.duration }} min
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ activity.calories }} kcal
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template> 