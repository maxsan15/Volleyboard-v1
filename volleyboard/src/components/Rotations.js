const rotations = {
  1: {
    default: [
      { id: "S", x: 500, y: 450 },      //Position 1
      { id: "OH1", x: 500, y: 250 },    //Position 2
      { id: "M2", x: 400, y: 250 },     //Position 3
      { id: "OP", x: 300, y: 250 },     //Position 4
      { id: "OH2", x: 300, y: 450 },    //Position 5
      { id: "L", x: 400, y: 450 },
    ],
    serve: [
      { id: 'S', x: 100, y: 300 },
      { id: 'OH1', x: 200, y: 200 },
      { id: 'M2', x: 300, y: 200 },
      { id: 'OP', x: 400, y: 200 },
      { id: 'OH2', x: 200, y: 300 },
      { id: 'L', x: 300, y: 300 },
    ],
    receive: [
      { id: 'S', x: 100, y: 300 },
      { id: 'OH1', x: 200, y: 200 },
      { id: 'M2', x: 300, y: 200 },
      { id: 'OP', x: 400, y: 200 },
      { id: 'OH2', x: 200, y: 300 },
      { id: 'L', x: 300, y: 300 },
    ]
  },
  2: {
    default: [/* ... */],
    serve: [/* ... */],
    receive: [/* ... */],
  },
  // rotations 3–6...
};

export default rotations;