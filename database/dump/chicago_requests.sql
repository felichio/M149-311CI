--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0 (Ubuntu 13.0-1.pgdg18.04+1)
-- Dumped by pg_dump version 13.0 (Ubuntu 13.0-1.pgdg18.04+1)

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
-- Name: avg_completion_time_per_type4(date, date); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.avg_completion_time_per_type4(start_date date, end_date date) RETURNS TABLE(date text, type character varying, avg_days numeric)
    LANGUAGE plpgsql
    AS $$
begin
	return query
		select to_char(r.creation_date, 'DD/MM/YYYY'), r.type_of_service, round(avg(r.completion_date - r.creation_date), 2) from request r where r.creation_date >= start_date and r.creation_date <= end_date and r.completion_date is not null group by(r.creation_date, r.type_of_service) order by (r.creation_date) desc;
end;
$$;


ALTER FUNCTION public.avg_completion_time_per_type4(start_date date, end_date date) OWNER TO felix;

--
-- Name: clean_data(); Type: PROCEDURE; Schema: public; Owner: felix
--

CREATE PROCEDURE public.clean_data()
    LANGUAGE sql
    AS $$
delete from request r;
delete from locationinfo; 
delete from municipalityinfo; 
delete from historical_municipalityinfo; 
delete from abandoned_vehicle; 
delete from alley_lights_out; 
delete from garbage_carts;
delete from graffiti_removal;
delete from tree_debris;
delete from tree_trims;
delete from pot_holes;
delete from sanitation_code;
delete from street_lights_all_out;
delete from street_lights_one_out;
delete from rodent_baiting;

alter sequence request_request_id_seq restart with 1;
alter sequence locationinfo_location_id_seq restart with 1;
alter sequence municipalityinfo_municipality_id_seq restart with 1;
alter sequence historical_municipalityinfo_historical_municipality_id_seq restart with 1;

alter sequence abandoned_vehicle_incident_id_seq restart with 1;
alter sequence alley_lights_out_incident_id_seq restart with 1;
alter sequence garbage_carts_incident_id_seq restart with 1;
alter sequence graffiti_removal_incident_id_seq restart with 1;
alter sequence tree_debris_incident_id_seq restart with 1;
alter sequence tree_trims_incident_id_seq restart with 1;
alter sequence pot_holes_incident_id_seq restart with 1;
alter sequence sanitation_code_incident_id_seq restart with 1;
alter sequence street_lights_all_out_incident_id_seq restart with 1;
alter sequence street_lights_one_out_incident_id_seq restart with 1;
alter sequence rodent_baiting_incident_id_seq restart with 1;

$$;


ALTER PROCEDURE public.clean_data() OWNER TO felix;

--
-- Name: get_total_requests_per_date_2(character varying, date, date); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.get_total_requests_per_date_2(character varying, start_date date, end_date date) RETURNS TABLE(date text, type_of_service character varying, num_of_requests bigint)
    LANGUAGE plpgsql
    AS $_$
begin
	return query
		select to_char(r.creation_date, 'DD/MM/YYYY'), r.type_of_service, count(*) num_of_requests from request r
		where r.type_of_service = $1 and r.creation_date >= start_date and r.creation_date <= end_date
		group by (r.creation_date, r.type_of_service)
		order by (r.creation_date) desc;
end;
$_$;


ALTER FUNCTION public.get_total_requests_per_date_2(character varying, start_date date, end_date date) OWNER TO felix;

--
-- Name: get_total_requests_per_type_1(date, date); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.get_total_requests_per_type_1(start_date date, end_date date) RETURNS TABLE(type_of_service character varying, num_of_requests bigint)
    LANGUAGE plpgsql
    AS $$
begin
	return query
		select r.type_of_service, count(*) as number_of_requests from request r where
		r.creation_date >= start_date and r.creation_date <= end_date
		group by r.type_of_service order by (number_of_requests) desc;
end;
$$;


ALTER FUNCTION public.get_total_requests_per_type_1(start_date date, end_date date) OWNER TO felix;

--
-- Name: license_plate_more_than_once7(); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.license_plate_more_than_once7() RETURNS TABLE(license_plates character varying, num_of_times bigint)
    LANGUAGE plpgsql
    AS $$
declare 
	color varchar;
begin
	 	return query
		select license_plate, count(*) times from abandoned_vehicle where license_plate is not null group by (license_plate) having count(*) > 1;
		
end;
$$;


ALTER FUNCTION public.license_plate_more_than_once7() OWNER TO felix;

--
-- Name: most_common_service_per_zip3(date); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.most_common_service_per_zip3(start_date date) RETURNS TABLE(zip character varying, type character varying, num_of_requests bigint)
    LANGUAGE plpgsql
    AS $$
begin
	return query with per_zip_type_rank as 
	(with per_zip_type_counts as 
	 (select l.zip_code, r.type_of_service, count(*) counts from request r, locationinfo l where r.location_id = l.location_id and r.creation_date = start_date group by (l.zip_code, r.type_of_service)
	 ) select *, dense_rank() over(partition by zip_code order by counts desc) type_per_zip_rank from per_zip_type_counts
	)
	 	select zip_code, type_of_service, counts from per_zip_type_rank where type_per_zip_rank < 2;
end;
$$;


ALTER FUNCTION public.most_common_service_per_zip3(start_date date) OWNER TO felix;

--
-- Name: most_common_type_in_box5(date, numeric, numeric, numeric, numeric); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.most_common_type_in_box5(start_date date, topl_lat numeric, topl_lon numeric, bottomr_lat numeric, bottomr_lon numeric) RETURNS TABLE(type character varying, number_of_requests bigint)
    LANGUAGE plpgsql
    AS $$
begin
	return query
	with rank_per_type as 
	(
		with req_per_type as
			(select r.type_of_service, count(*) num_of_requests from request r, locationinfo l where r.location_id = l.location_id and r.creation_date = start_date and 
			 l.latitude >= bottomr_lat and l.latitude <= topl_lat and l.longitude >= topl_lon and l.longitude <= bottomr_lon
			 group by (r.type_of_service)) 
				select *, dense_rank() over(order by num_of_requests desc) as ranking from req_per_type
	)
	
	select type_of_service, num_of_requests from rank_per_type where ranking < 2;
end;
$$;


ALTER FUNCTION public.most_common_type_in_box5(start_date date, topl_lat numeric, topl_lon numeric, bottomr_lat numeric, bottomr_lon numeric) OWNER TO felix;

--
-- Name: police_districts_with_pot_rodent12(date); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.police_districts_with_pot_rodent12(start_date date) RETURNS TABLE(police_dist character varying)
    LANGUAGE plpgsql
    AS $$
begin
	return query
		(select m.police_district from request r, pot_holes p, municipalityinfo m where r.incident_id = p.incident_id and
		r.type_of_service = p.type_of_service and r.municipality_id = m.municipality_id and r.creation_date = start_date and p.number_of_potholes_filled_on_block > 1)
		INTERSECT
		(select m.police_district from request r, rodent_baiting b, municipalityinfo m where r.incident_id = b.incident_id and
		r.type_of_service = b.type_of_service and r.municipality_id = m.municipality_id and r.creation_date = start_date and b.number_of_premises_baited > 1);
end;
$$;


ALTER FUNCTION public.police_districts_with_pot_rodent12(start_date date) OWNER TO felix;

--
-- Name: premises_baited9(integer); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.premises_baited9(num integer) RETURNS TABLE(request_id bigint, num_baited integer)
    LANGUAGE plpgsql
    AS $$
begin
	 
	return query
		select r.request_id, b.number_of_premises_baited from request r, rodent_baiting b where r.incident_id = b.incident_id and
		r.type_of_service = b.type_of_service and b.number_of_premises_baited < num;
		
end;
$$;


ALTER FUNCTION public.premises_baited9(num integer) OWNER TO felix;

--
-- Name: premises_garbage10(integer); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.premises_garbage10(num integer) RETURNS TABLE(request_id bigint, num_baited integer)
    LANGUAGE plpgsql
    AS $$
begin
	 
	return query
		select r.request_id, b.number_of_premises_with_garbage from request r, rodent_baiting b where r.incident_id = b.incident_id and
		r.type_of_service = b.type_of_service and b.number_of_premises_with_garbage < num;
		
end;
$$;


ALTER FUNCTION public.premises_garbage10(num integer) OWNER TO felix;

--
-- Name: premises_rats11(integer); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.premises_rats11(num integer) RETURNS TABLE(request_id bigint, num_baited integer)
    LANGUAGE plpgsql
    AS $$
begin
	 
	return query
		select r.request_id, b.number_of_premises_with_rats from request r, rodent_baiting b where r.incident_id = b.incident_id and
		r.type_of_service = b.type_of_service and b.number_of_premises_with_rats < num;
		
end;
$$;


ALTER FUNCTION public.premises_rats11(num integer) OWNER TO felix;

--
-- Name: second_common_color8(); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.second_common_color8() RETURNS TABLE(color character varying, num_of_times bigint)
    LANGUAGE plpgsql
    AS $$
declare 
	color varchar;
begin
	 	return query
		with per_color as (
			select vehicle_color, count(*) times from abandoned_vehicle group by (vehicle_color)
		), per_color_rank as (
			select *, dense_rank() over(order by times desc) ranking from per_color
		) select vehicle_color, times from per_color_rank where ranking = 2;
		
end;
$$;


ALTER FUNCTION public.second_common_color8() OWNER TO felix;

--
-- Name: test(); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.test() RETURNS refcursor
    LANGUAGE plpgsql
    AS $$
declare
cur cursor for select request_id from request r, locationinfo l;

begin
	open cur;
	return cur;
end;
$$;


ALTER FUNCTION public.test() OWNER TO felix;

--
-- Name: top5ssa6(date, date); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.top5ssa6(start_date date, end_date date) RETURNS TABLE(date text, ssa character varying, number_of_requests bigint, ssa_ranking bigint)
    LANGUAGE plpgsql
    AS $$
begin
	return query
	with per_date_rank as (
		with per_date_num as (
			with joined_data as (
				(select r.creation_date, a.ssa from request r, abandoned_vehicle a
				where r.incident_id = a.incident_id and r.type_of_service = a.type_of_service and r.creation_date >= start_date and r.creation_date <= end_date and a.ssa is not null)
				UNION ALL
				(select r.creation_date, g.ssa from request r, garbage_carts g
				where r.incident_id = g.incident_id and r.type_of_service = g.type_of_service and r.creation_date >= start_date and r.creation_date <= end_date and g.ssa is not null)
				UNION ALL
				(select r.creation_date, g.ssa from request r, graffiti_removal g
				where r.incident_id = g.incident_id and r.type_of_service = g.type_of_service and r.creation_date >= start_date and r.creation_date <= end_date and g.ssa is not null)
				UNION ALL
				(select r.creation_date, p.ssa from request r, pot_holes p
				where r.incident_id = p.incident_id and r.type_of_service = p.type_of_service and r.creation_date >= start_date and r.creation_date <= end_date and p.ssa is not null)
			)
			select *, count(*) as number_of_requests from joined_data
				group by (joined_data.creation_date, joined_data.ssa)
				
		)
		select *, rank() over(partition by per_date_num.creation_date order by per_date_num.number_of_requests desc) ranking from per_date_num order by per_date_num.creation_date desc, ranking asc
	)
	
	select to_char(creation_date, 'DD/MM/YYYY'), per_date_rank.ssa, per_date_rank.number_of_requests, ranking from per_date_rank where ranking < 6;
		
	
	
end;
$$;


ALTER FUNCTION public.top5ssa6(start_date date, end_date date) OWNER TO felix;

--
-- Name: top5ssa6(character varying, date, date); Type: FUNCTION; Schema: public; Owner: felix
--

CREATE FUNCTION public.top5ssa6(service character varying, start_date date, end_date date) RETURNS TABLE(date date, ssa character varying, number_of_requests bigint, ranks bigint)
    LANGUAGE plpgsql
    AS $_$
declare
	tablename varchar(50) := '';
begin
	if service = 'Abandoned Vehicle Complaint' then
		tablename := 'abandoned_vehicle';
	elsif service = 'Garbage Cart Black Maintenance/Replacement' then
		tablename := 'garbage_carts';
	elsif service = 'Graffiti Removal' then
		tablename := 'graffiti_removal';
	elsif service = 'Pothole in Street' then
		tablename := 'pot_holes';
	end if;

	return query
		execute 'with per_date_rank as (
		with per_date_num as (
			select r.creation_date, g.ssa, count(*) as number_of_requests from request r, ' 
			|| tablename
			|| ' g where r.incident_id = g.incident_id and r.type_of_service = g.type_of_service and r.creation_date >= $2 and r.creation_date <= $3 and g.ssa is not null and r.type_of_service = $1
			group by (r.creation_date, g.ssa)
		)
		select *, dense_rank() over(partition by per_date_num.creation_date order by per_date_num.number_of_requests desc) ranking from per_date_num
	)
	
	select * from per_date_rank where ranking < 6 order by (per_date_rank.creation_date) desc, ranking asc'
	using service, start_date, end_date;
	
	
	
		
	
	
end;
$_$;


ALTER FUNCTION public.top5ssa6(service character varying, start_date date, end_date date) OWNER TO felix;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: abandoned_vehicle; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.abandoned_vehicle (
    license_plate character varying(30),
    vehicle_model character varying(30),
    vehicle_color character varying(30),
    current_activity character varying(50),
    most_recent_action character varying(70),
    days_as_parked integer,
    ssa character varying(2),
    type_of_service character varying(30) NOT NULL,
    incident_id bigint NOT NULL
);


ALTER TABLE public.abandoned_vehicle OWNER TO felix;

--
-- Name: abandoned_vehicle_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.abandoned_vehicle_incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.abandoned_vehicle_incident_id_seq OWNER TO felix;

--
-- Name: abandoned_vehicle_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.abandoned_vehicle_incident_id_seq OWNED BY public.abandoned_vehicle.incident_id;


--
-- Name: alley_lights_out; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.alley_lights_out (
    type_of_service character varying(30) NOT NULL,
    incident_id bigint NOT NULL
);


ALTER TABLE public.alley_lights_out OWNER TO felix;

--
-- Name: alley_lights_out_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.alley_lights_out_incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alley_lights_out_incident_id_seq OWNER TO felix;

--
-- Name: alley_lights_out_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.alley_lights_out_incident_id_seq OWNED BY public.alley_lights_out.incident_id;


--
-- Name: garbage_carts; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.garbage_carts (
    number_of_black_carts_delivered bigint,
    current_activity character varying(50),
    most_recent_activity character varying(70),
    ssa character varying(2),
    type_of_service character varying(50) NOT NULL,
    incident_id bigint NOT NULL
);


ALTER TABLE public.garbage_carts OWNER TO felix;

--
-- Name: garbage_carts_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.garbage_carts_incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.garbage_carts_incident_id_seq OWNER TO felix;

--
-- Name: garbage_carts_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.garbage_carts_incident_id_seq OWNED BY public.garbage_carts.incident_id;


--
-- Name: graffiti_removal; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.graffiti_removal (
    surface_is_the_graffiti_on character varying(40),
    where_is_the_graffiti_located character varying(40),
    ssa character varying(2),
    type_of_service character varying(50) NOT NULL,
    incident_id bigint NOT NULL
);


ALTER TABLE public.graffiti_removal OWNER TO felix;

--
-- Name: graffiti_removal_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.graffiti_removal_incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.graffiti_removal_incident_id_seq OWNER TO felix;

--
-- Name: graffiti_removal_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.graffiti_removal_incident_id_seq OWNED BY public.graffiti_removal.incident_id;


--
-- Name: historical_municipalityinfo; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.historical_municipalityinfo (
    historical_municipality_id bigint NOT NULL,
    historical_wards character varying(2),
    zip_codes character varying(5),
    community_areas character varying(2),
    census_tracts character varying(3),
    wards character varying(2)
);


ALTER TABLE public.historical_municipalityinfo OWNER TO felix;

--
-- Name: historical_municipalityinfo_historical_municipality_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.historical_municipalityinfo_historical_municipality_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.historical_municipalityinfo_historical_municipality_id_seq OWNER TO felix;

--
-- Name: historical_municipalityinfo_historical_municipality_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.historical_municipalityinfo_historical_municipality_id_seq OWNED BY public.historical_municipalityinfo.historical_municipality_id;


--
-- Name: locationinfo; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.locationinfo (
    location_id bigint NOT NULL,
    street_address character varying(60),
    zip_code character varying(5),
    xcoord numeric,
    ycoord numeric,
    latitude numeric,
    longitude numeric
);


ALTER TABLE public.locationinfo OWNER TO felix;

--
-- Name: locationinfo_location_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.locationinfo_location_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locationinfo_location_id_seq OWNER TO felix;

--
-- Name: locationinfo_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.locationinfo_location_id_seq OWNED BY public.locationinfo.location_id;


--
-- Name: log; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.log (
    user_id bigint NOT NULL,
    logtext text,
    datetime timestamp without time zone
);


ALTER TABLE public.log OWNER TO felix;

--
-- Name: municipalityinfo; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.municipalityinfo (
    municipality_id bigint NOT NULL,
    ward character varying(2),
    police_district character varying(2),
    community_area character varying(2)
);


ALTER TABLE public.municipalityinfo OWNER TO felix;

--
-- Name: municipalityinfo_municipality_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.municipalityinfo_municipality_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.municipalityinfo_municipality_id_seq OWNER TO felix;

--
-- Name: municipalityinfo_municipality_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.municipalityinfo_municipality_id_seq OWNED BY public.municipalityinfo.municipality_id;


--
-- Name: pot_holes; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.pot_holes (
    current_activity character varying(50),
    most_recent_activity character varying(100),
    number_of_potholes_filled_on_block bigint,
    ssa character varying(2),
    type_of_service character varying(50) NOT NULL,
    incident_id bigint NOT NULL
);


ALTER TABLE public.pot_holes OWNER TO felix;

--
-- Name: pot_holes_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.pot_holes_incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pot_holes_incident_id_seq OWNER TO felix;

--
-- Name: pot_holes_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.pot_holes_incident_id_seq OWNED BY public.pot_holes.incident_id;


--
-- Name: request; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.request (
    request_id bigint NOT NULL,
    creation_date date,
    status character varying(20),
    completion_date date,
    service_request_number character varying(15),
    type_of_service character varying(50),
    incident_id bigint,
    location_id bigint,
    municipality_id bigint,
    historical_municipality_id bigint
);


ALTER TABLE public.request OWNER TO felix;

--
-- Name: request_request_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.request_request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.request_request_id_seq OWNER TO felix;

--
-- Name: request_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.request_request_id_seq OWNED BY public.request.request_id;


--
-- Name: rodent_baiting; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.rodent_baiting (
    number_of_premises_baited integer,
    number_of_premises_with_garbage integer,
    number_of_premises_with_rats integer,
    current_activity character varying(50),
    most_recent_activity character varying(70),
    type_of_service character varying(50) NOT NULL,
    incident_id bigint NOT NULL
);


ALTER TABLE public.rodent_baiting OWNER TO felix;

--
-- Name: rodent_baiting_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.rodent_baiting_incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rodent_baiting_incident_id_seq OWNER TO felix;

--
-- Name: rodent_baiting_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.rodent_baiting_incident_id_seq OWNED BY public.rodent_baiting.incident_id;


--
-- Name: sanitation_code; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.sanitation_code (
    nature_of_code_violations character varying(100),
    type_of_service character varying(50) NOT NULL,
    incident_id bigint NOT NULL
);


ALTER TABLE public.sanitation_code OWNER TO felix;

--
-- Name: sanitation_code_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.sanitation_code_incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sanitation_code_incident_id_seq OWNER TO felix;

--
-- Name: sanitation_code_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.sanitation_code_incident_id_seq OWNED BY public.sanitation_code.incident_id;


--
-- Name: street_lights_all_out; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.street_lights_all_out (
    type_of_service character varying(50) NOT NULL,
    incident_id bigint NOT NULL
);


ALTER TABLE public.street_lights_all_out OWNER TO felix;

--
-- Name: street_lights_all_out_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.street_lights_all_out_incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.street_lights_all_out_incident_id_seq OWNER TO felix;

--
-- Name: street_lights_all_out_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.street_lights_all_out_incident_id_seq OWNED BY public.street_lights_all_out.incident_id;


--
-- Name: street_lights_one_out; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.street_lights_one_out (
    type_of_service character varying(50) NOT NULL,
    incident_id bigint NOT NULL
);


ALTER TABLE public.street_lights_one_out OWNER TO felix;

--
-- Name: street_lights_one_out_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.street_lights_one_out_incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.street_lights_one_out_incident_id_seq OWNER TO felix;

--
-- Name: street_lights_one_out_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.street_lights_one_out_incident_id_seq OWNED BY public.street_lights_one_out.incident_id;


--
-- Name: tree_debris; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.tree_debris (
    where_is_the_debris_located character varying(60),
    current_activity character varying(50),
    most_recent_activity character varying(70),
    type_of_service character varying(50) NOT NULL,
    incident_id bigint NOT NULL
);


ALTER TABLE public.tree_debris OWNER TO felix;

--
-- Name: tree_debris_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.tree_debris_incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tree_debris_incident_id_seq OWNER TO felix;

--
-- Name: tree_debris_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.tree_debris_incident_id_seq OWNED BY public.tree_debris.incident_id;


--
-- Name: tree_trims; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.tree_trims (
    location_of_trees character varying(50),
    type_of_service character varying(50) NOT NULL,
    incident_id bigint NOT NULL
);


ALTER TABLE public.tree_trims OWNER TO felix;

--
-- Name: tree_trims_incident_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.tree_trims_incident_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tree_trims_incident_id_seq OWNER TO felix;

--
-- Name: tree_trims_incident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.tree_trims_incident_id_seq OWNED BY public.tree_trims.incident_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: felix
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(70) NOT NULL
);


ALTER TABLE public.users OWNER TO felix;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: felix
--

CREATE SEQUENCE public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO felix;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: felix
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: abandoned_vehicle incident_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.abandoned_vehicle ALTER COLUMN incident_id SET DEFAULT nextval('public.abandoned_vehicle_incident_id_seq'::regclass);


--
-- Name: alley_lights_out incident_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.alley_lights_out ALTER COLUMN incident_id SET DEFAULT nextval('public.alley_lights_out_incident_id_seq'::regclass);


--
-- Name: garbage_carts incident_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.garbage_carts ALTER COLUMN incident_id SET DEFAULT nextval('public.garbage_carts_incident_id_seq'::regclass);


--
-- Name: graffiti_removal incident_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.graffiti_removal ALTER COLUMN incident_id SET DEFAULT nextval('public.graffiti_removal_incident_id_seq'::regclass);


--
-- Name: historical_municipalityinfo historical_municipality_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.historical_municipalityinfo ALTER COLUMN historical_municipality_id SET DEFAULT nextval('public.historical_municipalityinfo_historical_municipality_id_seq'::regclass);


--
-- Name: locationinfo location_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.locationinfo ALTER COLUMN location_id SET DEFAULT nextval('public.locationinfo_location_id_seq'::regclass);


--
-- Name: municipalityinfo municipality_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.municipalityinfo ALTER COLUMN municipality_id SET DEFAULT nextval('public.municipalityinfo_municipality_id_seq'::regclass);


--
-- Name: pot_holes incident_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.pot_holes ALTER COLUMN incident_id SET DEFAULT nextval('public.pot_holes_incident_id_seq'::regclass);


--
-- Name: request request_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.request ALTER COLUMN request_id SET DEFAULT nextval('public.request_request_id_seq'::regclass);


--
-- Name: rodent_baiting incident_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.rodent_baiting ALTER COLUMN incident_id SET DEFAULT nextval('public.rodent_baiting_incident_id_seq'::regclass);


--
-- Name: sanitation_code incident_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.sanitation_code ALTER COLUMN incident_id SET DEFAULT nextval('public.sanitation_code_incident_id_seq'::regclass);


--
-- Name: street_lights_all_out incident_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.street_lights_all_out ALTER COLUMN incident_id SET DEFAULT nextval('public.street_lights_all_out_incident_id_seq'::regclass);


--
-- Name: street_lights_one_out incident_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.street_lights_one_out ALTER COLUMN incident_id SET DEFAULT nextval('public.street_lights_one_out_incident_id_seq'::regclass);


--
-- Name: tree_debris incident_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.tree_debris ALTER COLUMN incident_id SET DEFAULT nextval('public.tree_debris_incident_id_seq'::regclass);


--
-- Name: tree_trims incident_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.tree_trims ALTER COLUMN incident_id SET DEFAULT nextval('public.tree_trims_incident_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: abandoned_vehicle abandoned_vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.abandoned_vehicle
    ADD CONSTRAINT abandoned_vehicle_pkey PRIMARY KEY (type_of_service, incident_id);


--
-- Name: alley_lights_out alley_lights_out_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.alley_lights_out
    ADD CONSTRAINT alley_lights_out_pkey PRIMARY KEY (type_of_service, incident_id);


--
-- Name: garbage_carts garbage_carts_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.garbage_carts
    ADD CONSTRAINT garbage_carts_pkey PRIMARY KEY (type_of_service, incident_id);


--
-- Name: graffiti_removal graffiti_removal_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.graffiti_removal
    ADD CONSTRAINT graffiti_removal_pkey PRIMARY KEY (type_of_service, incident_id);


--
-- Name: historical_municipalityinfo historical_municipalityinfo_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.historical_municipalityinfo
    ADD CONSTRAINT historical_municipalityinfo_pkey PRIMARY KEY (historical_municipality_id);


--
-- Name: locationinfo locationinfo_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.locationinfo
    ADD CONSTRAINT locationinfo_pkey PRIMARY KEY (location_id);


--
-- Name: municipalityinfo municipalityinfo_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.municipalityinfo
    ADD CONSTRAINT municipalityinfo_pkey PRIMARY KEY (municipality_id);


--
-- Name: pot_holes pot_holes_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.pot_holes
    ADD CONSTRAINT pot_holes_pkey PRIMARY KEY (type_of_service, incident_id);


--
-- Name: request request_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_pkey PRIMARY KEY (request_id);


--
-- Name: rodent_baiting rodent_baiting_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.rodent_baiting
    ADD CONSTRAINT rodent_baiting_pkey PRIMARY KEY (type_of_service, incident_id);


--
-- Name: sanitation_code sanitation_code_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.sanitation_code
    ADD CONSTRAINT sanitation_code_pkey PRIMARY KEY (type_of_service, incident_id);


--
-- Name: street_lights_all_out street_lights_all_out_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.street_lights_all_out
    ADD CONSTRAINT street_lights_all_out_pkey PRIMARY KEY (type_of_service, incident_id);


--
-- Name: street_lights_one_out street_lights_one_out_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.street_lights_one_out
    ADD CONSTRAINT street_lights_one_out_pkey PRIMARY KEY (type_of_service, incident_id);


--
-- Name: tree_debris tree_debris_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.tree_debris
    ADD CONSTRAINT tree_debris_pkey PRIMARY KEY (type_of_service, incident_id);


--
-- Name: tree_trims tree_trims_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.tree_trims
    ADD CONSTRAINT tree_trims_pkey PRIMARY KEY (type_of_service, incident_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: historical_municipality_idIndex; Type: INDEX; Schema: public; Owner: felix
--

CREATE INDEX "historical_municipality_idIndex" ON public.request USING btree (historical_municipality_id);


--
-- Name: idx_historical_municipalityinfo; Type: INDEX; Schema: public; Owner: felix
--

CREATE UNIQUE INDEX idx_historical_municipalityinfo ON public.historical_municipalityinfo USING btree (COALESCE(historical_wards, ''::character varying), COALESCE(zip_codes, ''::character varying), COALESCE(community_areas, ''::character varying), COALESCE(census_tracts, ''::character varying), COALESCE(wards, ''::character varying));


--
-- Name: idx_locationinfo; Type: INDEX; Schema: public; Owner: felix
--

CREATE UNIQUE INDEX idx_locationinfo ON public.locationinfo USING btree (COALESCE(latitude, (1000)::numeric), COALESCE(longitude, (1000)::numeric));


--
-- Name: idx_municipalityinfo; Type: INDEX; Schema: public; Owner: felix
--

CREATE UNIQUE INDEX idx_municipalityinfo ON public.municipalityinfo USING btree (COALESCE(ward, ''::character varying), COALESCE(police_district, ''::character varying), COALESCE(community_area, ''::character varying));


--
-- Name: location_idIndex; Type: INDEX; Schema: public; Owner: felix
--

CREATE INDEX "location_idIndex" ON public.request USING btree (location_id);


--
-- Name: municipality_idIndex; Type: INDEX; Schema: public; Owner: felix
--

CREATE INDEX "municipality_idIndex" ON public.request USING btree (municipality_id);


--
-- Name: request historical_municipalityinfo; Type: FK CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT historical_municipalityinfo FOREIGN KEY (historical_municipality_id) REFERENCES public.historical_municipalityinfo(historical_municipality_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: request locationinfo; Type: FK CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT locationinfo FOREIGN KEY (location_id) REFERENCES public.locationinfo(location_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: request municipalityinfo; Type: FK CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT municipalityinfo FOREIGN KEY (municipality_id) REFERENCES public.municipalityinfo(municipality_id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: log user; Type: FK CONSTRAINT; Schema: public; Owner: felix
--

ALTER TABLE ONLY public.log
    ADD CONSTRAINT "user" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- PostgreSQL database dump complete
--

