import { t, Static } from 'elysia'


export const CreateEventSchedule = t.Object({
    eventId: t.String({ format: 'uuid' }),
    date: t.String({ format: 'date-time' }),
    timeStart: t.String({ format: 'time' }),
    timeEnd: t.String({ format: 'time' }),
    title: t.String(),
    description: t.String()
})

export const CreateEventTicketType = t.Object({
    eventId: t.String({ format: 'uuid' }),
    name: t.String(),
    description: t.String(),
    price: t.Number(),
    quota: t.Number(),
    startDate: t.String({ format: 'date-time' }),
    endDate: t.String({ format: 'date-time' })
})

export const CreateEventLocation = t.Object({
    eventId: t.String({ format: 'uuid' }),
    scheduleId: t.String({ format: 'uuid' }),
    locationName: t.String(),
    latitude: t.Number(),
    longitude: t.Number(),
    onlineUrl: t.String()
})

export const CreateEvent = t.Object({
    name: t.String(),
    capacity: t.Number(),
    slug: t.String(),
    description: t.String(),
    earlyBirdPrice: t.Number(),
    price: t.Number(),
    eventType: t.Enum({
        OFFLINE: 'OFFLINE',
        ONLINE: 'ONLINE',
        HYBRID: 'HYBRID'
    }),
    publishStart: t.Optional(t.String({ format: 'date-time' })),
    publishEnd: t.Optional(t.String({ format: 'date-time' })),
    eventStart: t.String({ format: 'date-time' }),
    eventEnd: t.String({ format: 'date-time' }),
    eventBannerUrl: t.Optional(t.String()),
    organizers: t.Array(t.String({ format: 'uuid' })),
})

export const EventIdParam = t.Object({ id: t.String({ format: 'uuid' }) })
export const UpdateEventStatus = t.Object({
    status: t.Enum({
        DRAFT: 'DRAFT',
        PUBLISHED: 'PUBLISHED',
        SOLD_OUT: 'SOLD_OUT',
        CANCELLED: 'CANCELLED',
        STARTED: 'STARTED',
        ENDED: 'ENDED',
        ARCHIVED: 'ARCHIVED'
    }),
})

export type TCreateEvent = Static<typeof CreateEvent>
export type TCreateEventSchedule = Static<typeof CreateEventSchedule>
export type TCreateEventTicketType = Static<typeof CreateEventTicketType>
export type TCreateEventLocation = Static<typeof CreateEventLocation>
export type TEventIdParam = Static<typeof EventIdParam>
export type TUpdateEventStatus = Static<typeof UpdateEventStatus>