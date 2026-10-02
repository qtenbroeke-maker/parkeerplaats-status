self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch {}
  event.waitUntil(self.registration.showNotification(data.title || 'Parkeerplaats 23A', {
    body: data.body || 'De parkeerplanning is gewijzigd.',
    tag: 'parking-23a-change',
    data: { url: data.url || '/parkeerplaats-status/' }
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || '/parkeerplaats-status/'));
});
