import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pocketbase-db-young-glitter-2631.fly.dev') // ou l’URL Fly.io
export default defineEventHandler(async () => {
    return await pb.collection('users').getFullList({sort: '-points'})
})