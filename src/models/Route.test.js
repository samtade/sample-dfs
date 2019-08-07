import Route from './Route';

describe('Route', () => {
  describe('addCost', () => {
    it.each([[10, 1], [0, 1]])('add cost [%i + %i]', (initialCost, cost) => {
      const route = new Route(initialCost);
      route.addCost(cost);

      expect(route.cost).toBe(initialCost + cost);
    });
  });

  describe('addVisitedPath', () => {
    it.each([[undefined, 'A', 'B'], [['AD', 'AB'], 'A', 'B']])(
      'add path, init: %p, start: %s, dest: %s',
      (initialPaths, start, dest) => {
        const route = new Route(0, initialPaths);
        route.addVisitedPath(start, dest);

        expect(route.visitedPaths).toContain('AB');
      }
    );
  });

  describe('isOverMaxRevisit', () => {
    it.each([
      [false, [], 'A', 'B', 1],
      [true, ['AB'], 'A', 'B', 1],
      [false, ['AB'], 'A', 'B', 2],
      [true, ['AB', 'AB', 'AB'], 'A', 'B', 2],
    ])(
      'return %p when init with %p and input %s%s with limit is %i',
      (expectedResult, init, start, dest, limit) => {
        const route = new Route(0, init);
        const result = route.isOverMaxRevisit(start, dest, limit);

        expect(result).toBe(expectedResult);
      }
    );
  });

  describe('isOverMaxVisit', () => {
    it.each([
      [false, [], 1],
      [false, ['AB'], 1],
      [true, ['AB'], 0],
      [true, ['AB', 'AB', 'AB'], 2],
    ])(
      'return %p when init with %p and max visit is %i',
      (expectedResult, init, maxVisit) => {
        const route = new Route(0, init);
        const result = route.isOverMaxVisit(maxVisit);

        expect(result).toBe(expectedResult);
      }
    );
  });

  describe('isReachMaxCost', () => {
    it.each([[false, 1, 1], [false, 2, 1], [true, 1, 0]])(
      'return %p when init with %p and max cost is %i',
      (expectedResult, init, maxCost) => {
        const route = new Route(0, init);
        const result = route.isReachMaxCost(maxCost);

        expect(result).toBe(expectedResult);
      }
    );
  });

  describe('copy', () => {
    it('create a new array', () => {
      const array = ['AB', 'AC'];
      const result = Route.copy(new Route(10, array));
      const salt = 'AD';

      array.push(salt);

      expect(result.visitedPaths).not.toContain(salt);
    });
  });
});
