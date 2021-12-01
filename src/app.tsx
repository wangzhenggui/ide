import { createLogger } from 'redux-logger';
import { message } from 'antd';

export const dva = {
  config: {
    [process.env.NODE_ENV === 'development' ? 'onAction' : '']: createLogger(),
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};
