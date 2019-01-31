const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

/* Put code here */


let deferredPrompt;
/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
  .then(function() {
    console.log("Service Worker registered successfully");
  })
  .catch(function() {
    console.log("Service worker registration failed")
  });
}


window.addEventListener('beforeinstallprompt',function(event){
  event.preventDefault();
  deferredPrompt = event;
  butInstall.addEventListener('click',function(event){
    alert('Button Clicked')
    deferredPrompt.prompt()
    // deferredPrompt.userChoice
    // .then((choiceResult) => {
    //   if (choiceResult.outcome === 'accepted') {
    //     console.log('User accepted the A2HS prompt');
    //   } else {
    //     console.log('User dismissed the A2HS prompt');
    //   }
    //   deferredPrompt = null;
    // });
  })
  butInstall.style.display = 'block';

})
/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
  const requireHTTPS = document.getElementById('requireHTTPS');
  const link = requireHTTPS.querySelector('a');
  link.href = window.location.href.replace('http://', 'https://');
  requireHTTPS.classList.remove('hidden');
}