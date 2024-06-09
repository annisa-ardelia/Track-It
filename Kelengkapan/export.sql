--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: task_priority; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.task_priority AS ENUM (
    'Urgent',
    'Standard',
    'Relax'
);


ALTER TYPE public.task_priority OWNER TO neondb_owner;

--
-- Name: task_status; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public.task_status AS ENUM (
    'Completed',
    'In-progress',
    'Done',
    'Overdue'
);


ALTER TYPE public.task_status OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pet; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.pet (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    pet_avatar character varying(255) NOT NULL,
    minimum_level integer NOT NULL
);


ALTER TABLE public.pet OWNER TO neondb_owner;

--
-- Name: pet_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.pet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pet_id_seq OWNER TO neondb_owner;

--
-- Name: pet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.pet_id_seq OWNED BY public.pet.id;


--
-- Name: pet_owner; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.pet_owner (
    username character varying(255),
    pet_id integer
);


ALTER TABLE public.pet_owner OWNER TO neondb_owner;

--
-- Name: user_avatar; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_avatar (
    id integer NOT NULL,
    image character varying(255) NOT NULL
);


ALTER TABLE public.user_avatar OWNER TO neondb_owner;

--
-- Name: user_avatar_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_avatar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_avatar_id_seq OWNER TO neondb_owner;

--
-- Name: user_avatar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_avatar_id_seq OWNED BY public.user_avatar.id;


--
-- Name: user_database; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_database (
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    nickname character varying(15) NOT NULL,
    avatar integer NOT NULL,
    level integer DEFAULT 1,
    point integer DEFAULT 0,
    level_up_point integer,
    CONSTRAINT user_database_password_check CHECK (((password)::text ~ '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$'::text))
);


ALTER TABLE public.user_database OWNER TO neondb_owner;

--
-- Name: user_notes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_notes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    notes text
);


ALTER TABLE public.user_notes OWNER TO neondb_owner;

--
-- Name: user_notes_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_notes_id_seq OWNER TO neondb_owner;

--
-- Name: user_notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_notes_id_seq OWNED BY public.user_notes.id;


--
-- Name: user_task; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_task (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    category character varying(50) NOT NULL,
    status public.task_status NOT NULL,
    deadline character varying(255),
    priority public.task_priority NOT NULL,
    note character varying(255),
    is_counted boolean DEFAULT false,
    CONSTRAINT user_task_category_check CHECK (((category)::text = ANY ((ARRAY['Study'::character varying, 'Grocery'::character varying, 'Other'::character varying])::text[])))
);


ALTER TABLE public.user_task OWNER TO neondb_owner;

--
-- Name: user_task_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.user_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_task_id_seq OWNER TO neondb_owner;

--
-- Name: user_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.user_task_id_seq OWNED BY public.user_task.id;


--
-- Name: pet id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pet ALTER COLUMN id SET DEFAULT nextval('public.pet_id_seq'::regclass);


--
-- Name: user_avatar id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_avatar ALTER COLUMN id SET DEFAULT nextval('public.user_avatar_id_seq'::regclass);


--
-- Name: user_notes id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_notes ALTER COLUMN id SET DEFAULT nextval('public.user_notes_id_seq'::regclass);


--
-- Name: user_task id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_task ALTER COLUMN id SET DEFAULT nextval('public.user_task_id_seq'::regclass);


--
-- Data for Name: pet; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.pet (id, name, pet_avatar, minimum_level) FROM stdin;
1	Alligator	alligator	71
2	Anglerfish	anglerfish	61
3	Ant	ant	1
4	Bat	bat	37
5	Bear	bear	57
6	Bee	bee	9
7	Brachiosaurus	brachiosaurus	93
8	Buffalo	buffalo	64
9	Bunny	bunny	38
10	Butterfly	butterfly	53
11	Camel	camel	65
12	Capybara	capybara	31
13	Cat	cat	42
14	Caterpillar	caterpillar	4
15	Chameleon	chameleon	49
16	Cheetah	cheetah	73
17	Chicken	chicken	24
18	Clownfish	clownfish	18
19	Cobra	cobra	89
20	Cockatoo	cockatoo	76
21	Cow	cow	23
22	Crab	crab	19
23	Crow	crow	15
24	Deer	deer	51
25	Dog	dog	46
26	Dolphin	dolphin	79
27	Donkey	donkey	28
28	Dragon	dragon	100
29	Dragonfly	dragonfly	6
30	Duck	duck	33
31	Eagle	eagle	84
32	Elephant	elephant	72
33	Fairy	fairy	90
34	Falcon	falcon	87
35	Flamingo	flamingo	74
36	Fly	fly	2
37	Fox	fox	91
38	Frog	frog	8
39	Giraffe	giraffe	39
40	Goblin	goblin	30
41	Goldfish	goldfish	32
42	Gorilla	gorilla	69
43	Griffin	griffin	60
44	Hamster	hamster	43
45	Hippo	hippo	56
46	Horse	horse	52
47	Hummingbird	hummingbird	81
48	Hydra	hydra	99
49	Jellyfish	jellyfish	13
50	Kangaroo	kangaroo	66
51	Koala	koala	75
52	Lion	lion	86
53	Llama	llama	62
54	Mammoth	mammoth	68
55	Mermaid	mermaid	80
56	Monkey	monkey	26
57	Octopus	octopus	92
58	Ostrich	ostrich	29
59	Owl	owl	36
60	Panda	panda	34
61	Parrot	parrot	85
62	Pegasus	pegasus	70
63	Pelican	pelican	48
64	Penguin	penguin	55
65	Pheonix	pheonix	97
66	Pig	pig	22
67	Porcupine	porcupine	45
68	Pterodactyl	pterodactyl	94
69	Rat	rat	7
70	Red Panda	redpanda	82
71	Rhino	rhino	88
72	Rooster	rooster	21
73	Rubber Duck	rubberduck	20
74	Sea Serpent	seaserpent	98
75	Seahorse	seahorse	17
76	Seal	seal	44
77	Shark	shark	63
78	Sheep	sheep	67
79	Shrimp	shrimp	11
80	Skunk	skunk	14
81	Slime	slime	10
82	Sloth	sloth	41
83	Snail	snail	5
84	Snake	snake	58
85	Snowman	snowman	40
86	Spider	spider	16
87	Squirrel	squirrel	25
88	Starfish	starfish	12
89	Swan	swan	47
90	Tiger Cub	tigercub	77
91	Toucan	toucan	59
92	T-Rex	trex	95
93	Triceratops	triceratops	96
94	Turkey	turkey	27
95	Turtle	turtle	35
96	Unicorn	unicorn	50
97	Whale	whale	78
98	Wolf	wolf	83
99	Worm	worm	3
100	Zebra	zebra	54
\.


--
-- Data for Name: pet_owner; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.pet_owner (username, pet_id) FROM stdin;
alia	13
alia	25
alia	78
Rifqi 	3
Rifqi 	6
Rifqi 	14
Rifqi 	23
Rifqi 	29
Rifqi 	36
Rifqi 	38
Rifqi 	49
Rifqi 	69
Rifqi 	75
Rifqi 	79
Rifqi 	80
Rifqi 	81
Rifqi 	83
Rifqi 	86
Rifqi 	88
Rifqi 	99
Test	3
Test	36
\.


--
-- Data for Name: user_avatar; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_avatar (id, image) FROM stdin;
1	female1
2	female2
3	female3
4	female4
5	female5
6	female6
7	female7
8	male1
9	male2
10	male3
11	male4
12	male5
13	male6
14	male7
\.


--
-- Data for Name: user_database; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_database (username, password, nickname, avatar, level, point, level_up_point) FROM stdin;
Satya123	Satya123*	Satya	11	2	0	\N
Chris123	Chris123*	Chris	11	3	0	\N
alia	Aliaalia1	Alia	6	3	1	\N
Rifqi 	Abcdef1!	Urip	9	17	19	\N
Test	Test123*	Test123	9	2	2	\N
\.


--
-- Data for Name: user_notes; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_notes (id, name, username, notes) FROM stdin;
1	Catatan Hari Ini	Rifqi 	\N
2	Progress	Rifqi 	Sudah Banyak
3	Malam Ini	Rifqi 	Sudah Selesai
4	Sudah Mau Selesai 	Rifqi 	Kita almost Done
5	apfapiosjdpasd	Rifqi 	2oejvi2jivp2jefc2e
6	h4fni2edio0	Rifqi 	wdcp2efoi3hcuoe3hdgpciwdjofvbweodjdecbufhiowncihvipowndigpjwjoboiuwjowevouwnvowevuoefmfehuojf4oufjewocbvurfj3oifcyiwehoin vpo2emndiev9omnerjcvwe9uvneffvu9wnvi2evc9uownvsdvjwe wcjwv9uejc9qwg0uenfi2v dnvueychdwjfv9womvnwrv9
7	b bubju	Rifqi 	kjbuboinc ou
8	wwaawa	Rifqi 	dawdaa
9	Test halo	alia	halo halo
\.


--
-- Data for Name: user_task; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_task (id, username, name, category, status, deadline, priority, note, is_counted) FROM stdin;
70	Test	Ya	Study	Done	2024-06-21	Urgent	AOAOKA	t
59	alia	Wewew	Other	Done	2024-06-18	Urgent	q09ueq	t
60	alia	Huwah	Study	Done	2024-06-18	Urgent	o9u0da	t
71	Test	SAA	Study	Done	2024-06-14	Urgent	aaa	t
67	Rifqi 	Rifqi	Study	Done	2024-06-21	Relax	ee	t
72	alia	Belajar	Study	In-progress	2024-06-11	Standard	jhcx	f
68	Rifqi 	awwa	Study	Overdue	2024-06-01	Urgent	wqq	f
46	Rifqi 	ZZZ	Study	Done	2024-07-06	Standard	Hehehe	t
50	Rifqi 	Wow	Study	Overdue	2024-06-05	Standard	Telat	f
34	Satya123	ChristopherS	Other	In-progress	2024-06-23	Urgent	...	f
48	Rifqi 	Satya	Study	Done	2024-06-29	Standard	Woww	t
49	Rifqi 	Hehe	Other	Done	2024-06-20	Relax	OKAOWK	t
61	alia	Haus	Study	Done	2024-06-29	Urgent	2131	t
53	Rifqi 	ASU KAYANG	Other	Overdue	2024-06-08	Standard	ibobou	f
51	Rifqi 	Ganteng	Other	Done	2024-06-27	Standard	q202q	t
58	alia	Alia	Study	Overdue	2024-06-04	Urgent	q213	f
69	Rifqi 	Saty019283	Study	Done		Urgent	Wawwwwww	t
74	Rifqi 	Lomapat Tinggi	Study	Completed	2024-06-18	Standard	aggegwe	f
64	Rifqi 	DDEDE	Study	Done	2024-06-28	Urgent	aaa	t
62	Rifqi 	Cape	Study	Done	2024-06-14	Standard	NANAN	t
65	Rifqi 	WEN	Study	Done	2024-06-28	Urgent	102931	t
47	Rifqi 	Wkwkwk	Study	Done	2024-06-20	Urgent	Heheh urgent	t
66	Rifqi 	Rip	Study	Done	2024-06-21	Urgent	Doe	t
63	Rifqi 	Yan	Study	Done	2024-06-20	Relax	Yan maraden	t
52	Rifqi 	Apapun Itu	Study	Done	2024-07-04	Urgent	g24fwwef	t
\.


--
-- Name: pet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.pet_id_seq', 100, true);


--
-- Name: user_avatar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_avatar_id_seq', 14, true);


--
-- Name: user_notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_notes_id_seq', 9, true);


--
-- Name: user_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.user_task_id_seq', 74, true);


--
-- Name: pet pet_name_key; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pet
    ADD CONSTRAINT pet_name_key UNIQUE (name);


--
-- Name: pet pet_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pet
    ADD CONSTRAINT pet_pkey PRIMARY KEY (id);


--
-- Name: user_avatar user_avatar_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_avatar
    ADD CONSTRAINT user_avatar_pkey PRIMARY KEY (id);


--
-- Name: user_database user_database_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_database
    ADD CONSTRAINT user_database_pkey PRIMARY KEY (username);


--
-- Name: user_task user_task_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_task
    ADD CONSTRAINT user_task_pkey PRIMARY KEY (id);


--
-- Name: pet_owner pet_owner_pet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pet_owner
    ADD CONSTRAINT pet_owner_pet_id_fkey FOREIGN KEY (pet_id) REFERENCES public.pet(id);


--
-- Name: pet_owner pet_owner_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.pet_owner
    ADD CONSTRAINT pet_owner_username_fkey FOREIGN KEY (username) REFERENCES public.user_database(username);


--
-- Name: user_database user_database_avatar_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_database
    ADD CONSTRAINT user_database_avatar_fkey FOREIGN KEY (avatar) REFERENCES public.user_avatar(id);


--
-- Name: user_task user_task_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_task
    ADD CONSTRAINT user_task_username_fkey FOREIGN KEY (username) REFERENCES public.user_database(username);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

