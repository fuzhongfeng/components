import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Modal.css';
import Dialog from './Dialog';

// env

class Modal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    showMask: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    closeMaskOnClick: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    showCloseButton: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    animation: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    duration: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    className: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    onClose: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
    onAnimationEnd: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
    children: PropTypes.node,
  };

  static defaultProps = {
    visible: false,
    showMask: true,
    closeMaskOnClick: true,
    showCloseButton: true,
    animation: 'zoom',
    duration: 300,
    className: '',
    onAnimationEnd: null,
    children: null,
  };

  state = {
    isShow: false,
    animationType: 'Leave',
  };

  componentDidMount() {
    if (this.props.visible) {
      this.enter();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.enter();
    } else if (this.props.visible && !nextProps.visible) {
      this.leave();
    }
  }

  enter() {
    this.setState({
      isShow: true,
      animationType: 'Enter',
    });
  }

  leave() {
    this.setState({ animationType: 'Leave' });
  }

  animationEnd = () => {
    if (this.state.animationType === 'Leave') {
      this.setState({ isShow: false });
    }

    const { onAnimationEnd } = this.props;
    if (onAnimationEnd) {
      onAnimationEnd();
    }
  };

  render() {
    const { state } = this;
    const { closeMaskOnClick, onClose, showMask, duration, children } = this.props;
    const onClick = closeMaskOnClick ? onClose : null;
    const mask = showMask
      ? (<div // eslint-disable-line jsx-a11y/no-static-element-interactions
          className={classNames(styles.rodalMask)}
          onClick={onClick}
        />)
      : null;
    const style = {
      display: state.isShow ? '' : 'none',
      animationDuration: `${duration}ms`,
      WebkitAnimationDuration: `${duration}ms`,
    };

    return (
      <div
        style={style}
        className={classNames(styles.rodal, styles[`fade${state.animationType}`])}
        onAnimationEnd={this.animationEnd}
      >
        {mask}
        <Dialog {...this.props} animationType={state.animationType}>
          {children}
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Modal);