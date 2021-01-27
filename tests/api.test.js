import { createMocks } from 'node-mocks-http';
import handleJobs from '../pages/api/jobs';

describe('API Testing', () => {
  describe('search for jobs', () => {
    it('searchTerm should work as expected', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          searchTerm: 'endoscopy'
        }
      });

      await handleJobs(req, res);
      expect(res._getJSONData().jobs.length).toBe(1);
    });
  });
});