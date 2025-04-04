<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-800">New Activity</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Activity Type</label>
          <select v-model="form.type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Walking">Walking</option>
            <option value="Swimming">Swimming</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="form.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Distance (km)</label>
            <input v-model="form.distance" type="number" step="0.1" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Duration (min)</label>
            <input v-model="form.duration" type="number" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Calories</label>
          <input v-model="form.calories" type="number" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
        </div>

        <div class="flex justify-end space-x-3">
          <button type="button" @click="$emit('close')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600">
            Save Activity
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useActivitiesStore } from '../stores/activities'

const emit = defineEmits(['close'])
const activitiesStore = useActivitiesStore()

const form = ref({
  type: 'Running',
  name: '',
  distance: 0,
  duration: 0,
  calories: 0
})

const handleSubmit = () => {
  activitiesStore.addActivity(form.value)
  emit('close')
}
</script> 