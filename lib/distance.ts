
/**
 * Calculate straight-line distance between two locations.
 * Returns distance in kilometers.
 */

export function getDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const isValidCoordinate = (lat: number, lon: number) =>
    Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180;

  if (
    !isValidCoordinate(lat1, lon1) ||
    !isValidCoordinate(lat2, lon2)
  ) {
    throw new Error("Invalid latitude or longitude");
  }

  const earthRadiusKm = 6371;

  const toRadians = (degrees: number) =>
    (degrees * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1 - a)
  );

  return Number((earthRadiusKm * c).toFixed(2));
}
