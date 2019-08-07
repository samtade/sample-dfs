import DeliveryService from './main';
import MapCreator from './helpers/MapCreator';

const mockCreateMap = jest.fn(
  () =>
    new Map([
      ['A', new Map([['B', 1], ['C', 4], ['D', 10]])],
      ['B', new Map([['E', 3]])],
      ['C', new Map([['D', 4], ['F', 2]])],
      ['D', new Map([['E', 1]])],
      ['E', new Map([['B', 3], ['A', 2]])],
      ['F', new Map([['D', 1]])],
    ])
);

jest.mock('./helpers/MapCreator', () => {
  return jest.fn().mockImplementation(() => {
    return {
      createMap: mockCreateMap,
    };
  });
});

describe('DeliveryService', () => {
  const service = new DeliveryService();

  it('call a map creator to create a map', () => {
    expect(MapCreator).toHaveBeenCalled();
    expect(mockCreateMap).toHaveBeenCalled();
  });

  // TODO - add more test cases
  describe('findNumberOfPossibleRoute', () => {
    test.each([
      ['E', 'D', { maxVisit: 4 }, 4],
      ['E', 'E', {}, 5],
      ['E', 'E', { maxCost: 20, maxRevisit: 2 }, 29],
    ])(
      'find a correct number of possible route from %s to %s with option, $p',
      (start, dest, option, expectedResult) => {
        const result = service.findNumberOfPossibleRoute(start, dest, option);

        expect(result).toBe(expectedResult);
      }
    );
  });

  describe('findCheapestCost', () => {
    test.each([['E', 'D', 9], ['E', 'E', 6]])(
      'find the cheapest cost from %s to %s',
      (start, dest, cheapestCost) => {
        const cost = service.findCheapestCost(start, dest);

        expect(cost).toBe(cheapestCost);
      }
    );
  });

  describe('findTotalCost', () => {
    test.each([
      [4, ['A', 'B', 'E']],
      [10, ['A', 'D']],
      [8, ['E', 'A', 'C', 'F']],
      [0, []],
      [0, ['A', 'A', 'A', 'A']],
      ['No Such Route', ['A', 'D', 'F']],
    ])('get %i for route %p', (expectedCost, nodes) => {
      const cost = service.findTotalCost(nodes);

      expect(cost).toBe(expectedCost);
    });

    describe('when no map', () => {
      it('break', () => {
        const service = new DeliveryService();
        service.map = new Map();

        const result = service.findTotalCost(['Z', 'Z']);

        expect(result).toBe('No Such Route');
      });
    });

    describe('when input an invalid route', () => {
      test.each([{}, null, 'ABE'])('thrown an error for %p', invalidRoute => {
        expect(() => service.findTotalCost(invalidRoute)).toThrow(/Invalid/);
      });
    });
  });
});
