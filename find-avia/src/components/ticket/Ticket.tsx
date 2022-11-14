import { useState } from 'react';
import TimeBlock from './components/TimeBlock/TimeBlock';
import bag from '../../assets/svg/bag.svg';
import luggage from '../../assets/svg/luggage.svg';
import path from '../../assets/svg/path.svg';
import styles from './Ticket.module.scss';
import SelectTime from './components/SelectTime/SelectTime';
import { IMG_ALTS } from '../../utils/locales';
import { getTimeToString } from '../../utils/helpers';
import { TimesType } from '../../utils/types';

type TicketPropType = {
  label: string;
  logo: string;
  companyName: string;
  airports: string[];
  from: string;
  to: string;
  fromDate: string;
  toDate: string;
  times: TimesType[];
};

const Ticket = ({
  label,
  logo,
  companyName,
  airports,
  from,
  to,
  fromDate,
  toDate,
  times,
}: TicketPropType) => {
  const [selectTimeNum, setSelectTimeNum] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.ticketLabel}>{label}</div>
      <div className={styles.ticketDetails}>
        <div className={styles.companyInfo}>
          <img className={styles.logo} src={logo} alt={IMG_ALTS.logo} />
          <p className={styles.companyName}>{companyName}</p>
        </div>
        <div className={styles.flightContainer}>
          <div className={styles.flightInfo}>
            <TimeBlock time={times[selectTimeNum].fromTime} city={from} date={fromDate} />
            <div className={styles.pathDetails}>
              <div className={styles.airportsContainer}>
                <div>{airports[0]}</div>
                <div> {airports[1]}</div>
              </div>
              <div className={styles.pathImg}>
                <img src={path} alt={IMG_ALTS.path} />
              </div>
              <div className={styles.flightTime}>{getTimeToString(times[selectTimeNum])}</div>
            </div>
            <TimeBlock time={times[selectTimeNum].toTime} city={to} date={toDate} />
          </div>
          <div className={styles.selectTime}>
            {times.map(({ fromTime, toTime }, index) => {
              return (
                <SelectTime
                  key={fromTime + toTime}
                  from={fromTime}
                  to={toTime}
                  isActive={index === selectTimeNum}
                  id={index}
                  onClick={setSelectTimeNum}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.luggageInfo}>
          <div className={styles.luggageImgs}>
            <img src={bag} alt={IMG_ALTS.bag} />
            <img src={luggage} alt={IMG_ALTS.luggage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
