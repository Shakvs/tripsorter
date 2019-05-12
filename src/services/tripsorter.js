import data from './../dataproviders/fares.json';

var departure= []; var arrival = [];var departureList= []; var arrivalList = [];
for(var i=0;i<data.deals.length;i++){
   if(data.deals[i].departure && !departure.includes(data.deals[i].departure) ){      
      departure.push(data.deals[i].departure);
   }
   if(data.deals[i].arrival && !arrival.includes(data.deals[i].arrival) ){    
      arrival.push(data.deals[i].arrival);
   }
}
var departureList= (Array.from(new Set(departure)));
var arrivalList= (Array.from(new Set(arrival)));

console.log(departureList);
console.log(arrivalList);

class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {};
  }
  
  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }
  
  addEdge(node1, node2, meta){
    this.adjacencyList[node1].push({node:node2, meta: meta});
  }
  
  getAdjacencyList(node){
    return this.adjacencyList[node];
  }
}

class PriorityQueue{
   constructor(){
       this.queue = [];
   }
  
  
   enqueue(node, label){
     if(!this.queue.length){
       this.queue.push(node);
       return;
     }
     var length = this.queue.push(node), pos, parent;
     pos = length-1;
     if(pos % 2 === 0){
       parent = Math.floor(pos/2)-1;
     } else {
       parent = Math.floor(pos/2);
     }
     
     while((parent > pos)  && this.queue[pos][1] < this.queue[parent][1]){
        var temp = this.queue[pos];
             this.queue[pos] = this.queue[parent];
             this.queue[parent] = temp;
             pos = parent;
       
       if(pos % 2 === 0){
         parent = Math.floor(pos/2)-1;
       } else {
         parent = Math.floor(pos/2);
       } 
     }
  }
  
  dequeue(node){
      return this.queue.shift();
  }
  
  isEmpty(){
    return !this.queue.length;
  }
}


var graph = new Graph();

var nodes = []; 

for(var i=0;i<data.deals.length;i++){
   if(data.deals[i].departure && nodes.indexOf(data.deals[i].departure) === -1){
      nodes.push(data.deals[i].departure);
      departure.push(data.deals[i].departure);
   }
   if(data.deals[i].arrival && nodes.indexOf(data.deals[i].arrival) === -1){
     nodes.push(data.deals[i].arrival);
      arrival.push(data.deals[i].arrival);
   }
}


for(var i=0;i<nodes.length;i++){
   graph.addNode(nodes[i]);
}

for(var i=0;i<data.deals.length;i++){
   graph.addEdge(data.deals[i].departure, data.deals[i].arrival, data.deals[i]);
}


class DijkstrasAlgorithm {
    constructor(){
      this.priorityQueue = new PriorityQueue();
      this.nodes = nodes;
    }  
    run(graph, node, endNode, label, discount){
      var currNode, startNode, adjacencyList, costs = {}, backtrace = {}, totalcost=0;
     
      label = label || 'cost';
     // console.log('Costs');
    //  console.log(costs);
      for(var i=0;i<this.nodes.length;i++){
         costs[this.nodes[i]] = {};
         costs[this.nodes[i]].cost = Infinity;
         costs[this.nodes[i]].done = false;
         costs[this.nodes[i]].path = {};
      }
      costs[node].cost = 0;
      this.priorityQueue.enqueue([node,0]);
      //console.log(graph.adjacencyList)
      while(!this.priorityQueue.isEmpty()){
        currNode = this.priorityQueue.dequeue(),
        adjacencyList = graph.getAdjacencyList(currNode[0]);
        if(costs[currNode[0]].done){
            continue;
        }
        for(var i=0;i<adjacencyList.length;i++){
          var neighborNode =  adjacencyList[i]['node'],
              edgeWeight = adjacencyList[i]['meta'].cost,
              transport = adjacencyList[i]['meta'].transport,

              time = adjacencyList[i]['meta']['duration'].h + ' hrs ' + adjacencyList[i]['meta']['duration'].m +' mnts' ,
              travelcost= adjacencyList[i]['meta'].cost;
              if(discount)
              { travelcost -=  adjacencyList[i]['meta'].discount ;
                if(travelcost<0)
                  travelcost=0;
              }
              var reference = adjacencyList[i]['meta'].reference;
                 
          if(discount){
            edgeWeight -= (edgeWeight*((adjacencyList[i]['meta'].discount)/100))

          }
          //console.log(label)
          if(label === 'duration'){
            edgeWeight = parseInt(adjacencyList[i]['meta'][label].h)*60 + parseInt(adjacencyList[i]['meta'][label].m);

            console.log('edgeWeight')
            console.log(edgeWeight);
          }
          var cost = edgeWeight + costs[currNode[0]].cost;
        
          if(cost < costs[neighborNode].cost){
            costs[neighborNode].cost = cost;
            costs[neighborNode].transport = transport;
            costs[neighborNode].travelcost = travelcost;
            costs[neighborNode].duration = time;
            costs[neighborNode].reference = reference;
            costs[neighborNode].path = { from: currNode[0], weight: edgeWeight }
          }
           //console.log('costs final');
          // console.log(costs);
          if(!costs[neighborNode].done){
            this.priorityQueue.enqueue([neighborNode,cost]);
          }
        }
        costs[currNode[0]].done = true;
      }
      
 // trace the shortest path from node to endNode
      var currNod = endNode;
      var trace = [];
      trace.push({node:currNod, weight: '', transport: '' ,travelcost:'' , duration:'' , reference:'' });
      while(currNod){
        currNod = costs[currNod].path.from
        var prevNod = costs[trace[0].node];
        if(currNod){
         //console.log('prevNod'); console.log(prevNod);
          trace.unshift({node: currNod, weight:  prevNod.path.weight, route: prevNod.transport , travelcost: prevNod.travelcost , duration: prevNod.duration , reference: prevNod.reference })
        }
      }

      trace.forEach(function(item, index) {
         if (index < trace.length - 1) {
        console.log("nextnode: " + trace[index + 1].node);
         item.nextnode =trace[index + 1].node;
         totalcost += parseInt(item.travelcost);
         item.totalcost=totalcost;
        }
      });

console.log(trace);
    return trace;
    }
}

var algo = new DijkstrasAlgorithm();
export { algo ,graph ,departureList, arrivalList};

/*
var discount = true;
algo.run(graph,"London", "Istanbul", '', discount);*/