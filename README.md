# Sample-DFS

This is a simple depth first search with some utilities
such as `findCheapestCost`, `findNumberOfPossibleRoute`,
and `findTotalCost`

### Example

```$xslt
import DeliveryService from '../../src/main';

const samplePaths = [
  'AB1',
  'AC4',
  'AD10',
  '​BE3',
  '​CD4',
  '​CF2',
  '​DE1',
  '​EB3',
  '​EA2',
  '​FD1',
];

const service = new DeliveryService(samplePaths);

const numberOfRoute = service.findNumberOfPossibleRoute('E', 'E', {
  maxCost: 20,
  maxRevisit: 2,
});

const totalCost = service.findTotalCost(['E', 'A', 'C', 'F']);

const cheapestCost = service.findCheapestCost('E', 'E');

```

