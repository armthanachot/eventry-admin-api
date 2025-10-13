import { pgTable, uuid, doublePrecision, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';
import { events } from './events';

export const orderStatusEnum = pgEnum('order_status', ['PENDING', 'PAID', 'CANCELLED', 'REFUNDED']);

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  eventId: uuid('event_id').references(() => events.id).notNull(),
  totalAmount: doublePrecision('total_amount').notNull(),
  status: orderStatusEnum('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
