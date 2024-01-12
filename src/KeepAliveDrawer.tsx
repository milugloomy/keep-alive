import React, { useEffect, useState } from 'react';

export default function KeepAliveDrawer(props: React.PropsWithChildren) {
  const { children } = props;
  const childPropsVisible = (children as React.ReactElement)?.props?.visible;
  const [mounted, setMounted] = useState(false); // 控制变量是否渲染
  const [visible, setVisible] = useState(false); // 控制子组件（抽屉）是否展示

  useEffect(() => {
    if (childPropsVisible) {
      if (!mounted) {
        // 先渲染
        setMounted(true);

        // setTimeout(() => {
        //   // 再弹出抽屉
        //   setVisible(true);
        // });
      } else {
        setVisible(true);
      }
    } else {
      setVisible(false);
    }
  }, [childPropsVisible]);

  useEffect(() => {
    if (mounted) {
      setVisible(true);
    }
  }, [mounted]);

  if (!React.isValidElement(children) || childPropsVisible === undefined) {
    throw new Error('KeepAliveDrawer只能有一个子组件，且子组件的props中需包含visible参数');
  }

  const childrenWithProps = React.cloneElement(children as React.ReactElement, { visible });

  return <>{mounted ? childrenWithProps : null}</>;
}
