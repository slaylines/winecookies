const MIN_LON = -180;
const MAX_LON = 180;
const MIN_LAT = -90;
const MAX_LAT = 90;

// eslint-disable-next-line
export const getMarkersBounds = (markers = []) => {
  const bounds = {
    minLon: MAX_LON,
    maxLon: MIN_LON,
    minLat: MAX_LAT,
    maxLat: MIN_LAT,
  };

  markers.forEach(marker => {
    const { lat, lon } = marker;

    bounds.minLat = Math.min(lat, bounds.minLat);
    bounds.maxLat = Math.max(lat, bounds.maxLat);
    bounds.minLon = Math.min(lon, bounds.minLon);
    bounds.maxLon = Math.max(lon, bounds.maxLon);
  });

  const latDelta = (bounds.maxLat - bounds.minLat) * 0.1 || 0.1;
  const lonDelta = (bounds.maxLon - bounds.minLon) * 0.1 || 0.1;

  return [
    [bounds.minLat - latDelta, bounds.minLon - lonDelta],
    [bounds.maxLat + latDelta, bounds.maxLon + lonDelta],
  ];
};
