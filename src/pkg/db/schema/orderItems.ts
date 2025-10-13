import { pgTable, uuid, integer, doublePrecision } from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { eventTicketTypes } from './eventTicketTypes';

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  ticketTypeId: uuid('ticket_type_id').references(() => eventTicketTypes.id).notNull(),
  quantity: integer('quantity').notNull(),
  price: doublePrecision('price').notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
