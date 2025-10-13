import { pgTable, uuid, date, time, varchar, text } from 'drizzle-orm/pg-core';
import { events } from './events';

export const eventSchedules = pgTable('event_schedules', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id').references(() => events.id).notNull(),
  date: date('date').notNull(), // date_only
  timeStart: time('time_start').notNull(),
  timeEnd: time('time_end').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
});

export type EventSchedule = typeof eventSchedules.$inferSelect;
export type NewEventSchedule = typeof eventSchedules.$inferInsert;
