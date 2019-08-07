# Sample-DFS

[![Build Status](https://api.cirrus-ci.com/github/samtade/sample-dfs.svg?task=test)](https://cirrus-ci.com/github/samtade/sample-dfs)
[![Coverage Status](https://coveralls.io/repos/github/samtade/sample-dfs/badge.svg?branch=master)](https://coveralls.io/github/taniarascia/chip8?branch=master)

This is a simple depth first search with some utilities
such as `findCheapestCost`, `findNumberOfPossibleRoute`,
and `findTotalCost`

## Quick example

### Node

```javascript
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

## Methods

### findNumberOfPossibleRoute(start, dest, option)

fins all possible route start to destination with option that can let you be able to set maximum visited path,
maximum revisit the same node, and maximum cost.

```
// first node to traverse through
start: string

// last node to traverse
dest: string

// option to find node
optionx: {
    maxVisit: number,
    maxRevisit: number,
    maxCost: number
}
```

### findTotalCost(visitedNodes)

take array of node, then it returns the total cost to traverse all the nodes consequently

```
// array of node to visit
visitedNodes: string[]
```

### findCheapestCost(start, dest)

find the cheapest cost from start to destination

```
// first node to traverse through
start: string

// last node to traverse
dest: string
```
