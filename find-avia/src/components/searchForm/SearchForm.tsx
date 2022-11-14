import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { changeFlightData } from '../../redux/reducers/TicketsSlice';
import {
  INPUT_LABELS,
  INPUT_TYPES,
  ROUTER_MAP,
  TEXT_VALIDATE_PATTERN,
} from '../../utils/constants';
import { getCurrentDate, getFormatDate } from '../../utils/helpers';
import { BUTTONS, LABELS, PLACEHOLDERS, VALIDATE_MESSAGES } from '../../utils/locales';
import { TicketDataType } from '../../utils/types';
import styles from './SearchForm.module.scss';

const SearchForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentDate = getCurrentDate();

  const [flightData, setFlightData] = useState<Omit<TicketDataType, 'isRoundTrip'>>({
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    returnDate: '',
  });

  const [errors, setErrors] = useState({
    departureCity: false,
    arrivalCity: false,
    departureDate: false,
    returnDate: false,
  });

  const [departureDateType, setDepartureDateType] = useState(INPUT_TYPES.text);
  const [returnDateType, setReturnDateType] = useState(INPUT_TYPES.text);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    dispatch(
      changeFlightData({
        departureCity: flightData.departureCity,
        arrivalCity: flightData.arrivalCity,
        departureDate: getFormatDate(flightData.departureDate),
        returnDate: getFormatDate(flightData.returnDate),
        isRoundTrip: !!flightData.returnDate,
      })
    );
    navigate(`${ROUTER_MAP.avia}${ROUTER_MAP.info}`);
  };

  const changeFlightHandler = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const { target } = event;

    setFlightData({
      ...flightData,
      [key]: target.value,
    });

    setErrors({
      ...errors,
      [key]: target.validity.valid,
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputs}>
        <label htmlFor={INPUT_LABELS.departureCity}>
          {LABELS.departure}
          <input
            className={styles.textInput}
            type={INPUT_TYPES.text}
            placeholder={PLACEHOLDERS.departure}
            name={INPUT_LABELS.departureCity}
            pattern={TEXT_VALIDATE_PATTERN}
            title={VALIDATE_MESSAGES.onlyText}
            onChange={(event) => changeFlightHandler(event, INPUT_LABELS.departureCity)}
          />
          <p>{errors.departureCity}</p>
        </label>
        <label htmlFor={INPUT_LABELS.arrivalCity}>
          {LABELS.arrives}
          <input
            className={styles.textInput}
            type={INPUT_TYPES.text}
            placeholder={PLACEHOLDERS.arrives}
            name={INPUT_LABELS.arrivalCity}
            pattern={TEXT_VALIDATE_PATTERN}
            title={VALIDATE_MESSAGES.onlyText}
            onChange={(event) => changeFlightHandler(event, INPUT_LABELS.arrivalCity)}
          />
          <p>{errors.arrivalCity}</p>
        </label>
        <label htmlFor={INPUT_LABELS.departureDate}>
          {LABELS.oneWay}
          <input
            className={styles.dateInput}
            type={departureDateType}
            placeholder={PLACEHOLDERS.date}
            name={INPUT_LABELS.departureDate}
            min={currentDate}
            onChange={(event) => changeFlightHandler(event, INPUT_LABELS.departureDate)}
            onFocus={() => setDepartureDateType(INPUT_TYPES.date)}
            onBlur={() =>
              setDepartureDateType(flightData.departureDate ? INPUT_TYPES.date : INPUT_TYPES.text)
            }
          />
          <p>{errors.departureDate}</p>
        </label>
        <label htmlFor={INPUT_LABELS.returnDate}>
          {LABELS.roundTrip}
          <input
            className={styles.dateInput}
            type={returnDateType}
            placeholder={PLACEHOLDERS.date}
            name={INPUT_LABELS.returnDate}
            min={flightData.departureDate > currentDate ? flightData.departureDate : currentDate}
            onChange={(event) => changeFlightHandler(event, INPUT_LABELS.returnDate)}
            onFocus={() => setReturnDateType(INPUT_TYPES.date)}
            onBlur={() =>
              setReturnDateType(flightData.returnDate ? INPUT_TYPES.date : INPUT_TYPES.text)
            }
          />
        </label>
      </div>
      <div className={styles.buttonBlock}>
        <input
          className={styles.submitButton}
          type={INPUT_TYPES.submit}
          value={BUTTONS.findAvia}
          disabled={
            !(flightData.departureCity && flightData.arrivalCity && flightData.departureDate)
          }
        />
      </div>
    </form>
  );
};

export default SearchForm;
