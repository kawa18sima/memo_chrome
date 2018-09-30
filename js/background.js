chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({memo: [], count:0}, function() {});
});
