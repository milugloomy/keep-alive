import React, { useEffect, useState } from 'react';

type KeyType = string | number;
type MapType = {
  visited: boolean;
  child: React.ReactNode;
  index: number;
};

export default function (props: React.PropsWithChildren<{ width?: KeyType; activeKey: KeyType }>) {
  const { activeKey, children, width = '100%' } = props;
  const [validChildrenMap, setValidChildrenMap] = useState<Map<KeyType, MapType>>(() => {
    const map = new Map();
    React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        if (!child.key) {
          throw new Error('子元素需要key');
        }
        map.set(child.key, { index, visited: false, child });
      }
    });
    return map;
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeKey) {
      const activeChildren = validChildrenMap.get(activeKey);
      if (activeChildren) {
        activeChildren.visited = true;
        setValidChildrenMap(new Map(validChildrenMap));
        setActiveIndex(activeChildren.index);
      }
    }
  }, [activeKey]);

  const wrapperStyle: React.CSSProperties = {
    width,
    textAlign: 'center',
    overflowX: 'hidden',
  };
  const animateStyle: React.CSSProperties = {
    display: 'flex',
    width: getWidth(validChildrenMap.size, width),
    transform: `translateX(${getWidth(-activeIndex / validChildrenMap.size, width)})`,
    transition: '0.5s ease',
  };
  const childStyle: React.CSSProperties = { width };

  return (
    <div style={wrapperStyle}>
      <div style={animateStyle}>
        {Array.from(validChildrenMap).map((item, index) => {
          const { child, visited } = item[1];
          const childKey = item[0];
          if (visited) {
            return (
              <div key={childKey} style={childStyle}>
                {React.cloneElement(child as React.ReactElement, { active: activeKey === childKey })}
              </div>
            );
          }
          return <div key={childKey} style={childStyle} />;
        })}
      </div>
    </div>
  );
}

function getWidth(n: number, width: number | string) {
  if (typeof width === 'string') {
    if (width.endsWith('%')) {
      const widthPercent = Number(width.substring(0, width.length - 1));
      return `${n * widthPercent}%`;
    }
    throw new Error('width must be a number or a string ends with %');
  }
  return `${n * (width as number)}px`;
}
