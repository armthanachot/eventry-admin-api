# DB Design

### Admin

roles
- id `uuid`
- name `enum` `ORGANIZER, PARTICIPANTS`

users
- id `uuid`
- role_id `uuid` `ref->roles.id`
- provider `enum` `FACEBOOK, GOOGLE, APP`
- provider_user_id `string` `nullable`
- email `varchar` `unique` `nullable`
- password `varchar` `for APP provider`
- created_at `timestamp` `default current_timestamp`
- updated_at `timestamp` `default current_timestamp on update current_timestamp`

user_profiles
- id `uuid`
- user_id `uuid` `ref->users.id`
- full_name `varchar`
- display_name `varchar`
- phone `varchar`
- avatar_url `text`

events
- id `uuid`
- name `string`
- capacity `int` `ticket amount`
- slug `string` `unique` `SEO url`
- description `test` *`html text (input from editor)`*
- early_bird_price `double`
- price `double`
- eventType `enum` `OFFLINE`, `ONLINE`, `HYBRID`
- event_start `datetime`
- event_end `datetime`
- status `enum` `DRAFT`, `PUBLISHED`, `SOLD_OUT`, `CANCELLED`, `STARTED`, `ENDED`, `ARCHIVED` `default DRAFT`
- publish_start `datetime`
- publish_end `datetime`
- created_at `timestamp` `default current_timestamp`
- updated_at `timestamp` `default current_timestamp on update current_timestamp`

event_organizers
- event_id `uuid`
- user_id `uuid`
- role `enum('OWNER','CO_HOST')`

event_ticket_types
- id `uuid`
- event_id `uuid` `FK -> events.id`
- name `string` `VIP`, `EARLY_BIRD`, `REGULAR`, `WORKSHOP`
- description `text`
- price `double`
- quota `int`
- start_date `datetime`
- end_date `datetime`

event_schedules
- id  `uuid`
- event_id `uuid` `ref -> events.id`
- date `date_only`
- time_start `time`
- time_end `time`
- title `varchar`
- description `text`

event_locations
- id `uuid`
- event_id `uuid` `ref -> events.id`
- schedule_id `uuid` `ref -> event_schedules.id`
- location_name `varchar`
- latitude `double` `nullable`
- longitude `double` `nullable`
- online_url `text` `nullable`

orders
- id `uuid`
- user_id `uuid` `ref -> users.id`
- event_id `uuid` `ref -> events.id`
- total_amount `double`
- status `enum('PENDING', 'PAID', 'CANCELLED', 'REFUNDED')`
- created_at `timestamp`

order_items
- id `uuid`
- order_id `uuid` `ref -> orders.id`
- ticket_type_id `uuid` `ref -> event_ticket_types.id`
- quantity `int`
- price `double`