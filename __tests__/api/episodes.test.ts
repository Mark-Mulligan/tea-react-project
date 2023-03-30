// dotenv - used to import env variables for tests
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Types
import { SeriesData } from "../../src/customTypes/omdbApi";

// Api Route
import handler from "../../src/pages/api/episodes";

import { createMocks } from "node-mocks-http";

describe("Episodes Search API Route", () => {
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
        i: "tt0944947",
        Season: "1",
      },
    });

    await handler(req, res);
    const result: SeriesData = res._getJSONData();

    // Checking Format of Response
    expect(res._getStatusCode()).toBe(200);
    expect(result).toHaveProperty("Title");
    expect(result).toHaveProperty("Season");
    expect(result).toHaveProperty("totalSeasons");
    expect(result).toHaveProperty("Episodes");
    expect(result).toHaveProperty("Response");

    // Checking Data of response
    expect(result.Title).toBe("Game of Thrones");
    expect(result.Episodes.length).toBe(10);
    expect(result.Season).toBe("1");
    expect(result.totalSeasons).toBe("8");
    expect(result.Response).toBe("True");
  });
});
