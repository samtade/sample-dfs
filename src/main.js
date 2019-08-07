import MapCreator from './helpers/MapCreator';
import Route from './models/Route';

class DeliveryService {
  /**
   * create a delivery service by input paths
   *
   * @param {string} paths Input paths
   */
  constructor(paths) {
    const mapCreator = new MapCreator('(\\w)(\\w)(\\d+)');

    this.map = mapCreator.createMap(paths);

    this.findCost.bind(this);
    this.findCheapestCost.bind(this);
    this.findNumberOfPossibleRoute.bind(this);
    this.findPossibleRoutes.bind(this);
  }

  /**
   * find possible routes from start to destination
   *
   * @param {string} dest Destination node name
   * @param {string} node Current node name
   * @param {Route} curRoute Current route
   * @param {Object} [option] Routing option
   * @param {number} [option.maxVisit] Maximum path that it can visit
   * @param {number} [option.maxRevisit] Maximum revisit
   * @param {number} [option.maxCost] Maximum cost
   * @param {boolean} [option.allPossible] Don't when reach the destination
   * @param {Route[]} [routes=] All possible routes
   *
   * @return {Route[]} All possible routes
   */
  findPossibleRoutes(dest, node, curRoute, option = {}, routes = []) {
    // iterate through child nodes
    for (let [childNode, cost] of this.map.get(node)) {
      const { maxVisit, maxRevisit, maxCost } = option;

      // skip if already use this path
      if (curRoute.isOverMaxRevisit(node, childNode, maxRevisit)) {
        continue;
      }

      // create a new route with updating cost and visited path
      const newRoute = Route.copy(curRoute);
      newRoute.addCost(cost);
      newRoute.addVisitedPath(node, childNode);

      if (!!maxVisit && newRoute.isOverMaxVisit(maxVisit)) {
        continue;
      }

      if (!!maxCost && newRoute.isReachMaxCost(maxCost)) {
        continue;
      }

      // when reach the destination, push the new route to the result routes
      if (dest === childNode) {
        routes.push(newRoute);
        // in case, to not stop when reach the destination
        if (!maxRevisit) {
          continue;
        }
      }

      // try to find possible routes for this child node
      this.findPossibleRoutes(dest, childNode, newRoute, option, routes);
    }

    return routes;
  }

  /**
   * find the cheapest cost from start to destination
   *
   * @param {string} start Starting node
   * @param {string} dest Destination node
   *
   * @returns {number} The cheapest cost
   */
  findCheapestCost(start, dest) {
    const routes = this.findPossibleRoutes(dest, start, new Route());

    // TODO - handle edge cases
    return routes.sort((a, b) => a.cost - b.cost)[0].cost;
  }

  /**
   * find a number of possible routes
   *
   * @param {string} start Root node name
   * @param {string} dest Destination node name
   * @param {Object} [option] Routing option
   * @param {number} [option.maxVisit] Maximum path that it can visit
   * @param {number} [option.maxRevisit] Maximum revisit
   * @param {number} [option.maxCost] Maximum cost
   * @param {boolean} [option.allPossible] Don't when reach the destination
   *
   * @return {number} Number of possible routes
   */
  findNumberOfPossibleRoute(start, dest, option) {
    const routes = this.findPossibleRoutes(dest, start, new Route(), option);

    return routes.length;
  }

  /**
   * find total cost for visiting all nodes consequently
   *
   * @param {string[]} nodes Array of nodes to be calculated
   * @return {number|string} Total cost or error message
   */
  findCost(nodes) {
    // handle invalid route
    if (!nodes || !Array.isArray(nodes)) {
      throw new Error(`Invalid route: ${nodes}`);
    }

    const context = {
      totalCost: 0,
      start: nodes[0],
      map: this.map,
    };

    const isSuccess = nodes.every(function calculateCost(node) {
      // when no map's defined, should break
      if (!this.map.has(this.start)) {
        return false;
      }

      // when travel to same node, should cost nothing
      if (node === this.start) {
        this.totalCost += 0;
        return true;
      }

      // when no directed path to node, should break
      const cost = this.map.get(this.start).get(node);
      if (!cost) {
        return false;
      }

      // add cost and update start node
      this.totalCost += cost;
      this.start = node;
      return true;
    }, context);

    return isSuccess ? context.totalCost : 'No Such Route';
  }
}

export default DeliveryService;
