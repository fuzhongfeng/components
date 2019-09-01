import * as classNames from 'classnames';
import * as React from 'react';
import * as styles from './Loading.css';

export interface LoadingProps {
  className?: string;
}

class Loading extends React.Component<LoadingProps, {}> {
  static defaultProps = {
    className: undefined,
  };

  render() {
    const { className } = this.props;
    return (
      <div className={classNames(className, styles.root)}>
        <div className={classNames(styles.container)}>
          <div className={classNames(styles.cubeContainer)}>
            <div className={classNames(styles.cube, styles.cubeOne)}>
              <div className={classNames(styles.top)} />
              <div className={classNames(styles.left)} />
              <div className={classNames(styles.right)} />
            </div>
            <div className={classNames(styles.cube, styles.cubeTwo)}>
              <div className={classNames(styles.top)} />
              <div className={classNames(styles.left)} />
              <div className={classNames(styles.right)} />
            </div>
            <div className={classNames(styles.cube, styles.cubeThree)}>
              <div className={classNames(styles.top)} />
              <div className={classNames(styles.left)} />
              <div className={classNames(styles.right)} />
            </div>
            <div className={classNames(styles.cube, styles.cubeFour)}>
              <div className={classNames(styles.top)} />
              <div className={classNames(styles.left)} />
              <div className={classNames(styles.right)} />
            </div>
          </div>
          <div className={classNames(styles.shadowContainer)}>
            <div className={classNames(styles.shadow, styles.shadowOne)} />
            <div className={classNames(styles.shadow, styles.shadowTwo)} />
            <div className={classNames(styles.shadow, styles.shadowThree)} />
            <div className={classNames(styles.shadow, styles.shadowFour)} />
          </div>
          <div className={classNames(styles.text)}>loading</div>
        </div>
      </div>
    );
  }
}

export default Loading;
