let json = [{"year":1961,"area":1.6181},{"year":1965,"area":5.5101},{"year":1968,"area":121.1538},{"year":1969,"area":239.1337},{"year":1970,"area":749.3005},{"year":1971,"area":109.2418},{"year":1973,"area":452.3092},{"year":1974,"area":148.8469},{"year":1975,"area":10.5199},{"year":1976,"area":46.009},{"year":1977,"area":167.0616},{"year":1978,"area":8.5302},{"year":1980,"area":65.3762},{"year":1981,"area":52.362},{"year":1982,"area":139.1002},{"year":1983,"area":77.1708},{"year":1984,"area":29.6352},{"year":1985,"area":82.7758},{"year":1986,"area":179.0956},{"year":1987,"area":48.1706},{"year":1988,"area":11.1381},{"year":1989,"area":0.0042},{"year":1990,"area":8.0716},{"year":1991,"area":261.8296},{"year":1992,"area":136.6294},{"year":1993,"area":427.2501},{"year":1994,"area":241.7058},{"year":1995,"area":99.8286},{"year":1996,"area":271.7535},{"year":1997,"area":61.4812},{"year":1998,"area":57.7705},{"year":1999,"area":8.5765},{"year":2000,"area":33.5489},{"year":2001,"area":7.2883},{"year":2002,"area":32.8736},{"year":2003,"area":46.6481},{"year":2004,"area":171.0239},{"year":2005,"area":70.0171},{"year":2006,"area":26.4733},{"year":2007,"area":280.2305},{"year":2008,"area":196.2516},{"year":2009,"area":444.1409},{"year":2010,"area":96.1696},{"year":2011,"area":324.1769},{"year":2012,"area":120.4163},{"year":2013,"area":469.0969},{"year":2014,"area":277.6567},{"year":2015,"area":504.3242},{"year":2016,"area":471.9348},{"year":2017,"area":174.2566},{"year":2018,"area":223.2456},{"year":2019,"area":904.7862},{"year":2020,"area":22.4352},{"year":2025,"area":26.5098}]

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
