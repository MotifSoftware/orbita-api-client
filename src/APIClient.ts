export default class APIClient {
  _settings: string;

  constructor(settings: string) {
    this._settings = settings;
  }

  get settings(): string {
    return this._settings;
  }
}
