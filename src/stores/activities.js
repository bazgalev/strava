import { defineStore } from 'pinia'

export const useActivitiesStore = defineStore('activities', {
  state: () => ({
    activities: [
      {
        id: 1,
        name: 'Morning Run',
        type: 'Running',
        date: new Date(),
        distance: 5.2,
        duration: 32,
        calories: 320
      },
      {
        id: 2,
        name: 'Evening Ride',
        type: 'Cycling',
        date: new Date(Date.now() - 86400000), // yesterday
        distance: 15.8,
        duration: 45,
        calories: 450
      }
    ],
    currentActivity: null
  }),

  getters: {
    getActivities: (state) => state.activities,
    getActivityById: (state) => (id) => state.activities.find(activity => activity.id === id),
    getTodayActivities: (state) => {
      const today = new Date().toDateString()
      return state.activities.filter(activity => 
        activity.date.toDateString() === today
      )
    },
    getTotalStats: (state) => {
      return state.activities.reduce((acc, activity) => {
        acc.distance += activity.distance
        acc.duration += activity.duration
        acc.calories += activity.calories
        return acc
      }, { distance: 0, duration: 0, calories: 0 })
    }
  },

  actions: {
    addActivity(activity) {
      const newActivity = {
        id: Date.now(),
        ...activity,
        date: new Date()
      }
      this.activities.unshift(newActivity)
    },
    updateActivity(id, updatedActivity) {
      const index = this.activities.findIndex(activity => activity.id === id)
      if (index !== -1) {
        this.activities[index] = { ...this.activities[index], ...updatedActivity }
      }
    },
    deleteActivity(id) {
      this.activities = this.activities.filter(activity => activity.id !== id)
    },
    setCurrentActivity(activity) {
      this.currentActivity = activity
    }
  }
}) 