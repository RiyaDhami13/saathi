import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  applyDistrictFilter,
  handleFacilitiesRequest,
} from "../lib/facilities-handler.ts";

const facilities = [
  { id: 1, name: "A Clinic", district: "Doti" },
  { id: 2, name: "B Hospital", district: "Kailali" },
  { id: 3, name: "C Health Post", district: "Doti" },
];

const originalConsoleError = console.error;

afterEach(() => {
  console.error = originalConsoleError;
});

function request(district) {
  const url = new URL("http://localhost/api/facilities");
  if (district !== undefined) {
    url.searchParams.set("district", district);
  }
  return new Request(url);
}

function filteringQuery() {
  const calls = [];
  const query = {
    eq(column, value) {
      calls.push({ column, value });
      return query;
    },
  };
  return { calls, query };
}

test("returns every facility when no district is specified", async () => {
  const { calls, query } = filteringQuery();
  applyDistrictFilter(query, null);
  const response = await handleFacilitiesRequest(
    request(),
    async () => ({ data: facilities, error: null })
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.count, facilities.length);
  assert.deepEqual(body.facilities, facilities);
  assert.deepEqual(calls, []);
});

test("passes district through and returns only matching facilities", async () => {
  const { calls, query } = filteringQuery();
  applyDistrictFilter(query, "Doti");
  const response = await handleFacilitiesRequest(
    request("Doti"),
    async (district) => ({
      data: facilities.filter((facility) => facility.district === district),
      error: null,
    })
  );
  const body = await response.json();

  assert.deepEqual(calls, [{ column: "district", value: "Doti" }]);
  assert.deepEqual(body.facilities, [facilities[0], facilities[2]]);
});

test("returns an empty list for an unknown district", async () => {
  const response = await handleFacilitiesRequest(
    request("Unknown"),
    async (district) => ({
      data: facilities.filter((facility) => facility.district === district),
      error: null,
    })
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body.facilities, []);
  assert.equal(body.count, 0);
});

test("returns a server error when the database reports an error", async () => {
  console.error = () => {};
  const response = await handleFacilitiesRequest(request(), async () => ({
    data: null,
    error: { message: "database unavailable" },
  }));
  const body = await response.json();

  assert.equal(response.status, 500);
  assert.equal(body.success, false);
  assert.equal(body.message, "Failed to fetch healthcare facilities");
});

test("returns a server error when the database request throws", async () => {
  console.error = () => {};
  const response = await handleFacilitiesRequest(request(), async () => {
    throw new Error("connection failed");
  });
  const body = await response.json();

  assert.equal(response.status, 500);
  assert.equal(body.success, false);
  assert.equal(body.message, "An unexpected error occurred");
});

test("includes facilities that have no services", async () => {
  const facilityWithoutServices = {
    id: 4,
    name: "Rural Health Post",
    district: "Doti",
  };
  const response = await handleFacilitiesRequest(
    request(),
    async () => ({ data: [facilityWithoutServices], error: null })
  );
  const body = await response.json();

  assert.deepEqual(body.facilities, [facilityWithoutServices]);
});
