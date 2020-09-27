let json = [{"year":1961,"area":1.6},{"year":1965,"area":5.5},{"year":1968,"area":121.2},{"year":1969,"area":239.1},{"year":1970,"area":849.1,"bare":730.4},{"year":1971,"area":109.2},{"year":1972,"area":23.5,"bare":23.5},{"year":1973,"area":452.1,"bare":1.8},{"year":1974,"area":148.9},{"year":1975,"area":10.6,"bare":8.2},{"year":1976,"area":46},{"year":1977,"area":167.1,"bare":76.2},{"year":1978,"area":8.5},{"year":1980,"area":65.5,"bare":12.7},{"year":1981,"area":52.4,"bare":8},{"year":1982,"area":140.7,"bare":37.8},{"year":1983,"area":77.1,"bare":16.9},{"year":1984,"area":30.5,"bare":0.9},{"year":1985,"area":82.8},{"year":1986,"area":220.1,"bare":41.1},{"year":1987,"area":203.2,"bare":113.1},{"year":1988,"area":20.8,"bare":9.7},{"year":1989,"area":269.6,"bare":217},{"year":1990,"area":69.6,"bare":7.1},{"year":1991,"area":262.8},{"year":1992,"area":156.9,"bare":8.8},{"year":1993,"area":429.1,"bare":1.9},{"year":1994,"area":260.9,"bare":7.4},{"year":1995,"area":102.2,"bare":4},{"year":1996,"area":272},{"year":1997,"area":61.7},{"year":1998,"area":109.5,"bare":46.5},{"year":1999,"area":8.6},{"year":2000,"area":36.9,"bare":0.6},{"year":2001,"area":7.3},{"year":2002,"area":32.9,"bare":0},{"year":2003,"area":46.7},{"year":2004,"area":173.5,"bare":2.3},{"year":2005,"area":53.8},{"year":2006,"area":26.5},{"year":2007,"area":279.2},{"year":2008,"area":181.7,"bare":2.6},{"year":2009,"area":444.9,"bare":0.2},{"year":2010,"area":105.6,"bare":2},{"year":2011,"area":325.7,"bare":0},{"year":2012,"area":120.9,"bare":0},{"year":2013,"area":469.1,"bare":3.2},{"year":2014,"area":282.1,"bare":0.2},{"year":2015,"area":506.7,"bare":0},{"year":2016,"area":472.8,"bare":0.5},{"year":2017,"area":36.5},{"year":2018,"area":223.2,"bare":0.3},{"year":2019,"area":98,"bare":0},{"year":2020,"area":963.7,"planned":802.4,"bare":34.6}]

let data = json.map((obj) => {
  return {
    year: obj.year,
    planned: obj.planned,
    bare: obj.bare,
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
