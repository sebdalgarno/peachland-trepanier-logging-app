
logging:
	tippecanoe -zg -o data/logged.mbtiles --coalesce-densest-as-needed data/logging.geojson --force	

wsheds:
	tippecanoe -zg -o data/wsheds.mbtiles --coalesce-densest-as-needed data/wsheds.geojson --force	

wsheds_line:
	tippecanoe -zg -o data/wsheds_line.mbtiles --coalesce-densest-as-needed data/wsheds_line.geojson --force
		
parks:
	tippecanoe -zg -o data/parks.mbtiles --coalesce-densest-as-needed data/parks.geojson --force 

parks_line:
	tippecanoe -zg -o data/parks_line.mbtiles --coalesce-densest-as-needed data/parks_line.geojson --force
	

maps:
	make logging
	make wsheds
	make parks
	make wsheds_line
	make parks_line
