
tippecanoe:
	tippecanoe -zg -o data/logged.mbtiles --coalesce-densest-as-needed data/logging.geojson --force	

map_factory:
	make tippecanoe
