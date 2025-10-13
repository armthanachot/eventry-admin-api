import { eq } from "drizzle-orm"
import db from "../../pkg/db/conn"
import { eventLocations, eventOrganizers, events, eventSchedules, eventStatusEnum, eventTicketTypes, organizerRoleEnum, users } from "../../pkg/db/schema"
import { TCreateEvent, TCreateEventLocation, TCreateEventSchedule, TCreateEventTicketType, TEventIdParam, TUpdateEventStatus } from "./model/request"
import { TCreateEventResponse, TFindAllEventsResponse, TFindEventByIdResponse } from "./model/response"
import { TResponseNoData } from "../../model/response"

class EventService {
    async createEvent(payload: TCreateEvent): Promise<TCreateEventResponse> {

        for(const organizer of payload.organizers) {
            const [user] = await db.select().from(users).where(eq(users.id, organizer as string))
            if(!user) {
                return {
                    success: false,
                    message: "Organizer not found"
                }
            }
        }

        const [event] = await db.insert(events).values({
            name: payload.name,
            capacity: payload.capacity,
            slug: payload.slug,
            description: payload.description,
            earlyBirdPrice: payload.earlyBirdPrice,
            price: payload.price,
            eventType: payload.eventType,
            eventStart: new Date(payload.eventStart),
            eventEnd: new Date(payload.eventEnd),
            publishStart: payload.publishStart ? new Date(payload.publishStart) : undefined,
            publishEnd: payload.publishEnd ? new Date(payload.publishEnd) : undefined,
            status: eventStatusEnum.enumValues[0],
            eventBannerUrl: payload.eventBannerUrl
        }).returning()

        await db.insert(eventOrganizers).values(payload.organizers.map((organizer) => ({
            eventId: event.id,
            userId: organizer as string,
            role: organizerRoleEnum.enumValues[0]
        })))

        return {
            data: {
                id: event.id,
                name: event.name
            },
            success: true,
            message: "Event created successfully"
        }
    }

    async createEventSchedule(payload: TCreateEventSchedule): Promise<TResponseNoData> {
        await db.insert(eventSchedules).values(payload)
        return {
            success: true,
            message: "Event schedule created successfully"
        }
    }

    async createEventTicketType(payload: TCreateEventTicketType): Promise<TResponseNoData> {
        await db.insert(eventTicketTypes).values({
            ...payload,
            startDate: new Date(payload.startDate),
            endDate: new Date(payload.endDate)
        })
        return {
            success: true,
            message: "Event ticket type created successfully"
        }
    }

    async createEventLocation(payload: TCreateEventLocation): Promise<TResponseNoData> {
        await db.insert(eventLocations).values(payload)
        return {
            success: true,
            message: "Event location created successfully"
        }
    }

    async findAllEvents(): Promise<TFindAllEventsResponse> {
        const data = await db.select().from(events)
        return {
            data: data.map((event) => ({
                id: event.id,
                name: event.name
            })),
            success: true,
            message: "Events fetched successfully"
        }
    }

    async findEventById(id: string): Promise<TFindEventByIdResponse> {
        const [data] = await db.select().from(events).where(eq(events.id, id))
        return {
            data: {
                id: data.id,
                name: data.name
            },
            success: true,
            message: "Event fetched successfully"
        }
    }

    async updateEventStatus(id: string, payload: TUpdateEventStatus): Promise<TResponseNoData> {
        await db.update(events).set(payload).where(eq(events.id, id))
        return {
            success: true,
            message: "Event status updated successfully"
        }
    }
}

export default new EventService()