import styles from './TimeBlock.module.scss';

type TimeBlockProp = {
  time: string;
  city: string;
  date: string;
};

const TimeBlock = ({ time, city, date }: TimeBlockProp) => {
  return (
    <div>
      <div className={styles.time}>{time}</div>
      <div className={styles.city}>{city}</div>
      <div className={styles.date}>{date}</div>
    </div>
  );
};

export default TimeBlock;
