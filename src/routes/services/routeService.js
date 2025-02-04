export function findFastestRoute(linehaulRoutes, start, end) {
  const graph = buildGraph(linehaulRoutes);
  const { distances, previous } = dijkstra(graph, start);

  const path = [];
  let currentNode = end;

  while (currentNode) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  const travelTimeSeconds = distances[end];
  return { path, travel_time_seconds: travelTimeSeconds };
}

function buildGraph(routes) {
  const graph = {};

  routes.forEach(({ from, to, travel_time_seconds }) => {
    if (!graph[from]) graph[from] = {};
    if (!graph[to]) graph[to] = {};

    graph[from][to] = travel_time_seconds;
    graph[to][from] = travel_time_seconds; // Assuming bidirectional routes
  });

  return graph;
}

function dijkstra(graph, start) {
  const distances = {};
  const previous = {};
  const queue = new Set(Object.keys(graph));

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity;
    previous[node] = null;
  });

  distances[start] = 0;

  while (queue.size) {
    const currentNode = [...queue].reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode
    );

    queue.delete(currentNode);

    Object.keys(graph[currentNode]).forEach((neighbor) => {
      const alt = distances[currentNode] + graph[currentNode][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = currentNode;
      }
    });
  }

  return { distances, previous };
}
