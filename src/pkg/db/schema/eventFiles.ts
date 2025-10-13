import { sql } from 'drizzle-orm';
import { pgTable, uuid, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { events } from './events';

export const fileTypeEnum = pgEnum('file_type', ['IMAGE', 'VIDEO', 'DOCUMENT', 'AUDIO']);

export const eventFiles = pgTable('event_files', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id').references(() => events.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileUrl: text('file_url').notNull(),
  fileType: fileTypeEnum('file_type').notNull(),
  fileSize: varchar('file_size', { length: 50 }), // e.g., "2.5MB"
  mimeType: varchar('mime_type', { length: 100 }), // e.g., "image/jpeg"
  createdAt: timestamp('created_at').default(sql`current_timestamp`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`current_timestamp on update current_timestamp`).notNull(),
});

export type EventFile = typeof eventFiles.$inferSelect;
export type NewEventFile = typeof eventFiles.$inferInsert;
