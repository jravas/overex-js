self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'MESSAGE') {
        self.registration.showNotification(event.data.payload);
    }
});
