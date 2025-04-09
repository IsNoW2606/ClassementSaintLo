import {defineEventHandler, readMultipartFormData} from 'h3'
import PocketBase from 'pocketbase'

const pb = new PocketBase('https://pocketbase-db-young-glitter-2631.fly.dev')

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)

    const name = formData?.find(f => f.name === 'name')?.data?.toString()
    const file = formData?.find(f => f.name === 'avatar')

    if (!name || !file || !file.filename || !file.data?.length) {
        throw createError({ statusCode: 400, statusMessage: 'Nom et photo requis' })
    }

    const pocketForm = new FormData()
    pocketForm.append('name', name)
    pocketForm.append('points', '0')
    pocketForm.append('avatar', new Blob([file.data], { type: file.type }), file.filename)

    return await pb.collection('users').create(pocketForm)
})