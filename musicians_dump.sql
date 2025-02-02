PGDMP                   	    |         	   musicians    16.2    16.2 '               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    17054 	   musicians    DATABASE        CREATE DATABASE musicians WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Croatian_Croatia.1250';
    DROP DATABASE musicians;
                postgres    false            �            1259    17203    albums    TABLE     �   CREATE TABLE public.albums (
    id integer NOT NULL,
    artist_id integer,
    album_title character varying(255),
    release_date date,
    genre_id integer,
    label_id integer
);
    DROP TABLE public.albums;
       public         heap    postgres    false            �            1259    17202    albums_id_seq    SEQUENCE     �   CREATE SEQUENCE public.albums_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.albums_id_seq;
       public          postgres    false    222                       0    0    albums_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.albums_id_seq OWNED BY public.albums.id;
          public          postgres    false    221            �            1259    17184    artists    TABLE     C  CREATE TABLE public.artists (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    dob date,
    genre_id integer,
    country_of_birth character varying(100),
    num_of_albums integer,
    label_id integer,
    num_of_grammys integer,
    albums_sold numeric(10,2)
);
    DROP TABLE public.artists;
       public         heap    postgres    false            �            1259    17183    artists_id_seq    SEQUENCE     �   CREATE SEQUENCE public.artists_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.artists_id_seq;
       public          postgres    false    220                       0    0    artists_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.artists_id_seq OWNED BY public.artists.id;
          public          postgres    false    219            �            1259    17166    genres    TABLE     _   CREATE TABLE public.genres (
    id integer NOT NULL,
    genre_name character varying(100)
);
    DROP TABLE public.genres;
       public         heap    postgres    false            �            1259    17165    genres_id_seq    SEQUENCE     �   CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.genres_id_seq;
       public          postgres    false    216                       0    0    genres_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;
          public          postgres    false    215            �            1259    17175    labels    TABLE     _   CREATE TABLE public.labels (
    id integer NOT NULL,
    label_name character varying(255)
);
    DROP TABLE public.labels;
       public         heap    postgres    false            �            1259    17174    labels_id_seq    SEQUENCE     �   CREATE SEQUENCE public.labels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.labels_id_seq;
       public          postgres    false    218                       0    0    labels_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.labels_id_seq OWNED BY public.labels.id;
          public          postgres    false    217            b           2604    17206 	   albums id    DEFAULT     f   ALTER TABLE ONLY public.albums ALTER COLUMN id SET DEFAULT nextval('public.albums_id_seq'::regclass);
 8   ALTER TABLE public.albums ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            a           2604    17187 
   artists id    DEFAULT     h   ALTER TABLE ONLY public.artists ALTER COLUMN id SET DEFAULT nextval('public.artists_id_seq'::regclass);
 9   ALTER TABLE public.artists ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            _           2604    17169 	   genres id    DEFAULT     f   ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);
 8   ALTER TABLE public.genres ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            `           2604    17178 	   labels id    DEFAULT     f   ALTER TABLE ONLY public.labels ALTER COLUMN id SET DEFAULT nextval('public.labels_id_seq'::regclass);
 8   ALTER TABLE public.labels ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            
          0    17203    albums 
   TABLE DATA           ^   COPY public.albums (id, artist_id, album_title, release_date, genre_id, label_id) FROM stdin;
    public          postgres    false    222   �*                 0    17184    artists 
   TABLE DATA           �   COPY public.artists (id, first_name, last_name, dob, genre_id, country_of_birth, num_of_albums, label_id, num_of_grammys, albums_sold) FROM stdin;
    public          postgres    false    220   �+                 0    17166    genres 
   TABLE DATA           0   COPY public.genres (id, genre_name) FROM stdin;
    public          postgres    false    216   �-                 0    17175    labels 
   TABLE DATA           0   COPY public.labels (id, label_name) FROM stdin;
    public          postgres    false    218   �-                  0    0    albums_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.albums_id_seq', 13, true);
          public          postgres    false    221                       0    0    artists_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.artists_id_seq', 10, true);
          public          postgres    false    219                       0    0    genres_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.genres_id_seq', 6, true);
          public          postgres    false    215                       0    0    labels_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.labels_id_seq', 9, true);
          public          postgres    false    217            n           2606    17208    albums albums_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.albums DROP CONSTRAINT albums_pkey;
       public            postgres    false    222            l           2606    17191    artists artists_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.artists DROP CONSTRAINT artists_pkey;
       public            postgres    false    220            d           2606    17173    genres genres_genre_name_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_genre_name_key UNIQUE (genre_name);
 F   ALTER TABLE ONLY public.genres DROP CONSTRAINT genres_genre_name_key;
       public            postgres    false    216            f           2606    17171    genres genres_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.genres DROP CONSTRAINT genres_pkey;
       public            postgres    false    216            h           2606    17182    labels labels_label_name_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_label_name_key UNIQUE (label_name);
 F   ALTER TABLE ONLY public.labels DROP CONSTRAINT labels_label_name_key;
       public            postgres    false    218            j           2606    17180    labels labels_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.labels DROP CONSTRAINT labels_pkey;
       public            postgres    false    218            q           2606    17209    albums albums_artist_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_artist_id_fkey FOREIGN KEY (artist_id) REFERENCES public.artists(id);
 F   ALTER TABLE ONLY public.albums DROP CONSTRAINT albums_artist_id_fkey;
       public          postgres    false    4716    222    220            r           2606    17214    albums albums_genre_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(id);
 E   ALTER TABLE ONLY public.albums DROP CONSTRAINT albums_genre_id_fkey;
       public          postgres    false    4710    222    216            s           2606    17219    albums albums_label_id_fkey    FK CONSTRAINT     |   ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.labels(id);
 E   ALTER TABLE ONLY public.albums DROP CONSTRAINT albums_label_id_fkey;
       public          postgres    false    222    4714    218            o           2606    17192    artists artists_genre_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(id);
 G   ALTER TABLE ONLY public.artists DROP CONSTRAINT artists_genre_id_fkey;
       public          postgres    false    4710    216    220            p           2606    17197    artists artists_label_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.artists
    ADD CONSTRAINT artists_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.labels(id);
 G   ALTER TABLE ONLY public.artists DROP CONSTRAINT artists_label_id_fkey;
       public          postgres    false    220    218    4714            
     x�5��j�0���S�<,�q�c��:V�B/�x�Y��l�o?9�@��	��4�Ҩ��ZZ+�WZ�1�S�](�*mJ�@��'�"��m��Y��.��~�Y)Ԋ�,Ҳ<���l�V܀����>���=�mL��AZ�a����[�F8��;_O��b�][f�@\z��/�(]m!�@���ͧ��ާ� ����4����?BsY�o8��9�����F�e+���p�C�E�s���=n�qp'ޞ��oO�         �  x�-��n� ���O���L��v��&n�7{3N�kd
v�O������sfа��#�hI܍��h��m�J^���
�tڨ�R��-�_H<ډ�#x���hg�	�R�R`ୃ��܀Q+��+..D�wv
��}��Jm�ΓeZ��X	*�	c\į���ya?��B*#��r&��rgꬄs�/�v@�~����Ό4�30�x,��j�W�8����$����YVx���>�3&�J�\�fK[r���*QC7�h#�?��ĉz�8��~瘮�56���eMUJ�M�����=q��~��<�S�M3OL�U.��n�5Wf{�N�2 ��D��2N+U6�2?�V�7�.7C��yN���s�22��hi*#-3�
��eY�W&��         @   x�3�,�/�2�Rs�2��I,��S ��p�'g+$�(���p������\f��.�\1z\\\ Go         �   x�E��
�0���S��ףUш�C/^�$h�f�&����z�of��g�5ΰ؈c8kyt̖Sm�J���
״U��������)l褓�3؇�$n�o�t�t�p�/G[������p��\�pk���f	�wWPj	N(����?�A,     