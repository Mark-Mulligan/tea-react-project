// dotenv - used to import env variables for tests
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Test Function
import { createOMDBSearchURLObject } from '@/utils/api';

describe('API Utils createOMDBSearchURLObject', () => {
  it('should return a url object with a correctly formatted search property', () => {
    // workaround to mock the NextAPiRequestObj (really just need the query object for testing fo this function)
    const req = {
      query: {
        s: 'Batman',
        page: '1',
      },
      cookies: {},
      body: null,
      env: {},
    } as any;

    const urlObj = createOMDBSearchURLObject(req, 'router', '2');
    expect(urlObj).toHaveProperty('search');
    expect(urlObj.search).toBe('?s=Batman&page=2');
  });

  it(`should have an origin of ${process.env.NEXT_PUBLIC_BASE_URL} when called with the router argument`, () => {
    const req = {
      query: {
        s: 'Batman',
        page: '1',
      },
      cookies: {},
      body: null,
      env: {},
    } as any;

    const urlObj = createOMDBSearchURLObject(req, 'router', '2');
    expect(urlObj).toHaveProperty('origin');
    expect(urlObj.origin).toBe(process.env.NEXT_PUBLIC_BASE_URL);
  });

  it(`should have an origin of ${process.env.OMDB_URL} when called with the req argument`, () => {
    const req = {
      query: {
        s: 'Batman',
        page: '1',
      },
      cookies: {},
      body: null,
      env: {},
    } as any;

    const urlObj = createOMDBSearchURLObject(req, 'req', '2');
    expect(urlObj).toHaveProperty('origin');
    expect(urlObj.origin).toBe(process.env.OMDB_URL);
  });
});
