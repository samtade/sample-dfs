import MapCreator from './MapCreator';

const samplePaths = ['AB1', 'AC4', 'AD10', '​BE3', '​CD4', '​CF2'];

describe('MapCreator', () => {
  describe.each([['(\\w)(\\w)(\\d+)']])(
    'when pattern pattern %s',
    pathPattern => {
      const creator = new MapCreator(pathPattern);

      describe('createMap', () => {
        test('create map', () => {
          const map = creator.createMap(samplePaths);

          ['A', 'B', 'C'].forEach(k => {
            expect(map.keys()).toContain(k);
          });

          [{ B: 1 }, { C: 4 }, { D: 10 }].forEach(k => {
            const key = Object.keys(k)[0];

            expect(map.get('A').keys()).toContain(key);
            expect(map.get('A').get(key)).toBe(k[key]);
          });
        });
      });
    }
  );
});
