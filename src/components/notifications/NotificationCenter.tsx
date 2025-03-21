import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  type: 'booking_request' | 'booking_confirmed' | 'booking_rejected';
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // In a real implementation, you would fetch notifications from your backend
  useEffect(() => {
    // Simulated notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'booking_request',
        message: 'New booking request for Blue Moon Cafe',
        timestamp: new Date(),
        read: false,
      },
      // Add more mock notifications as needed
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.timestamp.toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setNotifications([])}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 