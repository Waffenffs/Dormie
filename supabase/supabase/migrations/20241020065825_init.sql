create type "public"."listing_availability" as enum ('available', 'full');

create type "public"."listing_type" as enum ('Private', 'Shared');

create type "public"."role_type" as enum ('Student', 'Owner');

create table "public"."listings" (
    "id" uuid not null default gen_random_uuid(),
    "under_review" boolean default true,
    "title" character varying(255) not null,
    "description" text not null,
    "monthly_price" numeric(6,2) not null,
    "availability" listing_availability,
    "facebook_link" character varying(255),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "deleted_at" timestamp with time zone,
    "type" listing_type,
    "owner_id" uuid
);


create table "public"."listings_amenities" (
    "id" uuid not null default gen_random_uuid(),
    "listing_id" uuid,
    "amenity" text not null,
    "created_at" timestamp with time zone default now(),
    "deleted_at" timestamp with time zone
);


create table "public"."listings_images" (
    "id" uuid not null default gen_random_uuid(),
    "listing_id" uuid,
    "image_url" text not null,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP
);


create table "public"."listings_rooms" (
    "id" uuid not null default gen_random_uuid(),
    "name" text,
    "total_beds" integer,
    "occupied_beds" integer,
    "for_listing" uuid
);


create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "email" character varying(255),
    "created_at" timestamp with time zone default now(),
    "deleted_at" timestamp with time zone,
    "role_initialized" boolean default false,
    "role" role_type default 'Student'::role_type
);


CREATE UNIQUE INDEX listings_amenities_pkey ON public.listings_amenities USING btree (id);

CREATE UNIQUE INDEX listings_images_pkey ON public.listings_images USING btree (id);

CREATE UNIQUE INDEX listings_pkey ON public.listings USING btree (id);

CREATE UNIQUE INDEX rooms_pkey ON public.listings_rooms USING btree (id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."listings" add constraint "listings_pkey" PRIMARY KEY using index "listings_pkey";

alter table "public"."listings_amenities" add constraint "listings_amenities_pkey" PRIMARY KEY using index "listings_amenities_pkey";

alter table "public"."listings_images" add constraint "listings_images_pkey" PRIMARY KEY using index "listings_images_pkey";

alter table "public"."listings_rooms" add constraint "rooms_pkey" PRIMARY KEY using index "rooms_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."listings" add constraint "listings_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."listings" validate constraint "listings_owner_id_fkey";

alter table "public"."listings_amenities" add constraint "listings_amenities_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE not valid;

alter table "public"."listings_amenities" validate constraint "listings_amenities_listing_id_fkey";

alter table "public"."listings_images" add constraint "listings_images_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE not valid;

alter table "public"."listings_images" validate constraint "listings_images_listing_id_fkey";

alter table "public"."listings_rooms" add constraint "listings_rooms_for_listing_fkey" FOREIGN KEY (for_listing) REFERENCES listings(id) ON DELETE CASCADE not valid;

alter table "public"."listings_rooms" validate constraint "listings_rooms_for_listing_fkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

grant delete on table "public"."listings" to "anon";

grant insert on table "public"."listings" to "anon";

grant references on table "public"."listings" to "anon";

grant select on table "public"."listings" to "anon";

grant trigger on table "public"."listings" to "anon";

grant truncate on table "public"."listings" to "anon";

grant update on table "public"."listings" to "anon";

grant delete on table "public"."listings" to "authenticated";

grant insert on table "public"."listings" to "authenticated";

grant references on table "public"."listings" to "authenticated";

grant select on table "public"."listings" to "authenticated";

grant trigger on table "public"."listings" to "authenticated";

grant truncate on table "public"."listings" to "authenticated";

grant update on table "public"."listings" to "authenticated";

grant delete on table "public"."listings" to "service_role";

grant insert on table "public"."listings" to "service_role";

grant references on table "public"."listings" to "service_role";

grant select on table "public"."listings" to "service_role";

grant trigger on table "public"."listings" to "service_role";

grant truncate on table "public"."listings" to "service_role";

grant update on table "public"."listings" to "service_role";

grant delete on table "public"."listings_amenities" to "anon";

grant insert on table "public"."listings_amenities" to "anon";

grant references on table "public"."listings_amenities" to "anon";

grant select on table "public"."listings_amenities" to "anon";

grant trigger on table "public"."listings_amenities" to "anon";

grant truncate on table "public"."listings_amenities" to "anon";

grant update on table "public"."listings_amenities" to "anon";

grant delete on table "public"."listings_amenities" to "authenticated";

grant insert on table "public"."listings_amenities" to "authenticated";

grant references on table "public"."listings_amenities" to "authenticated";

grant select on table "public"."listings_amenities" to "authenticated";

grant trigger on table "public"."listings_amenities" to "authenticated";

grant truncate on table "public"."listings_amenities" to "authenticated";

grant update on table "public"."listings_amenities" to "authenticated";

grant delete on table "public"."listings_amenities" to "service_role";

grant insert on table "public"."listings_amenities" to "service_role";

grant references on table "public"."listings_amenities" to "service_role";

grant select on table "public"."listings_amenities" to "service_role";

grant trigger on table "public"."listings_amenities" to "service_role";

grant truncate on table "public"."listings_amenities" to "service_role";

grant update on table "public"."listings_amenities" to "service_role";

grant delete on table "public"."listings_images" to "anon";

grant insert on table "public"."listings_images" to "anon";

grant references on table "public"."listings_images" to "anon";

grant select on table "public"."listings_images" to "anon";

grant trigger on table "public"."listings_images" to "anon";

grant truncate on table "public"."listings_images" to "anon";

grant update on table "public"."listings_images" to "anon";

grant delete on table "public"."listings_images" to "authenticated";

grant insert on table "public"."listings_images" to "authenticated";

grant references on table "public"."listings_images" to "authenticated";

grant select on table "public"."listings_images" to "authenticated";

grant trigger on table "public"."listings_images" to "authenticated";

grant truncate on table "public"."listings_images" to "authenticated";

grant update on table "public"."listings_images" to "authenticated";

grant delete on table "public"."listings_images" to "service_role";

grant insert on table "public"."listings_images" to "service_role";

grant references on table "public"."listings_images" to "service_role";

grant select on table "public"."listings_images" to "service_role";

grant trigger on table "public"."listings_images" to "service_role";

grant truncate on table "public"."listings_images" to "service_role";

grant update on table "public"."listings_images" to "service_role";

grant delete on table "public"."listings_rooms" to "anon";

grant insert on table "public"."listings_rooms" to "anon";

grant references on table "public"."listings_rooms" to "anon";

grant select on table "public"."listings_rooms" to "anon";

grant trigger on table "public"."listings_rooms" to "anon";

grant truncate on table "public"."listings_rooms" to "anon";

grant update on table "public"."listings_rooms" to "anon";

grant delete on table "public"."listings_rooms" to "authenticated";

grant insert on table "public"."listings_rooms" to "authenticated";

grant references on table "public"."listings_rooms" to "authenticated";

grant select on table "public"."listings_rooms" to "authenticated";

grant trigger on table "public"."listings_rooms" to "authenticated";

grant truncate on table "public"."listings_rooms" to "authenticated";

grant update on table "public"."listings_rooms" to "authenticated";

grant delete on table "public"."listings_rooms" to "service_role";

grant insert on table "public"."listings_rooms" to "service_role";

grant references on table "public"."listings_rooms" to "service_role";

grant select on table "public"."listings_rooms" to "service_role";

grant trigger on table "public"."listings_rooms" to "service_role";

grant truncate on table "public"."listings_rooms" to "service_role";

grant update on table "public"."listings_rooms" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


