export const MILLISECONDS = (value = 1) => ({
  inSeconds: value / 1000,
  inMilliseconds: value,
});

export const SECONDS = (value = 1) => MILLISECONDS(value * 1000);

export const MINUTES = (value = 1) => SECONDS(value * 60);

export const HOURS = (value = 1) => MINUTES(value * 60);

export const DAYS = (value = 1) => HOURS(value * 24);
