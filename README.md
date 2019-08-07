# Sample-DFS

[![Build Status](https://api.cirrus-ci.com/github/samtade/sample-dfs.svg?task=test)](https://cirrus-ci.com/github/samtade/sample-dfs)
[![Coverage Status](https://coveralls.io/repos/github/samtade/sample-dfs/badge.svg?branch=master)](https://coveralls.io/github/taniarascia/chip8?branch=master)

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

