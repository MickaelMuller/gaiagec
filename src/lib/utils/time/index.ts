export const MILLISECONDS = (value = 1) => ({
  inDays: value / 1000 / 60 / 60 / 24,
  inHours: value / 1000 / 60 / 60,
  inMinutes: value / 1000 / 60,
  inSeconds: value / 1000,
  inMilliseconds: value,
});

export const SECONDS = (value = 1) => MILLISECONDS(value * 1000);

export const MINUTES = (value = 1) => SECONDS(value * 60);

export const HOURS = (value = 1) => MINUTES(value * 60);

export const DAYS = (value = 1) => HOURS(value * 24);

export const MONTHS = (value = 1) => DAYS(value * 30);
