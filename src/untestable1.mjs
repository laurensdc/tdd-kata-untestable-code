const millisPerDay = 24 * 60 * 60 * 1000;

export function daysUntilChristmas(today) {
  const theYearWereTalkingAbout = today.getFullYear()
  const christmasDay = new Date(theYearWereTalkingAbout, 12 - 1, 25);
  if (today.getTime() > christmasDay.getTime()) {
    christmasDay.setFullYear(new Date().getFullYear() + 1);
  }
  const diffMillis = christmasDay.getTime() - today.getTime();
  return Math.floor(diffMillis / millisPerDay);
}
