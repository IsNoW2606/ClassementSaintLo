import { defineEventHandler, readBody, getRouterParam } from 'h3'
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pocketbase-db-young-glitter-2631.fly.dev') // Remplace par ton URL si hébergé

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID ou delta manquant ou invalide'
        })
    }

    const record = await pb.collection('users').getOne(id)

    return record.points ?? 0
})