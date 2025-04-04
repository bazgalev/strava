import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useActivitiesStore = defineStore('activities', () => {
  // Initialize activities from localStorage or use default data
  const activities = ref(JSON.parse(localStorage.getItem('activities') || '[]'))

  // Add test data if no activities exist
  if (activities.value.length === 0) {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const twoDaysAgo = new Date(today)
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

    activities.value = [
      {
        id: 1,
        type: 'Run',
        distance: 5.2,
        duration: 30,
        calories: 350,
        date: today.toISOString()
      },
      {
        id: 2,
        type: 'Bike',
        distance: 15.5,
        duration: 45,
        calories: 450,
        date: yesterday.toISOString()
      },
      {
        id: 3,
        type: 'Swim',
        distance: 1.2,
        duration: 25,
        calories: 280,
        date: twoDaysAgo.toISOString()
      }
    ]
    localStorage.setItem('activities', JSON.stringify(activities.value))
  }

  // Save activities to localStorage whenever they change
  const saveActivities = () => {
    localStorage.setItem('activities', JSON.stringify(activities.value))
  }

  const addActivity = (activity) => {
    activities.value.push({
      id: Date.now(),
      ...activity,
      date: new Date(activity.date).toISOString()
    })
    saveActivities()
  }

  const deleteActivity = (id) => {
    const index = activities.value.findIndex(activity => activity.id === id)
    if (index !== -1) {
      activities.value.splice(index, 1)
      saveActivities()
    }
  }

  const totalStats = computed(() => {
    return activities.value.reduce((stats, activity) => {
      stats.distance += activity.distance
      stats.duration += activity.duration
      stats.calories += activity.calories
      return stats
    }, { distance: 0, duration: 0, calories: 0 })
  })

  return {
    activities,
    addActivity,
    deleteActivity,
    totalStats
  }
}) 