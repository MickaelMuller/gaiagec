import dayjs from 'dayjs';

const diffInDaysFromNow = (date: Date | string): number => {
  const dateNow = dayjs();
  const dateExpiration = dayjs(date);

  return dateExpiration.diff(dateNow, 'day');
};

export default diffInDaysFromNow;
