import mapbox from "mapbox-gl";
import { mapbox_key } from "./consts.js";

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = mapbox_key;

const key = {};

export { mapbox, key };
