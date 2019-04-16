import APIClient from './APIClient';
declare global {
    interface Window {
        APIClient: typeof APIClient;
    }
}
