const { EntitySchema } = require('@mikro-orm/core');

class RequestHistory {
  constructor(data = {}) {
    this.method = data.method;
    this.url = data.url;
    this.headers = data.headers;
    this.body = data.body;
    this.status = data.status;
    this.responseHeaders = data.responseHeaders;
    this.responseBody = data.responseBody;
    this.responseTime = data.responseTime;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const RequestHistorySchema = new EntitySchema({
  class: RequestHistory,
  tableName: 'request_history',
  indexes: [
    { properties: ['createdAt'] }
  ],
  properties: {
    id: {
      type: 'number',
      primary: true,
      autoincrement: true,
    },
    method: {
      type: 'string',
    },
    url: {
      type: 'text',
    },
    headers: {
      type: 'json',
      nullable: true,
    },
    body: {
      type: 'text',
      nullable: true,
    },
    status: {
      type: 'number',
    },
    responseHeaders: {
      type: 'json',
      nullable: true,
    },
    responseBody: {
      type: 'text',
      nullable: true,
    },
    responseTime: {
      type: 'number',
    },
    createdAt: {
      type: 'Date',
      default: 'now()',
    },
    updatedAt: {
      type: 'Date',
      default: 'now()',
      onUpdate: () => new Date(),
    },
  },
});

module.exports = { RequestHistory, RequestHistorySchema };
