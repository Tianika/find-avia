import { TimesType } from './types';

export const getCurrentDate = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${date.getFullYear()}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
};

export const getFormatDate = (date: string) => {
  const formatDate = new Date(date);

  const month = formatDate.getMonth() + 1;
  const day = formatDate.getDate();

  return `${day < 10 ? '0' : ''}${day}.${
    month < 10 ? '0' : ''
  }${month}.${formatDate.getFullYear()}`;
};

export const getTimeToString = (time: TimesType) => {
  let hour = 0;
  let minutes = 0;

  const [hour1, minutes1] = time.fromTime.split(':');
  const [hour2, minutes2] = time.toTime.split(':');

  if (+minutes2 >= +minutes1) {
    minutes = +minutes2 - +minutes1;
    hour = +hour2 - +hour1;
  } else {
    minutes = 60 + +minutes2 - +minutes1;
    hour = +hour2 - +hour1 - 1;
  }

  return `В пути ${hour} ч ${minutes} мин`;
};
