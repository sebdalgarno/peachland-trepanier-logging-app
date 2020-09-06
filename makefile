mapshape_dissolve:
	mapshaper data/logging.geojson \
		-dissolve2 fields=year \
		-o data/logged_dissolve.json

mapshape_simplify:
	mapshaper data/logged_dissolve.json \
		-simplify 1% keep-shapes \
		-o data/logged_simplify.json

tippecanoe_clean:
	tippecanoe -zg -o data/logged_clean.mbtiles --coalesce-densest-as-needed data/logged_clean.json --force

tippecanoe_multilayer:
	tippecanoe -z9 -o data/logged-z9.mbtiles --coalesce-densest-as-needed data/logged_simplify.json --force	
	tippecanoe -zg -Z10 -o data/logged-Z10.mbtiles --coalesce-densest-as-needed data/logged_dissolve.json --force
	tile-join -o data/logged_multilayer.mbtiles data/logged-z9.mbtiles  data/logged-Z10.mbtiles --force

map_factory:
	make mapshape_dissolve
	make mapshape_simplify
	make tippecanoe_multilayer