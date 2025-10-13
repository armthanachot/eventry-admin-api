// Export all schemas
export * from './roles';
export * from './users';
export * from './userProfiles';
export * from './events';
export * from './eventOrganizers';
export * from './eventTicketTypes';
export * from './eventSchedules';
export * from './eventLocations';
export * from './eventFiles';
export * from './orders';
export * from './orderItems';

// Export all tables for drizzle operations
import { roles } from './roles';
import { users } from './users';
import { userProfiles } from './userProfiles';
import { events } from './events';
import { eventOrganizers } from './eventOrganizers';
import { eventTicketTypes } from './eventTicketTypes';
import { eventSchedules } from './eventSchedules';
import { eventLocations } from './eventLocations';
import { eventFiles } from './eventFiles';
import { orders } from './orders';
import { orderItems } from './orderItems';

export const schema = {
  roles,
  users,
  userProfiles,
  events,
  eventOrganizers,
  eventTicketTypes,
  eventSchedules,
  eventLocations,
  eventFiles,
  orders,
  orderItems,
};
