import React, { useEffect } from 'react';
import { message } from 'antd';

const Notification = ({ showNotification }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const displayNotification = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  useEffect(() => {
    showNotification(displayNotification);
  }, [showNotification]);

  return <>{contextHolder}</>;
};

export default Notification;
