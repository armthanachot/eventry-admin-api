import { pgTable, uuid, varchar, doublePrecision, text } from 'drizzle-orm/pg-core';
import { events } from './events';
import { eventSchedules } from './eventSchedules';

export const eventLocations = pgTable('event_locations', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id').references(() => events.id).notNull(),
  scheduleId: uuid('schedule_id').references(() => eventSchedules.id).notNull(),
  locationName: varchar('location_name', { length: 255 }).notNull(),
  latitude: doublePrecision('latitude'), // nullable
  longitude: doublePrecision('longitude'), // nullable
  onlineUrl: text('online_url'), // nullable
});

export type EventLocation = typeof eventLocations.$inferSelect;
export type NewEventLocation = typeof eventLocations.$inferInsert;
