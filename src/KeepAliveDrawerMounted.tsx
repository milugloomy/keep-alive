import React, { useEffect, useState } from 'react';

export default function KeepAliveDrawerMounted(props: React.PropsWithChildren) {
  const { children } = props;
  const childPropsVisible = (children as React.ReactElement)?.props?.visible;
  const [visible, setVisible] = useState(true); // 控制子组件（抽屉）是否展示

  useEffect(() => {
    if (childPropsVisible) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [childPropsVisible]);

  if (!React.isValidElement(children) || childPropsVisible === undefined) {
    throw new Error('KeepAliveDrawer只能有一个子组件，且子组件的props中需包含visible参数');
  }

  const childrenWithProps = React.cloneElement(children as React.ReactElement, { visible });

  return <>{childrenWithProps}</>;
}
