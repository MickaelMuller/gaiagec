import { Dayjs } from 'dayjs';

type FromISOToReadableDate = {
  date: Date | string;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
};

export const fromISOToReadableDate = ({
  date,
  locale = 'fr-FR',
  options,
}: FromISOToReadableDate) => {
  try {
    if (date) {
      const dateObj = new Date(date);

      return new Intl.DateTimeFormat(locale, options).format(dateObj);
    }
  } catch (error) {
    throw new Error('bad date format');
  }

  return '';
};

export const formatDateApi = (date: Dayjs) => date.format('YYYY-MM-DDTHH:mm:ss');
