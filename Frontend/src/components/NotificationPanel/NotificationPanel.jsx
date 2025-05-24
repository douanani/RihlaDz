import React from "react";
import "./NotificationPanel.css";

const notifications = [
  {
    id: 1,
    name: "John Doe",
    time: "10 mins ago",
    message: "reacted to your post",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    image: "https://via.placeholder.com/50x50?text=HOVE",
  },
  {
    id: 2,
    name: "Richard Miles",
    time: "1 day ago",
    message: "reacted to your post",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    image: "https://via.placeholder.com/50x50?text=HOVE",
  },
  {
    id: 3,
    name: "Brian Cumin",
    time: "1 day ago",
    message: "reacted to your post",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    image: "https://via.placeholder.com/50x50?text=IMG",
  },
  {
    id: 4,
    name: "Lance Bogrol",
    time: "1 day ago",
    message: "reacted to your post",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    image: "https://via.placeholder.com/50x50?text=IMG",
  },
];

const NotificationPanel = () => {
  return (
    <div className="notification-panel shadow">
      <div className="notification-header">Notification</div>
      <div className="notification-list">
        {notifications.map((notif) => (
          <div key={notif.id} className="notification-item">
            <img src={notif.avatar} className="avatar" alt="user" />
            <div className="notification-content">
              <strong>{notif.name}</strong> {notif.message}
              <div className="notification-time">{notif.time}</div>
            </div>
            <img src={notif.image} className="thumb" alt="post" />
          </div>
        ))}
      </div>
      <div className="view-all-btn">View All</div>
    </div>
  );
};

export default NotificationPanel;
