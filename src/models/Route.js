function createPath(start, dest) {
  return `${start}${dest}`;
}

class Route {
  constructor(cost = 0, visitedPaths = [], option = {}) {
    this.cost = cost;
    this.visitedPaths = visitedPaths;

    this.addCost.bind(this);
    this.addVisitedPath.bind(this);
    this.isOverMaxRevisit.bind(this);
    this.isOverMaxVisit.bind(this);
    this.isReachMaxCost.bind(this);
  }

  addCost(cost) {
    this.cost += cost;
  }

  addVisitedPath(start, dest) {
    this.visitedPaths.push(createPath(start, dest));
  }

  isOverMaxRevisit(start, dest, limit = 1) {
    const path = createPath(start, dest);

    // when limit more than 1, we have to count it
    if (limit > 1) {
      let counter = 0;
      for (let p of this.visitedPaths) {
        if (path === p) {
          counter++;
        }

        // when meet the limit, return true
        if (counter > limit) {
          return true;
        }
      }

      // otherwise, return false
      return false;
    }

    return this.visitedPaths.includes(path);
  }

  isOverMaxVisit(maxVisit) {
    return this.visitedPaths.length > maxVisit;
  }

  isReachMaxCost(maxCost) {
    return this.cost >= maxCost;
  }

  static copy(route) {
    return new Route(route.cost, [...route.visitedPaths]);
  }
}

export default Route;
