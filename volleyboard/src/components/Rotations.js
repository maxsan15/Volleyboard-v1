const rotations = {
  1: {
    default: [
      { id: "S", x: 500, y: 450 },      //Position 1
      { id: "OH1", x: 500, y: 100 },    //Position 2
      { id: "M", x: 325, y: 100 },     //Position 3
      { id: "OP", x: 150, y: 100 },     //Position 4
      { id: "OH2", x: 150, y: 450 },    //Position 5
      { id: "L", x: 325, y: 450 },      //Position 6
    ],
    serve: [
      { id: "S", x: 500, y: 750 },    //Position 1
      { id: "OH1", x: 400, y: 100 },     //Position 2
      { id: "M", x: 325, y: 25 },     //Position 3
      { id: "OP", x: 250, y: 100 },    //Position 4
      { id: "OH2", x: 325, y: 575 },      //Position 5
      { id: "L", x: 500, y: 275 }       //Position 6
    ],
    receive: [
      { id: "S", x: 580, y: 525 },      //Position 1
      { id: "OH1", x: 500, y: 450 },    //Position 2
      { id: "M", x: 75, y: 150 },     //Position 3
      { id: "OP", x: 15, y: 50 },     //Position 4
      { id: "OH2", x: 150, y: 450 },    //Position 5
      { id: "L", x: 325, y: 450 }       //Position 6
    ]
  },
  2: {
    default: [
      { id: "OH1", x: 500, y: 450 },      //Position 1
      { id: "M", x: 500, y: 100 },    //Position 2
      { id: "OP", x: 325, y: 100 },     //Position 3
      { id: "OH2", x: 150, y: 100 },     //Position 4
      { id: "L", x: 150, y: 450 },    //Position 5
      { id: "S", x: 325, y: 450 }, 
    ],


    serve: [ 
      { id: "OH1", x: 500, y: 750 },    //Position 1
      { id: "M", x: 325, y: 25 },     //Position 2
      { id: "OP", x: 280, y: 150 },     //Position 3
      { id: "OH2", x: 150, y: 25 },    //Position 4
      { id: "L", x: 150, y: 275 },      //Position 5
      { id: "S", x: 500, y: 275 }        //Position 6
    ],
             
    receive: [/* ... */],
  },
  // rotations 3–6...
};

export default rotations;