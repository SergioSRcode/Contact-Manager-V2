export function showNotification(msg, type = 'error') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = msg;
  document.body.prepend(notification);

  setTimeout(() => notification.remove(), 5000);
}