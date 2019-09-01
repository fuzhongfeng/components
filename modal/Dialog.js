import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Modal.css';

class Dialog extends React.Component {
  static propTypes = {
    showCloseButton: PropTypes.bool,
    duration: PropTypes.number,
    onClose: PropTypes.func,
    className: PropTypes.string,
    animation: PropTypes.string,
    animationType: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    showCloseButton: true,
    duration: 300,
    onClose: null,
    className: '',
    animation: 'zoom',
    animationType: '',
    children: null,
  };
  render() {
    const {
      showCloseButton,
      duration,
      onClose,
      className,
      animation,
      animationType,
      children,
    } = this.props;

    return (
      <div
        style={{
          animationDuration: `${duration}ms`,
          WebkitAnimationDuration: `${duration}ms`,
        }}
        className={classNames(
          styles.rodalDialog,
          !className ? styles.defaultSize : className,
          styles[`${animation}${animationType}`],
        )}
      >
        {showCloseButton &&
          <span // eslint-disable-line jsx-a11y/no-static-element-interactions
            className={classNames(styles.rodalClose)}
            onClick={onClose}
          />}
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(Dialog);