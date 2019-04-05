import APIClient from './APIClient';

describe('APIClient', () => {
  it('exposes client settings', () => {
    const settings = 'Hello, World!';

    const client = new APIClient(settings);

    expect(client.settings).toEqual(settings);
  });
});
