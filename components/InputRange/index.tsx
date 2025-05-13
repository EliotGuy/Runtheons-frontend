'use client';

import styles from "./style.module.css";
import { twMerge } from 'tailwind-merge';

interface OnboardingInputRangeProps {
  value?: number;
}

interface RangeProps {
  defaultValue?: number;
  color?: "BLUE" | "PURPLE";
  total?: number;
}

const OnboardingInputRange: React.FC<OnboardingInputRangeProps> = ({
  value,
}) => {
  return (
    <div className={twMerge(styles.actionContainer)}>
      <Range color="BLUE" defaultValue={value} total={2000} />
    </div>
  );
};

export const Range: React.FC<RangeProps> = ({
  defaultValue = 972,
  color = "BLUE",
  total = 2000,
}) => {
  const progress = Math.min((defaultValue / total) * 100, 100);

  const imageColor: Record<string, string> = {
    BLUE: "./Tracciato 187-blue.svg",
    PURPLE: "./Tracciato 187-purple.svg",
  };

  return (
    <div>
      <div className={styles.rangeContainer}>
        <div className={styles.arrowContainer}>
          <div
            className={styles.divider}
            style={{
              left: `${progress}%`,
              display: `${progress > 0 && progress < 100 ? "block" : "none"}`,
            }}
          ></div>
          <div className={styles.arrowContainerWhite}>
            <img
              src="./Tracciato 187.svg"
              alt=""
              className={styles.arrow}
            />
          </div>
          <div
            className={twMerge(styles.filledArrowContainerBase)}
            style={{
              width: `${progress}%`,
            }}
          >
            <img
              src={imageColor[color]}
              alt=""
              className={styles.filledArrowBase}
            />
          </div>
          <div
            className={`${styles.filledArrowContainer}`}
            style={{ width: `${progress}%` }}
          >
            <img
              src={imageColor[color]}
              alt=""
              className={styles.filledArrow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingInputRange;
