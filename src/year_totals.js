let json = [
  { year: 1965, area: 1099.0223 },
  { year: 1966, area: 1670.2365 },
  { year: 1967, area: 582.1287 },
  { year: 1968, area: 1097.5577 },
  { year: 1969, area: 2024.9819 },
  { year: 1970, area: 1844.9197 },
  { year: 1971, area: 2546.677 },
  { year: 1972, area: 3059.3645 },
  { year: 1973, area: 3315.8349 },
  { year: 1974, area: 2833.496 },
  { year: 1975, area: 2158.0066 },
  { year: 1976, area: 3468.2564 },
  { year: 1977, area: 3463.31 },
  { year: 1978, area: 4180.1096 },
  { year: 1979, area: 3688.0585 },
  { year: 1980, area: 4765.6603 },
  { year: 1981, area: 2995.4953 },
  { year: 1982, area: 4361.5631 },
  { year: 1983, area: 4910.7419 },
  { year: 1984, area: 4017.3637 },
  { year: 1985, area: 6889.0987 },
  { year: 1986, area: 5933.7729 },
  { year: 1987, area: 6479.7968 },
  { year: 1988, area: 8891.1402 },
  { year: 1989, area: 8425.9446 },
  { year: 1990, area: 8826.9097 },
  { year: 1991, area: 7781.7515 },
  { year: 1992, area: 5996.7444 },
  { year: 1993, area: 5766.8137 },
  { year: 1994, area: 4409.392 },
  { year: 1995, area: 4723.9523 },
  { year: 1996, area: 4741.8644 },
  { year: 1997, area: 4688.4289 },
  { year: 1998, area: 4728.1992 },
  { year: 1999, area: 5136.8238 },
  { year: 2000, area: 4492.6541 },
  { year: 2001, area: 4625.1313 },
  { year: 2002, area: 5605.0688 },
  { year: 2003, area: 4808.4814 },
  { year: 2004, area: 4975.6314 },
  { year: 2005, area: 5379.6663 },
  { year: 2006, area: 5658.5669 },
  { year: 2007, area: 3136.6124 },
  { year: 2008, area: 2598.6493 },
  { year: 2009, area: 2049.8383 },
  { year: 2010, area: 4083.8741 },
  { year: 2011, area: 6446.5565 },
  { year: 2012, area: 6267.632 },
  { year: 2013, area: 7299.2523 },
  { year: 2014, area: 7779.6176 },
  { year: 2015, area: 6667.1779 },
  { year: 2016, area: 7671.2259 },
  { year: 2017, area: 7413.3368 },
  { year: 2018, area: 7162.459 },
  { year: 2019, area: 6164.2771 },
  { year: 2020, area: 1835.5249 },
];

let data = json.map((obj) => {
  return {
    year: obj.year,
    total: obj.area,
  };
});

// const data = csv
//   .split("\n")
//   .slice(1)
//   .map((str) => {
//     const [x, old, second, y] = str.split(",").map(parseFloat);
//     return { x, old, second, y };
//   });

export default data;
