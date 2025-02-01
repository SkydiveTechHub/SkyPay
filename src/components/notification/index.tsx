import React from "react";

interface NotificationProps {
  title: string;
  content: string;
}

const Notification: React.FC<NotificationProps> = ({ title, content }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-lg mb-4 text-[#7F8187]">{content}</p>
      <div className="flex gap-4">
        <button
          style={{
            backgroundColor: "#28C0F1",
            color: "rgba(255, 255, 255, 1)",
          }}
          className="w-[100%] md:w-[150px] py-2 rounded-lg font-int font-[500]"
        >
          Yes
        </button>
        <button
          style={{ backgroundColor: "#fff", color: "rgba(30, 30, 30, 1)" }}
          className="border border-[#22347F] w-[100%] md:w-[150px] py-2 rounded-lg font-int font-[500]"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Notification;
