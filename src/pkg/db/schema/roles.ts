import { pgTable, uuid, pgEnum } from 'drizzle-orm/pg-core';

export const roleNameEnum = pgEnum('role_name', ['ORGANIZER', 'PARTICIPANTS', 'ADMIN']);

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: roleNameEnum('name').notNull(),
});

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
