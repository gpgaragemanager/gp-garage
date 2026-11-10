// public/sw.js
/**
 * GP Garage website service worker (9 Nov 2026): shows "New vehicle entered the shop" when the site is closed,
 * and opens the website when the alert is tapped.
 */

self.addEventListener('push', (event) => {
  let data = { title: 'GP Garage Manager', body: '' };
  try {
    data = { ...data, ...event.data.json() };
  } catch {
    // A push without JSON text: show the default title.
  }
  event.waitUntil(self.registration.showNotification(data.title, { body: data.body, icon: '/icon.png', tag: 'new-job' }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
      const open = windows.find((w) => 'focus' in w);
      if (open) return open.focus();
      return self.clients.openWindow('/');
    }),
  );
});
