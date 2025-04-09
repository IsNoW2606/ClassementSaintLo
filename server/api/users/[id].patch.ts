import { defineEventHandler, readBody, getRouterParam } from 'h3'
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pocketbase-db-young-glitter-2631.fly.dev') // Remplace par ton URL si hébergé
pb.autoCancellation(false)

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!id || typeof body?.delta !== 'number') {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID ou delta manquant ou invalide'
        })
    }

    const record = await pb.collection('users').getOne(id)
    const updated = await pb.collection('users').update(id, {
        points: record.points + body.delta
    })

    return { success: true, user: updated }
})