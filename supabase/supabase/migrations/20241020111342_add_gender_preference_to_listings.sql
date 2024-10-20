create type "public"."gender_preference" as enum ('Female Only', 'Male Only', 'Both');

alter table "public"."listings" add column "gender_preference" gender_preference;


