import { pgTable, uuid, pgEnum, primaryKey } from 'drizzle-orm/pg-core';
import { events } from './events';
import { users } from './users';

export const organizerRoleEnum = pgEnum('organizer_role', ['OWNER', 'CO_HOST']);

export const eventOrganizers = pgTable('event_organizers', {
  eventId: uuid('event_id').references(() => events.id).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  role: organizerRoleEnum('role').notNull(),
});

export type EventOrganizer = typeof eventOrganizers.$inferSelect;
export type NewEventOrganizer = typeof eventOrganizers.$inferInsert;
