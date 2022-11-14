import { useAppSelector } from '../../redux/hooks/hooks';
import { ticketDataSelector } from '../../redux/selectors/TicketSelectors';
import Ticket from '../ticket/Ticket';
import logo from '../../assets/svg/logo.svg';
import styles from './TicketsBlock.module.scss';

type TicketData = {
  label: string;
  logoSrc: string;
  companyName: string;
  airports: string[];
  times: { fromTime: string; toTime: string }[];
  price: number;
};

type TicketsData = {
  departureData: TicketData;
  returnData?: TicketData;
};

const ticketsData: TicketsData = {
  departureData: {
    label: 'Невозвратный',
    logoSrc: logo,
    companyName: 'S7 Airlines',
    airports: ['SVO', 'ROV'],
    times: [
      { fromTime: '09:20', toTime: '11:05' },
      { fromTime: '10:20', toTime: '12:05' },
      { fromTime: '11:20', toTime: '13:05' },
    ],
    price: 4150,
  },
  returnData: {
    label: 'Невозвратный',
    logoSrc: logo,
    companyName: 'S7 Airlines',
    airports: ['ROV', 'SVO'],
    times: [
      { fromTime: '09:20', toTime: '11:05' },
      { fromTime: '10:20', toTime: '12:05' },
      { fromTime: '11:20', toTime: '13:05' },
    ],
    price: 5150,
  },
};

const TicketsBlock = () => {
  const { departureCity, arrivalCity, departureDate, returnDate, isRoundTrip } =
    useAppSelector(ticketDataSelector);

  return (
    <div className={styles.container}>
      <div className={styles.tickets}>
        <Ticket
          label={ticketsData.departureData.label}
          logo={ticketsData.departureData.logoSrc}
          companyName={ticketsData.departureData.companyName}
          airports={ticketsData.departureData.airports}
          from={departureCity}
          to={arrivalCity}
          fromDate={departureDate}
          toDate={departureDate}
          times={ticketsData.departureData.times}
        />
        {isRoundTrip && ticketsData.returnData && (
          <Ticket
            label={ticketsData.returnData.label}
            logo={ticketsData.returnData.logoSrc}
            companyName={ticketsData.returnData.companyName}
            airports={ticketsData.returnData.airports}
            from={arrivalCity}
            to={departureCity}
            fromDate={returnDate}
            toDate={returnDate}
            times={ticketsData.returnData.times}
          />
        )}
      </div>
      <div className={styles.price}>
        {ticketsData.departureData.price +
          (isRoundTrip && ticketsData.returnData ? ticketsData.returnData.price : 0)}
        &#8381;
      </div>
    </div>
  );
};

export default TicketsBlock;
