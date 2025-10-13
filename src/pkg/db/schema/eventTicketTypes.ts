import { pgTable, uuid, varchar, text, doublePrecision, integer, timestamp } from 'drizzle-orm/pg-core';
import { events } from './events';

export const eventTicketTypes = pgTable('event_ticket_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id').references(() => events.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(), // VIP, EARLY_BIRD, REGULAR, WORKSHOP
  description: text('description'),
  price: doublePrecision('price').notNull(),
  quota: integer('quota').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
});

export type EventTicketType = typeof eventTicketTypes.$inferSelect;
export type NewEventTicketType = typeof eventTicketTypes.$inferInsert;
