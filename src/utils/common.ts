export function convertHoursToHHMMSS(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.floor((hours - wholeHours) * 60);
  const seconds = Math.round(((hours - wholeHours) * 60 - minutes) * 60);

  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');

  return `${wholeHours}:${paddedMinutes}:${paddedSeconds}`;
}

export function fromMillisecondsToHour(val: number) {
  return val / (3600 * 1000);
}