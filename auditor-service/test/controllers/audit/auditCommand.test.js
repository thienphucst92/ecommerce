const _ = require('lodash');
const assert = require('assert');
const request = require('supertest');
const app = require('../../../app/app');
const Audit = require('../../../app/models/Audit');

describe('Testing: Audit - ', () => {
  beforeEach(async () => {
  });

  it('Expect Success - Create Audit Success', async () => {
    const auditCountBefore = await Audit.count();
    const body = {
      action: 'SearchProducts',
      parameters: {
        name: 'iPhone',
        sortBy: 'price',
        sortDirection: 'desc',
      },
      isSuccess: true,
      statusCode: 200,
      accessLog: '10.10.10.10 - - [25/Feb/2019:07:27:13 +0000] "POST /graphl HTTP/1.0" 200 234 ms - - "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36"',
    };

    const res = await request(app)
      .post('/api/audit')
      .send(body)
      .expect(200);

    assert(res.body.isSuccess);
    const auditCountAfter = await Audit.count();
    assert.equal(auditCountBefore + 1, auditCountAfter);
  });
});
