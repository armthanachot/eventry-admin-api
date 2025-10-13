import { Elysia } from "elysia"
import EventService from "./service"
import { CreateEvent, EventIdParam, UpdateEventStatus } from "./model/request"
import { CreateEventResponse, FindAllEventsResponse, FindEventByIdResponse } from "./model/response"
import { ResponseNoData } from "../../model/response"

const eventRouter = new Elysia({
    prefix: '/events'
})
    .post('/', async ({ body }) => {
        return await EventService.createEvent(body)
    }, {
        body: CreateEvent,
        response: CreateEventResponse
    })
    .get('/', async () => {
        return await EventService.findAllEvents()
    }, {
        response: FindAllEventsResponse
    })
    .get('/:id', async ({ params }) => {
        return await EventService.findEventById(params.id)
    }, {
        params: EventIdParam,
        response: FindEventByIdResponse
    })
    .put('/:id/status', async ({ params, body }) => {
        return await EventService.updateEventStatus(params.id, body)
    }, {
        params: EventIdParam,
        body: UpdateEventStatus,
        response: ResponseNoData
    })

export default eventRouter