import React from 'react';
import { Flex, Spin } from 'antd';

import s from './spinner.module.scss';

const Spinner = () => (
  <div className={s.spinner}>
    <Flex align="center" gap="middle">
      <Spin size="large" />
    </Flex>
  </div>
);
export default Spinner;
