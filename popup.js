// popup.js
console.log('popup');
// تخزين العنصر الذي سيتم استخدامه لعرض قيمة sectionID
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "save" }, function(response) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }

        const infoAlertElement = document.querySelector('.info-alert');
        if (response.infoText) {
            infoAlertElement.textContent = response.infoText;
        } else {
            infoAlertElement.textContent = 'No info found.';
        }
    });
});