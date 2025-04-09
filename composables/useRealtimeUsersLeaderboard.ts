import { ref, onMounted, onUnmounted } from 'vue'
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pocketbase-db-young-glitter-2631.fly.dev')
pb.autoCancellation(false)

export async function useRealtimeUsersLeaderboard() {
    const users = ref([])

    async function fetchFromAPI() {
        users.value = await $fetch('api/users')
    }

    onMounted(() => {
        fetchFromAPI()
        pb.collection('users').subscribe('*', fetchFromAPI)
    })

    onUnmounted(() => {
        pb.collection('users').unsubscribe('*')
    })

    return { users }
}