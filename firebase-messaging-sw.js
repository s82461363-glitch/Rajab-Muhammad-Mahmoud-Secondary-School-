importScripts('https://www.gstatic.com/firebasejs/13.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/13.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB1ER7DAKSD6sYanGQHcFgUeyg5pxBNLKc",
  authDomain: "school-772e3.firebaseapp.com",
  projectId: "school-772e3",
  storageBucket: "school-772e3.firebasestorage.app",
  messagingSenderId: "205626167545",
  appId: "1:205626167545:web:ae14d4c4aa00878d5c5228"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  if (payload.notification) return;

  const data = payload.data || {};
  const title = data.title || 'تنبيه عاجل من المدرسة!';
  const options = {
    body: data.body || 'لديك تنبيه جديد من إدارة المدرسة.',
    icon: 'https://cdn-icons-png.flaticon.com/512/2933/2933258.png',
    data: { url: data.url || './' }
  };

  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = new URL(
    event.notification.data?.url || './',
    self.location.origin
  ).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((windows) => {
        for (const client of windows) {
          if (client.url === targetUrl && 'focus' in client) {
            return client.focus();
          }
        }
        return clients.openWindow(targetUrl);
      })
  );
});
