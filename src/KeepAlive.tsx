import React, { useEffect, useState, useMemo } from 'react';

export default function (props: React.PropsWithChildren<{ active: boolean; className?: string }>) {
  const { active, children, className } = props;
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    if (active && !visited) {
      setVisited(true);
    }
  }, [active]);

  const childrenWithProps = useMemo(
    () =>
      React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, { active });
        }
        return child;
      }),
    [children, active],
  );

  const style = { display: active ? 'block' : 'none' };

  return (
    <div style={style} className={className}>
      {visited ? childrenWithProps : null}
    </div>
  );
}
