const rotations = {
  1: {
    default: [
      { id: "S", x: 83.33, y: 75 },      
      { id: "OH1", x: 83.33, y: 16.67 },    
      { id: "M", x: 54.17, y: 16.67 },     
      { id: "OP", x: 25, y: 16.67 },     
      { id: "OH2", x: 25, y: 75 },    
      { id: "L", x: 54.17, y: 75 },      
    ],
    serve: [
      { id: "S", x: 83.33, y: 125 },    
      { id: "OH1", x: 66.67, y: 16.67 },     
      { id: "M", x: 54.17, y: 4.17 },     
      { id: "OP", x: 41.67, y: 16.67 },    
      { id: "OH2", x: 54.17, y: 95.83 },      
      { id: "L", x: 83.33, y: 45.83 }       
    ],
    receive: [
      { id: "S", x: 96.67, y: 87.5 },      
      { id: "OH1", x: 83.33, y: 75 },    
      { id: "M", x: 12.5, y: 25 },     
      { id: "OP", x: 2.5, y: 8.33 },     
      { id: "OH2", x: 25, y: 75 },    
      { id: "L", x: 54.17, y: 75 }       
    ]
  },
  2: {
    default: [
      { id: "OH1", x: 83.33, y: 75 },      
      { id: "M", x: 83.33, y: 16.67 },    
      { id: "OP", x: 54.17, y: 16.67 },     
      { id: "OH2", x: 25, y: 16.67 },     
      { id: "L", x: 25, y: 75 },    
      { id: "S", x: 54.17, y: 75 }, 
    ],
    serve: [ 
      { id: "OH1", x: 83.33, y: 125 },    
      { id: "M", x: 54.17, y: 4.17 },     
      { id: "OP", x: 46.67, y: 25 },     
      { id: "OH2", x: 25, y: 4.17 },    
      { id: "L", x: 25, y: 45.83 },      
      { id: "S", x: 83.33, y: 45.83 }        
    ],
    receive: [
      // You'll need to provide the data here if you want me to convert it too!
    ],
  },
  // rotations 3–6 need similar treatment if you provide them
};

export default rotations;