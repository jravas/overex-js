Notification.requestPermission();

const init = async () => {
    if (!'serviceWorker' in navigator) {
        console.log('Service workers are not supported.');
        return
    }

    try {
        const registration = await navigator.serviceWorker.register('./sw.js')
        registration.addEventListener('updatefound', () => {
            console.log('A new service worker is being installed:',
                registration.installing);
        });
    } catch (e) {
        console.error('Service worker registration failed:', e);
        return
    }

    const isReady = await navigator.serviceWorker.ready
    console.log(isReady)
    sendMessage('Service worker ready and message recived')
}

init()

const sendMessage = (message) => {
    if (!'serviceWorker' in navigator) {
        console.log('Service workers are not supported.');
        return
    }
    if (!navigator.serviceWorker.controller) {
        console.log('No controller');
        return
    }

    if (!message) {
        message = document.getElementById('message').value
    }

    navigator.serviceWorker.controller.postMessage({
        type: 'MESSAGE',
        payload: message
    });
}


