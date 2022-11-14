import styles from './SelectTime.module.scss';

type SelectTimeProps = {
  from: string;
  to: string;
  isActive: boolean;
  id: number;
  onClick: (index: number) => void;
};

const SelectTime = ({ from, to, isActive, onClick, id }: SelectTimeProps) => {
  return (
    <div
      className={`${styles.selectTimes} ${isActive && styles.active}`}
      onClick={() => onClick(id)}
    >
      <div className={styles.departure}>{from}</div>
      <span className={styles.span}>-</span>
      <div className={styles.arrives}>{to}</div>
    </div>
  );
};

export default SelectTime;
