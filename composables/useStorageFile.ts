import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pocketbase-db-young-glitter-2631.fly.dev')

export function useStorageFile(user: any) {
   return pb.files.getURL(user, user.avatar)
}