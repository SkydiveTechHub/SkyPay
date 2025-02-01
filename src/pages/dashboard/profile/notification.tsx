import React from "react";
import Notification from "../../../components/notification/index";

const NotificationPage: React.FC = () => {
  return (
    <div className="mx-auto p-8">
      <Notification
        title="Transactions"
        content="Do you want to keep receiving withdrawal and transfer notifications"
      />
      <Notification
        title="Topups"
        content="Do you want to keep recieving airtime and data notifications."
      />
      <Notification
        title="Newsletter"
        content="Do you want to keep recieving promotions and other information notifications."
      />
      <Notification
        title="Push Notifications"
        content="Do you want to recieve push notifications."
      />
    </div>
  );
};

export default NotificationPage;
