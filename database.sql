CREATE TABLE users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    email character varying(255) NOT NULL,
	password character varying(255) NOT NULL,
	name character varying(255),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

alter table users add constraint users_email_unique unique (email);