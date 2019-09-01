import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './ImageLazyLoad.css';

class ImageLazyLoad extends React.Component {
  static propTypes = {
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
    ratio: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    threshold: PropTypes.number,
    throttle: PropTypes.number,
  };

  static defaultProps = {
    className: null,
    threshold: 300,
    throttle: 150,
  };

  constructor(props) {
    super(props);

    this.state = {
      placeholderLoaded: false,
      loaded: false,
      reveal: false,
    };

    this.handleLoad = this.handleLoad.bind(this);
    this.handlePlaceholderLoad = this.handlePlaceholderLoad.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.reveal = this.reveal.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    window.addEventListener('resize', this.handleScroll, false);

    // 第一次加载网页不滚动时默认进行检测图片位置
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
    window.removeEventListener('resize', this.handleScroll, false);
  }

  handleScroll() {
    const { throttle } = this.props;

    this.timer =
      this.timer ||
      setTimeout(() => {
        this.timer = null;
        window.requestAnimationFrame(this.reveal);
      }, throttle);
  }

  // 判断图片是否加载
  reveal() {
    // 相对浏览器左上角而，不是页面的左上角
    const rect = this.element.getBoundingClientRect();
    const { threshold } = this.props;
    const isInViewport =
      rect.top - threshold <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom + threshold >= 0 &&
      rect.left - threshold <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right + threshold >= 0;

    if (!isInViewport) {
      return;
    }

    window.removeEventListener('scroll', this.handleScroll, false);
    window.removeEventListener('resize', this.handleScroll, false);

    this.setState({
      reveal: true,
    });
  }

  // 图片加载完毕
  handleLoad() {
    this.setState({
      loaded: true,
    });
  }

  handlePlaceholderLoad() {
    this.setState({
      placeholderLoaded: true,
    });
  }

  render() {
    const { className, ratio, placeholder, alt, src, threshold, throttle, ...rest } = this.props;

    return (
      <div
        className={classNames(styles.root, className)}
        ref={element => {
          this.element = element;
        }}
      >
        <div style={{ paddingTop: `${ratio * 100}%` }} />
        <img
          className={classNames(styles.placeholder, {
            [styles.loaded]: !this.state.loaded && this.state.placeholderLoaded,
          })}
          src={placeholder}
          alt={alt}
          onLoad={this.handlePlaceholderLoad}
          {...rest}
        />
        {this.state.reveal &&
          <img
            className={classNames(styles.image, {
              [styles.loaded]: this.state.loaded,
            })}
            alt={alt}
            src={src}
            onLoad={this.handleLoad}
            {...rest}
          />}
      </div>
    );
  }
}

export default withStyles(styles)(ImageLazyLoad);
