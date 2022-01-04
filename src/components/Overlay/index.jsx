import { connect } from 'dva';
import { isEmpty } from 'lodash';
import classnames from 'classnames';
import styles from './index.less'

const Overlay = ({ currentSelectModalView, isDrag }) => {
  return (
    !isEmpty(currentSelectModalView) && !isDrag ? (
      <div className={classnames({
        [styles.hover]: true
      })}>
      </div>
    ) : null
  )
}

export default connect((state) => ({
  currentSelectModalView: state?.modalView?.currentSelectModalView,
  isDrag: state?.modalView?.isDrag
}))(Overlay);
