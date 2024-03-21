export const LOGO_ENABLED = 'google-maps-button-logo-enabled'

let storage;

if (typeof chrome !== 'undefined') {
  storage = chrome.storage.sync || chrome.storage.local;
}

export default storage! as chrome.storage.SyncStorageArea;
