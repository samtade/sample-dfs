class MapCreator {
  /**
   *
   * @param {string} pathPattern Regular expression with 3 groups
   */
  constructor(pathPattern) {
    this.pathRegex = new RegExp(pathPattern);

    this.createMap.bind(this);
  }

  createMap(paths) {
    return paths.reduce((map, path) => {
      const matches = this.pathRegex.exec(path);
      const start = matches[1];
      const dest = matches[2];
      const cost = parseInt(matches[3], 10);

      if (!map.get(start)) {
        map.set(start, new Map([[dest, cost]]));
      } else {
        map.get(start).set(dest, cost);
      }

      return map;
    }, new Map());
  }
}

export default MapCreator;
