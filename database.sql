PGDMP  &                    |            flask_react_shipments    16.2    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16744    flask_react_shipments    DATABASE     �   CREATE DATABASE flask_react_shipments WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
 %   DROP DATABASE flask_react_shipments;
                postgres    false            �            1259    16746    files    TABLE     K   CREATE TABLE public.files (
    id integer NOT NULL,
    file_path text
);
    DROP TABLE public.files;
       public         heap    postgres    false            �           0    0    TABLE files    ACL     -   GRANT ALL ON TABLE public.files TO arabinda;
          public          postgres    false    215            �            1259    16751    files_id_seq    SEQUENCE     �   CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.files_id_seq;
       public          postgres    false    215            �           0    0    files_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;
          public          postgres    false    216            �           0    0    SEQUENCE files_id_seq    ACL     7   GRANT ALL ON SEQUENCE public.files_id_seq TO arabinda;
          public          postgres    false    216            �            1259    16752 	   shipments    TABLE     $  CREATE TABLE public.shipments (
    id integer NOT NULL,
    region text,
    country text,
    item_type text,
    fiscal_year integer,
    sales_channel character varying(100),
    order_priority character varying(10),
    order_date date,
    order_id character varying(50),
    ship_date date,
    units_sold integer,
    unit_price double precision,
    unit_cost double precision,
    total_revenue double precision,
    total_cost double precision,
    total_profit double precision,
    email character varying(255),
    file_id integer
);
    DROP TABLE public.shipments;
       public         heap    postgres    false            �           0    0    TABLE shipments    ACL     1   GRANT ALL ON TABLE public.shipments TO arabinda;
          public          postgres    false    217            �            1259    16757    shipments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.shipments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.shipments_id_seq;
       public          postgres    false    217            �           0    0    shipments_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.shipments_id_seq OWNED BY public.shipments.id;
          public          postgres    false    218            �           0    0    SEQUENCE shipments_id_seq    ACL     ;   GRANT ALL ON SEQUENCE public.shipments_id_seq TO arabinda;
          public          postgres    false    218                       2604    16758    files id    DEFAULT     d   ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);
 7   ALTER TABLE public.files ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215                        2604    16759    shipments id    DEFAULT     l   ALTER TABLE ONLY public.shipments ALTER COLUMN id SET DEFAULT nextval('public.shipments_id_seq'::regclass);
 ;   ALTER TABLE public.shipments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �          0    16746    files 
   TABLE DATA           .   COPY public.files (id, file_path) FROM stdin;
    public          postgres    false    215   �       �          0    16752 	   shipments 
   TABLE DATA           �   COPY public.shipments (id, region, country, item_type, fiscal_year, sales_channel, order_priority, order_date, order_id, ship_date, units_sold, unit_price, unit_cost, total_revenue, total_cost, total_profit, email, file_id) FROM stdin;
    public          postgres    false    217   �       �           0    0    files_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.files_id_seq', 22, true);
          public          postgres    false    216            �           0    0    shipments_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.shipments_id_seq', 1003, true);
          public          postgres    false    218            "           2606    16761    files files_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            postgres    false    215            $           2606    16763    shipments shipments_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.shipments
    ADD CONSTRAINT shipments_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.shipments DROP CONSTRAINT shipments_pkey;
       public            postgres    false    217            �      x������ � �      �      x������ � �     