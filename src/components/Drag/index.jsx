import React, { useMemo, memo, useState } from 'react';
import { useDrag } from 'react-dnd';
import { connect } from 'dva';
import { DRAG_TYPE } from '../../common/constant';
import Template from '../Tpl';

const Drag = memo((props) => {
  const [lock, setLock] = useState(true)
  const { item = {}, dispatch } = props;
  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPE,
    item: {
      componentZhName: item?.schema?.name,
      componentName: item?.schema?.type,
      sourcePackage: item?.schema?.__source__,
      props: {},
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const containerStyle = useMemo(
    () => ({
      cursor: 'move',
    }),
    [isDragging],
  );

  useMemo(() => {
    if (!lock && item?.schema?.__showModal__) {
      console.log('isDragging', isDragging)
      dispatch({
        type: 'modalView/toggleDrag',
        payload: {
          isDrag: isDragging,
        },
      })
    }
    setLock(false)
  }, [isDragging])

  return (
    <div ref={drag}>
      <Template name={item?.schema?.name} style={{ ...containerStyle }} />
    </div>
  );
});

export default connect()(Drag);
