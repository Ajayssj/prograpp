const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');
const publicVapidKey = 'BHN6mABMK8fphERQfNd3eWQ6y3iwhMzRj0L7j-_iO2em0qTEVE9UC1Ss5c38ih0RmO-6FIh-U8P71iiV25yHbkA';

/* Put code here */


let deferredPrompt;
/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then( async function(registration) {
    console.log("Service Worker registered successfully");
    const subscription = await registration.pushManager.
    subscribe({
      userVisibleOnly: true,
      // The `urlBase64ToUint8Array()` function is the same as in
      // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Registered push');

    console.log('Sending push');
    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'content-type': 'application/json'
      }
    });
  })
  .catch(function() {
    console.log("Service worker registration failed")
  });
}


window.addEventListener('beforeinstallprompt',function(event){
  event.preventDefault();
  deferredPrompt = event;
  butInstall.addEventListener('click',function(event){
    butInstall.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      }).catch(function(err){
        console.error(err);
      });
  })
  
  butInstall.style.display = 'block';

})

window.addEventListener('appinstalled', (evt) => {
   alert('Your App Installed Successfully@');
});

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
// if (window.location.protocol === 'http:') {
//   const requireHTTPS = document.getElementById('requireHTTPS');
//   const link = requireHTTPS.querySelector('a');
//   link.href = window.location.href.replace('http://', 'https://');
//   requireHTTPS.classList.remove('hidden');
// }