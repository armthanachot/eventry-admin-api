import { t, Static } from 'elysia'
import { response } from '../../../model/response'

export const CreateEventResponse = response(t.Object({
    id: t.String(),
    name: t.String(),
}))

export const Event = t.Object({
    id: t.String(),
    name: t.String(),
})

export const FindAllEventsResponse = response(t.Array(Event))
export const FindEventByIdResponse = response(Event)

export type TCreateEventResponse = Static<typeof CreateEventResponse>
export type TFindAllEventsResponse = Static<typeof FindAllEventsResponse>
export type TFindEventByIdResponse = Static<typeof FindEventByIdResponse>