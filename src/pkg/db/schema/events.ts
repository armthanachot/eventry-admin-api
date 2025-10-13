import { sql } from 'drizzle-orm';
import { pgTable, uuid, varchar, integer, text, doublePrecision, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const eventTypeEnum = pgEnum('event_type', ['OFFLINE', 'ONLINE', 'HYBRID']);
export const eventStatusEnum = pgEnum('event_status', ['DRAFT', 'PUBLISHED', 'SOLD_OUT', 'CANCELLED', 'STARTED', 'ENDED', 'ARCHIVED']);

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  capacity: integer('capacity').notNull(), // ticket amount
  slug: varchar('slug', { length: 255 }).unique().notNull(), // SEO url
  description: text('description'), // html text (input from editor)
  earlyBirdPrice: doublePrecision('early_bird_price'),
  price: doublePrecision('price').notNull(),
  eventBannerUrl: text('event_banner_url'),
  eventType: eventTypeEnum('event_type').notNull(),
  eventStart: timestamp('event_start').notNull(),
  eventEnd: timestamp('event_end').notNull(),
  status: eventStatusEnum('status').default('DRAFT').notNull(),
  publishStart: timestamp('publish_start'),
  publishEnd: timestamp('publish_end'),
  createdAt: timestamp('created_at').default(sql`current_timestamp`).notNull(),
  updatedAt: timestamp('updated_at').default(sql`current_timestamp`).$onUpdate(() => new Date()).notNull(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
