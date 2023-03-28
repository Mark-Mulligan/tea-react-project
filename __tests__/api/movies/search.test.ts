// dotenv - used to import env variables for tests
import * as dotenv from "dotenv";
dotenv.config();

// Api Route
import handler from "../../../src/pages/api/movies/search";

import { createMocks } from "node-mocks-http";

describe("Movie Search API Route", () => {
  it("should respond with a 401 error if called with a POST request", async () => {
    const { req, res } = createMocks({
      method: "POST",
      query: {
        s: "Batman",
        page: "1",
      },
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(401);
  });

  it("should respond with a 401 error if called with a PUT request", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      query: {
        s: "Batman",
        page: "1",
      },
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(401);
  });

  it("should respond with a 401 error if called with a DELETE request", async () => {
    const { req, res } = createMocks({
      method: "DELETE",
      query: {
        s: "Batman",
        page: "1",
      },
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(401);
  });

  it("should respond with a 401 error if missing query parameters", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {},
    });

    await handler(req, res);
    const result = res._getJSONData();
    expect(res._getStatusCode()).toBe(401);
    expect(result).toHaveProperty("message");
    expect(result.message).toBe("Request missing search params");
  });

  it("should respond with a correct data to a correct request", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        s: "Batman",
        page: "1",
      },
    });

    await handler(req, res);
    const result = res._getJSONData();
    // Checking Format of Response
    expect(res._getStatusCode()).toBe(200);
    expect(result).toHaveProperty("nextPage");
    expect(result).toHaveProperty("results");
    expect(result.results).toHaveProperty("Search");
    expect(result.results).toHaveProperty("totalResults");
    expect(result.results).toHaveProperty("Response");

    // Checking data
    expect(result.results.Search.length).toBe(10);
    expect(result.nextPage).toBe("2");
  });
});
