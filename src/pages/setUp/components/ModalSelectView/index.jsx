import { Radio } from 'antd';
import { EyeInvisibleOutlined } from '@ant-design/icons'
import classnames from 'classnames';
import { connect } from 'dva';
import { findNodeById } from '@/common/tools'
import styles from './index.less';

const ModalSelectView = ({ modalViews, currentSelectModalView, renderTree, dispatch }) => {
  const handleSelectView = (id) => () => {
    dispatch({
      type: 'modalView/toggleCurrentModalView',
      payload: {
        id,
      },
    });
    const currentClickNode = findNodeById([renderTree], id);
    dispatch({
      type: 'editModal/changeCurrentNode',
      payload: {
        currentNode: currentClickNode,
      },
    });
  }

  const handleClickHideModal = () => {
    dispatch({
      type: 'modalView/hideModalView',
    });
    dispatch({
      type: 'editModal/changeCurrentNode',
      payload: {
        currentNode: null,
      },
    });
  }

  return (
    <div className={classnames({
      [styles.wrap]: true,
      [styles.hidden]: modalViews.length === 0
    })}>
      <div className={styles.title}>
        <span>模态视图层</span>
        { currentSelectModalView && <EyeInvisibleOutlined onClick={handleClickHideModal}/> }
      </div>
      <div>
        {
          modalViews.map(mv => {
            return (
              <div className={styles.line} onClick={handleSelectView(mv.id)}>
                <Radio checked={mv.id === currentSelectModalView?.id} />
                <span>{mv.componentZhName}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default connect((state) => ({
  renderTree: state?.editModal?.renderTree,
  modalViews: state?.modalView?.modalViews,
  currentSelectModalView: state?.modalView?.currentSelectModalView
}))(ModalSelectView)
