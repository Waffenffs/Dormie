create sequence "public"."listings_conveniences_id_seq";

create table "public"."listings_conveniences" (
    "id" integer not null default nextval('listings_conveniences_id_seq'::regclass),
    "for_listing" uuid,
    "title" text
);


alter sequence "public"."listings_conveniences_id_seq" owned by "public"."listings_conveniences"."id";

CREATE UNIQUE INDEX listings_conveniences_pkey ON public.listings_conveniences USING btree (id);

alter table "public"."listings_conveniences" add constraint "listings_conveniences_pkey" PRIMARY KEY using index "listings_conveniences_pkey";

alter table "public"."listings_conveniences" add constraint "listings_conveniences_for_listing_fkey" FOREIGN KEY (for_listing) REFERENCES listings(id) ON DELETE CASCADE not valid;

alter table "public"."listings_conveniences" validate constraint "listings_conveniences_for_listing_fkey";

grant delete on table "public"."listings_conveniences" to "anon";

grant insert on table "public"."listings_conveniences" to "anon";

grant references on table "public"."listings_conveniences" to "anon";

grant select on table "public"."listings_conveniences" to "anon";

grant trigger on table "public"."listings_conveniences" to "anon";

grant truncate on table "public"."listings_conveniences" to "anon";

grant update on table "public"."listings_conveniences" to "anon";

grant delete on table "public"."listings_conveniences" to "authenticated";

grant insert on table "public"."listings_conveniences" to "authenticated";

grant references on table "public"."listings_conveniences" to "authenticated";

grant select on table "public"."listings_conveniences" to "authenticated";

grant trigger on table "public"."listings_conveniences" to "authenticated";

grant truncate on table "public"."listings_conveniences" to "authenticated";

grant update on table "public"."listings_conveniences" to "authenticated";

grant delete on table "public"."listings_conveniences" to "service_role";

grant insert on table "public"."listings_conveniences" to "service_role";

grant references on table "public"."listings_conveniences" to "service_role";

grant select on table "public"."listings_conveniences" to "service_role";

grant trigger on table "public"."listings_conveniences" to "service_role";

grant truncate on table "public"."listings_conveniences" to "service_role";

grant update on table "public"."listings_conveniences" to "service_role";


