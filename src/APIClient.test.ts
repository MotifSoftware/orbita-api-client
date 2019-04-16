import APIClient from './APIClient';

describe('APIClient', () => {
  it('exposes client settings', () => {
    const settings = {
      chat: {
        endpoint: "some endpoint"
      }
    };

    const client = new APIClient(settings);

    expect(client.settings).toEqual(settings);
  });
});
