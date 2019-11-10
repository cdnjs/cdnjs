(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// import
var Layer = require('./layer'),
    Network = require('./network'),
    Trainer = require('./trainer');

/*******************************************************************************************
                                        ARCHITECT
*******************************************************************************************/

// Colection of useful built-in architectures
var Architect = {

  // Multilayer Perceptron
  Perceptron: function Perceptron() {

    var args = Array.prototype.slice.call(arguments); // convert arguments to Array
    if (args.length < 3)
      throw "Error: not enough layers (minimum 3) !!";

    var inputs = args.shift(); // first argument
    var outputs = args.pop(); // last argument
    var layers = args; // all the arguments in the middle

    var input = new Layer(inputs);
    var hidden = [];
    var output = new Layer(outputs);

    var previous = input;

    // generate hidden layers
    for (level in layers) {
      var size = layers[level];
      var layer = new Layer(size);
      hidden.push(layer);
      previous.project(layer);
      previous = layer;
    }
    previous.project(output);

    // set layers of the neural network
    this.set({
      input: input,
      hidden: hidden,
      output: output
    });

    // trainer for the network
    this.trainer = new Trainer(this);
  },

  // Multilayer Long Short-Term Memory
  LSTM: function LSTM() {

    var args = Array.prototype.slice.call(arguments); // convert arguments to array
    if (args.length < 3)
      throw "Error: not enough layers (minimum 3) !!";

    var inputs = args.shift();
    var outputs = args.pop();
    var layers = args;

    var inputLayer = new Layer(inputs);
    var hiddenLayers = [];
    var outputLayer = new Layer(outputs);

    var previous = null;

    // generate layers
    for (var layer in layers) {
      // generate memory blocks (memory cell and respective gates)
      var size = layers[layer];

      var inputGate = new Layer(size).set({
        bias: 1
      });
      var forgetGate = new Layer(size).set({
        bias: 1
      });
      var memoryCell = new Layer(size);
      var outputGate = new Layer(size).set({
        bias: 1
      });

      hiddenLayers.push(inputGate);
      hiddenLayers.push(forgetGate);
      hiddenLayers.push(memoryCell);
      hiddenLayers.push(outputGate);

      // connections from input layer
      var input = inputLayer.project(memoryCell);
      inputLayer.project(inputGate);
      inputLayer.project(forgetGate);
      inputLayer.project(outputGate);

      // connections from previous memory-block layer to this one
      if (previous != null) {
        var cell = previous.project(memoryCell);
        previous.project(inputGate);
        previous.project(forgetGate);
        previous.project(outputGate);
      }

      // connections from memory cell
      var output = memoryCell.project(outputLayer);

      // self-connection
      var self = memoryCell.project(memoryCell);

      // peepholes
      memoryCell.project(inputGate, Layer.connectionType.ONE_TO_ONE);
      memoryCell.project(forgetGate, Layer.connectionType.ONE_TO_ONE);
      memoryCell.project(outputGate, Layer.connectionType.ONE_TO_ONE);

      // gates
      inputGate.gate(input, Layer.gateType.INPUT);
      forgetGate.gate(self, Layer.gateType.ONE_TO_ONE);
      outputGate.gate(output, Layer.gateType.OUTPUT);
      if (previous != null)
        inputGate.gate(cell, Layer.gateType.INPUT);

      previous = memoryCell;
    }

    // input to output direct connection
    inputLayer.project(outputLayer);

    // set the layers of the neural network
    this.set({
      input: inputLayer,
      hidden: hiddenLayers,
      output: outputLayer
    });

    // trainer
    this.trainer = new Trainer(this);
  },

  // Liquid State Machine
  Liquid: function Liquid(inputs, hidden, outputs, connections, gates) {

    // create layers
    var inputLayer = new Layer(inputs);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(outputs);

    // make connections and gates randomly among the neurons
    var neurons = hiddenLayer.neurons();
    var connectionList = [];

    for (var i = 0; i < connections; i++) {
      // connect two random neurons
      var from = Math.random() * neurons.length | 0;
      var to = Math.random() * neurons.length | 0;
      var connection = neurons[from].project(neurons[to]);
      connectionList.push(connection);
    }

    for (var j = 0; j < gates; j++) {
      // pick a random gater neuron
      var gater = Math.random() * neurons.length | 0;
      // pick a random connection to gate
      var connection = Math.random() * connectionList.length | 0;
      // let the gater gate the connection
      neurons[gater].gate(connectionList[connection]);
    }

    // connect the layers
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // set the layers of the network
    this.set({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer
    });

    // trainer
    this.trainer = new Trainer(this);
  },

  Hopfield: function Hopfield(size)
  {
    var inputLayer = new Layer(size);
    var outputLayer = new Layer(size);

    inputLayer.project(outputLayer, Layer.connectionType.ALL_TO_ALL);

    this.set({
      input: inputLayer,
      hidden: [],
      output: outputLayer
    });

    var trainer = new Trainer(this);

    var proto = Architect.Hopfield.prototype;

    proto.learn = proto.learn || function(patterns)
    {
      var set = [];
      for (var p in patterns)
        set.push({
          input: patterns[p],
          output: patterns[p]
        });

      return trainer.train(set, {
        iterations: 500000,
        error: .00005,
        rate: 1
      });
    }

    proto.feed = proto.feed || function(pattern)
    {
      var output = this.activate(pattern);

      var pattern = [];
      for (var i in output)
        pattern[i] = output[i] > .5 ? 1 : 0;

      return pattern;
    }
  }
}

// Extend prototype chain (so every architectures is an instance of Network)
for (var architecture in Architect) {
  Architect[architecture].prototype = new Network();
  Architect[architecture].prototype.constructor = Architect[architecture];
}

// export
if (module) module.exports = Architect; 


},{"./layer":2,"./network":3,"./trainer":6}],2:[function(require,module,exports){
// import
var Neuron = require('./neuron');

/*******************************************************************************************
                                            LAYER
*******************************************************************************************/

function Layer(size, label) {
  this.size = size | 0;
  this.list = [];
  this.label = label || null;

  while (size--) {
    var neuron = new Neuron();
    this.list.push(neuron);
  }
}

Layer.prototype = {

  // activates all the neurons in the layer
  activate: function(input) {

    var activations = [];

    if (typeof input != 'undefined') {
      if (input.length != this.size)
        throw "INPUT size and LAYER size must be the same to activate!";

      for (var id in this.list) {
        var neuron = this.list[id];
        var activation = neuron.activate(input[id]);
        activations.push(activation);
      }
    } else {
      for (var id in this.list) {
        var neuron = this.list[id];
        var activation = neuron.activate();
        activations.push(activation);
      }
    }
    return activations;
  },

  // propagates the error on all the neurons of the layer
  propagate: function(rate, target) {

    if (typeof target != 'undefined') {
      if (target.length != this.size)
        throw "TARGET size and LAYER size must be the same to propagate!";

      for (var id = this.list.length - 1; id >= 0; id--) {
        var neuron = this.list[id];
        neuron.propagate(rate, target[id]);
      }
    } else {
      for (var id = this.list.length - 1; id >= 0; id--) {
        var neuron = this.list[id];
        neuron.propagate(rate);
      }
    }
  },

  // projects a connection from this layer to another one
  project: function(layer, type, weights) {

    if (layer instanceof require('./network'))
      layer = layer.layers.input;

    if (layer instanceof Layer) {
      if (!this.connected(layer))
        return new Layer.connection(this, layer, type, weights);
    } else
      throw "Invalid argument, you can only project connections to LAYERS and NETWORKS!";


  },

  // gates a connection betwenn two layers
  gate: function(connection, type) {

    if (type == Layer.gateType.INPUT) {
      if (connection.to.size != this.size)
        throw "GATER layer and CONNECTION.TO layer must be the same size in order to gate!";

      for (var id in connection.to.list) {
        var neuron = connection.to.list[id];
        var gater = this.list[id];
        for (var input in neuron.connections.inputs) {
          var gated = neuron.connections.inputs[input];
          if (gated.ID in connection.connections)
            gater.gate(gated);
        }
      }
    } else if (type == Layer.gateType.OUTPUT) {
      if (connection.from.size != this.size)
        throw "GATER layer and CONNECTION.FROM layer must be the same size in order to gate!";

      for (var id in connection.from.list) {
        var neuron = connection.from.list[id];
        var gater = this.list[id];
        for (var projected in neuron.connections.projected) {
          var gated = neuron.connections.projected[projected];
          if (gated.ID in connection.connections)
            gater.gate(gated);
        }
      }
    } else if (type == Layer.gateType.ONE_TO_ONE) {
      if (connection.size != this.size)
        throw "The number of GATER UNITS must be the same as the number of CONNECTIONS to gate!";

      for (var id in connection.list) {
        var gater = this.list[id];
        var gated = connection.list[id];
        gater.gate(gated);
      }
    }
  },

  // true or false whether the whole layer is self-connected or not
  selfconnected: function() {

    for (var id in this.list) {
      var neuron = this.list[id];
      if (!neuron.selfconnected())
        return false;
    }
    return true;
  },

  // true of false whether the layer is connected to another layer (parameter) or not
  connected: function(layer) {
    // Check if ALL to ALL connection
    var connections = 0;
    for (var here in this.list) {
      for (var there in layer.list) {
        var from = this.list[here];
        var to = layer.list[there];
        var connected = from.connected(to);
        if (connected.type == 'projected')
          connections++;
      }
    }
    if (connections == this.size * layer.size)
      return Layer.connectionType.ALL_TO_ALL;

    // Check if ONE to ONE connection
    connections = 0;
    for (var neuron in this.list) {
      var from = this.list[neuron];
      var to = layer.list[neuron];
      var connected = from.connected(to);
      if (connected == 'projected')
        connections++;
    }
    if (connections == this.size)
      return Layer.connectionType.ONE_TO_ONE;
  },

  // clears all the neuorns in the layer
  clear: function() {
    for (var id in this.list) {
      var neuron = this.list[id];
      neuron.clear();
    }
  },

  // resets all the neurons in the layer
  reset: function() {
    for (var id in this.list) {
      var neuron = this.list[id];
      neuron.reset();
    }
  },

  // returns all the neurons in the layer (array)
  neurons: function() {
    return this.list;
  },

  // adds a neuron to the layer
  add: function(neuron) {
    this.neurons[neuron.ID] = neuron || new Neuron();
    this.list.push(neuron);
    this.size++;
  },

  set: function(options) {
    options = options || {};

    for (var i in this.list) {
      var neuron = this.list[i];
      if (options.label)
        neuron.label = options.label + '_' + neuron.ID;
      if (options.squash)
        neuron.squash = options.squash;
      if (options.bias)
        neuron.bias = options.bias;
    }
    return this;
  }
}

// represents a connection from one layer to another, and keeps track of its weight and gain
Layer.connection = function LayerConnection(fromLayer, toLayer, type, weights) {
  this.ID = Layer.connection.uid();
  this.from = fromLayer;
  this.to = toLayer;
  this.selfconnection = toLayer == fromLayer;
  this.type = type;
  this.connections = {};
  this.list = [];
  this.size = 0;

  if (typeof this.type == 'undefined')
  {
    if (fromLayer == toLayer)
      this.type = Layer.connectionType.ONE_TO_ONE;
    else
      this.type = Layer.connectionType.ALL_TO_ALL;
  }

  if (this.type == Layer.connectionType.ALL_TO_ALL) {
    for (var here in this.from.list) {
      for (var there in this.to.list) {
        var from = this.from.list[here];
        var to = this.to.list[there];
        var connection = from.project(to, weights);

        this.connections[connection.ID] = connection;
        this.size = this.list.push(connection);
      }
    }
  } else if (this.type == Layer.connectionType.ONE_TO_ONE) {

    for (var neuron in this.from.list) {
      var from = this.from.list[neuron];
      var to = this.to.list[neuron];
      var connection = from.project(to, weights);

      this.connections[connection.ID] = connection;
      this.size = this.list.push(connection);
    }
  }
}

// types of connections
Layer.connectionType = {};
Layer.connectionType.ALL_TO_ALL = "ALL TO ALL";
Layer.connectionType.ONE_TO_ONE = "ONE TO ONE";

// types of gates
Layer.gateType = {};
Layer.gateType.INPUT = "INPUT";
Layer.gateType.OUTPUT = "OUTPUT";
Layer.gateType.ONE_TO_ONE = "ONE TO ONE";

(function() {
  var connections = 0;
  Layer.connection.uid = function() {
    return connections++;
  }
})();

// export
if (module) module.exports = Layer;


},{"./network":3,"./neuron":4}],3:[function(require,module,exports){
// import
var Neuron = require('./neuron'),
    Layer = require('./layer');

/*******************************************************************************************
                                         NETWORK
*******************************************************************************************/

function Network(layers) {
  if (typeof layers != 'undefined') {
    this.layers = layers || {
      input: null,
      hidden: {},
      output: null
    };
    this.optimized = null;
  }
}
Network.prototype = {

  // feed-forward activation of all the layers to produce an ouput
  activate: function(input) {

    if (this.optimized === false)
    {
      this.layers.input.activate(input);
      for (var layer in this.layers.hidden)
        this.layers.hidden[layer].activate();
      return this.layers.output.activate();
    } 
    else 
    {
      if (this.optimized == null)
        this.optimize();
      return this.optimized.activate(input);
    }
  },

  // back-propagate the error thru the network
  propagate: function(rate, target) {

    if (this.optimized === false)
    {
      this.layers.output.propagate(rate, target);
      var reverse = [];
      for (var layer in this.layers.hidden)
        reverse.push(this.layers.hidden[layer]);
      reverse.reverse();
      for (var layer in reverse)
        reverse[layer].propagate(rate);
    } 
    else 
    {
      if (this.optimized == null)
        this.optimize();
      this.optimized.propagate(rate, target);
    }
  },

  // project a connection to another unit (either a network or a layer)
  project: function(unit, type, weights) {

    if (this.optimized)
      this.optimized.reset();

    if (unit instanceof Network)
      return this.layers.output.project(unit.layers.input, type, weights);

    if (unit instanceof Layer)
      return this.layers.output.project(unit, type, weights);

    throw "Invalid argument, you can only project connections to LAYERS and NETWORKS!";
  },

  // let this network gate a connection
  gate: function(connection, type) {
    if (this.optimized)
      this.optimized.reset();
    this.layers.output.gate(connection, type);
  },

  // clear all elegibility traces and extended elegibility traces (the network forgets its context, but not what was trained)
  clear: function() {

    this.restore();

    var inputLayer = this.layers.input,
      outputLayer = this.layers.output;

    inputLayer.clear();
    for (var layer in this.layers.hidden) {
      var hiddenLayer = this.layers.hidden[layer];
      hiddenLayer.clear();
    }
    outputLayer.clear();

    if (this.optimized)
      this.optimized.reset();
  },

  // reset all weights and clear all traces (ends up like a new network)
  reset: function() {

    this.restore();

    var inputLayer = this.layers.input,
      outputLayer = this.layers.output;

    inputLayer.reset();
    for (var layer in this.layers.hidden) {
      var hiddenLayer = this.layers.hidden[layer];
      hiddenLayer.reset();
    }
    outputLayer.reset();

    if (this.optimized)
      this.optimized.reset();
  },

  // hardcodes the behaviour of the whole network into a single optimized function
  optimize: function() {

    var that = this;
    var optimized = {};
    var neurons = this.neurons();

    for (var i in neurons) {
      var neuron = neurons[i].neuron;
      var layer = neurons[i].layer;
      while (neuron.neuron)
        neuron = neuron.neuron;
      optimized = neuron.optimize(optimized, layer);
    }
    optimized.propagation_sentences.reverse();

    var hardcode = "";
    hardcode += "var F = Float64Array ? new Float64Array(" + optimized.memory +
      ") : []; ";
    for (var i in optimized.variables)
      hardcode += "F[" + optimized.variables[i].id + "] = " + (optimized.variables[
        i].value || 0) + "; ";
    hardcode += "var activate = function(input){\n";
    for (var i in optimized.inputs)
      hardcode += "F[" + optimized.inputs[i] + "] = input[" + i + "]; ";
    for (var i in optimized.activation_sentences) {
      hardcode += optimized.activation_sentences[i].join(" ");
      hardcode += optimized.trace_sentences[i].join(" ");
    }
    hardcode += " var output = []; "
    for (var i in optimized.outputs)
      hardcode += "output[" + i + "] = F[" + optimized.outputs[i] + "]; ";
    hardcode += "return output; }; "
    hardcode += "var propagate = function(rate, target){\n";
    hardcode += "F[" + optimized.variables.rate.id + "] = rate; ";
    for (var i in optimized.targets)
      hardcode += "F[" + optimized.targets[i] + "] = target[" + i + "]; ";
    for (var i in optimized.propagation_sentences)
      hardcode += optimized.propagation_sentences[i].join(" ") + " ";
    hardcode += " };\n";
    hardcode +=
      "var ownership = function(memoryBuffer){\nF = memoryBuffer;\nthis.memory = F;\n};\n";
    hardcode +=
      "return {\nmemory: F,\nactivate: activate,\npropagate: propagate,\nownership: ownership\n};";
    hardcode = hardcode.split(";").join(";\n");

    var constructor = new Function(hardcode);

    var network = constructor();
    network.data = {
      variables: optimized.variables,
      activate: optimized.activation_sentences,
      propagate: optimized.propagation_sentences,
      trace: optimized.trace_sentences,
      inputs: optimized.inputs,
      outputs: optimized.outputs,
      check_activation: this.activate,
      check_propagation: this.propagate
    }
    network.reset = function() {
      if (that.optimized) {
        that.optimized = null;
        that.activate = network.data.check_activation;
        that.propagate = network.data.check_propagation;
      }
    }

    this.optimized = network;
    this.activate = network.activate;
    this.propagate = network.propagate;
  },

  // restores all the values from the optimized network the their respective objects in order to manipulate the network
  restore: function() {
    if (!this.optimized)
      return;

    var optimized = this.optimized;

    var getValue = function() {
      var args = Array.prototype.slice.call(arguments);

      var unit = args.shift();
      var prop = args.pop();

      var id = prop + '_';
      for (var property in args)
        id += args[property] + '_';
      id += unit.ID;

      var memory = optimized.memory;
      var variables = optimized.data.variables;

      if (id in variables)
        return memory[variables[id].id];
      return 0;
    }

    var list = this.neurons();

    // link id's to positions in the array
    var ids = {};
    for (var i in list) {
      var neuron = list[i].neuron;
      while (neuron.neuron)
        neuron = neuron.neuron;

      neuron.state = getValue(neuron, 'state');
      neuron.old = getValue(neuron, 'old');
      neuron.activation = getValue(neuron, 'activation');
      neuron.bias = getValue(neuron, 'bias');

      for (var input in neuron.trace.elegibility)
        neuron.trace.elegibility[input] = getValue(neuron, 'trace',
          'elegibility', input);

      for (var gated in neuron.trace.extended)
        for (var input in neuron.trace.extended[gated])
          neuron.trace.extended[gated][input] = getValue(neuron, 'trace',
            'extended', gated, input);
    }

    // get connections
    for (var i in list) {
      var neuron = list[i].neuron;
      while (neuron.neuron)
        neuron = neuron.neuron;

      for (var j in neuron.connections.projected) {
        var connection = neuron.connections.projected[j];
        connection.weight = getValue(connection, 'weight');
        connection.gain = getValue(connection, 'gain');
      }
    }
  },

  // returns all the neurons in the network
  neurons: function() {

    var neurons = [];

    var inputLayer = this.layers.input.neurons(),
      outputLayer = this.layers.output.neurons();

    for (var neuron in inputLayer)
      neurons.push({
        neuron: inputLayer[neuron],
        layer: 'input'
      });

    for (var layer in this.layers.hidden) {
      var hiddenLayer = this.layers.hidden[layer].neurons();
      for (var neuron in hiddenLayer)
        neurons.push({
          neuron: hiddenLayer[neuron],
          layer: layer
        });
    }
    for (var neuron in outputLayer)
      neurons.push({
        neuron: outputLayer[neuron],
        layer: 'output'
      });

    return neurons;
  },

  // returns number of inputs of the network
  inputs: function() {
    return this.layers.input.size;
  },

  // returns number of outputs of hte network
  outputs: function() {
    return this.layers.output.size;
  },

  // sets the layers of the network
  set: function(layers) {

    this.layers = layers;
    if (this.optimized)
      this.optimized.reset();
  },

  setOptimize: function(bool){
    this.restore();
    if (this.optimized)
      this.optimized.reset();
    this.optimized = bool? null : false;
  },

  // returns a json that represents all the neurons and connections of the network
  toJSON: function(ignoreTraces) {

    this.restore();

    var list = this.neurons();
    var neurons = [];
    var connections = [];

    // link id's to positions in the array
    var ids = {};
    for (var i in list) {
      var neuron = list[i].neuron;
      while (neuron.neuron)
        neuron = neuron.neuron;
      ids[neuron.ID] = i;

      var copy = {
        trace: {
          elegibility: {},
          extended: {}
        },
        state: neuron.state,
        old: neuron.old,
        activation: neuron.activation,
        bias: neuron.bias,
        layer: list[i].layer
      };

      copy.squash = neuron.squash == Neuron.squash.LOGISTIC ? "LOGISTIC" :
        neuron.squash == Neuron.squash.TANH ? "TANH" :
        neuron.squash == Neuron.squash.IDENTITY ? "IDENTITY" :
        neuron.squash == Neuron.squash.HLIM ? "HLIM" :
        null;

      neurons.push(copy);
    }

    if (!ignoreTraces)
      for (var i in neurons) {
        var copy = neurons[i];

        for (var input in neuron.trace.elegibility)
          copy.trace.elegibility[input] = neuron.trace.elegibility[input];

        for (var gated in neuron.trace.extended) {
          copy.trace.extended[gated] = {};
          for (var input in neuron.trace.extended[gated])
            copy.trace.extended[ids[gated]][input] = neuron.trace.extended[
              gated][input];
        }
      }

    // get connections
    for (var i in list) {
      var neuron = list[i].neuron;
      while (neuron.neuron)
        neuron = neuron.neuron;

      for (var j in neuron.connections.projected) {
        var connection = neuron.connections.projected[j];
        connections.push({
          from: ids[connection.from.ID],
          to: ids[connection.to.ID],
          weight: connection.weight,
          gater: connection.gater ? ids[connection.gater.ID] : null,
        });
      }
      if (neuron.selfconnected())
        connections.push({
          from: ids[neuron.ID],
          to: ids[neuron.ID],
          weight: neuron.selfconnection.weight,
          gater: neuron.selfconnection.gater ? ids[neuron.selfconnection.gater
            .ID] : null,
        });
    }

    return {
      neurons: neurons,
      connections: connections
    }
  },

  // returns a function that works as the activation of the network and can be used without depending on the library
  standalone: function() {
    if (!this.optimized)
      this.optimize();

    var data = this.optimized.data;

    // build activation function
    var activation = "function (input) {\n";

    // build inputs
    for (var i in data.inputs)
      activation += "F[" + data.inputs[i] + "] = input[" + i + "];\n";

    // build network activation
    for (var neuron in data.activate)
      for (var sentence in data.activate[neuron])
        activation += data.activate[neuron][sentence] + "\n";

    // build outputs
    activation += "var output = [];\n";
    for (var i in data.outputs)
      activation += "output[" + i + "] = F[" + data.outputs[i] + "];\n";
    activation += "return output;\n}";

    // reference all the positions in memory
    var memory = activation.match(/F\[(\d+)\]/g);
    var dimension = 0;
    var ids = {};
    for (var address in memory) {
      var tmp = memory[address].match(/\d+/)[0];
      if (!(tmp in ids)) {
        ids[tmp] = dimension++;
      }
    }
    var hardcode = "F = {\n";
    for (var i in ids)
      hardcode += ids[i] + ": " + this.optimized.memory[i] + ",\n";
    hardcode = hardcode.substring(0, hardcode.length - 2) + "\n};\n";
    hardcode = "var run = " + activation.replace(/F\[(\d+)]/g, function(
      index) {
      return 'F[' + ids[index.match(/\d+/)[0]] + ']'
    }).replace("{\n", "{\n" + hardcode + "") + ";\n";
    hardcode += "return run";

    // return standalone function
    return new Function(hardcode)();
  },

  worker: function() {
    if (!this.optimized)
      this.optimize();

    var hardcode = "var inputs = " + this.optimized.data.inputs.length +
      ";\n";
    hardcode += "var outputs = " + this.optimized.data.outputs.length +
      ";\n";
    hardcode += "var F = null;\n";
    hardcode += "var activate = " + this.optimized.activate.toString() +
      ";\n";
    hardcode += "var propagate = " + this.optimized.propagate.toString() +
      ";\n";
    hardcode += "onmessage = function(e){\n";
    hardcode += "F = e.data.memoryBuffer;\n";
    hardcode += "if (e.data.action == 'activate'){\n";
    hardcode += "if (e.data.input.length == inputs){\n";
    hardcode +=
      "postMessage( { action: 'activate', output: activate(e.data.input), memoryBuffer: F }, [F.buffer]);\n";
    hardcode += "}\n}\nelse if (e.data.action == 'propagate'){\n";
    hardcode += "propagate(e.data.rate, e.data.target);\n";
    hardcode +=
      "postMessage({ action: 'propagate', memoryBuffer: F }, [F.buffer]);\n";
    hardcode += "}\n}\n";

    var blob = new Blob([hardcode]);
    var blobURL = window.URL.createObjectURL(blob);

    return new Worker(blobURL);
  },

  // returns a copy of the network
  clone: function(ignoreTraces) {
    return Network.fromJSON(this.toJSON(ignoreTraces));
  }
}

// rebuild a network that has been stored in a json using the method toJson()
Network.fromJSON = function(json) {

  var neurons = [];

  var layers = {
    input: new Layer(),
    hidden: [],
    output: new Layer()
  }

  for (var i in json.neurons) {
    var config = json.neurons[i];

    var neuron = new Neuron();
    neuron.trace.elegibility = config.trace.elegibility;
    neuron.trace.extended = config.trace.extended;
    neuron.state = config.state;
    neuron.old = config.old;
    neuron.activation = config.activation;
    neuron.bias = config.bias;
    neuron.squash = config.squash in Neuron.squash ? Neuron.squash[config.squash] :
      Neuron.squash.LOGISTIC;
    neurons.push(neuron);

    if (config.layer == 'input')
      layers.input.add(neuron);
    else if (config.layer == 'output')
      layers.output.add(neuron);
    else {
      if (typeof layers.hidden[config.layer] == 'undefined')
        layers.hidden[config.layer] = new Layer();
      layers.hidden[config.layer].add(neuron);
    }
  }

  for (var i in json.connections) {
    var config = json.connections[i];
    var from = neurons[config.from];
    var to = neurons[config.to];
    var weight = config.weight
    var gater = neurons[config.gater];

    var connection = from.project(to, weight);
    if (gater)
      gater.gate(connection);
  }

  return new Network(layers);
}

// export
if (module) module.exports = Network;


},{"./layer":2,"./neuron":4}],4:[function(require,module,exports){
/******************************************************************************************
                                         NEURON
*******************************************************************************************/

function Neuron() {
  this.ID = Neuron.uid();
  this.label = null;
  this.connections = {
    inputs: {},
    projected: {},
    gated: {}
  };
  this.error = {
    responsibility: 0,
    projected: 0,
    gated: 0
  };
  this.trace = {
    elegibility: {},
    extended: {},
    influences: {}
  };
  this.state = 0;
  this.old = 0;
  this.activation = 0;
  this.selfconnection = new Neuron.connection(this, this, 0); // weight = 0 -> not connected
  this.squash = Neuron.squash.LOGISTIC;
  this.neighboors = {};
  this.bias = Math.random() * .2 - .1;
}

Neuron.prototype = {

  // activate the neuron
  activate: function(input) {
    // activation from enviroment (for input neurons)
    if (typeof input != 'undefined') {
      this.activation = input;
      this.derivative = 0;
      this.bias = 0;
      return this.activation;
    }

    // old state
    this.old = this.state;

    // eq. 15
    this.state = this.selfconnection.gain * this.selfconnection.weight *
      this.state + this.bias;

    for (var i in this.connections.inputs) {
      var input = this.connections.inputs[i];
      this.state += input.from.activation * input.weight * input.gain;
    }

    // eq. 16
    this.activation = this.squash(this.state);

    // f'(s)
    this.derivative = this.squash(this.state, true);

    // update traces
    for (var i in this.connections.inputs) {
      var input = this.connections.inputs[i];

      // elegibility trace - Eq. 17
      this.trace.elegibility[input.ID] = this.selfconnection.gain * this.selfconnection
        .weight * this.trace.elegibility[input.ID] + input.gain * input.from
        .activation;

      for (var id in this.trace.extended) {
        // extended elegibility trace
        var xtrace = this.trace.extended[id];
        var neuron = this.neighboors[id];

        // if gated neuron's selfconnection is gated by this unit, the influence keeps track of the neuron's old state
        var influence = neuron.selfconnection.gater == this ? neuron.old :
          0;

        // index runs over all the incoming connections to the gated neuron that are gated by this unit
        for (var incoming in this.trace.influences[neuron.ID]) { // captures the effect that has an input connection to this unit, on a neuron that is gated by this unit
          influence += this.trace.influences[neuron.ID][incoming].weight *
            this.trace.influences[neuron.ID][incoming].from.activation;
        }

        // eq. 18
        xtrace[input.ID] = neuron.selfconnection.gain * neuron.selfconnection
          .weight * xtrace[input.ID] + this.derivative * this.trace.elegibility[
            input.ID] * influence;
      }
    }

    //  update gated connection's gains
    for (var connection in this.connections.gated) {
      this.connections.gated[connection].gain = this.activation;
    }

    return this.activation;
  },

  // back-propagate the error
  propagate: function(rate, target) {
    // error accumulator
    var error = 0;

    // output neurons get their error from the enviroment
    if (typeof target != 'undefined')
      error = target - this.activation;

    // error responsibilities from all the connections projected from this neuron
    for (var id in this.connections.projected) {
      var connection = this.connections.projected[id];
      var neuron = connection.to;
      // Eq. 21
      error += neuron.error.responsibility * connection.gain * connection.weight;
    }

    // projected error responsibility
    this.error.projected = this.derivative * error;

    error = 0;
    // error responsibilities from all the connections gated by this neuron
    for (var id in this.trace.extended) {
      var neuron = this.neighboors[id]; // gated neuron
      var influence = neuron.selfconnection.gater == this ? neuron.old : 0; // if gated neuron's selfconnection is gated by this neuron

      // index runs over all the connections to the gated neuron that are gated by this neuron
      for (var input in this.trace.influences[id]) { // captures the effect that the input connection of this neuron have, on a neuron which its input/s is/are gated by this neuron
        influence += this.trace.influences[id][input].weight * this.trace.influences[
          neuron.ID][input].from.activation;
      }
      // eq. 22
      error += neuron.error.responsibility * influence;
    }

    // gated error responsibility
    this.error.gated = this.derivative * error;

    // error responsibility - Eq. 23
    this.error.responsibility = this.error.projected + this.error.gated;

    // learning rate
    rate = rate || .1;

    // adjust all the neuron's incoming connections
    for (var id in this.connections.inputs) {
      var input = this.connections.inputs[id];

      // Eq. 24
      var gradient = this.error.projected * this.trace.elegibility[input.ID];
      for (var id in this.trace.extended) {
        var neuron = this.neighboors[id];
        gradient += neuron.error.responsibility * this.trace.extended[
          neuron.ID][input.ID];
      }
      input.weight += rate * gradient; // adjust weights - aka learn
    }

    // adjust bias
    this.bias += rate * this.error.responsibility;
  },

  project: function(neuron, weight) {
    // self-connection
    if (neuron == this) {
      this.selfconnection.weight = 1;
      return this.selfconnection;
    }

    // check if connection already exists
    var connected = this.connected(neuron);
    if (connected && connected.type == "projected") {
      // update connection
      if (typeof weight != 'undefined')
        connected.connection.weight = weight;
      // return existing connection
      return connected.connection;
    } else {
      // create a new connection
      var connection = new Neuron.connection(this, neuron, weight);
    }

    // reference all the connections and traces
    this.connections.projected[connection.ID] = connection;
    this.neighboors[neuron.ID] = neuron;
    neuron.connections.inputs[connection.ID] = connection;
    neuron.trace.elegibility[connection.ID] = 0;

    for (var id in neuron.trace.extended) {
      var trace = neuron.trace.extended[id];
      trace[connection.ID] = 0;
    }

    return connection;
  },

  gate: function(connection) {
    // add connection to gated list
    this.connections.gated[connection.ID] = connection;

    var neuron = connection.to;
    if (!(neuron.ID in this.trace.extended)) {
      // extended trace
      this.neighboors[neuron.ID] = neuron;
      var xtrace = this.trace.extended[neuron.ID] = {};
      for (var id in this.connections.inputs) {
        var input = this.connections.inputs[id];
        xtrace[input.ID] = 0;
      }
    }

    // keep track
    if (neuron.ID in this.trace.influences)
      this.trace.influences[neuron.ID].push(connection);
    else
      this.trace.influences[neuron.ID] = [connection];

    // set gater
    connection.gater = this;
  },

  // returns true or false whether the neuron is self-connected or not
  selfconnected: function() {
    return this.selfconnection.weight !== 0;
  },

  // returns true or false whether the neuron is connected to another neuron (parameter)
  connected: function(neuron) {
    var result = {
      type: null,
      connection: false
    };

    if (this == neuron) {
      if (this.selfconnected()) {
        result.type = 'selfconnection';
        result.connection = this.selfconnection;
        return result;
      } else
        return false;
    }

    for (var type in this.connections) {
      for (var connection in this.connections[type]) {
        var connection = this.connections[type][connection];
        if (connection.to == neuron) {
          result.type = type;
          result.connection = connection;
          return result;
        } else if (connection.from == neuron) {
          result.type = type;
          result.connection = connection;
          return result;
        }
      }
    }

    return false;
  },

  // clears all the traces (the neuron forgets it's context, but the connections remain intact)
  clear: function() {

    for (var trace in this.trace.elegibility)
      this.trace.elegibility[trace] = 0;

    for (var trace in this.trace.extended)
      for (var extended in this.trace.extended[trace])
        this.trace.extended[trace][extended] = 0;

    this.error.responsibility = this.error.projected = this.error.gated = 0;
  },

  // all the connections are randomized and the traces are cleared
  reset: function() {
    this.clear();

    for (var type in this.connection)
      for (var connection in this.connection[type])
        this.connection[type][connection].weight = Math.random() * .2 - .1;
    this.bias = Math.random() * .2 - .1;

    this.old = this.state = this.activation = 0;
  },

  // hardcodes the behaviour of the neuron into an optimized function
  optimize: function(optimized, layer) {

    optimized = optimized || {};
    var that = this;
    var store_activation = [];
    var store_trace = [];
    var store_propagation = [];
    var varID = optimized.memory | 0;
    var inputs = optimized.inputs || [];
    var targets = optimized.targets || [];
    var outputs = optimized.outputs || [];
    var variables = optimized.variables || {};
    var activation_sentences = optimized.activation_sentences || [];
    var trace_sentences = optimized.trace_sentences || [];
    var propagation_sentences = optimized.propagation_sentences || [];

    // get/reserve space in memory by creating a unique ID for a variablel
    var getVar = function() {
      var args = Array.prototype.slice.call(arguments);

      if (args.length == 1) {
        if (args[0] == 'target') {
          var id = 'target_' + targets.length;
          targets.push(varID);
        } else
          var id = args[0];
        if (id in variables)
          return variables[id];
        return variables[id] = {
          value: 0,
          id: varID++
        };
      } else {
        var extended = args.length > 2;
        if (extended)
          var value = args.pop();

        var unit = args.shift();
        var prop = args.pop();

        if (!extended)
          var value = unit[prop];

        var id = prop + '_';
        for (var property in args)
          id += args[property] + '_';
        id += unit.ID;
        if (id in variables)
          return variables[id];

        return variables[id] = {
          value: value,
          id: varID++
        };
      }
    };

    // build sentence
    var buildSentence = function() {
      var args = Array.prototype.slice.call(arguments);
      var store = args.pop();
      var sentence = "";
      for (var i in args)
        if (typeof args[i] == 'string')
          sentence += args[i];
        else
          sentence += 'F[' + args[i].id + ']';
      store.push(sentence + ';');
    }

    // helper to check if an object is empty
    var isEmpty = function(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
          return false;
      }
      return true;
    };

    // characteristics of the neuron
    var noProjections = isEmpty(this.connections.projected);
    var noGates = isEmpty(this.connections.gated);
    var isInput = layer == 'input' ? true : isEmpty(this.connections.inputs);
    var isOutput = layer == 'output' ? true : noProjections && noGates;

    // optimize neuron's behaviour
    var rate = getVar('rate');
    var activation = getVar(this, 'activation');
    if (isInput)
      inputs.push(activation.id);
    else {
      activation_sentences.push(store_activation);
      trace_sentences.push(store_trace);
      propagation_sentences.push(store_propagation);
      var old = getVar(this, 'old');
      var state = getVar(this, 'state');
      var bias = getVar(this, 'bias');
      if (this.selfconnection.gater)
        var self_gain = getVar(this.selfconnection, 'gain');
      if (this.selfconnected())
        var self_weight = getVar(this.selfconnection, 'weight');
      buildSentence(old, ' = ', state, store_activation);
      if (this.selfconnected())
        if (this.selfconnection.gater)
          buildSentence(state, ' = ', self_gain, ' * ', self_weight, ' * ',
            state, ' + ', bias, store_activation);
        else
          buildSentence(state, ' = ', self_weight, ' * ', state, ' + ',
            bias, store_activation);
      else
        buildSentence(state, ' = ', bias, store_activation);
      for (var i in this.connections.inputs) {
        var input = this.connections.inputs[i];
        var input_activation = getVar(input.from, 'activation');
        var input_weight = getVar(input, 'weight');
        if (input.gater)
          var input_gain = getVar(input, 'gain');
        if (this.connections.inputs[i].gater)
          buildSentence(state, ' += ', input_activation, ' * ',
            input_weight, ' * ', input_gain, store_activation);
        else
          buildSentence(state, ' += ', input_activation, ' * ',
            input_weight, store_activation);
      }
      var derivative = getVar(this, 'derivative');
      switch (this.squash) {
        case Neuron.squash.LOGISTIC:
          buildSentence(activation, ' = (1 / (1 + Math.exp(-', state, ')))',
            store_activation);
          buildSentence(derivative, ' = ', activation, ' * (1 - ',
            activation, ')', store_activation);
          break;
        case Neuron.squash.TANH:
          var eP = getVar('aux');
          var eN = getVar('aux_2');
          buildSentence(eP, ' = Math.exp(', state, ')', store_activation);
          buildSentence(eN, ' = 1 / ', eP, store_activation);
          buildSentence(activation, ' = (', eP, ' - ', eN, ') / (', eP, ' + ', eN, ')', store_activation);
          buildSentence(derivative, ' = 1 - (', activation, ' * ', activation, ')', store_activation);
          break;
        case Neuron.squash.IDENTITY:
          buildSentence(activation, ' = ', state, store_activation);
          buildSentence(derivative, ' = 1', store_activation);
          break;
        case Neuron.squash.HLIM:
          buildSentence(activation, ' = +(', state, ' > 0)',
            store_activation);
          buildSentence(derivative, ' = 1', store_activation);
          break;
      }

      for (var i in this.connections.inputs) {
        var input = this.connections.inputs[i];
        if (input.gater)
          var input_gain = getVar(input, 'gain');
        var input_activation = getVar(input.from, 'activation');
        var trace = getVar(this, 'trace', 'elegibility', input.ID, this.trace
          .elegibility[input.ID]);
        if (this.selfconnected()) {
          if (this.selfconnection.gater) {
            if (input.gater)
              buildSentence(trace, ' = ', self_gain, ' * ', self_weight,
                ' * ', trace, ' + ', input_gain, ' * ', input_activation,
                store_trace);
            else
              buildSentence(trace, ' = ', self_gain, ' * ', self_weight,
                ' * ', trace, ' + ', input_activation, store_trace);
          } else {
            if (input.gater)
              buildSentence(trace, ' = ', self_weight, ' * ', trace, ' + ',
                input_gain, ' * ', input_activation, store_trace);
            else
              buildSentence(trace, ' = ', self_weight, ' * ', trace, ' + ',
                input_activation, store_trace);
          }
        } else {
          if (input.gater)
            buildSentence(trace, ' = ', input_gain, ' * ', input_activation,
              store_trace);
          else
            buildSentence(trace, ' = ', input_activation, store_trace);
        }
        for (var id in this.trace.extended) {
          // extended elegibility trace
          var xtrace = this.trace.extended[id];
          var neuron = this.neighboors[id];
          var influence = getVar('aux');
          var neuron_old = getVar(neuron, 'old');
          if (neuron.selfconnection.gater == this)
            buildSentence(influence, ' = ', neuron_old, store_trace);
          else
            buildSentence(influence, ' = 0', store_trace);
          for (var incoming in this.trace.influences[neuron.ID]) {
            var incoming_weight = getVar(this.trace.influences[neuron.ID][
              incoming
            ], 'weight');
            var incoming_activation = getVar(this.trace.influences[neuron.ID]
              [incoming].from, 'activation');

            buildSentence(influence, ' += ', incoming_weight, ' * ',
              incoming_activation, store_trace);
          }
          var trace = getVar(this, 'trace', 'elegibility', input.ID, this.trace
            .elegibility[input.ID]);
          var xtrace = getVar(this, 'trace', 'extended', neuron.ID, input.ID,
            this.trace.extended[neuron.ID][input.ID]);
          if (neuron.selfconnected())
            var neuron_self_weight = getVar(neuron.selfconnection, 'weight');
          if (neuron.selfconnection.gater)
            var neuron_self_gain = getVar(neuron.selfconnection, 'gain');
          if (neuron.selfconnected())
            if (neuron.selfconnection.gater)
              buildSentence(xtrace, ' = ', neuron_self_gain, ' * ',
                neuron_self_weight, ' * ', xtrace, ' + ', derivative, ' * ',
                trace, ' * ', influence, store_trace);
            else
              buildSentence(xtrace, ' = ', neuron_self_weight, ' * ',
                xtrace, ' + ', derivative, ' * ', trace, ' * ', influence,
                store_trace);
          else
            buildSentence(xtrace, ' = ', derivative, ' * ', trace, ' * ',
              influence, store_trace);
        }
      }
      for (var connection in this.connections.gated) {
        var gated_gain = getVar(this.connections.gated[connection], 'gain');
        buildSentence(gated_gain, ' = ', activation, store_activation);
      }
    }
    if (!isInput) {
      var responsibility = getVar(this, 'error', 'responsibility', this.error
        .responsibility);
      if (isOutput) {
        var target = getVar('target');
        buildSentence(responsibility, ' = ', target, ' - ', activation,
          store_propagation);
        buildSentence(responsibility, ' *= ', derivative, store_propagation);
        for (var id in this.connections.inputs) {
          var input = this.connections.inputs[id];
          var trace = getVar(this, 'trace', 'elegibility', input.ID, this.trace
            .elegibility[input.ID]);
          var input_weight = getVar(input, 'weight');
          buildSentence(input_weight, ' += ', rate, ' * (', responsibility,
            ' * ', trace, ')', store_propagation);
        }
        outputs.push(activation.id);
      } else {
        if (!noProjections && !noGates) {
          var error = getVar('aux');
          for (var id in this.connections.projected) {
            var connection = this.connections.projected[id];
            var neuron = connection.to;
            var connection_weight = getVar(connection, 'weight');
            var neuron_responsibility = getVar(neuron, 'error',
              'responsibility', neuron.error.responsibility);
            if (connection.gater) {
              var connection_gain = getVar(connection, 'gain');
              buildSentence(error, ' += ', neuron_responsibility, ' * ',
                connection_gain, ' * ', connection_weight,
                store_propagation);
            } else
              buildSentence(error, ' += ', neuron_responsibility, ' * ',
                connection_weight, store_propagation);
          }
          var projected = getVar(this, 'error', 'projected', this.error.projected);
          buildSentence(projected, ' = ', derivative, ' * ', error,
            store_propagation);
          buildSentence(error, ' = 0', store_propagation);
          for (var id in this.trace.extended) {
            var neuron = this.neighboors[id];
            var influence = getVar('aux_2');
            var neuron_old = getVar(neuron, 'old');
            if (neuron.selfconnection.gater == this)
              buildSentence(influence, ' = ', neuron_old, store_propagation);
            else
              buildSentence(influence, ' = 0', store_propagation);
            for (var input in this.trace.influences[neuron.ID]) {
              var connection = this.trace.influences[neuron.ID][input];
              var connection_weight = getVar(connection, 'weight');
              var neuron_activation = getVar(connection.from, 'activation');
              buildSentence(influence, ' += ', connection_weight, ' * ',
                neuron_activation, store_propagation);
            }
            var neuron_responsibility = getVar(neuron, 'error',
              'responsibility', neuron.error.responsibility);
            buildSentence(error, ' += ', neuron_responsibility, ' * ',
              influence, store_propagation);
          }
          var gated = getVar(this, 'error', 'gated', this.error.gated);
          buildSentence(gated, ' = ', derivative, ' * ', error,
            store_propagation);
          buildSentence(responsibility, ' = ', projected, ' + ', gated,
            store_propagation);
          for (var id in this.connections.inputs) {
            var input = this.connections.inputs[id];
            var gradient = getVar('aux');
            var trace = getVar(this, 'trace', 'elegibility', input.ID, this
              .trace.elegibility[input.ID]);
            buildSentence(gradient, ' = ', projected, ' * ', trace,
              store_propagation);
            for (var id in this.trace.extended) {
              var neuron = this.neighboors[id];
              var neuron_responsibility = getVar(neuron, 'error',
                'responsibility', neuron.error.responsibility);
              var xtrace = getVar(this, 'trace', 'extended', neuron.ID,
                input.ID, this.trace.extended[neuron.ID][input.ID]);
              buildSentence(gradient, ' += ', neuron_responsibility, ' * ',
                xtrace, store_propagation);
            }
            var input_weight = getVar(input, 'weight');
            buildSentence(input_weight, ' += ', rate, ' * ', gradient,
              store_propagation);
          }

        } else if (noGates) {
          buildSentence(responsibility, ' = 0', store_propagation);
          for (var id in this.connections.projected) {
            var connection = this.connections.projected[id];
            var neuron = connection.to;
            var connection_weight = getVar(connection, 'weight');
            var neuron_responsibility = getVar(neuron, 'error',
              'responsibility', neuron.error.responsibility);
            if (connection.gater) {
              var connection_gain = getVar(connection, 'gain');
              buildSentence(responsibility, ' += ', neuron_responsibility,
                ' * ', connection_gain, ' * ', connection_weight,
                store_propagation);
            } else
              buildSentence(responsibility, ' += ', neuron_responsibility,
                ' * ', connection_weight, store_propagation);
          }
          buildSentence(responsibility, ' *= ', derivative,
            store_propagation);
          for (var id in this.connections.inputs) {
            var input = this.connections.inputs[id];
            var trace = getVar(this, 'trace', 'elegibility', input.ID, this
              .trace.elegibility[input.ID]);
            var input_weight = getVar(input, 'weight');
            buildSentence(input_weight, ' += ', rate, ' * (',
              responsibility, ' * ', trace, ')', store_propagation);
          }
        } else if (noProjections) {
          buildSentence(responsibility, ' = 0', store_propagation);
          for (var id in this.trace.extended) {
            var neuron = this.neighboors[id];
            var influence = getVar('aux');
            var neuron_old = getVar(neuron, 'old');
            if (neuron.selfconnection.gater == this)
              buildSentence(influence, ' = ', neuron_old, store_propagation);
            else
              buildSentence(influence, ' = 0', store_propagation);
            for (var input in this.trace.influences[neuron.ID]) {
              var connection = this.trace.influences[neuron.ID][input];
              var connection_weight = getVar(connection, 'weight');
              var neuron_activation = getVar(connection.from, 'activation');
              buildSentence(influence, ' += ', connection_weight, ' * ',
                neuron_activation, store_propagation);
            }
            var neuron_responsibility = getVar(neuron, 'error',
              'responsibility', neuron.error.responsibility);
            buildSentence(responsibility, ' += ', neuron_responsibility,
              ' * ', influence, store_propagation);
          }
          buildSentence(responsibility, ' *= ', derivative,
            store_propagation);
          for (var id in this.connections.inputs) {
            var input = this.connections.inputs[id];
            var gradient = getVar('aux');
            buildSentence(gradient, ' = 0', store_propagation);
            for (var id in this.trace.extended) {
              var neuron = this.neighboors[id];
              var neuron_responsibility = getVar(neuron, 'error',
                'responsibility', neuron.error.responsibility);
              var xtrace = getVar(this, 'trace', 'extended', neuron.ID,
                input.ID, this.trace.extended[neuron.ID][input.ID]);
              buildSentence(gradient, ' += ', neuron_responsibility, ' * ',
                xtrace, store_propagation);
            }
            var input_weight = getVar(input, 'weight');
            buildSentence(input_weight, ' += ', rate, ' * ', gradient,
              store_propagation);
          }
        }
      }
      buildSentence(bias, ' += ', rate, ' * ', responsibility,
        store_propagation);
    }
    return {
      memory: varID,
      inputs: inputs,
      outputs: outputs,
      targets: targets,
      variables: variables,
      activation_sentences: activation_sentences,
      trace_sentences: trace_sentences,
      propagation_sentences: propagation_sentences
    }
  }
}


// represents a connection between two neurons
Neuron.connection = function Connection(from, to, weight) {

  if (!from || !to)
    throw "Connection Error: Invalid neurons";

  this.ID = Neuron.connection.uid();
  this.from = from;
  this.to = to;
  this.weight = typeof weight == 'undefined' ? Math.random() * .2 - .1 :
    weight;
  this.gain = 1;
  this.gater = null;
}


// squashing functions
Neuron.squash = {};

// eq. 5 & 5'
Neuron.squash.LOGISTIC = function(x, derivate) {
  if (!derivate)
    return 1 / (1 + Math.exp(-x));
  var fx = Neuron.squash.LOGISTIC(x);
  return fx * (1 - fx);
};
Neuron.squash.TANH = function(x, derivate) {
  if (derivate)
    return 1 - Math.pow(Neuron.squash.TANH(x), 2);
  var eP = Math.exp(x);
  var eN = 1 / eP;
  return (eP - eN) / (eP + eN);
};
Neuron.squash.IDENTITY = function(x, derivate) {
  return derivate ? 1 : x;
};
Neuron.squash.HLIM = function(x, derivate) {
  return derivate ? 1 : +(x > 0);
};

// unique ID's
(function() {
  var neurons = 0;
  var connections = 0;
  Neuron.uid = function() {
    return neurons++;
  }
  Neuron.connection.uid = function() {
    return connections++;
  }
  Neuron.quantity = function() {
    return {
      neurons: neurons,
      connections: connections
    }
  }
})();

// export
if (module) module.exports = Neuron;


},{}],5:[function(require,module,exports){
/*

The MIT License (MIT)

Copyright (c) 2014 Juan Cazala - juancazala.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE



********************************************************************************************
                                         SYNAPTIC
********************************************************************************************

Synaptic is a javascript neural network library for node.js and the browser, its generalized
algorithm is architecture-free, so you can build and train basically any type of first order
or even second order neural network architectures.

http://en.wikipedia.org/wiki/Recurrent_neural_network#Second_Order_Recurrent_Neural_Network

The library includes a few built-in architectures like multilayer perceptrons, multilayer
long-short term memory networks (LSTM) or liquid state machines, and a trainer capable of
training any given network, and includes built-in training tasks/tests like solving an XOR,
passing a Distracted Sequence Recall test or an Embeded Reber Grammar test.

The algorithm implemented by this library has been taken from Derek D. Monner's paper:

A generalized LSTM-like training algorithm for second-order recurrent neural networks
http://www.overcomplete.net/papers/nn2012.pdf

There are references to the equations in that paper commented through the source code.


********************************************************************************************/

var Synaptic = {
    Neuron: require('./neuron'),
    Layer: require('./layer'),
    Network: require('./network'),
    Trainer: require('./trainer'),
    Architect: require('./architect')
};

// CommonJS & AMD
if (this.define && this.define.amd)
{
  define([], Synaptic);
}

// Node.js
if (module && module.exports)
{
  module.exports = Synaptic;
}

// Browser
if (typeof window == 'object')
{
	Synaptic.ninja = function(){ delete window['synaptic']; };
  window['synaptic'] = Synaptic;
}

},{"./architect":1,"./layer":2,"./network":3,"./neuron":4,"./trainer":6}],6:[function(require,module,exports){
/*******************************************************************************************
                                        TRAINER
*******************************************************************************************/

function Trainer(network, options) {
  options = options || {};
  this.network = network;
  this.rate = options.rate || .5;
  this.iterations = options.iterations || 100000;
  this.error = options.error || .005
}

Trainer.prototype = {

  // trains any given set to a network
  train: function(set, options) {

    var error = 1;
    var iterations = 0;
    var input, output, target;

    var start = Date.now();

    if (options) {
      if (options.shuffle) {
        //+ Jonas Raoni Soares Silva
        //@ http://jsfromhell.com/array/shuffle [v1.0]
        function shuffle(o) { //v1.0
          for (var j, x, i = o.length; i; j = Math.floor(Math.random() *
              i), x = o[--i], o[i] = o[j], o[j] = x);
          return o;
        };
      }
      if (options.iterations)
        this.iterations = options.iterations;
      if (options.error)
        this.error = options.error;
      if (options.rate)
        this.rate = options.rate;
    }

    while (iterations < this.iterations && error > this.error) {
      error = 0;

      for (var train in set) {
        input = set[train].input;
        target = set[train].output;

        output = this.network.activate(input);
        this.network.propagate(this.rate, target);

        var delta = 0;
        for (var i in output)
          delta += Math.pow(target[i] - output[i], 2);

        error += delta / output.length;
      }

      // check error
      iterations++;
      error /= set.length;

      if (options) {
        if (options.customLog && options.customLog.every && iterations %
          options.customLog.every == 0)
          options.customLog.do({
            error: error,
            iterations: iterations
          });
        else if (options.log && iterations % options.log == 0) {
          console.log('iterations', iterations, 'error', error);
        };
        if (options.shuffle)
          shuffle(set);
      }
    }

    var results = {
      error: error,
      iterations: iterations,
      time: Date.now() - start
    }

    return results;
  },

  // trains any given set to a network using a WebWorker
  workerTrain: function(set, callback, options) {

    var that = this;
    var error = 1;
    var iterations = 0;
    var input, output, target;
    var length = set.length;

    var start = Date.now();

    if (options) {
      if (options.shuffle) {
        //+ Jonas Raoni Soares Silva
        //@ http://jsfromhell.com/array/shuffle [v1.0]
        function shuffle(o) { //v1.0
          for (var j, x, i = o.length; i; j = Math.floor(Math.random() *
              i), x = o[--i], o[i] = o[j], o[j] = x);
          return o;
        };
      }
      if (options.iterations)
        this.iterations = options.iterations;
      if (options.error)
        this.error = options.error;
      if (options.rate)
        this.rate = options.rate;
    }

    // create a worker
    var worker = this.network.worker();

    // activate the network
    function activateWorker(input)
    {
        worker.postMessage({ 
            action: "activate",
            input: input,
            memoryBuffer: that.network.optimized.memory
        }, [that.network.optimized.memory.buffer]);
    }

    // backpropagate the network
    function propagateWorker(target){
        worker.postMessage({ 
            action: "propagate",
            target: target,
            rate: that.rate,
            memoryBuffer: that.network.optimized.memory
        }, [that.network.optimized.memory.buffer]);
    }

    // train the worker
    worker.onmessage = function(e){
        // give control of the memory back to the network
        that.network.optimized.ownership(e.data.memoryBuffer);

        if (e.data.action == "propagate")
        {
            if (index >= length)
            {
                index = 0;
                iterations++;
                error /= set.length;

                // log
                if (options) {
                  if (options.customLog && options.customLog.every && iterations % options.customLog.every == 0)
                    options.customLog.do({
                      error: error,
                      iterations: iterations
                    });
                  else if (options.log && iterations % options.log == 0) {
                    console.log('iterations', iterations, 'error', error);
                  };
                  if (options.shuffle)
                    shuffle(set);
                }

                if (iterations < that.iterations && error > that.error)
                {
                    activateWorker(set[index].input);
                } else {
                    // callback
                    callback({
                      error: error,
                      iterations: iterations,
                      time: Date.now() - start
                    })
                }
                error = 0;
            } else {
                activateWorker(set[index].input);
            }
        }

        if (e.data.action == "activate")
        {
            var delta = 0;
            for (var i in e.data.output)
              delta += Math.pow(set[index].output - e.data.output[i], 2);
            error += delta / e.data.output.length;

            propagateWorker(set[index].output); 
            index++;
        }
    }

    // kick it
    var index = 0;
    var iterations = 0;
    activateWorker(set[index].input);
  },

  // trains an XOR to the network
  XOR: function(options) {

    if (this.network.inputs() != 2 || this.network.outputs() != 1)
      throw "Error: Incompatible network (2 inputs, 1 output)";

    var defaults = {
      iterations: 100000,
      log: false,
      shuffle: true
    }

    if (options)
      for (var i in options)
        defaults[i] = options[i];

    return this.train([{
      input: [0, 0],
      output: [0]
    }, {
      input: [1, 0],
      output: [1]
    }, {
      input: [0, 1],
      output: [1]
    }, {
      input: [1, 1],
      output: [0]
    }], defaults);
  },

  // trains the network to pass a Distracted Sequence Recall test
  DSR: function(options) {
    options = options || {};

    var targets = options.targets || [2, 4, 7, 8];
    var distractors = options.distractors || [3, 5, 6, 9];
    var prompts = options.prompts || [0, 1];
    var length = options.length || 24;
    var criterion = options.success || 0.95;
    var iterations = options.iterations || 100000;
    var rate = options.rate || .1;
    var log = options.log || 0;
    var customLog = options.customLog || {};

    var trial = correct = i = j = success = 0,
      error = 1,
      symbols = targets.length + distractors.length + prompts.length;

    var noRepeat = function(range, avoid) {
      var number = Math.random() * range | 0;
      var used = false;
      for (var i in avoid)
        if (number == avoid[i])
          used = true;
      return used ? noRepeat(range, avoid) : number;
    }

    var equal = function(prediction, output) {
      for (var i in prediction)
        if (Math.round(prediction[i]) != output[i])
          return false;
      return true;
    }

    var start = Date.now();

    while (trial < iterations && (success < criterion || trial % 1000 != 0)) {
      // generate sequence
      var sequence = [],
        sequenceLength = length - prompts.length;
      for (i = 0; i < sequenceLength; i++) {
        var any = Math.random() * distractors.length | 0;
        sequence.push(distractors[any]);
      }
      var indexes = [],
        positions = [];
      for (i = 0; i < prompts.length; i++) {
        indexes.push(Math.random() * targets.length | 0);
        positions.push(noRepeat(sequenceLength, positions));
      }
      positions = positions.sort();
      for (i = 0; i < prompts.length; i++) {
        sequence[positions[i]] = targets[indexes[i]];
        sequence.push(prompts[i]);
      }

      //train sequence
      var targetsCorrect = distractorsCorrect = 0;
      error = 0;
      for (i = 0; i < length; i++) {
        // generate input from sequence
        var input = [];
        for (j = 0; j < symbols; j++)
          input[j] = 0;
        input[sequence[i]] = 1;

        // generate target output
        var output = [];
        for (j = 0; j < targets.length; j++)
          output[j] = 0;

        if (i >= sequenceLength) {
          var index = i - sequenceLength;
          output[indexes[index]] = 1;
        }

        // check result
        var prediction = this.network.activate(input);

        if (equal(prediction, output))
          if (i < sequenceLength)
            distractorsCorrect++;
          else
            targetsCorrect++;
        else {
          this.network.propagate(rate, output);
        }

        var delta = 0;
        for (var j in prediction)
          delta += Math.pow(output[j] - prediction[j], 2);
        error += delta / this.network.outputs();

        if (distractorsCorrect + targetsCorrect == length)
          correct++;
      }

      // calculate error
      if (trial % 1000 == 0)
        correct = 0;
      trial++;
      var divideError = trial % 1000;
      divideError = divideError == 0 ? 1000 : divideError;
      success = correct / divideError;
      error /= length;

      // log
      if (log && trial % log == 0)
        console.log("iterations:", trial, " success:", success, " correct:",
          correct, " time:", Date.now() - start, " error:", error);
      if (customLog.do && customLog.every && trial % customLog.every == 0)
        customLog.do({
          iterations: trial,
          success: success,
          error: error,
          time: Date.now() - start,
          correct: correct
        });
    }

    return {
      iterations: trial,
      success: success,
      error: error,
      time: Date.now() - start
    }
  },

  // train the network to learn an Embeded Reber Grammar
  ERG: function(options) {

    options = options || {};
    var iterations = options.iterations || 150000;
    var criterion = options.error || .05;
    var rate = options.rate || .1;
    var log = options.log || 500;

    // gramar node
    var Node = function() {
      this.paths = [];
    }
    Node.prototype = {
      connect: function(node, value) {
        this.paths.push({
          node: node,
          value: value
        });
        return this;
      },
      any: function() {
        if (this.paths.length == 0)
          return false;
        var index = Math.random() * this.paths.length | 0;
        return this.paths[index];
      },
      test: function(value) {
        for (var i in this.paths)
          if (this.paths[i].value == value)
            return this.paths[i];
        return false;
      }
    }

    var reberGrammar = function() {

      // build a reber grammar
      var output = new Node();
      var n1 = (new Node()).connect(output, "E");
      var n2 = (new Node()).connect(n1, "S");
      var n3 = (new Node()).connect(n1, "V").connect(n2, "P");
      var n4 = (new Node()).connect(n2, "X")
      n4.connect(n4, "S");
      var n5 = (new Node()).connect(n3, "V")
      n5.connect(n5, "T");
      n2.connect(n5, "X")
      var n6 = (new Node()).connect(n4, "T").connect(n5, "P");
      var input = (new Node()).connect(n6, "B")

      return {
        input: input,
        output: output
      }
    }

    // build an embeded reber grammar
    var embededReberGrammar = function() {
      var reber1 = reberGrammar();
      var reber2 = reberGrammar();

      var output = new Node();
      var n1 = (new Node).connect(output, "E");
      reber1.output.connect(n1, "T");
      reber2.output.connect(n1, "P");
      var n2 = (new Node).connect(reber1.input, "P").connect(reber2.input,
        "T");
      var input = (new Node).connect(n2, "B");

      return {
        input: input,
        output: output
      }

    }

    // generate an ERG sequence
    var generate = function() {
      var node = embededReberGrammar().input;
      var next = node.any();
      var str = "";
      while (next) {
        str += next.value;
        next = next.node.any();
      }
      return str;
    }

    // test if a string matches an embeded reber grammar
    var test = function(str) {
      var node = embededReberGrammar().input;
      var i = 0;
      var ch = str.charAt(i);
      while (i < str.length) {
        var next = node.test(ch);
        if (!next)
          return false;
        node = next.node;
        ch = str.charAt(++i);
      }
      return true;
    }

    // helper to check if the output and the target vectors match
    var different = function(array1, array2) {
      var max1 = 0;
      var i1 = -1;
      var max2 = 0;
      var i2 = -1;
      for (var i in array1) {
        if (array1[i] > max1) {
          max1 = array1[i];
          i1 = i;
        }
        if (array2[i] > max2) {
          max2 = array2[i];
          i2 = i;
        }
      }

      return i1 != i2;
    }

    var iteration = 0;
    var error = 1;
    var table = {
      "B": 0,
      "P": 1,
      "T": 2,
      "X": 3,
      "S": 4,
      "E": 5
    }

    var start = Date.now();
    while (iteration < iterations && error > criterion) {
      var i = 0;
      error = 0;

      // ERG sequence to learn
      var sequence = generate();

      // input
      var read = sequence.charAt(i);
      // target
      var predict = sequence.charAt(i + 1);

      // train
      while (i < sequence.length - 1) {
        var input = [];
        var target = [];
        for (var j = 0; j < 6; j++) {
          input[j] = 0;
          target[j] = 0;
        }
        input[table[read]] = 1;
        target[table[predict]] = 1;

        var output = this.network.activate(input);

        if (different(output, target))
          this.network.propagate(rate, target);

        read = sequence.charAt(++i);
        predict = sequence.charAt(i + 1);

        var delta = 0;
        for (var k in output)
          delta += Math.pow(target[k] - output[k], 2)
        delta /= output.length;

        error += delta;
      }
      error /= sequence.length;
      iteration++;
      if (iteration % log == 0) {
        console.log("iterations:", iteration, " time:", Date.now() - start,
          " error:", error);
      }
    }

    return {
      iterations: iteration,
      error: error,
      time: Date.now() - start,
      test: test,
      generate: generate
    }
  }
};

// export
if (module) module.exports = Trainer;


},{}]},{},[5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXJjaGl0ZWN0LmpzIiwic3JjL2xheWVyLmpzIiwic3JjL25ldHdvcmsuanMiLCJzcmMvbmV1cm9uLmpzIiwic3JjL3N5bmFwdGljLmpzIiwic3JjL3RyYWluZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1dUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBpbXBvcnRcbnZhciBMYXllciA9IHJlcXVpcmUoJy4vbGF5ZXInKSxcbiAgICBOZXR3b3JrID0gcmVxdWlyZSgnLi9uZXR3b3JrJyksXG4gICAgVHJhaW5lciA9IHJlcXVpcmUoJy4vdHJhaW5lcicpO1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFSQ0hJVEVDVFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLy8gQ29sZWN0aW9uIG9mIHVzZWZ1bCBidWlsdC1pbiBhcmNoaXRlY3R1cmVzXG52YXIgQXJjaGl0ZWN0ID0ge1xuXG4gIC8vIE11bHRpbGF5ZXIgUGVyY2VwdHJvblxuICBQZXJjZXB0cm9uOiBmdW5jdGlvbiBQZXJjZXB0cm9uKCkge1xuXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpOyAvLyBjb252ZXJ0IGFyZ3VtZW50cyB0byBBcnJheVxuICAgIGlmIChhcmdzLmxlbmd0aCA8IDMpXG4gICAgICB0aHJvdyBcIkVycm9yOiBub3QgZW5vdWdoIGxheWVycyAobWluaW11bSAzKSAhIVwiO1xuXG4gICAgdmFyIGlucHV0cyA9IGFyZ3Muc2hpZnQoKTsgLy8gZmlyc3QgYXJndW1lbnRcbiAgICB2YXIgb3V0cHV0cyA9IGFyZ3MucG9wKCk7IC8vIGxhc3QgYXJndW1lbnRcbiAgICB2YXIgbGF5ZXJzID0gYXJnczsgLy8gYWxsIHRoZSBhcmd1bWVudHMgaW4gdGhlIG1pZGRsZVxuXG4gICAgdmFyIGlucHV0ID0gbmV3IExheWVyKGlucHV0cyk7XG4gICAgdmFyIGhpZGRlbiA9IFtdO1xuICAgIHZhciBvdXRwdXQgPSBuZXcgTGF5ZXIob3V0cHV0cyk7XG5cbiAgICB2YXIgcHJldmlvdXMgPSBpbnB1dDtcblxuICAgIC8vIGdlbmVyYXRlIGhpZGRlbiBsYXllcnNcbiAgICBmb3IgKGxldmVsIGluIGxheWVycykge1xuICAgICAgdmFyIHNpemUgPSBsYXllcnNbbGV2ZWxdO1xuICAgICAgdmFyIGxheWVyID0gbmV3IExheWVyKHNpemUpO1xuICAgICAgaGlkZGVuLnB1c2gobGF5ZXIpO1xuICAgICAgcHJldmlvdXMucHJvamVjdChsYXllcik7XG4gICAgICBwcmV2aW91cyA9IGxheWVyO1xuICAgIH1cbiAgICBwcmV2aW91cy5wcm9qZWN0KG91dHB1dCk7XG5cbiAgICAvLyBzZXQgbGF5ZXJzIG9mIHRoZSBuZXVyYWwgbmV0d29ya1xuICAgIHRoaXMuc2V0KHtcbiAgICAgIGlucHV0OiBpbnB1dCxcbiAgICAgIGhpZGRlbjogaGlkZGVuLFxuICAgICAgb3V0cHV0OiBvdXRwdXRcbiAgICB9KTtcblxuICAgIC8vIHRyYWluZXIgZm9yIHRoZSBuZXR3b3JrXG4gICAgdGhpcy50cmFpbmVyID0gbmV3IFRyYWluZXIodGhpcyk7XG4gIH0sXG5cbiAgLy8gTXVsdGlsYXllciBMb25nIFNob3J0LVRlcm0gTWVtb3J5XG4gIExTVE06IGZ1bmN0aW9uIExTVE0oKSB7XG5cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7IC8vIGNvbnZlcnQgYXJndW1lbnRzIHRvIGFycmF5XG4gICAgaWYgKGFyZ3MubGVuZ3RoIDwgMylcbiAgICAgIHRocm93IFwiRXJyb3I6IG5vdCBlbm91Z2ggbGF5ZXJzIChtaW5pbXVtIDMpICEhXCI7XG5cbiAgICB2YXIgaW5wdXRzID0gYXJncy5zaGlmdCgpO1xuICAgIHZhciBvdXRwdXRzID0gYXJncy5wb3AoKTtcbiAgICB2YXIgbGF5ZXJzID0gYXJncztcblxuICAgIHZhciBpbnB1dExheWVyID0gbmV3IExheWVyKGlucHV0cyk7XG4gICAgdmFyIGhpZGRlbkxheWVycyA9IFtdO1xuICAgIHZhciBvdXRwdXRMYXllciA9IG5ldyBMYXllcihvdXRwdXRzKTtcblxuICAgIHZhciBwcmV2aW91cyA9IG51bGw7XG5cbiAgICAvLyBnZW5lcmF0ZSBsYXllcnNcbiAgICBmb3IgKHZhciBsYXllciBpbiBsYXllcnMpIHtcbiAgICAgIC8vIGdlbmVyYXRlIG1lbW9yeSBibG9ja3MgKG1lbW9yeSBjZWxsIGFuZCByZXNwZWN0aXZlIGdhdGVzKVxuICAgICAgdmFyIHNpemUgPSBsYXllcnNbbGF5ZXJdO1xuXG4gICAgICB2YXIgaW5wdXRHYXRlID0gbmV3IExheWVyKHNpemUpLnNldCh7XG4gICAgICAgIGJpYXM6IDFcbiAgICAgIH0pO1xuICAgICAgdmFyIGZvcmdldEdhdGUgPSBuZXcgTGF5ZXIoc2l6ZSkuc2V0KHtcbiAgICAgICAgYmlhczogMVxuICAgICAgfSk7XG4gICAgICB2YXIgbWVtb3J5Q2VsbCA9IG5ldyBMYXllcihzaXplKTtcbiAgICAgIHZhciBvdXRwdXRHYXRlID0gbmV3IExheWVyKHNpemUpLnNldCh7XG4gICAgICAgIGJpYXM6IDFcbiAgICAgIH0pO1xuXG4gICAgICBoaWRkZW5MYXllcnMucHVzaChpbnB1dEdhdGUpO1xuICAgICAgaGlkZGVuTGF5ZXJzLnB1c2goZm9yZ2V0R2F0ZSk7XG4gICAgICBoaWRkZW5MYXllcnMucHVzaChtZW1vcnlDZWxsKTtcbiAgICAgIGhpZGRlbkxheWVycy5wdXNoKG91dHB1dEdhdGUpO1xuXG4gICAgICAvLyBjb25uZWN0aW9ucyBmcm9tIGlucHV0IGxheWVyXG4gICAgICB2YXIgaW5wdXQgPSBpbnB1dExheWVyLnByb2plY3QobWVtb3J5Q2VsbCk7XG4gICAgICBpbnB1dExheWVyLnByb2plY3QoaW5wdXRHYXRlKTtcbiAgICAgIGlucHV0TGF5ZXIucHJvamVjdChmb3JnZXRHYXRlKTtcbiAgICAgIGlucHV0TGF5ZXIucHJvamVjdChvdXRwdXRHYXRlKTtcblxuICAgICAgLy8gY29ubmVjdGlvbnMgZnJvbSBwcmV2aW91cyBtZW1vcnktYmxvY2sgbGF5ZXIgdG8gdGhpcyBvbmVcbiAgICAgIGlmIChwcmV2aW91cyAhPSBudWxsKSB7XG4gICAgICAgIHZhciBjZWxsID0gcHJldmlvdXMucHJvamVjdChtZW1vcnlDZWxsKTtcbiAgICAgICAgcHJldmlvdXMucHJvamVjdChpbnB1dEdhdGUpO1xuICAgICAgICBwcmV2aW91cy5wcm9qZWN0KGZvcmdldEdhdGUpO1xuICAgICAgICBwcmV2aW91cy5wcm9qZWN0KG91dHB1dEdhdGUpO1xuICAgICAgfVxuXG4gICAgICAvLyBjb25uZWN0aW9ucyBmcm9tIG1lbW9yeSBjZWxsXG4gICAgICB2YXIgb3V0cHV0ID0gbWVtb3J5Q2VsbC5wcm9qZWN0KG91dHB1dExheWVyKTtcblxuICAgICAgLy8gc2VsZi1jb25uZWN0aW9uXG4gICAgICB2YXIgc2VsZiA9IG1lbW9yeUNlbGwucHJvamVjdChtZW1vcnlDZWxsKTtcblxuICAgICAgLy8gcGVlcGhvbGVzXG4gICAgICBtZW1vcnlDZWxsLnByb2plY3QoaW5wdXRHYXRlLCBMYXllci5jb25uZWN0aW9uVHlwZS5PTkVfVE9fT05FKTtcbiAgICAgIG1lbW9yeUNlbGwucHJvamVjdChmb3JnZXRHYXRlLCBMYXllci5jb25uZWN0aW9uVHlwZS5PTkVfVE9fT05FKTtcbiAgICAgIG1lbW9yeUNlbGwucHJvamVjdChvdXRwdXRHYXRlLCBMYXllci5jb25uZWN0aW9uVHlwZS5PTkVfVE9fT05FKTtcblxuICAgICAgLy8gZ2F0ZXNcbiAgICAgIGlucHV0R2F0ZS5nYXRlKGlucHV0LCBMYXllci5nYXRlVHlwZS5JTlBVVCk7XG4gICAgICBmb3JnZXRHYXRlLmdhdGUoc2VsZiwgTGF5ZXIuZ2F0ZVR5cGUuT05FX1RPX09ORSk7XG4gICAgICBvdXRwdXRHYXRlLmdhdGUob3V0cHV0LCBMYXllci5nYXRlVHlwZS5PVVRQVVQpO1xuICAgICAgaWYgKHByZXZpb3VzICE9IG51bGwpXG4gICAgICAgIGlucHV0R2F0ZS5nYXRlKGNlbGwsIExheWVyLmdhdGVUeXBlLklOUFVUKTtcblxuICAgICAgcHJldmlvdXMgPSBtZW1vcnlDZWxsO1xuICAgIH1cblxuICAgIC8vIGlucHV0IHRvIG91dHB1dCBkaXJlY3QgY29ubmVjdGlvblxuICAgIGlucHV0TGF5ZXIucHJvamVjdChvdXRwdXRMYXllcik7XG5cbiAgICAvLyBzZXQgdGhlIGxheWVycyBvZiB0aGUgbmV1cmFsIG5ldHdvcmtcbiAgICB0aGlzLnNldCh7XG4gICAgICBpbnB1dDogaW5wdXRMYXllcixcbiAgICAgIGhpZGRlbjogaGlkZGVuTGF5ZXJzLFxuICAgICAgb3V0cHV0OiBvdXRwdXRMYXllclxuICAgIH0pO1xuXG4gICAgLy8gdHJhaW5lclxuICAgIHRoaXMudHJhaW5lciA9IG5ldyBUcmFpbmVyKHRoaXMpO1xuICB9LFxuXG4gIC8vIExpcXVpZCBTdGF0ZSBNYWNoaW5lXG4gIExpcXVpZDogZnVuY3Rpb24gTGlxdWlkKGlucHV0cywgaGlkZGVuLCBvdXRwdXRzLCBjb25uZWN0aW9ucywgZ2F0ZXMpIHtcblxuICAgIC8vIGNyZWF0ZSBsYXllcnNcbiAgICB2YXIgaW5wdXRMYXllciA9IG5ldyBMYXllcihpbnB1dHMpO1xuICAgIHZhciBoaWRkZW5MYXllciA9IG5ldyBMYXllcihoaWRkZW4pO1xuICAgIHZhciBvdXRwdXRMYXllciA9IG5ldyBMYXllcihvdXRwdXRzKTtcblxuICAgIC8vIG1ha2UgY29ubmVjdGlvbnMgYW5kIGdhdGVzIHJhbmRvbWx5IGFtb25nIHRoZSBuZXVyb25zXG4gICAgdmFyIG5ldXJvbnMgPSBoaWRkZW5MYXllci5uZXVyb25zKCk7XG4gICAgdmFyIGNvbm5lY3Rpb25MaXN0ID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbm5lY3Rpb25zOyBpKyspIHtcbiAgICAgIC8vIGNvbm5lY3QgdHdvIHJhbmRvbSBuZXVyb25zXG4gICAgICB2YXIgZnJvbSA9IE1hdGgucmFuZG9tKCkgKiBuZXVyb25zLmxlbmd0aCB8IDA7XG4gICAgICB2YXIgdG8gPSBNYXRoLnJhbmRvbSgpICogbmV1cm9ucy5sZW5ndGggfCAwO1xuICAgICAgdmFyIGNvbm5lY3Rpb24gPSBuZXVyb25zW2Zyb21dLnByb2plY3QobmV1cm9uc1t0b10pO1xuICAgICAgY29ubmVjdGlvbkxpc3QucHVzaChjb25uZWN0aW9uKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGdhdGVzOyBqKyspIHtcbiAgICAgIC8vIHBpY2sgYSByYW5kb20gZ2F0ZXIgbmV1cm9uXG4gICAgICB2YXIgZ2F0ZXIgPSBNYXRoLnJhbmRvbSgpICogbmV1cm9ucy5sZW5ndGggfCAwO1xuICAgICAgLy8gcGljayBhIHJhbmRvbSBjb25uZWN0aW9uIHRvIGdhdGVcbiAgICAgIHZhciBjb25uZWN0aW9uID0gTWF0aC5yYW5kb20oKSAqIGNvbm5lY3Rpb25MaXN0Lmxlbmd0aCB8IDA7XG4gICAgICAvLyBsZXQgdGhlIGdhdGVyIGdhdGUgdGhlIGNvbm5lY3Rpb25cbiAgICAgIG5ldXJvbnNbZ2F0ZXJdLmdhdGUoY29ubmVjdGlvbkxpc3RbY29ubmVjdGlvbl0pO1xuICAgIH1cblxuICAgIC8vIGNvbm5lY3QgdGhlIGxheWVyc1xuICAgIGlucHV0TGF5ZXIucHJvamVjdChoaWRkZW5MYXllcik7XG4gICAgaGlkZGVuTGF5ZXIucHJvamVjdChvdXRwdXRMYXllcik7XG5cbiAgICAvLyBzZXQgdGhlIGxheWVycyBvZiB0aGUgbmV0d29ya1xuICAgIHRoaXMuc2V0KHtcbiAgICAgIGlucHV0OiBpbnB1dExheWVyLFxuICAgICAgaGlkZGVuOiBbaGlkZGVuTGF5ZXJdLFxuICAgICAgb3V0cHV0OiBvdXRwdXRMYXllclxuICAgIH0pO1xuXG4gICAgLy8gdHJhaW5lclxuICAgIHRoaXMudHJhaW5lciA9IG5ldyBUcmFpbmVyKHRoaXMpO1xuICB9LFxuXG4gIEhvcGZpZWxkOiBmdW5jdGlvbiBIb3BmaWVsZChzaXplKVxuICB7XG4gICAgdmFyIGlucHV0TGF5ZXIgPSBuZXcgTGF5ZXIoc2l6ZSk7XG4gICAgdmFyIG91dHB1dExheWVyID0gbmV3IExheWVyKHNpemUpO1xuXG4gICAgaW5wdXRMYXllci5wcm9qZWN0KG91dHB1dExheWVyLCBMYXllci5jb25uZWN0aW9uVHlwZS5BTExfVE9fQUxMKTtcblxuICAgIHRoaXMuc2V0KHtcbiAgICAgIGlucHV0OiBpbnB1dExheWVyLFxuICAgICAgaGlkZGVuOiBbXSxcbiAgICAgIG91dHB1dDogb3V0cHV0TGF5ZXJcbiAgICB9KTtcblxuICAgIHZhciB0cmFpbmVyID0gbmV3IFRyYWluZXIodGhpcyk7XG5cbiAgICB2YXIgcHJvdG8gPSBBcmNoaXRlY3QuSG9wZmllbGQucHJvdG90eXBlO1xuXG4gICAgcHJvdG8ubGVhcm4gPSBwcm90by5sZWFybiB8fCBmdW5jdGlvbihwYXR0ZXJucylcbiAgICB7XG4gICAgICB2YXIgc2V0ID0gW107XG4gICAgICBmb3IgKHZhciBwIGluIHBhdHRlcm5zKVxuICAgICAgICBzZXQucHVzaCh7XG4gICAgICAgICAgaW5wdXQ6IHBhdHRlcm5zW3BdLFxuICAgICAgICAgIG91dHB1dDogcGF0dGVybnNbcF1cbiAgICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0cmFpbmVyLnRyYWluKHNldCwge1xuICAgICAgICBpdGVyYXRpb25zOiA1MDAwMDAsXG4gICAgICAgIGVycm9yOiAuMDAwMDUsXG4gICAgICAgIHJhdGU6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RvLmZlZWQgPSBwcm90by5mZWVkIHx8IGZ1bmN0aW9uKHBhdHRlcm4pXG4gICAge1xuICAgICAgdmFyIG91dHB1dCA9IHRoaXMuYWN0aXZhdGUocGF0dGVybik7XG5cbiAgICAgIHZhciBwYXR0ZXJuID0gW107XG4gICAgICBmb3IgKHZhciBpIGluIG91dHB1dClcbiAgICAgICAgcGF0dGVybltpXSA9IG91dHB1dFtpXSA+IC41ID8gMSA6IDA7XG5cbiAgICAgIHJldHVybiBwYXR0ZXJuO1xuICAgIH1cbiAgfVxufVxuXG4vLyBFeHRlbmQgcHJvdG90eXBlIGNoYWluIChzbyBldmVyeSBhcmNoaXRlY3R1cmVzIGlzIGFuIGluc3RhbmNlIG9mIE5ldHdvcmspXG5mb3IgKHZhciBhcmNoaXRlY3R1cmUgaW4gQXJjaGl0ZWN0KSB7XG4gIEFyY2hpdGVjdFthcmNoaXRlY3R1cmVdLnByb3RvdHlwZSA9IG5ldyBOZXR3b3JrKCk7XG4gIEFyY2hpdGVjdFthcmNoaXRlY3R1cmVdLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFyY2hpdGVjdFthcmNoaXRlY3R1cmVdO1xufVxuXG4vLyBleHBvcnRcbmlmIChtb2R1bGUpIG1vZHVsZS5leHBvcnRzID0gQXJjaGl0ZWN0OyBcblxuIiwiLy8gaW1wb3J0XG52YXIgTmV1cm9uID0gcmVxdWlyZSgnLi9uZXVyb24nKTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTEFZRVJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmZ1bmN0aW9uIExheWVyKHNpemUsIGxhYmVsKSB7XG4gIHRoaXMuc2l6ZSA9IHNpemUgfCAwO1xuICB0aGlzLmxpc3QgPSBbXTtcbiAgdGhpcy5sYWJlbCA9IGxhYmVsIHx8IG51bGw7XG5cbiAgd2hpbGUgKHNpemUtLSkge1xuICAgIHZhciBuZXVyb24gPSBuZXcgTmV1cm9uKCk7XG4gICAgdGhpcy5saXN0LnB1c2gobmV1cm9uKTtcbiAgfVxufVxuXG5MYXllci5wcm90b3R5cGUgPSB7XG5cbiAgLy8gYWN0aXZhdGVzIGFsbCB0aGUgbmV1cm9ucyBpbiB0aGUgbGF5ZXJcbiAgYWN0aXZhdGU6IGZ1bmN0aW9uKGlucHV0KSB7XG5cbiAgICB2YXIgYWN0aXZhdGlvbnMgPSBbXTtcblxuICAgIGlmICh0eXBlb2YgaW5wdXQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmIChpbnB1dC5sZW5ndGggIT0gdGhpcy5zaXplKVxuICAgICAgICB0aHJvdyBcIklOUFVUIHNpemUgYW5kIExBWUVSIHNpemUgbXVzdCBiZSB0aGUgc2FtZSB0byBhY3RpdmF0ZSFcIjtcblxuICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5saXN0KSB7XG4gICAgICAgIHZhciBuZXVyb24gPSB0aGlzLmxpc3RbaWRdO1xuICAgICAgICB2YXIgYWN0aXZhdGlvbiA9IG5ldXJvbi5hY3RpdmF0ZShpbnB1dFtpZF0pO1xuICAgICAgICBhY3RpdmF0aW9ucy5wdXNoKGFjdGl2YXRpb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLmxpc3QpIHtcbiAgICAgICAgdmFyIG5ldXJvbiA9IHRoaXMubGlzdFtpZF07XG4gICAgICAgIHZhciBhY3RpdmF0aW9uID0gbmV1cm9uLmFjdGl2YXRlKCk7XG4gICAgICAgIGFjdGl2YXRpb25zLnB1c2goYWN0aXZhdGlvbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhY3RpdmF0aW9ucztcbiAgfSxcblxuICAvLyBwcm9wYWdhdGVzIHRoZSBlcnJvciBvbiBhbGwgdGhlIG5ldXJvbnMgb2YgdGhlIGxheWVyXG4gIHByb3BhZ2F0ZTogZnVuY3Rpb24ocmF0ZSwgdGFyZ2V0KSB7XG5cbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGggIT0gdGhpcy5zaXplKVxuICAgICAgICB0aHJvdyBcIlRBUkdFVCBzaXplIGFuZCBMQVlFUiBzaXplIG11c3QgYmUgdGhlIHNhbWUgdG8gcHJvcGFnYXRlIVwiO1xuXG4gICAgICBmb3IgKHZhciBpZCA9IHRoaXMubGlzdC5sZW5ndGggLSAxOyBpZCA+PSAwOyBpZC0tKSB7XG4gICAgICAgIHZhciBuZXVyb24gPSB0aGlzLmxpc3RbaWRdO1xuICAgICAgICBuZXVyb24ucHJvcGFnYXRlKHJhdGUsIHRhcmdldFtpZF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpZCA9IHRoaXMubGlzdC5sZW5ndGggLSAxOyBpZCA+PSAwOyBpZC0tKSB7XG4gICAgICAgIHZhciBuZXVyb24gPSB0aGlzLmxpc3RbaWRdO1xuICAgICAgICBuZXVyb24ucHJvcGFnYXRlKHJhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyBwcm9qZWN0cyBhIGNvbm5lY3Rpb24gZnJvbSB0aGlzIGxheWVyIHRvIGFub3RoZXIgb25lXG4gIHByb2plY3Q6IGZ1bmN0aW9uKGxheWVyLCB0eXBlLCB3ZWlnaHRzKSB7XG5cbiAgICBpZiAobGF5ZXIgaW5zdGFuY2VvZiByZXF1aXJlKCcuL25ldHdvcmsnKSlcbiAgICAgIGxheWVyID0gbGF5ZXIubGF5ZXJzLmlucHV0O1xuXG4gICAgaWYgKGxheWVyIGluc3RhbmNlb2YgTGF5ZXIpIHtcbiAgICAgIGlmICghdGhpcy5jb25uZWN0ZWQobGF5ZXIpKVxuICAgICAgICByZXR1cm4gbmV3IExheWVyLmNvbm5lY3Rpb24odGhpcywgbGF5ZXIsIHR5cGUsIHdlaWdodHMpO1xuICAgIH0gZWxzZVxuICAgICAgdGhyb3cgXCJJbnZhbGlkIGFyZ3VtZW50LCB5b3UgY2FuIG9ubHkgcHJvamVjdCBjb25uZWN0aW9ucyB0byBMQVlFUlMgYW5kIE5FVFdPUktTIVwiO1xuXG5cbiAgfSxcblxuICAvLyBnYXRlcyBhIGNvbm5lY3Rpb24gYmV0d2VubiB0d28gbGF5ZXJzXG4gIGdhdGU6IGZ1bmN0aW9uKGNvbm5lY3Rpb24sIHR5cGUpIHtcblxuICAgIGlmICh0eXBlID09IExheWVyLmdhdGVUeXBlLklOUFVUKSB7XG4gICAgICBpZiAoY29ubmVjdGlvbi50by5zaXplICE9IHRoaXMuc2l6ZSlcbiAgICAgICAgdGhyb3cgXCJHQVRFUiBsYXllciBhbmQgQ09OTkVDVElPTi5UTyBsYXllciBtdXN0IGJlIHRoZSBzYW1lIHNpemUgaW4gb3JkZXIgdG8gZ2F0ZSFcIjtcblxuICAgICAgZm9yICh2YXIgaWQgaW4gY29ubmVjdGlvbi50by5saXN0KSB7XG4gICAgICAgIHZhciBuZXVyb24gPSBjb25uZWN0aW9uLnRvLmxpc3RbaWRdO1xuICAgICAgICB2YXIgZ2F0ZXIgPSB0aGlzLmxpc3RbaWRdO1xuICAgICAgICBmb3IgKHZhciBpbnB1dCBpbiBuZXVyb24uY29ubmVjdGlvbnMuaW5wdXRzKSB7XG4gICAgICAgICAgdmFyIGdhdGVkID0gbmV1cm9uLmNvbm5lY3Rpb25zLmlucHV0c1tpbnB1dF07XG4gICAgICAgICAgaWYgKGdhdGVkLklEIGluIGNvbm5lY3Rpb24uY29ubmVjdGlvbnMpXG4gICAgICAgICAgICBnYXRlci5nYXRlKGdhdGVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PSBMYXllci5nYXRlVHlwZS5PVVRQVVQpIHtcbiAgICAgIGlmIChjb25uZWN0aW9uLmZyb20uc2l6ZSAhPSB0aGlzLnNpemUpXG4gICAgICAgIHRocm93IFwiR0FURVIgbGF5ZXIgYW5kIENPTk5FQ1RJT04uRlJPTSBsYXllciBtdXN0IGJlIHRoZSBzYW1lIHNpemUgaW4gb3JkZXIgdG8gZ2F0ZSFcIjtcblxuICAgICAgZm9yICh2YXIgaWQgaW4gY29ubmVjdGlvbi5mcm9tLmxpc3QpIHtcbiAgICAgICAgdmFyIG5ldXJvbiA9IGNvbm5lY3Rpb24uZnJvbS5saXN0W2lkXTtcbiAgICAgICAgdmFyIGdhdGVyID0gdGhpcy5saXN0W2lkXTtcbiAgICAgICAgZm9yICh2YXIgcHJvamVjdGVkIGluIG5ldXJvbi5jb25uZWN0aW9ucy5wcm9qZWN0ZWQpIHtcbiAgICAgICAgICB2YXIgZ2F0ZWQgPSBuZXVyb24uY29ubmVjdGlvbnMucHJvamVjdGVkW3Byb2plY3RlZF07XG4gICAgICAgICAgaWYgKGdhdGVkLklEIGluIGNvbm5lY3Rpb24uY29ubmVjdGlvbnMpXG4gICAgICAgICAgICBnYXRlci5nYXRlKGdhdGVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PSBMYXllci5nYXRlVHlwZS5PTkVfVE9fT05FKSB7XG4gICAgICBpZiAoY29ubmVjdGlvbi5zaXplICE9IHRoaXMuc2l6ZSlcbiAgICAgICAgdGhyb3cgXCJUaGUgbnVtYmVyIG9mIEdBVEVSIFVOSVRTIG11c3QgYmUgdGhlIHNhbWUgYXMgdGhlIG51bWJlciBvZiBDT05ORUNUSU9OUyB0byBnYXRlIVwiO1xuXG4gICAgICBmb3IgKHZhciBpZCBpbiBjb25uZWN0aW9uLmxpc3QpIHtcbiAgICAgICAgdmFyIGdhdGVyID0gdGhpcy5saXN0W2lkXTtcbiAgICAgICAgdmFyIGdhdGVkID0gY29ubmVjdGlvbi5saXN0W2lkXTtcbiAgICAgICAgZ2F0ZXIuZ2F0ZShnYXRlZCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIHRydWUgb3IgZmFsc2Ugd2hldGhlciB0aGUgd2hvbGUgbGF5ZXIgaXMgc2VsZi1jb25uZWN0ZWQgb3Igbm90XG4gIHNlbGZjb25uZWN0ZWQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy5saXN0KSB7XG4gICAgICB2YXIgbmV1cm9uID0gdGhpcy5saXN0W2lkXTtcbiAgICAgIGlmICghbmV1cm9uLnNlbGZjb25uZWN0ZWQoKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICAvLyB0cnVlIG9mIGZhbHNlIHdoZXRoZXIgdGhlIGxheWVyIGlzIGNvbm5lY3RlZCB0byBhbm90aGVyIGxheWVyIChwYXJhbWV0ZXIpIG9yIG5vdFxuICBjb25uZWN0ZWQ6IGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgLy8gQ2hlY2sgaWYgQUxMIHRvIEFMTCBjb25uZWN0aW9uXG4gICAgdmFyIGNvbm5lY3Rpb25zID0gMDtcbiAgICBmb3IgKHZhciBoZXJlIGluIHRoaXMubGlzdCkge1xuICAgICAgZm9yICh2YXIgdGhlcmUgaW4gbGF5ZXIubGlzdCkge1xuICAgICAgICB2YXIgZnJvbSA9IHRoaXMubGlzdFtoZXJlXTtcbiAgICAgICAgdmFyIHRvID0gbGF5ZXIubGlzdFt0aGVyZV07XG4gICAgICAgIHZhciBjb25uZWN0ZWQgPSBmcm9tLmNvbm5lY3RlZCh0byk7XG4gICAgICAgIGlmIChjb25uZWN0ZWQudHlwZSA9PSAncHJvamVjdGVkJylcbiAgICAgICAgICBjb25uZWN0aW9ucysrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY29ubmVjdGlvbnMgPT0gdGhpcy5zaXplICogbGF5ZXIuc2l6ZSlcbiAgICAgIHJldHVybiBMYXllci5jb25uZWN0aW9uVHlwZS5BTExfVE9fQUxMO1xuXG4gICAgLy8gQ2hlY2sgaWYgT05FIHRvIE9ORSBjb25uZWN0aW9uXG4gICAgY29ubmVjdGlvbnMgPSAwO1xuICAgIGZvciAodmFyIG5ldXJvbiBpbiB0aGlzLmxpc3QpIHtcbiAgICAgIHZhciBmcm9tID0gdGhpcy5saXN0W25ldXJvbl07XG4gICAgICB2YXIgdG8gPSBsYXllci5saXN0W25ldXJvbl07XG4gICAgICB2YXIgY29ubmVjdGVkID0gZnJvbS5jb25uZWN0ZWQodG8pO1xuICAgICAgaWYgKGNvbm5lY3RlZCA9PSAncHJvamVjdGVkJylcbiAgICAgICAgY29ubmVjdGlvbnMrKztcbiAgICB9XG4gICAgaWYgKGNvbm5lY3Rpb25zID09IHRoaXMuc2l6ZSlcbiAgICAgIHJldHVybiBMYXllci5jb25uZWN0aW9uVHlwZS5PTkVfVE9fT05FO1xuICB9LFxuXG4gIC8vIGNsZWFycyBhbGwgdGhlIG5ldW9ybnMgaW4gdGhlIGxheWVyXG4gIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpZCBpbiB0aGlzLmxpc3QpIHtcbiAgICAgIHZhciBuZXVyb24gPSB0aGlzLmxpc3RbaWRdO1xuICAgICAgbmV1cm9uLmNsZWFyKCk7XG4gICAgfVxuICB9LFxuXG4gIC8vIHJlc2V0cyBhbGwgdGhlIG5ldXJvbnMgaW4gdGhlIGxheWVyXG4gIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpZCBpbiB0aGlzLmxpc3QpIHtcbiAgICAgIHZhciBuZXVyb24gPSB0aGlzLmxpc3RbaWRdO1xuICAgICAgbmV1cm9uLnJlc2V0KCk7XG4gICAgfVxuICB9LFxuXG4gIC8vIHJldHVybnMgYWxsIHRoZSBuZXVyb25zIGluIHRoZSBsYXllciAoYXJyYXkpXG4gIG5ldXJvbnM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmxpc3Q7XG4gIH0sXG5cbiAgLy8gYWRkcyBhIG5ldXJvbiB0byB0aGUgbGF5ZXJcbiAgYWRkOiBmdW5jdGlvbihuZXVyb24pIHtcbiAgICB0aGlzLm5ldXJvbnNbbmV1cm9uLklEXSA9IG5ldXJvbiB8fCBuZXcgTmV1cm9uKCk7XG4gICAgdGhpcy5saXN0LnB1c2gobmV1cm9uKTtcbiAgICB0aGlzLnNpemUrKztcbiAgfSxcblxuICBzZXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5saXN0KSB7XG4gICAgICB2YXIgbmV1cm9uID0gdGhpcy5saXN0W2ldO1xuICAgICAgaWYgKG9wdGlvbnMubGFiZWwpXG4gICAgICAgIG5ldXJvbi5sYWJlbCA9IG9wdGlvbnMubGFiZWwgKyAnXycgKyBuZXVyb24uSUQ7XG4gICAgICBpZiAob3B0aW9ucy5zcXVhc2gpXG4gICAgICAgIG5ldXJvbi5zcXVhc2ggPSBvcHRpb25zLnNxdWFzaDtcbiAgICAgIGlmIChvcHRpb25zLmJpYXMpXG4gICAgICAgIG5ldXJvbi5iaWFzID0gb3B0aW9ucy5iaWFzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vLyByZXByZXNlbnRzIGEgY29ubmVjdGlvbiBmcm9tIG9uZSBsYXllciB0byBhbm90aGVyLCBhbmQga2VlcHMgdHJhY2sgb2YgaXRzIHdlaWdodCBhbmQgZ2FpblxuTGF5ZXIuY29ubmVjdGlvbiA9IGZ1bmN0aW9uIExheWVyQ29ubmVjdGlvbihmcm9tTGF5ZXIsIHRvTGF5ZXIsIHR5cGUsIHdlaWdodHMpIHtcbiAgdGhpcy5JRCA9IExheWVyLmNvbm5lY3Rpb24udWlkKCk7XG4gIHRoaXMuZnJvbSA9IGZyb21MYXllcjtcbiAgdGhpcy50byA9IHRvTGF5ZXI7XG4gIHRoaXMuc2VsZmNvbm5lY3Rpb24gPSB0b0xheWVyID09IGZyb21MYXllcjtcbiAgdGhpcy50eXBlID0gdHlwZTtcbiAgdGhpcy5jb25uZWN0aW9ucyA9IHt9O1xuICB0aGlzLmxpc3QgPSBbXTtcbiAgdGhpcy5zaXplID0gMDtcblxuICBpZiAodHlwZW9mIHRoaXMudHlwZSA9PSAndW5kZWZpbmVkJylcbiAge1xuICAgIGlmIChmcm9tTGF5ZXIgPT0gdG9MYXllcilcbiAgICAgIHRoaXMudHlwZSA9IExheWVyLmNvbm5lY3Rpb25UeXBlLk9ORV9UT19PTkU7XG4gICAgZWxzZVxuICAgICAgdGhpcy50eXBlID0gTGF5ZXIuY29ubmVjdGlvblR5cGUuQUxMX1RPX0FMTDtcbiAgfVxuXG4gIGlmICh0aGlzLnR5cGUgPT0gTGF5ZXIuY29ubmVjdGlvblR5cGUuQUxMX1RPX0FMTCkge1xuICAgIGZvciAodmFyIGhlcmUgaW4gdGhpcy5mcm9tLmxpc3QpIHtcbiAgICAgIGZvciAodmFyIHRoZXJlIGluIHRoaXMudG8ubGlzdCkge1xuICAgICAgICB2YXIgZnJvbSA9IHRoaXMuZnJvbS5saXN0W2hlcmVdO1xuICAgICAgICB2YXIgdG8gPSB0aGlzLnRvLmxpc3RbdGhlcmVdO1xuICAgICAgICB2YXIgY29ubmVjdGlvbiA9IGZyb20ucHJvamVjdCh0bywgd2VpZ2h0cyk7XG5cbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tjb25uZWN0aW9uLklEXSA9IGNvbm5lY3Rpb247XG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMubGlzdC5wdXNoKGNvbm5lY3Rpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT0gTGF5ZXIuY29ubmVjdGlvblR5cGUuT05FX1RPX09ORSkge1xuXG4gICAgZm9yICh2YXIgbmV1cm9uIGluIHRoaXMuZnJvbS5saXN0KSB7XG4gICAgICB2YXIgZnJvbSA9IHRoaXMuZnJvbS5saXN0W25ldXJvbl07XG4gICAgICB2YXIgdG8gPSB0aGlzLnRvLmxpc3RbbmV1cm9uXTtcbiAgICAgIHZhciBjb25uZWN0aW9uID0gZnJvbS5wcm9qZWN0KHRvLCB3ZWlnaHRzKTtcblxuICAgICAgdGhpcy5jb25uZWN0aW9uc1tjb25uZWN0aW9uLklEXSA9IGNvbm5lY3Rpb247XG4gICAgICB0aGlzLnNpemUgPSB0aGlzLmxpc3QucHVzaChjb25uZWN0aW9uKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gdHlwZXMgb2YgY29ubmVjdGlvbnNcbkxheWVyLmNvbm5lY3Rpb25UeXBlID0ge307XG5MYXllci5jb25uZWN0aW9uVHlwZS5BTExfVE9fQUxMID0gXCJBTEwgVE8gQUxMXCI7XG5MYXllci5jb25uZWN0aW9uVHlwZS5PTkVfVE9fT05FID0gXCJPTkUgVE8gT05FXCI7XG5cbi8vIHR5cGVzIG9mIGdhdGVzXG5MYXllci5nYXRlVHlwZSA9IHt9O1xuTGF5ZXIuZ2F0ZVR5cGUuSU5QVVQgPSBcIklOUFVUXCI7XG5MYXllci5nYXRlVHlwZS5PVVRQVVQgPSBcIk9VVFBVVFwiO1xuTGF5ZXIuZ2F0ZVR5cGUuT05FX1RPX09ORSA9IFwiT05FIFRPIE9ORVwiO1xuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBjb25uZWN0aW9ucyA9IDA7XG4gIExheWVyLmNvbm5lY3Rpb24udWlkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNvbm5lY3Rpb25zKys7XG4gIH1cbn0pKCk7XG5cbi8vIGV4cG9ydFxuaWYgKG1vZHVsZSkgbW9kdWxlLmV4cG9ydHMgPSBMYXllcjtcblxuIiwiLy8gaW1wb3J0XG52YXIgTmV1cm9uID0gcmVxdWlyZSgnLi9uZXVyb24nKSxcbiAgICBMYXllciA9IHJlcXVpcmUoJy4vbGF5ZXInKTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTkVUV09SS1xuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuZnVuY3Rpb24gTmV0d29yayhsYXllcnMpIHtcbiAgaWYgKHR5cGVvZiBsYXllcnMgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLmxheWVycyA9IGxheWVycyB8fCB7XG4gICAgICBpbnB1dDogbnVsbCxcbiAgICAgIGhpZGRlbjoge30sXG4gICAgICBvdXRwdXQ6IG51bGxcbiAgICB9O1xuICAgIHRoaXMub3B0aW1pemVkID0gbnVsbDtcbiAgfVxufVxuTmV0d29yay5wcm90b3R5cGUgPSB7XG5cbiAgLy8gZmVlZC1mb3J3YXJkIGFjdGl2YXRpb24gb2YgYWxsIHRoZSBsYXllcnMgdG8gcHJvZHVjZSBhbiBvdXB1dFxuICBhY3RpdmF0ZTogZnVuY3Rpb24oaW5wdXQpIHtcblxuICAgIGlmICh0aGlzLm9wdGltaXplZCA9PT0gZmFsc2UpXG4gICAge1xuICAgICAgdGhpcy5sYXllcnMuaW5wdXQuYWN0aXZhdGUoaW5wdXQpO1xuICAgICAgZm9yICh2YXIgbGF5ZXIgaW4gdGhpcy5sYXllcnMuaGlkZGVuKVxuICAgICAgICB0aGlzLmxheWVycy5oaWRkZW5bbGF5ZXJdLmFjdGl2YXRlKCk7XG4gICAgICByZXR1cm4gdGhpcy5sYXllcnMub3V0cHV0LmFjdGl2YXRlKCk7XG4gICAgfSBcbiAgICBlbHNlIFxuICAgIHtcbiAgICAgIGlmICh0aGlzLm9wdGltaXplZCA9PSBudWxsKVxuICAgICAgICB0aGlzLm9wdGltaXplKCk7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpbWl6ZWQuYWN0aXZhdGUoaW5wdXQpO1xuICAgIH1cbiAgfSxcblxuICAvLyBiYWNrLXByb3BhZ2F0ZSB0aGUgZXJyb3IgdGhydSB0aGUgbmV0d29ya1xuICBwcm9wYWdhdGU6IGZ1bmN0aW9uKHJhdGUsIHRhcmdldCkge1xuXG4gICAgaWYgKHRoaXMub3B0aW1pemVkID09PSBmYWxzZSlcbiAgICB7XG4gICAgICB0aGlzLmxheWVycy5vdXRwdXQucHJvcGFnYXRlKHJhdGUsIHRhcmdldCk7XG4gICAgICB2YXIgcmV2ZXJzZSA9IFtdO1xuICAgICAgZm9yICh2YXIgbGF5ZXIgaW4gdGhpcy5sYXllcnMuaGlkZGVuKVxuICAgICAgICByZXZlcnNlLnB1c2godGhpcy5sYXllcnMuaGlkZGVuW2xheWVyXSk7XG4gICAgICByZXZlcnNlLnJldmVyc2UoKTtcbiAgICAgIGZvciAodmFyIGxheWVyIGluIHJldmVyc2UpXG4gICAgICAgIHJldmVyc2VbbGF5ZXJdLnByb3BhZ2F0ZShyYXRlKTtcbiAgICB9IFxuICAgIGVsc2UgXG4gICAge1xuICAgICAgaWYgKHRoaXMub3B0aW1pemVkID09IG51bGwpXG4gICAgICAgIHRoaXMub3B0aW1pemUoKTtcbiAgICAgIHRoaXMub3B0aW1pemVkLnByb3BhZ2F0ZShyYXRlLCB0YXJnZXQpO1xuICAgIH1cbiAgfSxcblxuICAvLyBwcm9qZWN0IGEgY29ubmVjdGlvbiB0byBhbm90aGVyIHVuaXQgKGVpdGhlciBhIG5ldHdvcmsgb3IgYSBsYXllcilcbiAgcHJvamVjdDogZnVuY3Rpb24odW5pdCwgdHlwZSwgd2VpZ2h0cykge1xuXG4gICAgaWYgKHRoaXMub3B0aW1pemVkKVxuICAgICAgdGhpcy5vcHRpbWl6ZWQucmVzZXQoKTtcblxuICAgIGlmICh1bml0IGluc3RhbmNlb2YgTmV0d29yaylcbiAgICAgIHJldHVybiB0aGlzLmxheWVycy5vdXRwdXQucHJvamVjdCh1bml0LmxheWVycy5pbnB1dCwgdHlwZSwgd2VpZ2h0cyk7XG5cbiAgICBpZiAodW5pdCBpbnN0YW5jZW9mIExheWVyKVxuICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzLm91dHB1dC5wcm9qZWN0KHVuaXQsIHR5cGUsIHdlaWdodHMpO1xuXG4gICAgdGhyb3cgXCJJbnZhbGlkIGFyZ3VtZW50LCB5b3UgY2FuIG9ubHkgcHJvamVjdCBjb25uZWN0aW9ucyB0byBMQVlFUlMgYW5kIE5FVFdPUktTIVwiO1xuICB9LFxuXG4gIC8vIGxldCB0aGlzIG5ldHdvcmsgZ2F0ZSBhIGNvbm5lY3Rpb25cbiAgZ2F0ZTogZnVuY3Rpb24oY29ubmVjdGlvbiwgdHlwZSkge1xuICAgIGlmICh0aGlzLm9wdGltaXplZClcbiAgICAgIHRoaXMub3B0aW1pemVkLnJlc2V0KCk7XG4gICAgdGhpcy5sYXllcnMub3V0cHV0LmdhdGUoY29ubmVjdGlvbiwgdHlwZSk7XG4gIH0sXG5cbiAgLy8gY2xlYXIgYWxsIGVsZWdpYmlsaXR5IHRyYWNlcyBhbmQgZXh0ZW5kZWQgZWxlZ2liaWxpdHkgdHJhY2VzICh0aGUgbmV0d29yayBmb3JnZXRzIGl0cyBjb250ZXh0LCBidXQgbm90IHdoYXQgd2FzIHRyYWluZWQpXG4gIGNsZWFyOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMucmVzdG9yZSgpO1xuXG4gICAgdmFyIGlucHV0TGF5ZXIgPSB0aGlzLmxheWVycy5pbnB1dCxcbiAgICAgIG91dHB1dExheWVyID0gdGhpcy5sYXllcnMub3V0cHV0O1xuXG4gICAgaW5wdXRMYXllci5jbGVhcigpO1xuICAgIGZvciAodmFyIGxheWVyIGluIHRoaXMubGF5ZXJzLmhpZGRlbikge1xuICAgICAgdmFyIGhpZGRlbkxheWVyID0gdGhpcy5sYXllcnMuaGlkZGVuW2xheWVyXTtcbiAgICAgIGhpZGRlbkxheWVyLmNsZWFyKCk7XG4gICAgfVxuICAgIG91dHB1dExheWVyLmNsZWFyKCk7XG5cbiAgICBpZiAodGhpcy5vcHRpbWl6ZWQpXG4gICAgICB0aGlzLm9wdGltaXplZC5yZXNldCgpO1xuICB9LFxuXG4gIC8vIHJlc2V0IGFsbCB3ZWlnaHRzIGFuZCBjbGVhciBhbGwgdHJhY2VzIChlbmRzIHVwIGxpa2UgYSBuZXcgbmV0d29yaylcbiAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5yZXN0b3JlKCk7XG5cbiAgICB2YXIgaW5wdXRMYXllciA9IHRoaXMubGF5ZXJzLmlucHV0LFxuICAgICAgb3V0cHV0TGF5ZXIgPSB0aGlzLmxheWVycy5vdXRwdXQ7XG5cbiAgICBpbnB1dExheWVyLnJlc2V0KCk7XG4gICAgZm9yICh2YXIgbGF5ZXIgaW4gdGhpcy5sYXllcnMuaGlkZGVuKSB7XG4gICAgICB2YXIgaGlkZGVuTGF5ZXIgPSB0aGlzLmxheWVycy5oaWRkZW5bbGF5ZXJdO1xuICAgICAgaGlkZGVuTGF5ZXIucmVzZXQoKTtcbiAgICB9XG4gICAgb3V0cHV0TGF5ZXIucmVzZXQoKTtcblxuICAgIGlmICh0aGlzLm9wdGltaXplZClcbiAgICAgIHRoaXMub3B0aW1pemVkLnJlc2V0KCk7XG4gIH0sXG5cbiAgLy8gaGFyZGNvZGVzIHRoZSBiZWhhdmlvdXIgb2YgdGhlIHdob2xlIG5ldHdvcmsgaW50byBhIHNpbmdsZSBvcHRpbWl6ZWQgZnVuY3Rpb25cbiAgb3B0aW1pemU6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBvcHRpbWl6ZWQgPSB7fTtcbiAgICB2YXIgbmV1cm9ucyA9IHRoaXMubmV1cm9ucygpO1xuXG4gICAgZm9yICh2YXIgaSBpbiBuZXVyb25zKSB7XG4gICAgICB2YXIgbmV1cm9uID0gbmV1cm9uc1tpXS5uZXVyb247XG4gICAgICB2YXIgbGF5ZXIgPSBuZXVyb25zW2ldLmxheWVyO1xuICAgICAgd2hpbGUgKG5ldXJvbi5uZXVyb24pXG4gICAgICAgIG5ldXJvbiA9IG5ldXJvbi5uZXVyb247XG4gICAgICBvcHRpbWl6ZWQgPSBuZXVyb24ub3B0aW1pemUob3B0aW1pemVkLCBsYXllcik7XG4gICAgfVxuICAgIG9wdGltaXplZC5wcm9wYWdhdGlvbl9zZW50ZW5jZXMucmV2ZXJzZSgpO1xuXG4gICAgdmFyIGhhcmRjb2RlID0gXCJcIjtcbiAgICBoYXJkY29kZSArPSBcInZhciBGID0gRmxvYXQ2NEFycmF5ID8gbmV3IEZsb2F0NjRBcnJheShcIiArIG9wdGltaXplZC5tZW1vcnkgK1xuICAgICAgXCIpIDogW107IFwiO1xuICAgIGZvciAodmFyIGkgaW4gb3B0aW1pemVkLnZhcmlhYmxlcylcbiAgICAgIGhhcmRjb2RlICs9IFwiRltcIiArIG9wdGltaXplZC52YXJpYWJsZXNbaV0uaWQgKyBcIl0gPSBcIiArIChvcHRpbWl6ZWQudmFyaWFibGVzW1xuICAgICAgICBpXS52YWx1ZSB8fCAwKSArIFwiOyBcIjtcbiAgICBoYXJkY29kZSArPSBcInZhciBhY3RpdmF0ZSA9IGZ1bmN0aW9uKGlucHV0KXtcXG5cIjtcbiAgICBmb3IgKHZhciBpIGluIG9wdGltaXplZC5pbnB1dHMpXG4gICAgICBoYXJkY29kZSArPSBcIkZbXCIgKyBvcHRpbWl6ZWQuaW5wdXRzW2ldICsgXCJdID0gaW5wdXRbXCIgKyBpICsgXCJdOyBcIjtcbiAgICBmb3IgKHZhciBpIGluIG9wdGltaXplZC5hY3RpdmF0aW9uX3NlbnRlbmNlcykge1xuICAgICAgaGFyZGNvZGUgKz0gb3B0aW1pemVkLmFjdGl2YXRpb25fc2VudGVuY2VzW2ldLmpvaW4oXCIgXCIpO1xuICAgICAgaGFyZGNvZGUgKz0gb3B0aW1pemVkLnRyYWNlX3NlbnRlbmNlc1tpXS5qb2luKFwiIFwiKTtcbiAgICB9XG4gICAgaGFyZGNvZGUgKz0gXCIgdmFyIG91dHB1dCA9IFtdOyBcIlxuICAgIGZvciAodmFyIGkgaW4gb3B0aW1pemVkLm91dHB1dHMpXG4gICAgICBoYXJkY29kZSArPSBcIm91dHB1dFtcIiArIGkgKyBcIl0gPSBGW1wiICsgb3B0aW1pemVkLm91dHB1dHNbaV0gKyBcIl07IFwiO1xuICAgIGhhcmRjb2RlICs9IFwicmV0dXJuIG91dHB1dDsgfTsgXCJcbiAgICBoYXJkY29kZSArPSBcInZhciBwcm9wYWdhdGUgPSBmdW5jdGlvbihyYXRlLCB0YXJnZXQpe1xcblwiO1xuICAgIGhhcmRjb2RlICs9IFwiRltcIiArIG9wdGltaXplZC52YXJpYWJsZXMucmF0ZS5pZCArIFwiXSA9IHJhdGU7IFwiO1xuICAgIGZvciAodmFyIGkgaW4gb3B0aW1pemVkLnRhcmdldHMpXG4gICAgICBoYXJkY29kZSArPSBcIkZbXCIgKyBvcHRpbWl6ZWQudGFyZ2V0c1tpXSArIFwiXSA9IHRhcmdldFtcIiArIGkgKyBcIl07IFwiO1xuICAgIGZvciAodmFyIGkgaW4gb3B0aW1pemVkLnByb3BhZ2F0aW9uX3NlbnRlbmNlcylcbiAgICAgIGhhcmRjb2RlICs9IG9wdGltaXplZC5wcm9wYWdhdGlvbl9zZW50ZW5jZXNbaV0uam9pbihcIiBcIikgKyBcIiBcIjtcbiAgICBoYXJkY29kZSArPSBcIiB9O1xcblwiO1xuICAgIGhhcmRjb2RlICs9XG4gICAgICBcInZhciBvd25lcnNoaXAgPSBmdW5jdGlvbihtZW1vcnlCdWZmZXIpe1xcbkYgPSBtZW1vcnlCdWZmZXI7XFxudGhpcy5tZW1vcnkgPSBGO1xcbn07XFxuXCI7XG4gICAgaGFyZGNvZGUgKz1cbiAgICAgIFwicmV0dXJuIHtcXG5tZW1vcnk6IEYsXFxuYWN0aXZhdGU6IGFjdGl2YXRlLFxcbnByb3BhZ2F0ZTogcHJvcGFnYXRlLFxcbm93bmVyc2hpcDogb3duZXJzaGlwXFxufTtcIjtcbiAgICBoYXJkY29kZSA9IGhhcmRjb2RlLnNwbGl0KFwiO1wiKS5qb2luKFwiO1xcblwiKTtcblxuICAgIHZhciBjb25zdHJ1Y3RvciA9IG5ldyBGdW5jdGlvbihoYXJkY29kZSk7XG5cbiAgICB2YXIgbmV0d29yayA9IGNvbnN0cnVjdG9yKCk7XG4gICAgbmV0d29yay5kYXRhID0ge1xuICAgICAgdmFyaWFibGVzOiBvcHRpbWl6ZWQudmFyaWFibGVzLFxuICAgICAgYWN0aXZhdGU6IG9wdGltaXplZC5hY3RpdmF0aW9uX3NlbnRlbmNlcyxcbiAgICAgIHByb3BhZ2F0ZTogb3B0aW1pemVkLnByb3BhZ2F0aW9uX3NlbnRlbmNlcyxcbiAgICAgIHRyYWNlOiBvcHRpbWl6ZWQudHJhY2Vfc2VudGVuY2VzLFxuICAgICAgaW5wdXRzOiBvcHRpbWl6ZWQuaW5wdXRzLFxuICAgICAgb3V0cHV0czogb3B0aW1pemVkLm91dHB1dHMsXG4gICAgICBjaGVja19hY3RpdmF0aW9uOiB0aGlzLmFjdGl2YXRlLFxuICAgICAgY2hlY2tfcHJvcGFnYXRpb246IHRoaXMucHJvcGFnYXRlXG4gICAgfVxuICAgIG5ldHdvcmsucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGF0Lm9wdGltaXplZCkge1xuICAgICAgICB0aGF0Lm9wdGltaXplZCA9IG51bGw7XG4gICAgICAgIHRoYXQuYWN0aXZhdGUgPSBuZXR3b3JrLmRhdGEuY2hlY2tfYWN0aXZhdGlvbjtcbiAgICAgICAgdGhhdC5wcm9wYWdhdGUgPSBuZXR3b3JrLmRhdGEuY2hlY2tfcHJvcGFnYXRpb247XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpbWl6ZWQgPSBuZXR3b3JrO1xuICAgIHRoaXMuYWN0aXZhdGUgPSBuZXR3b3JrLmFjdGl2YXRlO1xuICAgIHRoaXMucHJvcGFnYXRlID0gbmV0d29yay5wcm9wYWdhdGU7XG4gIH0sXG5cbiAgLy8gcmVzdG9yZXMgYWxsIHRoZSB2YWx1ZXMgZnJvbSB0aGUgb3B0aW1pemVkIG5ldHdvcmsgdGhlIHRoZWlyIHJlc3BlY3RpdmUgb2JqZWN0cyBpbiBvcmRlciB0byBtYW5pcHVsYXRlIHRoZSBuZXR3b3JrXG4gIHJlc3RvcmU6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5vcHRpbWl6ZWQpXG4gICAgICByZXR1cm47XG5cbiAgICB2YXIgb3B0aW1pemVkID0gdGhpcy5vcHRpbWl6ZWQ7XG5cbiAgICB2YXIgZ2V0VmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblxuICAgICAgdmFyIHVuaXQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICB2YXIgcHJvcCA9IGFyZ3MucG9wKCk7XG5cbiAgICAgIHZhciBpZCA9IHByb3AgKyAnXyc7XG4gICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBhcmdzKVxuICAgICAgICBpZCArPSBhcmdzW3Byb3BlcnR5XSArICdfJztcbiAgICAgIGlkICs9IHVuaXQuSUQ7XG5cbiAgICAgIHZhciBtZW1vcnkgPSBvcHRpbWl6ZWQubWVtb3J5O1xuICAgICAgdmFyIHZhcmlhYmxlcyA9IG9wdGltaXplZC5kYXRhLnZhcmlhYmxlcztcblxuICAgICAgaWYgKGlkIGluIHZhcmlhYmxlcylcbiAgICAgICAgcmV0dXJuIG1lbW9yeVt2YXJpYWJsZXNbaWRdLmlkXTtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHZhciBsaXN0ID0gdGhpcy5uZXVyb25zKCk7XG5cbiAgICAvLyBsaW5rIGlkJ3MgdG8gcG9zaXRpb25zIGluIHRoZSBhcnJheVxuICAgIHZhciBpZHMgPSB7fTtcbiAgICBmb3IgKHZhciBpIGluIGxpc3QpIHtcbiAgICAgIHZhciBuZXVyb24gPSBsaXN0W2ldLm5ldXJvbjtcbiAgICAgIHdoaWxlIChuZXVyb24ubmV1cm9uKVxuICAgICAgICBuZXVyb24gPSBuZXVyb24ubmV1cm9uO1xuXG4gICAgICBuZXVyb24uc3RhdGUgPSBnZXRWYWx1ZShuZXVyb24sICdzdGF0ZScpO1xuICAgICAgbmV1cm9uLm9sZCA9IGdldFZhbHVlKG5ldXJvbiwgJ29sZCcpO1xuICAgICAgbmV1cm9uLmFjdGl2YXRpb24gPSBnZXRWYWx1ZShuZXVyb24sICdhY3RpdmF0aW9uJyk7XG4gICAgICBuZXVyb24uYmlhcyA9IGdldFZhbHVlKG5ldXJvbiwgJ2JpYXMnKTtcblxuICAgICAgZm9yICh2YXIgaW5wdXQgaW4gbmV1cm9uLnRyYWNlLmVsZWdpYmlsaXR5KVxuICAgICAgICBuZXVyb24udHJhY2UuZWxlZ2liaWxpdHlbaW5wdXRdID0gZ2V0VmFsdWUobmV1cm9uLCAndHJhY2UnLFxuICAgICAgICAgICdlbGVnaWJpbGl0eScsIGlucHV0KTtcblxuICAgICAgZm9yICh2YXIgZ2F0ZWQgaW4gbmV1cm9uLnRyYWNlLmV4dGVuZGVkKVxuICAgICAgICBmb3IgKHZhciBpbnB1dCBpbiBuZXVyb24udHJhY2UuZXh0ZW5kZWRbZ2F0ZWRdKVxuICAgICAgICAgIG5ldXJvbi50cmFjZS5leHRlbmRlZFtnYXRlZF1baW5wdXRdID0gZ2V0VmFsdWUobmV1cm9uLCAndHJhY2UnLFxuICAgICAgICAgICAgJ2V4dGVuZGVkJywgZ2F0ZWQsIGlucHV0KTtcbiAgICB9XG5cbiAgICAvLyBnZXQgY29ubmVjdGlvbnNcbiAgICBmb3IgKHZhciBpIGluIGxpc3QpIHtcbiAgICAgIHZhciBuZXVyb24gPSBsaXN0W2ldLm5ldXJvbjtcbiAgICAgIHdoaWxlIChuZXVyb24ubmV1cm9uKVxuICAgICAgICBuZXVyb24gPSBuZXVyb24ubmV1cm9uO1xuXG4gICAgICBmb3IgKHZhciBqIGluIG5ldXJvbi5jb25uZWN0aW9ucy5wcm9qZWN0ZWQpIHtcbiAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSBuZXVyb24uY29ubmVjdGlvbnMucHJvamVjdGVkW2pdO1xuICAgICAgICBjb25uZWN0aW9uLndlaWdodCA9IGdldFZhbHVlKGNvbm5lY3Rpb24sICd3ZWlnaHQnKTtcbiAgICAgICAgY29ubmVjdGlvbi5nYWluID0gZ2V0VmFsdWUoY29ubmVjdGlvbiwgJ2dhaW4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gcmV0dXJucyBhbGwgdGhlIG5ldXJvbnMgaW4gdGhlIG5ldHdvcmtcbiAgbmV1cm9uczogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgbmV1cm9ucyA9IFtdO1xuXG4gICAgdmFyIGlucHV0TGF5ZXIgPSB0aGlzLmxheWVycy5pbnB1dC5uZXVyb25zKCksXG4gICAgICBvdXRwdXRMYXllciA9IHRoaXMubGF5ZXJzLm91dHB1dC5uZXVyb25zKCk7XG5cbiAgICBmb3IgKHZhciBuZXVyb24gaW4gaW5wdXRMYXllcilcbiAgICAgIG5ldXJvbnMucHVzaCh7XG4gICAgICAgIG5ldXJvbjogaW5wdXRMYXllcltuZXVyb25dLFxuICAgICAgICBsYXllcjogJ2lucHV0J1xuICAgICAgfSk7XG5cbiAgICBmb3IgKHZhciBsYXllciBpbiB0aGlzLmxheWVycy5oaWRkZW4pIHtcbiAgICAgIHZhciBoaWRkZW5MYXllciA9IHRoaXMubGF5ZXJzLmhpZGRlbltsYXllcl0ubmV1cm9ucygpO1xuICAgICAgZm9yICh2YXIgbmV1cm9uIGluIGhpZGRlbkxheWVyKVxuICAgICAgICBuZXVyb25zLnB1c2goe1xuICAgICAgICAgIG5ldXJvbjogaGlkZGVuTGF5ZXJbbmV1cm9uXSxcbiAgICAgICAgICBsYXllcjogbGF5ZXJcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZvciAodmFyIG5ldXJvbiBpbiBvdXRwdXRMYXllcilcbiAgICAgIG5ldXJvbnMucHVzaCh7XG4gICAgICAgIG5ldXJvbjogb3V0cHV0TGF5ZXJbbmV1cm9uXSxcbiAgICAgICAgbGF5ZXI6ICdvdXRwdXQnXG4gICAgICB9KTtcblxuICAgIHJldHVybiBuZXVyb25zO1xuICB9LFxuXG4gIC8vIHJldHVybnMgbnVtYmVyIG9mIGlucHV0cyBvZiB0aGUgbmV0d29ya1xuICBpbnB1dHM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmxheWVycy5pbnB1dC5zaXplO1xuICB9LFxuXG4gIC8vIHJldHVybnMgbnVtYmVyIG9mIG91dHB1dHMgb2YgaHRlIG5ldHdvcmtcbiAgb3V0cHV0czogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubGF5ZXJzLm91dHB1dC5zaXplO1xuICB9LFxuXG4gIC8vIHNldHMgdGhlIGxheWVycyBvZiB0aGUgbmV0d29ya1xuICBzZXQ6IGZ1bmN0aW9uKGxheWVycykge1xuXG4gICAgdGhpcy5sYXllcnMgPSBsYXllcnM7XG4gICAgaWYgKHRoaXMub3B0aW1pemVkKVxuICAgICAgdGhpcy5vcHRpbWl6ZWQucmVzZXQoKTtcbiAgfSxcblxuICBzZXRPcHRpbWl6ZTogZnVuY3Rpb24oYm9vbCl7XG4gICAgdGhpcy5yZXN0b3JlKCk7XG4gICAgaWYgKHRoaXMub3B0aW1pemVkKVxuICAgICAgdGhpcy5vcHRpbWl6ZWQucmVzZXQoKTtcbiAgICB0aGlzLm9wdGltaXplZCA9IGJvb2w/IG51bGwgOiBmYWxzZTtcbiAgfSxcblxuICAvLyByZXR1cm5zIGEganNvbiB0aGF0IHJlcHJlc2VudHMgYWxsIHRoZSBuZXVyb25zIGFuZCBjb25uZWN0aW9ucyBvZiB0aGUgbmV0d29ya1xuICB0b0pTT046IGZ1bmN0aW9uKGlnbm9yZVRyYWNlcykge1xuXG4gICAgdGhpcy5yZXN0b3JlKCk7XG5cbiAgICB2YXIgbGlzdCA9IHRoaXMubmV1cm9ucygpO1xuICAgIHZhciBuZXVyb25zID0gW107XG4gICAgdmFyIGNvbm5lY3Rpb25zID0gW107XG5cbiAgICAvLyBsaW5rIGlkJ3MgdG8gcG9zaXRpb25zIGluIHRoZSBhcnJheVxuICAgIHZhciBpZHMgPSB7fTtcbiAgICBmb3IgKHZhciBpIGluIGxpc3QpIHtcbiAgICAgIHZhciBuZXVyb24gPSBsaXN0W2ldLm5ldXJvbjtcbiAgICAgIHdoaWxlIChuZXVyb24ubmV1cm9uKVxuICAgICAgICBuZXVyb24gPSBuZXVyb24ubmV1cm9uO1xuICAgICAgaWRzW25ldXJvbi5JRF0gPSBpO1xuXG4gICAgICB2YXIgY29weSA9IHtcbiAgICAgICAgdHJhY2U6IHtcbiAgICAgICAgICBlbGVnaWJpbGl0eToge30sXG4gICAgICAgICAgZXh0ZW5kZWQ6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRlOiBuZXVyb24uc3RhdGUsXG4gICAgICAgIG9sZDogbmV1cm9uLm9sZCxcbiAgICAgICAgYWN0aXZhdGlvbjogbmV1cm9uLmFjdGl2YXRpb24sXG4gICAgICAgIGJpYXM6IG5ldXJvbi5iaWFzLFxuICAgICAgICBsYXllcjogbGlzdFtpXS5sYXllclxuICAgICAgfTtcblxuICAgICAgY29weS5zcXVhc2ggPSBuZXVyb24uc3F1YXNoID09IE5ldXJvbi5zcXVhc2guTE9HSVNUSUMgPyBcIkxPR0lTVElDXCIgOlxuICAgICAgICBuZXVyb24uc3F1YXNoID09IE5ldXJvbi5zcXVhc2guVEFOSCA/IFwiVEFOSFwiIDpcbiAgICAgICAgbmV1cm9uLnNxdWFzaCA9PSBOZXVyb24uc3F1YXNoLklERU5USVRZID8gXCJJREVOVElUWVwiIDpcbiAgICAgICAgbmV1cm9uLnNxdWFzaCA9PSBOZXVyb24uc3F1YXNoLkhMSU0gPyBcIkhMSU1cIiA6XG4gICAgICAgIG51bGw7XG5cbiAgICAgIG5ldXJvbnMucHVzaChjb3B5KTtcbiAgICB9XG5cbiAgICBpZiAoIWlnbm9yZVRyYWNlcylcbiAgICAgIGZvciAodmFyIGkgaW4gbmV1cm9ucykge1xuICAgICAgICB2YXIgY29weSA9IG5ldXJvbnNbaV07XG5cbiAgICAgICAgZm9yICh2YXIgaW5wdXQgaW4gbmV1cm9uLnRyYWNlLmVsZWdpYmlsaXR5KVxuICAgICAgICAgIGNvcHkudHJhY2UuZWxlZ2liaWxpdHlbaW5wdXRdID0gbmV1cm9uLnRyYWNlLmVsZWdpYmlsaXR5W2lucHV0XTtcblxuICAgICAgICBmb3IgKHZhciBnYXRlZCBpbiBuZXVyb24udHJhY2UuZXh0ZW5kZWQpIHtcbiAgICAgICAgICBjb3B5LnRyYWNlLmV4dGVuZGVkW2dhdGVkXSA9IHt9O1xuICAgICAgICAgIGZvciAodmFyIGlucHV0IGluIG5ldXJvbi50cmFjZS5leHRlbmRlZFtnYXRlZF0pXG4gICAgICAgICAgICBjb3B5LnRyYWNlLmV4dGVuZGVkW2lkc1tnYXRlZF1dW2lucHV0XSA9IG5ldXJvbi50cmFjZS5leHRlbmRlZFtcbiAgICAgICAgICAgICAgZ2F0ZWRdW2lucHV0XTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgLy8gZ2V0IGNvbm5lY3Rpb25zXG4gICAgZm9yICh2YXIgaSBpbiBsaXN0KSB7XG4gICAgICB2YXIgbmV1cm9uID0gbGlzdFtpXS5uZXVyb247XG4gICAgICB3aGlsZSAobmV1cm9uLm5ldXJvbilcbiAgICAgICAgbmV1cm9uID0gbmV1cm9uLm5ldXJvbjtcblxuICAgICAgZm9yICh2YXIgaiBpbiBuZXVyb24uY29ubmVjdGlvbnMucHJvamVjdGVkKSB7XG4gICAgICAgIHZhciBjb25uZWN0aW9uID0gbmV1cm9uLmNvbm5lY3Rpb25zLnByb2plY3RlZFtqXTtcbiAgICAgICAgY29ubmVjdGlvbnMucHVzaCh7XG4gICAgICAgICAgZnJvbTogaWRzW2Nvbm5lY3Rpb24uZnJvbS5JRF0sXG4gICAgICAgICAgdG86IGlkc1tjb25uZWN0aW9uLnRvLklEXSxcbiAgICAgICAgICB3ZWlnaHQ6IGNvbm5lY3Rpb24ud2VpZ2h0LFxuICAgICAgICAgIGdhdGVyOiBjb25uZWN0aW9uLmdhdGVyID8gaWRzW2Nvbm5lY3Rpb24uZ2F0ZXIuSURdIDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAobmV1cm9uLnNlbGZjb25uZWN0ZWQoKSlcbiAgICAgICAgY29ubmVjdGlvbnMucHVzaCh7XG4gICAgICAgICAgZnJvbTogaWRzW25ldXJvbi5JRF0sXG4gICAgICAgICAgdG86IGlkc1tuZXVyb24uSURdLFxuICAgICAgICAgIHdlaWdodDogbmV1cm9uLnNlbGZjb25uZWN0aW9uLndlaWdodCxcbiAgICAgICAgICBnYXRlcjogbmV1cm9uLnNlbGZjb25uZWN0aW9uLmdhdGVyID8gaWRzW25ldXJvbi5zZWxmY29ubmVjdGlvbi5nYXRlclxuICAgICAgICAgICAgLklEXSA6IG51bGwsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBuZXVyb25zOiBuZXVyb25zLFxuICAgICAgY29ubmVjdGlvbnM6IGNvbm5lY3Rpb25zXG4gICAgfVxuICB9LFxuXG4gIC8vIHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdvcmtzIGFzIHRoZSBhY3RpdmF0aW9uIG9mIHRoZSBuZXR3b3JrIGFuZCBjYW4gYmUgdXNlZCB3aXRob3V0IGRlcGVuZGluZyBvbiB0aGUgbGlicmFyeVxuICBzdGFuZGFsb25lOiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMub3B0aW1pemVkKVxuICAgICAgdGhpcy5vcHRpbWl6ZSgpO1xuXG4gICAgdmFyIGRhdGEgPSB0aGlzLm9wdGltaXplZC5kYXRhO1xuXG4gICAgLy8gYnVpbGQgYWN0aXZhdGlvbiBmdW5jdGlvblxuICAgIHZhciBhY3RpdmF0aW9uID0gXCJmdW5jdGlvbiAoaW5wdXQpIHtcXG5cIjtcblxuICAgIC8vIGJ1aWxkIGlucHV0c1xuICAgIGZvciAodmFyIGkgaW4gZGF0YS5pbnB1dHMpXG4gICAgICBhY3RpdmF0aW9uICs9IFwiRltcIiArIGRhdGEuaW5wdXRzW2ldICsgXCJdID0gaW5wdXRbXCIgKyBpICsgXCJdO1xcblwiO1xuXG4gICAgLy8gYnVpbGQgbmV0d29yayBhY3RpdmF0aW9uXG4gICAgZm9yICh2YXIgbmV1cm9uIGluIGRhdGEuYWN0aXZhdGUpXG4gICAgICBmb3IgKHZhciBzZW50ZW5jZSBpbiBkYXRhLmFjdGl2YXRlW25ldXJvbl0pXG4gICAgICAgIGFjdGl2YXRpb24gKz0gZGF0YS5hY3RpdmF0ZVtuZXVyb25dW3NlbnRlbmNlXSArIFwiXFxuXCI7XG5cbiAgICAvLyBidWlsZCBvdXRwdXRzXG4gICAgYWN0aXZhdGlvbiArPSBcInZhciBvdXRwdXQgPSBbXTtcXG5cIjtcbiAgICBmb3IgKHZhciBpIGluIGRhdGEub3V0cHV0cylcbiAgICAgIGFjdGl2YXRpb24gKz0gXCJvdXRwdXRbXCIgKyBpICsgXCJdID0gRltcIiArIGRhdGEub3V0cHV0c1tpXSArIFwiXTtcXG5cIjtcbiAgICBhY3RpdmF0aW9uICs9IFwicmV0dXJuIG91dHB1dDtcXG59XCI7XG5cbiAgICAvLyByZWZlcmVuY2UgYWxsIHRoZSBwb3NpdGlvbnMgaW4gbWVtb3J5XG4gICAgdmFyIG1lbW9yeSA9IGFjdGl2YXRpb24ubWF0Y2goL0ZcXFsoXFxkKylcXF0vZyk7XG4gICAgdmFyIGRpbWVuc2lvbiA9IDA7XG4gICAgdmFyIGlkcyA9IHt9O1xuICAgIGZvciAodmFyIGFkZHJlc3MgaW4gbWVtb3J5KSB7XG4gICAgICB2YXIgdG1wID0gbWVtb3J5W2FkZHJlc3NdLm1hdGNoKC9cXGQrLylbMF07XG4gICAgICBpZiAoISh0bXAgaW4gaWRzKSkge1xuICAgICAgICBpZHNbdG1wXSA9IGRpbWVuc2lvbisrO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgaGFyZGNvZGUgPSBcIkYgPSB7XFxuXCI7XG4gICAgZm9yICh2YXIgaSBpbiBpZHMpXG4gICAgICBoYXJkY29kZSArPSBpZHNbaV0gKyBcIjogXCIgKyB0aGlzLm9wdGltaXplZC5tZW1vcnlbaV0gKyBcIixcXG5cIjtcbiAgICBoYXJkY29kZSA9IGhhcmRjb2RlLnN1YnN0cmluZygwLCBoYXJkY29kZS5sZW5ndGggLSAyKSArIFwiXFxufTtcXG5cIjtcbiAgICBoYXJkY29kZSA9IFwidmFyIHJ1biA9IFwiICsgYWN0aXZhdGlvbi5yZXBsYWNlKC9GXFxbKFxcZCspXS9nLCBmdW5jdGlvbihcbiAgICAgIGluZGV4KSB7XG4gICAgICByZXR1cm4gJ0ZbJyArIGlkc1tpbmRleC5tYXRjaCgvXFxkKy8pWzBdXSArICddJ1xuICAgIH0pLnJlcGxhY2UoXCJ7XFxuXCIsIFwie1xcblwiICsgaGFyZGNvZGUgKyBcIlwiKSArIFwiO1xcblwiO1xuICAgIGhhcmRjb2RlICs9IFwicmV0dXJuIHJ1blwiO1xuXG4gICAgLy8gcmV0dXJuIHN0YW5kYWxvbmUgZnVuY3Rpb25cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKGhhcmRjb2RlKSgpO1xuICB9LFxuXG4gIHdvcmtlcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLm9wdGltaXplZClcbiAgICAgIHRoaXMub3B0aW1pemUoKTtcblxuICAgIHZhciBoYXJkY29kZSA9IFwidmFyIGlucHV0cyA9IFwiICsgdGhpcy5vcHRpbWl6ZWQuZGF0YS5pbnB1dHMubGVuZ3RoICtcbiAgICAgIFwiO1xcblwiO1xuICAgIGhhcmRjb2RlICs9IFwidmFyIG91dHB1dHMgPSBcIiArIHRoaXMub3B0aW1pemVkLmRhdGEub3V0cHV0cy5sZW5ndGggK1xuICAgICAgXCI7XFxuXCI7XG4gICAgaGFyZGNvZGUgKz0gXCJ2YXIgRiA9IG51bGw7XFxuXCI7XG4gICAgaGFyZGNvZGUgKz0gXCJ2YXIgYWN0aXZhdGUgPSBcIiArIHRoaXMub3B0aW1pemVkLmFjdGl2YXRlLnRvU3RyaW5nKCkgK1xuICAgICAgXCI7XFxuXCI7XG4gICAgaGFyZGNvZGUgKz0gXCJ2YXIgcHJvcGFnYXRlID0gXCIgKyB0aGlzLm9wdGltaXplZC5wcm9wYWdhdGUudG9TdHJpbmcoKSArXG4gICAgICBcIjtcXG5cIjtcbiAgICBoYXJkY29kZSArPSBcIm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpe1xcblwiO1xuICAgIGhhcmRjb2RlICs9IFwiRiA9IGUuZGF0YS5tZW1vcnlCdWZmZXI7XFxuXCI7XG4gICAgaGFyZGNvZGUgKz0gXCJpZiAoZS5kYXRhLmFjdGlvbiA9PSAnYWN0aXZhdGUnKXtcXG5cIjtcbiAgICBoYXJkY29kZSArPSBcImlmIChlLmRhdGEuaW5wdXQubGVuZ3RoID09IGlucHV0cyl7XFxuXCI7XG4gICAgaGFyZGNvZGUgKz1cbiAgICAgIFwicG9zdE1lc3NhZ2UoIHsgYWN0aW9uOiAnYWN0aXZhdGUnLCBvdXRwdXQ6IGFjdGl2YXRlKGUuZGF0YS5pbnB1dCksIG1lbW9yeUJ1ZmZlcjogRiB9LCBbRi5idWZmZXJdKTtcXG5cIjtcbiAgICBoYXJkY29kZSArPSBcIn1cXG59XFxuZWxzZSBpZiAoZS5kYXRhLmFjdGlvbiA9PSAncHJvcGFnYXRlJyl7XFxuXCI7XG4gICAgaGFyZGNvZGUgKz0gXCJwcm9wYWdhdGUoZS5kYXRhLnJhdGUsIGUuZGF0YS50YXJnZXQpO1xcblwiO1xuICAgIGhhcmRjb2RlICs9XG4gICAgICBcInBvc3RNZXNzYWdlKHsgYWN0aW9uOiAncHJvcGFnYXRlJywgbWVtb3J5QnVmZmVyOiBGIH0sIFtGLmJ1ZmZlcl0pO1xcblwiO1xuICAgIGhhcmRjb2RlICs9IFwifVxcbn1cXG5cIjtcblxuICAgIHZhciBibG9iID0gbmV3IEJsb2IoW2hhcmRjb2RlXSk7XG4gICAgdmFyIGJsb2JVUkwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuICAgIHJldHVybiBuZXcgV29ya2VyKGJsb2JVUkwpO1xuICB9LFxuXG4gIC8vIHJldHVybnMgYSBjb3B5IG9mIHRoZSBuZXR3b3JrXG4gIGNsb25lOiBmdW5jdGlvbihpZ25vcmVUcmFjZXMpIHtcbiAgICByZXR1cm4gTmV0d29yay5mcm9tSlNPTih0aGlzLnRvSlNPTihpZ25vcmVUcmFjZXMpKTtcbiAgfVxufVxuXG4vLyByZWJ1aWxkIGEgbmV0d29yayB0aGF0IGhhcyBiZWVuIHN0b3JlZCBpbiBhIGpzb24gdXNpbmcgdGhlIG1ldGhvZCB0b0pzb24oKVxuTmV0d29yay5mcm9tSlNPTiA9IGZ1bmN0aW9uKGpzb24pIHtcblxuICB2YXIgbmV1cm9ucyA9IFtdO1xuXG4gIHZhciBsYXllcnMgPSB7XG4gICAgaW5wdXQ6IG5ldyBMYXllcigpLFxuICAgIGhpZGRlbjogW10sXG4gICAgb3V0cHV0OiBuZXcgTGF5ZXIoKVxuICB9XG5cbiAgZm9yICh2YXIgaSBpbiBqc29uLm5ldXJvbnMpIHtcbiAgICB2YXIgY29uZmlnID0ganNvbi5uZXVyb25zW2ldO1xuXG4gICAgdmFyIG5ldXJvbiA9IG5ldyBOZXVyb24oKTtcbiAgICBuZXVyb24udHJhY2UuZWxlZ2liaWxpdHkgPSBjb25maWcudHJhY2UuZWxlZ2liaWxpdHk7XG4gICAgbmV1cm9uLnRyYWNlLmV4dGVuZGVkID0gY29uZmlnLnRyYWNlLmV4dGVuZGVkO1xuICAgIG5ldXJvbi5zdGF0ZSA9IGNvbmZpZy5zdGF0ZTtcbiAgICBuZXVyb24ub2xkID0gY29uZmlnLm9sZDtcbiAgICBuZXVyb24uYWN0aXZhdGlvbiA9IGNvbmZpZy5hY3RpdmF0aW9uO1xuICAgIG5ldXJvbi5iaWFzID0gY29uZmlnLmJpYXM7XG4gICAgbmV1cm9uLnNxdWFzaCA9IGNvbmZpZy5zcXVhc2ggaW4gTmV1cm9uLnNxdWFzaCA/IE5ldXJvbi5zcXVhc2hbY29uZmlnLnNxdWFzaF0gOlxuICAgICAgTmV1cm9uLnNxdWFzaC5MT0dJU1RJQztcbiAgICBuZXVyb25zLnB1c2gobmV1cm9uKTtcblxuICAgIGlmIChjb25maWcubGF5ZXIgPT0gJ2lucHV0JylcbiAgICAgIGxheWVycy5pbnB1dC5hZGQobmV1cm9uKTtcbiAgICBlbHNlIGlmIChjb25maWcubGF5ZXIgPT0gJ291dHB1dCcpXG4gICAgICBsYXllcnMub3V0cHV0LmFkZChuZXVyb24pO1xuICAgIGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBsYXllcnMuaGlkZGVuW2NvbmZpZy5sYXllcl0gPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGxheWVycy5oaWRkZW5bY29uZmlnLmxheWVyXSA9IG5ldyBMYXllcigpO1xuICAgICAgbGF5ZXJzLmhpZGRlbltjb25maWcubGF5ZXJdLmFkZChuZXVyb24pO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgaW4ganNvbi5jb25uZWN0aW9ucykge1xuICAgIHZhciBjb25maWcgPSBqc29uLmNvbm5lY3Rpb25zW2ldO1xuICAgIHZhciBmcm9tID0gbmV1cm9uc1tjb25maWcuZnJvbV07XG4gICAgdmFyIHRvID0gbmV1cm9uc1tjb25maWcudG9dO1xuICAgIHZhciB3ZWlnaHQgPSBjb25maWcud2VpZ2h0XG4gICAgdmFyIGdhdGVyID0gbmV1cm9uc1tjb25maWcuZ2F0ZXJdO1xuXG4gICAgdmFyIGNvbm5lY3Rpb24gPSBmcm9tLnByb2plY3QodG8sIHdlaWdodCk7XG4gICAgaWYgKGdhdGVyKVxuICAgICAgZ2F0ZXIuZ2F0ZShjb25uZWN0aW9uKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgTmV0d29yayhsYXllcnMpO1xufVxuXG4vLyBleHBvcnRcbmlmIChtb2R1bGUpIG1vZHVsZS5leHBvcnRzID0gTmV0d29yaztcblxuIiwiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBORVVST05cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmZ1bmN0aW9uIE5ldXJvbigpIHtcbiAgdGhpcy5JRCA9IE5ldXJvbi51aWQoKTtcbiAgdGhpcy5sYWJlbCA9IG51bGw7XG4gIHRoaXMuY29ubmVjdGlvbnMgPSB7XG4gICAgaW5wdXRzOiB7fSxcbiAgICBwcm9qZWN0ZWQ6IHt9LFxuICAgIGdhdGVkOiB7fVxuICB9O1xuICB0aGlzLmVycm9yID0ge1xuICAgIHJlc3BvbnNpYmlsaXR5OiAwLFxuICAgIHByb2plY3RlZDogMCxcbiAgICBnYXRlZDogMFxuICB9O1xuICB0aGlzLnRyYWNlID0ge1xuICAgIGVsZWdpYmlsaXR5OiB7fSxcbiAgICBleHRlbmRlZDoge30sXG4gICAgaW5mbHVlbmNlczoge31cbiAgfTtcbiAgdGhpcy5zdGF0ZSA9IDA7XG4gIHRoaXMub2xkID0gMDtcbiAgdGhpcy5hY3RpdmF0aW9uID0gMDtcbiAgdGhpcy5zZWxmY29ubmVjdGlvbiA9IG5ldyBOZXVyb24uY29ubmVjdGlvbih0aGlzLCB0aGlzLCAwKTsgLy8gd2VpZ2h0ID0gMCAtPiBub3QgY29ubmVjdGVkXG4gIHRoaXMuc3F1YXNoID0gTmV1cm9uLnNxdWFzaC5MT0dJU1RJQztcbiAgdGhpcy5uZWlnaGJvb3JzID0ge307XG4gIHRoaXMuYmlhcyA9IE1hdGgucmFuZG9tKCkgKiAuMiAtIC4xO1xufVxuXG5OZXVyb24ucHJvdG90eXBlID0ge1xuXG4gIC8vIGFjdGl2YXRlIHRoZSBuZXVyb25cbiAgYWN0aXZhdGU6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgLy8gYWN0aXZhdGlvbiBmcm9tIGVudmlyb21lbnQgKGZvciBpbnB1dCBuZXVyb25zKVxuICAgIGlmICh0eXBlb2YgaW5wdXQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbiA9IGlucHV0O1xuICAgICAgdGhpcy5kZXJpdmF0aXZlID0gMDtcbiAgICAgIHRoaXMuYmlhcyA9IDA7XG4gICAgICByZXR1cm4gdGhpcy5hY3RpdmF0aW9uO1xuICAgIH1cblxuICAgIC8vIG9sZCBzdGF0ZVxuICAgIHRoaXMub2xkID0gdGhpcy5zdGF0ZTtcblxuICAgIC8vIGVxLiAxNVxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnNlbGZjb25uZWN0aW9uLmdhaW4gKiB0aGlzLnNlbGZjb25uZWN0aW9uLndlaWdodCAqXG4gICAgICB0aGlzLnN0YXRlICsgdGhpcy5iaWFzO1xuXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmNvbm5lY3Rpb25zLmlucHV0cykge1xuICAgICAgdmFyIGlucHV0ID0gdGhpcy5jb25uZWN0aW9ucy5pbnB1dHNbaV07XG4gICAgICB0aGlzLnN0YXRlICs9IGlucHV0LmZyb20uYWN0aXZhdGlvbiAqIGlucHV0LndlaWdodCAqIGlucHV0LmdhaW47XG4gICAgfVxuXG4gICAgLy8gZXEuIDE2XG4gICAgdGhpcy5hY3RpdmF0aW9uID0gdGhpcy5zcXVhc2godGhpcy5zdGF0ZSk7XG5cbiAgICAvLyBmJyhzKVxuICAgIHRoaXMuZGVyaXZhdGl2ZSA9IHRoaXMuc3F1YXNoKHRoaXMuc3RhdGUsIHRydWUpO1xuXG4gICAgLy8gdXBkYXRlIHRyYWNlc1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5jb25uZWN0aW9ucy5pbnB1dHMpIHtcbiAgICAgIHZhciBpbnB1dCA9IHRoaXMuY29ubmVjdGlvbnMuaW5wdXRzW2ldO1xuXG4gICAgICAvLyBlbGVnaWJpbGl0eSB0cmFjZSAtIEVxLiAxN1xuICAgICAgdGhpcy50cmFjZS5lbGVnaWJpbGl0eVtpbnB1dC5JRF0gPSB0aGlzLnNlbGZjb25uZWN0aW9uLmdhaW4gKiB0aGlzLnNlbGZjb25uZWN0aW9uXG4gICAgICAgIC53ZWlnaHQgKiB0aGlzLnRyYWNlLmVsZWdpYmlsaXR5W2lucHV0LklEXSArIGlucHV0LmdhaW4gKiBpbnB1dC5mcm9tXG4gICAgICAgIC5hY3RpdmF0aW9uO1xuXG4gICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLnRyYWNlLmV4dGVuZGVkKSB7XG4gICAgICAgIC8vIGV4dGVuZGVkIGVsZWdpYmlsaXR5IHRyYWNlXG4gICAgICAgIHZhciB4dHJhY2UgPSB0aGlzLnRyYWNlLmV4dGVuZGVkW2lkXTtcbiAgICAgICAgdmFyIG5ldXJvbiA9IHRoaXMubmVpZ2hib29yc1tpZF07XG5cbiAgICAgICAgLy8gaWYgZ2F0ZWQgbmV1cm9uJ3Mgc2VsZmNvbm5lY3Rpb24gaXMgZ2F0ZWQgYnkgdGhpcyB1bml0LCB0aGUgaW5mbHVlbmNlIGtlZXBzIHRyYWNrIG9mIHRoZSBuZXVyb24ncyBvbGQgc3RhdGVcbiAgICAgICAgdmFyIGluZmx1ZW5jZSA9IG5ldXJvbi5zZWxmY29ubmVjdGlvbi5nYXRlciA9PSB0aGlzID8gbmV1cm9uLm9sZCA6XG4gICAgICAgICAgMDtcblxuICAgICAgICAvLyBpbmRleCBydW5zIG92ZXIgYWxsIHRoZSBpbmNvbWluZyBjb25uZWN0aW9ucyB0byB0aGUgZ2F0ZWQgbmV1cm9uIHRoYXQgYXJlIGdhdGVkIGJ5IHRoaXMgdW5pdFxuICAgICAgICBmb3IgKHZhciBpbmNvbWluZyBpbiB0aGlzLnRyYWNlLmluZmx1ZW5jZXNbbmV1cm9uLklEXSkgeyAvLyBjYXB0dXJlcyB0aGUgZWZmZWN0IHRoYXQgaGFzIGFuIGlucHV0IGNvbm5lY3Rpb24gdG8gdGhpcyB1bml0LCBvbiBhIG5ldXJvbiB0aGF0IGlzIGdhdGVkIGJ5IHRoaXMgdW5pdFxuICAgICAgICAgIGluZmx1ZW5jZSArPSB0aGlzLnRyYWNlLmluZmx1ZW5jZXNbbmV1cm9uLklEXVtpbmNvbWluZ10ud2VpZ2h0ICpcbiAgICAgICAgICAgIHRoaXMudHJhY2UuaW5mbHVlbmNlc1tuZXVyb24uSURdW2luY29taW5nXS5mcm9tLmFjdGl2YXRpb247XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlcS4gMThcbiAgICAgICAgeHRyYWNlW2lucHV0LklEXSA9IG5ldXJvbi5zZWxmY29ubmVjdGlvbi5nYWluICogbmV1cm9uLnNlbGZjb25uZWN0aW9uXG4gICAgICAgICAgLndlaWdodCAqIHh0cmFjZVtpbnB1dC5JRF0gKyB0aGlzLmRlcml2YXRpdmUgKiB0aGlzLnRyYWNlLmVsZWdpYmlsaXR5W1xuICAgICAgICAgICAgaW5wdXQuSURdICogaW5mbHVlbmNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vICB1cGRhdGUgZ2F0ZWQgY29ubmVjdGlvbidzIGdhaW5zXG4gICAgZm9yICh2YXIgY29ubmVjdGlvbiBpbiB0aGlzLmNvbm5lY3Rpb25zLmdhdGVkKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLmdhdGVkW2Nvbm5lY3Rpb25dLmdhaW4gPSB0aGlzLmFjdGl2YXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGlvbjtcbiAgfSxcblxuICAvLyBiYWNrLXByb3BhZ2F0ZSB0aGUgZXJyb3JcbiAgcHJvcGFnYXRlOiBmdW5jdGlvbihyYXRlLCB0YXJnZXQpIHtcbiAgICAvLyBlcnJvciBhY2N1bXVsYXRvclxuICAgIHZhciBlcnJvciA9IDA7XG5cbiAgICAvLyBvdXRwdXQgbmV1cm9ucyBnZXQgdGhlaXIgZXJyb3IgZnJvbSB0aGUgZW52aXJvbWVudFxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9ICd1bmRlZmluZWQnKVxuICAgICAgZXJyb3IgPSB0YXJnZXQgLSB0aGlzLmFjdGl2YXRpb247XG5cbiAgICAvLyBlcnJvciByZXNwb25zaWJpbGl0aWVzIGZyb20gYWxsIHRoZSBjb25uZWN0aW9ucyBwcm9qZWN0ZWQgZnJvbSB0aGlzIG5ldXJvblxuICAgIGZvciAodmFyIGlkIGluIHRoaXMuY29ubmVjdGlvbnMucHJvamVjdGVkKSB7XG4gICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvbnMucHJvamVjdGVkW2lkXTtcbiAgICAgIHZhciBuZXVyb24gPSBjb25uZWN0aW9uLnRvO1xuICAgICAgLy8gRXEuIDIxXG4gICAgICBlcnJvciArPSBuZXVyb24uZXJyb3IucmVzcG9uc2liaWxpdHkgKiBjb25uZWN0aW9uLmdhaW4gKiBjb25uZWN0aW9uLndlaWdodDtcbiAgICB9XG5cbiAgICAvLyBwcm9qZWN0ZWQgZXJyb3IgcmVzcG9uc2liaWxpdHlcbiAgICB0aGlzLmVycm9yLnByb2plY3RlZCA9IHRoaXMuZGVyaXZhdGl2ZSAqIGVycm9yO1xuXG4gICAgZXJyb3IgPSAwO1xuICAgIC8vIGVycm9yIHJlc3BvbnNpYmlsaXRpZXMgZnJvbSBhbGwgdGhlIGNvbm5lY3Rpb25zIGdhdGVkIGJ5IHRoaXMgbmV1cm9uXG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy50cmFjZS5leHRlbmRlZCkge1xuICAgICAgdmFyIG5ldXJvbiA9IHRoaXMubmVpZ2hib29yc1tpZF07IC8vIGdhdGVkIG5ldXJvblxuICAgICAgdmFyIGluZmx1ZW5jZSA9IG5ldXJvbi5zZWxmY29ubmVjdGlvbi5nYXRlciA9PSB0aGlzID8gbmV1cm9uLm9sZCA6IDA7IC8vIGlmIGdhdGVkIG5ldXJvbidzIHNlbGZjb25uZWN0aW9uIGlzIGdhdGVkIGJ5IHRoaXMgbmV1cm9uXG5cbiAgICAgIC8vIGluZGV4IHJ1bnMgb3ZlciBhbGwgdGhlIGNvbm5lY3Rpb25zIHRvIHRoZSBnYXRlZCBuZXVyb24gdGhhdCBhcmUgZ2F0ZWQgYnkgdGhpcyBuZXVyb25cbiAgICAgIGZvciAodmFyIGlucHV0IGluIHRoaXMudHJhY2UuaW5mbHVlbmNlc1tpZF0pIHsgLy8gY2FwdHVyZXMgdGhlIGVmZmVjdCB0aGF0IHRoZSBpbnB1dCBjb25uZWN0aW9uIG9mIHRoaXMgbmV1cm9uIGhhdmUsIG9uIGEgbmV1cm9uIHdoaWNoIGl0cyBpbnB1dC9zIGlzL2FyZSBnYXRlZCBieSB0aGlzIG5ldXJvblxuICAgICAgICBpbmZsdWVuY2UgKz0gdGhpcy50cmFjZS5pbmZsdWVuY2VzW2lkXVtpbnB1dF0ud2VpZ2h0ICogdGhpcy50cmFjZS5pbmZsdWVuY2VzW1xuICAgICAgICAgIG5ldXJvbi5JRF1baW5wdXRdLmZyb20uYWN0aXZhdGlvbjtcbiAgICAgIH1cbiAgICAgIC8vIGVxLiAyMlxuICAgICAgZXJyb3IgKz0gbmV1cm9uLmVycm9yLnJlc3BvbnNpYmlsaXR5ICogaW5mbHVlbmNlO1xuICAgIH1cblxuICAgIC8vIGdhdGVkIGVycm9yIHJlc3BvbnNpYmlsaXR5XG4gICAgdGhpcy5lcnJvci5nYXRlZCA9IHRoaXMuZGVyaXZhdGl2ZSAqIGVycm9yO1xuXG4gICAgLy8gZXJyb3IgcmVzcG9uc2liaWxpdHkgLSBFcS4gMjNcbiAgICB0aGlzLmVycm9yLnJlc3BvbnNpYmlsaXR5ID0gdGhpcy5lcnJvci5wcm9qZWN0ZWQgKyB0aGlzLmVycm9yLmdhdGVkO1xuXG4gICAgLy8gbGVhcm5pbmcgcmF0ZVxuICAgIHJhdGUgPSByYXRlIHx8IC4xO1xuXG4gICAgLy8gYWRqdXN0IGFsbCB0aGUgbmV1cm9uJ3MgaW5jb21pbmcgY29ubmVjdGlvbnNcbiAgICBmb3IgKHZhciBpZCBpbiB0aGlzLmNvbm5lY3Rpb25zLmlucHV0cykge1xuICAgICAgdmFyIGlucHV0ID0gdGhpcy5jb25uZWN0aW9ucy5pbnB1dHNbaWRdO1xuXG4gICAgICAvLyBFcS4gMjRcbiAgICAgIHZhciBncmFkaWVudCA9IHRoaXMuZXJyb3IucHJvamVjdGVkICogdGhpcy50cmFjZS5lbGVnaWJpbGl0eVtpbnB1dC5JRF07XG4gICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLnRyYWNlLmV4dGVuZGVkKSB7XG4gICAgICAgIHZhciBuZXVyb24gPSB0aGlzLm5laWdoYm9vcnNbaWRdO1xuICAgICAgICBncmFkaWVudCArPSBuZXVyb24uZXJyb3IucmVzcG9uc2liaWxpdHkgKiB0aGlzLnRyYWNlLmV4dGVuZGVkW1xuICAgICAgICAgIG5ldXJvbi5JRF1baW5wdXQuSURdO1xuICAgICAgfVxuICAgICAgaW5wdXQud2VpZ2h0ICs9IHJhdGUgKiBncmFkaWVudDsgLy8gYWRqdXN0IHdlaWdodHMgLSBha2EgbGVhcm5cbiAgICB9XG5cbiAgICAvLyBhZGp1c3QgYmlhc1xuICAgIHRoaXMuYmlhcyArPSByYXRlICogdGhpcy5lcnJvci5yZXNwb25zaWJpbGl0eTtcbiAgfSxcblxuICBwcm9qZWN0OiBmdW5jdGlvbihuZXVyb24sIHdlaWdodCkge1xuICAgIC8vIHNlbGYtY29ubmVjdGlvblxuICAgIGlmIChuZXVyb24gPT0gdGhpcykge1xuICAgICAgdGhpcy5zZWxmY29ubmVjdGlvbi53ZWlnaHQgPSAxO1xuICAgICAgcmV0dXJuIHRoaXMuc2VsZmNvbm5lY3Rpb247XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgY29ubmVjdGlvbiBhbHJlYWR5IGV4aXN0c1xuICAgIHZhciBjb25uZWN0ZWQgPSB0aGlzLmNvbm5lY3RlZChuZXVyb24pO1xuICAgIGlmIChjb25uZWN0ZWQgJiYgY29ubmVjdGVkLnR5cGUgPT0gXCJwcm9qZWN0ZWRcIikge1xuICAgICAgLy8gdXBkYXRlIGNvbm5lY3Rpb25cbiAgICAgIGlmICh0eXBlb2Ygd2VpZ2h0ICE9ICd1bmRlZmluZWQnKVxuICAgICAgICBjb25uZWN0ZWQuY29ubmVjdGlvbi53ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgICAvLyByZXR1cm4gZXhpc3RpbmcgY29ubmVjdGlvblxuICAgICAgcmV0dXJuIGNvbm5lY3RlZC5jb25uZWN0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjcmVhdGUgYSBuZXcgY29ubmVjdGlvblxuICAgICAgdmFyIGNvbm5lY3Rpb24gPSBuZXcgTmV1cm9uLmNvbm5lY3Rpb24odGhpcywgbmV1cm9uLCB3ZWlnaHQpO1xuICAgIH1cblxuICAgIC8vIHJlZmVyZW5jZSBhbGwgdGhlIGNvbm5lY3Rpb25zIGFuZCB0cmFjZXNcbiAgICB0aGlzLmNvbm5lY3Rpb25zLnByb2plY3RlZFtjb25uZWN0aW9uLklEXSA9IGNvbm5lY3Rpb247XG4gICAgdGhpcy5uZWlnaGJvb3JzW25ldXJvbi5JRF0gPSBuZXVyb247XG4gICAgbmV1cm9uLmNvbm5lY3Rpb25zLmlucHV0c1tjb25uZWN0aW9uLklEXSA9IGNvbm5lY3Rpb247XG4gICAgbmV1cm9uLnRyYWNlLmVsZWdpYmlsaXR5W2Nvbm5lY3Rpb24uSURdID0gMDtcblxuICAgIGZvciAodmFyIGlkIGluIG5ldXJvbi50cmFjZS5leHRlbmRlZCkge1xuICAgICAgdmFyIHRyYWNlID0gbmV1cm9uLnRyYWNlLmV4dGVuZGVkW2lkXTtcbiAgICAgIHRyYWNlW2Nvbm5lY3Rpb24uSURdID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29ubmVjdGlvbjtcbiAgfSxcblxuICBnYXRlOiBmdW5jdGlvbihjb25uZWN0aW9uKSB7XG4gICAgLy8gYWRkIGNvbm5lY3Rpb24gdG8gZ2F0ZWQgbGlzdFxuICAgIHRoaXMuY29ubmVjdGlvbnMuZ2F0ZWRbY29ubmVjdGlvbi5JRF0gPSBjb25uZWN0aW9uO1xuXG4gICAgdmFyIG5ldXJvbiA9IGNvbm5lY3Rpb24udG87XG4gICAgaWYgKCEobmV1cm9uLklEIGluIHRoaXMudHJhY2UuZXh0ZW5kZWQpKSB7XG4gICAgICAvLyBleHRlbmRlZCB0cmFjZVxuICAgICAgdGhpcy5uZWlnaGJvb3JzW25ldXJvbi5JRF0gPSBuZXVyb247XG4gICAgICB2YXIgeHRyYWNlID0gdGhpcy50cmFjZS5leHRlbmRlZFtuZXVyb24uSURdID0ge307XG4gICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLmNvbm5lY3Rpb25zLmlucHV0cykge1xuICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLmNvbm5lY3Rpb25zLmlucHV0c1tpZF07XG4gICAgICAgIHh0cmFjZVtpbnB1dC5JRF0gPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGtlZXAgdHJhY2tcbiAgICBpZiAobmV1cm9uLklEIGluIHRoaXMudHJhY2UuaW5mbHVlbmNlcylcbiAgICAgIHRoaXMudHJhY2UuaW5mbHVlbmNlc1tuZXVyb24uSURdLnB1c2goY29ubmVjdGlvbik7XG4gICAgZWxzZVxuICAgICAgdGhpcy50cmFjZS5pbmZsdWVuY2VzW25ldXJvbi5JRF0gPSBbY29ubmVjdGlvbl07XG5cbiAgICAvLyBzZXQgZ2F0ZXJcbiAgICBjb25uZWN0aW9uLmdhdGVyID0gdGhpcztcbiAgfSxcblxuICAvLyByZXR1cm5zIHRydWUgb3IgZmFsc2Ugd2hldGhlciB0aGUgbmV1cm9uIGlzIHNlbGYtY29ubmVjdGVkIG9yIG5vdFxuICBzZWxmY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxmY29ubmVjdGlvbi53ZWlnaHQgIT09IDA7XG4gIH0sXG5cbiAgLy8gcmV0dXJucyB0cnVlIG9yIGZhbHNlIHdoZXRoZXIgdGhlIG5ldXJvbiBpcyBjb25uZWN0ZWQgdG8gYW5vdGhlciBuZXVyb24gKHBhcmFtZXRlcilcbiAgY29ubmVjdGVkOiBmdW5jdGlvbihuZXVyb24pIHtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgdHlwZTogbnVsbCxcbiAgICAgIGNvbm5lY3Rpb246IGZhbHNlXG4gICAgfTtcblxuICAgIGlmICh0aGlzID09IG5ldXJvbikge1xuICAgICAgaWYgKHRoaXMuc2VsZmNvbm5lY3RlZCgpKSB7XG4gICAgICAgIHJlc3VsdC50eXBlID0gJ3NlbGZjb25uZWN0aW9uJztcbiAgICAgICAgcmVzdWx0LmNvbm5lY3Rpb24gPSB0aGlzLnNlbGZjb25uZWN0aW9uO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciB0eXBlIGluIHRoaXMuY29ubmVjdGlvbnMpIHtcbiAgICAgIGZvciAodmFyIGNvbm5lY3Rpb24gaW4gdGhpcy5jb25uZWN0aW9uc1t0eXBlXSkge1xuICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvbnNbdHlwZV1bY29ubmVjdGlvbl07XG4gICAgICAgIGlmIChjb25uZWN0aW9uLnRvID09IG5ldXJvbikge1xuICAgICAgICAgIHJlc3VsdC50eXBlID0gdHlwZTtcbiAgICAgICAgICByZXN1bHQuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSBlbHNlIGlmIChjb25uZWN0aW9uLmZyb20gPT0gbmV1cm9uKSB7XG4gICAgICAgICAgcmVzdWx0LnR5cGUgPSB0eXBlO1xuICAgICAgICAgIHJlc3VsdC5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8vIGNsZWFycyBhbGwgdGhlIHRyYWNlcyAodGhlIG5ldXJvbiBmb3JnZXRzIGl0J3MgY29udGV4dCwgYnV0IHRoZSBjb25uZWN0aW9ucyByZW1haW4gaW50YWN0KVxuICBjbGVhcjogZnVuY3Rpb24oKSB7XG5cbiAgICBmb3IgKHZhciB0cmFjZSBpbiB0aGlzLnRyYWNlLmVsZWdpYmlsaXR5KVxuICAgICAgdGhpcy50cmFjZS5lbGVnaWJpbGl0eVt0cmFjZV0gPSAwO1xuXG4gICAgZm9yICh2YXIgdHJhY2UgaW4gdGhpcy50cmFjZS5leHRlbmRlZClcbiAgICAgIGZvciAodmFyIGV4dGVuZGVkIGluIHRoaXMudHJhY2UuZXh0ZW5kZWRbdHJhY2VdKVxuICAgICAgICB0aGlzLnRyYWNlLmV4dGVuZGVkW3RyYWNlXVtleHRlbmRlZF0gPSAwO1xuXG4gICAgdGhpcy5lcnJvci5yZXNwb25zaWJpbGl0eSA9IHRoaXMuZXJyb3IucHJvamVjdGVkID0gdGhpcy5lcnJvci5nYXRlZCA9IDA7XG4gIH0sXG5cbiAgLy8gYWxsIHRoZSBjb25uZWN0aW9ucyBhcmUgcmFuZG9taXplZCBhbmQgdGhlIHRyYWNlcyBhcmUgY2xlYXJlZFxuICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jbGVhcigpO1xuXG4gICAgZm9yICh2YXIgdHlwZSBpbiB0aGlzLmNvbm5lY3Rpb24pXG4gICAgICBmb3IgKHZhciBjb25uZWN0aW9uIGluIHRoaXMuY29ubmVjdGlvblt0eXBlXSlcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uW3R5cGVdW2Nvbm5lY3Rpb25dLndlaWdodCA9IE1hdGgucmFuZG9tKCkgKiAuMiAtIC4xO1xuICAgIHRoaXMuYmlhcyA9IE1hdGgucmFuZG9tKCkgKiAuMiAtIC4xO1xuXG4gICAgdGhpcy5vbGQgPSB0aGlzLnN0YXRlID0gdGhpcy5hY3RpdmF0aW9uID0gMDtcbiAgfSxcblxuICAvLyBoYXJkY29kZXMgdGhlIGJlaGF2aW91ciBvZiB0aGUgbmV1cm9uIGludG8gYW4gb3B0aW1pemVkIGZ1bmN0aW9uXG4gIG9wdGltaXplOiBmdW5jdGlvbihvcHRpbWl6ZWQsIGxheWVyKSB7XG5cbiAgICBvcHRpbWl6ZWQgPSBvcHRpbWl6ZWQgfHwge307XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBzdG9yZV9hY3RpdmF0aW9uID0gW107XG4gICAgdmFyIHN0b3JlX3RyYWNlID0gW107XG4gICAgdmFyIHN0b3JlX3Byb3BhZ2F0aW9uID0gW107XG4gICAgdmFyIHZhcklEID0gb3B0aW1pemVkLm1lbW9yeSB8IDA7XG4gICAgdmFyIGlucHV0cyA9IG9wdGltaXplZC5pbnB1dHMgfHwgW107XG4gICAgdmFyIHRhcmdldHMgPSBvcHRpbWl6ZWQudGFyZ2V0cyB8fCBbXTtcbiAgICB2YXIgb3V0cHV0cyA9IG9wdGltaXplZC5vdXRwdXRzIHx8IFtdO1xuICAgIHZhciB2YXJpYWJsZXMgPSBvcHRpbWl6ZWQudmFyaWFibGVzIHx8IHt9O1xuICAgIHZhciBhY3RpdmF0aW9uX3NlbnRlbmNlcyA9IG9wdGltaXplZC5hY3RpdmF0aW9uX3NlbnRlbmNlcyB8fCBbXTtcbiAgICB2YXIgdHJhY2Vfc2VudGVuY2VzID0gb3B0aW1pemVkLnRyYWNlX3NlbnRlbmNlcyB8fCBbXTtcbiAgICB2YXIgcHJvcGFnYXRpb25fc2VudGVuY2VzID0gb3B0aW1pemVkLnByb3BhZ2F0aW9uX3NlbnRlbmNlcyB8fCBbXTtcblxuICAgIC8vIGdldC9yZXNlcnZlIHNwYWNlIGluIG1lbW9yeSBieSBjcmVhdGluZyBhIHVuaXF1ZSBJRCBmb3IgYSB2YXJpYWJsZWxcbiAgICB2YXIgZ2V0VmFyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cbiAgICAgIGlmIChhcmdzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChhcmdzWzBdID09ICd0YXJnZXQnKSB7XG4gICAgICAgICAgdmFyIGlkID0gJ3RhcmdldF8nICsgdGFyZ2V0cy5sZW5ndGg7XG4gICAgICAgICAgdGFyZ2V0cy5wdXNoKHZhcklEKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgdmFyIGlkID0gYXJnc1swXTtcbiAgICAgICAgaWYgKGlkIGluIHZhcmlhYmxlcylcbiAgICAgICAgICByZXR1cm4gdmFyaWFibGVzW2lkXTtcbiAgICAgICAgcmV0dXJuIHZhcmlhYmxlc1tpZF0gPSB7XG4gICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgaWQ6IHZhcklEKytcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBleHRlbmRlZCA9IGFyZ3MubGVuZ3RoID4gMjtcbiAgICAgICAgaWYgKGV4dGVuZGVkKVxuICAgICAgICAgIHZhciB2YWx1ZSA9IGFyZ3MucG9wKCk7XG5cbiAgICAgICAgdmFyIHVuaXQgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIHZhciBwcm9wID0gYXJncy5wb3AoKTtcblxuICAgICAgICBpZiAoIWV4dGVuZGVkKVxuICAgICAgICAgIHZhciB2YWx1ZSA9IHVuaXRbcHJvcF07XG5cbiAgICAgICAgdmFyIGlkID0gcHJvcCArICdfJztcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gYXJncylcbiAgICAgICAgICBpZCArPSBhcmdzW3Byb3BlcnR5XSArICdfJztcbiAgICAgICAgaWQgKz0gdW5pdC5JRDtcbiAgICAgICAgaWYgKGlkIGluIHZhcmlhYmxlcylcbiAgICAgICAgICByZXR1cm4gdmFyaWFibGVzW2lkXTtcblxuICAgICAgICByZXR1cm4gdmFyaWFibGVzW2lkXSA9IHtcbiAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgaWQ6IHZhcklEKytcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gYnVpbGQgc2VudGVuY2VcbiAgICB2YXIgYnVpbGRTZW50ZW5jZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgdmFyIHN0b3JlID0gYXJncy5wb3AoKTtcbiAgICAgIHZhciBzZW50ZW5jZSA9IFwiXCI7XG4gICAgICBmb3IgKHZhciBpIGluIGFyZ3MpXG4gICAgICAgIGlmICh0eXBlb2YgYXJnc1tpXSA9PSAnc3RyaW5nJylcbiAgICAgICAgICBzZW50ZW5jZSArPSBhcmdzW2ldO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgc2VudGVuY2UgKz0gJ0ZbJyArIGFyZ3NbaV0uaWQgKyAnXSc7XG4gICAgICBzdG9yZS5wdXNoKHNlbnRlbmNlICsgJzsnKTtcbiAgICB9XG5cbiAgICAvLyBoZWxwZXIgdG8gY2hlY2sgaWYgYW4gb2JqZWN0IGlzIGVtcHR5XG4gICAgdmFyIGlzRW1wdHkgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8vIGNoYXJhY3RlcmlzdGljcyBvZiB0aGUgbmV1cm9uXG4gICAgdmFyIG5vUHJvamVjdGlvbnMgPSBpc0VtcHR5KHRoaXMuY29ubmVjdGlvbnMucHJvamVjdGVkKTtcbiAgICB2YXIgbm9HYXRlcyA9IGlzRW1wdHkodGhpcy5jb25uZWN0aW9ucy5nYXRlZCk7XG4gICAgdmFyIGlzSW5wdXQgPSBsYXllciA9PSAnaW5wdXQnID8gdHJ1ZSA6IGlzRW1wdHkodGhpcy5jb25uZWN0aW9ucy5pbnB1dHMpO1xuICAgIHZhciBpc091dHB1dCA9IGxheWVyID09ICdvdXRwdXQnID8gdHJ1ZSA6IG5vUHJvamVjdGlvbnMgJiYgbm9HYXRlcztcblxuICAgIC8vIG9wdGltaXplIG5ldXJvbidzIGJlaGF2aW91clxuICAgIHZhciByYXRlID0gZ2V0VmFyKCdyYXRlJyk7XG4gICAgdmFyIGFjdGl2YXRpb24gPSBnZXRWYXIodGhpcywgJ2FjdGl2YXRpb24nKTtcbiAgICBpZiAoaXNJbnB1dClcbiAgICAgIGlucHV0cy5wdXNoKGFjdGl2YXRpb24uaWQpO1xuICAgIGVsc2Uge1xuICAgICAgYWN0aXZhdGlvbl9zZW50ZW5jZXMucHVzaChzdG9yZV9hY3RpdmF0aW9uKTtcbiAgICAgIHRyYWNlX3NlbnRlbmNlcy5wdXNoKHN0b3JlX3RyYWNlKTtcbiAgICAgIHByb3BhZ2F0aW9uX3NlbnRlbmNlcy5wdXNoKHN0b3JlX3Byb3BhZ2F0aW9uKTtcbiAgICAgIHZhciBvbGQgPSBnZXRWYXIodGhpcywgJ29sZCcpO1xuICAgICAgdmFyIHN0YXRlID0gZ2V0VmFyKHRoaXMsICdzdGF0ZScpO1xuICAgICAgdmFyIGJpYXMgPSBnZXRWYXIodGhpcywgJ2JpYXMnKTtcbiAgICAgIGlmICh0aGlzLnNlbGZjb25uZWN0aW9uLmdhdGVyKVxuICAgICAgICB2YXIgc2VsZl9nYWluID0gZ2V0VmFyKHRoaXMuc2VsZmNvbm5lY3Rpb24sICdnYWluJyk7XG4gICAgICBpZiAodGhpcy5zZWxmY29ubmVjdGVkKCkpXG4gICAgICAgIHZhciBzZWxmX3dlaWdodCA9IGdldFZhcih0aGlzLnNlbGZjb25uZWN0aW9uLCAnd2VpZ2h0Jyk7XG4gICAgICBidWlsZFNlbnRlbmNlKG9sZCwgJyA9ICcsIHN0YXRlLCBzdG9yZV9hY3RpdmF0aW9uKTtcbiAgICAgIGlmICh0aGlzLnNlbGZjb25uZWN0ZWQoKSlcbiAgICAgICAgaWYgKHRoaXMuc2VsZmNvbm5lY3Rpb24uZ2F0ZXIpXG4gICAgICAgICAgYnVpbGRTZW50ZW5jZShzdGF0ZSwgJyA9ICcsIHNlbGZfZ2FpbiwgJyAqICcsIHNlbGZfd2VpZ2h0LCAnICogJyxcbiAgICAgICAgICAgIHN0YXRlLCAnICsgJywgYmlhcywgc3RvcmVfYWN0aXZhdGlvbik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBidWlsZFNlbnRlbmNlKHN0YXRlLCAnID0gJywgc2VsZl93ZWlnaHQsICcgKiAnLCBzdGF0ZSwgJyArICcsXG4gICAgICAgICAgICBiaWFzLCBzdG9yZV9hY3RpdmF0aW9uKTtcbiAgICAgIGVsc2VcbiAgICAgICAgYnVpbGRTZW50ZW5jZShzdGF0ZSwgJyA9ICcsIGJpYXMsIHN0b3JlX2FjdGl2YXRpb24pO1xuICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmNvbm5lY3Rpb25zLmlucHV0cykge1xuICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLmNvbm5lY3Rpb25zLmlucHV0c1tpXTtcbiAgICAgICAgdmFyIGlucHV0X2FjdGl2YXRpb24gPSBnZXRWYXIoaW5wdXQuZnJvbSwgJ2FjdGl2YXRpb24nKTtcbiAgICAgICAgdmFyIGlucHV0X3dlaWdodCA9IGdldFZhcihpbnB1dCwgJ3dlaWdodCcpO1xuICAgICAgICBpZiAoaW5wdXQuZ2F0ZXIpXG4gICAgICAgICAgdmFyIGlucHV0X2dhaW4gPSBnZXRWYXIoaW5wdXQsICdnYWluJyk7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3Rpb25zLmlucHV0c1tpXS5nYXRlcilcbiAgICAgICAgICBidWlsZFNlbnRlbmNlKHN0YXRlLCAnICs9ICcsIGlucHV0X2FjdGl2YXRpb24sICcgKiAnLFxuICAgICAgICAgICAgaW5wdXRfd2VpZ2h0LCAnICogJywgaW5wdXRfZ2Fpbiwgc3RvcmVfYWN0aXZhdGlvbik7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBidWlsZFNlbnRlbmNlKHN0YXRlLCAnICs9ICcsIGlucHV0X2FjdGl2YXRpb24sICcgKiAnLFxuICAgICAgICAgICAgaW5wdXRfd2VpZ2h0LCBzdG9yZV9hY3RpdmF0aW9uKTtcbiAgICAgIH1cbiAgICAgIHZhciBkZXJpdmF0aXZlID0gZ2V0VmFyKHRoaXMsICdkZXJpdmF0aXZlJyk7XG4gICAgICBzd2l0Y2ggKHRoaXMuc3F1YXNoKSB7XG4gICAgICAgIGNhc2UgTmV1cm9uLnNxdWFzaC5MT0dJU1RJQzpcbiAgICAgICAgICBidWlsZFNlbnRlbmNlKGFjdGl2YXRpb24sICcgPSAoMSAvICgxICsgTWF0aC5leHAoLScsIHN0YXRlLCAnKSkpJyxcbiAgICAgICAgICAgIHN0b3JlX2FjdGl2YXRpb24pO1xuICAgICAgICAgIGJ1aWxkU2VudGVuY2UoZGVyaXZhdGl2ZSwgJyA9ICcsIGFjdGl2YXRpb24sICcgKiAoMSAtICcsXG4gICAgICAgICAgICBhY3RpdmF0aW9uLCAnKScsIHN0b3JlX2FjdGl2YXRpb24pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE5ldXJvbi5zcXVhc2guVEFOSDpcbiAgICAgICAgICB2YXIgZVAgPSBnZXRWYXIoJ2F1eCcpO1xuICAgICAgICAgIHZhciBlTiA9IGdldFZhcignYXV4XzInKTtcbiAgICAgICAgICBidWlsZFNlbnRlbmNlKGVQLCAnID0gTWF0aC5leHAoJywgc3RhdGUsICcpJywgc3RvcmVfYWN0aXZhdGlvbik7XG4gICAgICAgICAgYnVpbGRTZW50ZW5jZShlTiwgJyA9IDEgLyAnLCBlUCwgc3RvcmVfYWN0aXZhdGlvbik7XG4gICAgICAgICAgYnVpbGRTZW50ZW5jZShhY3RpdmF0aW9uLCAnID0gKCcsIGVQLCAnIC0gJywgZU4sICcpIC8gKCcsIGVQLCAnICsgJywgZU4sICcpJywgc3RvcmVfYWN0aXZhdGlvbik7XG4gICAgICAgICAgYnVpbGRTZW50ZW5jZShkZXJpdmF0aXZlLCAnID0gMSAtICgnLCBhY3RpdmF0aW9uLCAnICogJywgYWN0aXZhdGlvbiwgJyknLCBzdG9yZV9hY3RpdmF0aW9uKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBOZXVyb24uc3F1YXNoLklERU5USVRZOlxuICAgICAgICAgIGJ1aWxkU2VudGVuY2UoYWN0aXZhdGlvbiwgJyA9ICcsIHN0YXRlLCBzdG9yZV9hY3RpdmF0aW9uKTtcbiAgICAgICAgICBidWlsZFNlbnRlbmNlKGRlcml2YXRpdmUsICcgPSAxJywgc3RvcmVfYWN0aXZhdGlvbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTmV1cm9uLnNxdWFzaC5ITElNOlxuICAgICAgICAgIGJ1aWxkU2VudGVuY2UoYWN0aXZhdGlvbiwgJyA9ICsoJywgc3RhdGUsICcgPiAwKScsXG4gICAgICAgICAgICBzdG9yZV9hY3RpdmF0aW9uKTtcbiAgICAgICAgICBidWlsZFNlbnRlbmNlKGRlcml2YXRpdmUsICcgPSAxJywgc3RvcmVfYWN0aXZhdGlvbik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5jb25uZWN0aW9ucy5pbnB1dHMpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gdGhpcy5jb25uZWN0aW9ucy5pbnB1dHNbaV07XG4gICAgICAgIGlmIChpbnB1dC5nYXRlcilcbiAgICAgICAgICB2YXIgaW5wdXRfZ2FpbiA9IGdldFZhcihpbnB1dCwgJ2dhaW4nKTtcbiAgICAgICAgdmFyIGlucHV0X2FjdGl2YXRpb24gPSBnZXRWYXIoaW5wdXQuZnJvbSwgJ2FjdGl2YXRpb24nKTtcbiAgICAgICAgdmFyIHRyYWNlID0gZ2V0VmFyKHRoaXMsICd0cmFjZScsICdlbGVnaWJpbGl0eScsIGlucHV0LklELCB0aGlzLnRyYWNlXG4gICAgICAgICAgLmVsZWdpYmlsaXR5W2lucHV0LklEXSk7XG4gICAgICAgIGlmICh0aGlzLnNlbGZjb25uZWN0ZWQoKSkge1xuICAgICAgICAgIGlmICh0aGlzLnNlbGZjb25uZWN0aW9uLmdhdGVyKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXQuZ2F0ZXIpXG4gICAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UodHJhY2UsICcgPSAnLCBzZWxmX2dhaW4sICcgKiAnLCBzZWxmX3dlaWdodCxcbiAgICAgICAgICAgICAgICAnICogJywgdHJhY2UsICcgKyAnLCBpbnB1dF9nYWluLCAnICogJywgaW5wdXRfYWN0aXZhdGlvbixcbiAgICAgICAgICAgICAgICBzdG9yZV90cmFjZSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UodHJhY2UsICcgPSAnLCBzZWxmX2dhaW4sICcgKiAnLCBzZWxmX3dlaWdodCxcbiAgICAgICAgICAgICAgICAnICogJywgdHJhY2UsICcgKyAnLCBpbnB1dF9hY3RpdmF0aW9uLCBzdG9yZV90cmFjZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbnB1dC5nYXRlcilcbiAgICAgICAgICAgICAgYnVpbGRTZW50ZW5jZSh0cmFjZSwgJyA9ICcsIHNlbGZfd2VpZ2h0LCAnICogJywgdHJhY2UsICcgKyAnLFxuICAgICAgICAgICAgICAgIGlucHV0X2dhaW4sICcgKiAnLCBpbnB1dF9hY3RpdmF0aW9uLCBzdG9yZV90cmFjZSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UodHJhY2UsICcgPSAnLCBzZWxmX3dlaWdodCwgJyAqICcsIHRyYWNlLCAnICsgJyxcbiAgICAgICAgICAgICAgICBpbnB1dF9hY3RpdmF0aW9uLCBzdG9yZV90cmFjZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpbnB1dC5nYXRlcilcbiAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UodHJhY2UsICcgPSAnLCBpbnB1dF9nYWluLCAnICogJywgaW5wdXRfYWN0aXZhdGlvbixcbiAgICAgICAgICAgICAgc3RvcmVfdHJhY2UpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UodHJhY2UsICcgPSAnLCBpbnB1dF9hY3RpdmF0aW9uLCBzdG9yZV90cmFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy50cmFjZS5leHRlbmRlZCkge1xuICAgICAgICAgIC8vIGV4dGVuZGVkIGVsZWdpYmlsaXR5IHRyYWNlXG4gICAgICAgICAgdmFyIHh0cmFjZSA9IHRoaXMudHJhY2UuZXh0ZW5kZWRbaWRdO1xuICAgICAgICAgIHZhciBuZXVyb24gPSB0aGlzLm5laWdoYm9vcnNbaWRdO1xuICAgICAgICAgIHZhciBpbmZsdWVuY2UgPSBnZXRWYXIoJ2F1eCcpO1xuICAgICAgICAgIHZhciBuZXVyb25fb2xkID0gZ2V0VmFyKG5ldXJvbiwgJ29sZCcpO1xuICAgICAgICAgIGlmIChuZXVyb24uc2VsZmNvbm5lY3Rpb24uZ2F0ZXIgPT0gdGhpcylcbiAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UoaW5mbHVlbmNlLCAnID0gJywgbmV1cm9uX29sZCwgc3RvcmVfdHJhY2UpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UoaW5mbHVlbmNlLCAnID0gMCcsIHN0b3JlX3RyYWNlKTtcbiAgICAgICAgICBmb3IgKHZhciBpbmNvbWluZyBpbiB0aGlzLnRyYWNlLmluZmx1ZW5jZXNbbmV1cm9uLklEXSkge1xuICAgICAgICAgICAgdmFyIGluY29taW5nX3dlaWdodCA9IGdldFZhcih0aGlzLnRyYWNlLmluZmx1ZW5jZXNbbmV1cm9uLklEXVtcbiAgICAgICAgICAgICAgaW5jb21pbmdcbiAgICAgICAgICAgIF0sICd3ZWlnaHQnKTtcbiAgICAgICAgICAgIHZhciBpbmNvbWluZ19hY3RpdmF0aW9uID0gZ2V0VmFyKHRoaXMudHJhY2UuaW5mbHVlbmNlc1tuZXVyb24uSURdXG4gICAgICAgICAgICAgIFtpbmNvbWluZ10uZnJvbSwgJ2FjdGl2YXRpb24nKTtcblxuICAgICAgICAgICAgYnVpbGRTZW50ZW5jZShpbmZsdWVuY2UsICcgKz0gJywgaW5jb21pbmdfd2VpZ2h0LCAnICogJyxcbiAgICAgICAgICAgICAgaW5jb21pbmdfYWN0aXZhdGlvbiwgc3RvcmVfdHJhY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgdHJhY2UgPSBnZXRWYXIodGhpcywgJ3RyYWNlJywgJ2VsZWdpYmlsaXR5JywgaW5wdXQuSUQsIHRoaXMudHJhY2VcbiAgICAgICAgICAgIC5lbGVnaWJpbGl0eVtpbnB1dC5JRF0pO1xuICAgICAgICAgIHZhciB4dHJhY2UgPSBnZXRWYXIodGhpcywgJ3RyYWNlJywgJ2V4dGVuZGVkJywgbmV1cm9uLklELCBpbnB1dC5JRCxcbiAgICAgICAgICAgIHRoaXMudHJhY2UuZXh0ZW5kZWRbbmV1cm9uLklEXVtpbnB1dC5JRF0pO1xuICAgICAgICAgIGlmIChuZXVyb24uc2VsZmNvbm5lY3RlZCgpKVxuICAgICAgICAgICAgdmFyIG5ldXJvbl9zZWxmX3dlaWdodCA9IGdldFZhcihuZXVyb24uc2VsZmNvbm5lY3Rpb24sICd3ZWlnaHQnKTtcbiAgICAgICAgICBpZiAobmV1cm9uLnNlbGZjb25uZWN0aW9uLmdhdGVyKVxuICAgICAgICAgICAgdmFyIG5ldXJvbl9zZWxmX2dhaW4gPSBnZXRWYXIobmV1cm9uLnNlbGZjb25uZWN0aW9uLCAnZ2FpbicpO1xuICAgICAgICAgIGlmIChuZXVyb24uc2VsZmNvbm5lY3RlZCgpKVxuICAgICAgICAgICAgaWYgKG5ldXJvbi5zZWxmY29ubmVjdGlvbi5nYXRlcilcbiAgICAgICAgICAgICAgYnVpbGRTZW50ZW5jZSh4dHJhY2UsICcgPSAnLCBuZXVyb25fc2VsZl9nYWluLCAnICogJyxcbiAgICAgICAgICAgICAgICBuZXVyb25fc2VsZl93ZWlnaHQsICcgKiAnLCB4dHJhY2UsICcgKyAnLCBkZXJpdmF0aXZlLCAnICogJyxcbiAgICAgICAgICAgICAgICB0cmFjZSwgJyAqICcsIGluZmx1ZW5jZSwgc3RvcmVfdHJhY2UpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBidWlsZFNlbnRlbmNlKHh0cmFjZSwgJyA9ICcsIG5ldXJvbl9zZWxmX3dlaWdodCwgJyAqICcsXG4gICAgICAgICAgICAgICAgeHRyYWNlLCAnICsgJywgZGVyaXZhdGl2ZSwgJyAqICcsIHRyYWNlLCAnICogJywgaW5mbHVlbmNlLFxuICAgICAgICAgICAgICAgIHN0b3JlX3RyYWNlKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBidWlsZFNlbnRlbmNlKHh0cmFjZSwgJyA9ICcsIGRlcml2YXRpdmUsICcgKiAnLCB0cmFjZSwgJyAqICcsXG4gICAgICAgICAgICAgIGluZmx1ZW5jZSwgc3RvcmVfdHJhY2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBjb25uZWN0aW9uIGluIHRoaXMuY29ubmVjdGlvbnMuZ2F0ZWQpIHtcbiAgICAgICAgdmFyIGdhdGVkX2dhaW4gPSBnZXRWYXIodGhpcy5jb25uZWN0aW9ucy5nYXRlZFtjb25uZWN0aW9uXSwgJ2dhaW4nKTtcbiAgICAgICAgYnVpbGRTZW50ZW5jZShnYXRlZF9nYWluLCAnID0gJywgYWN0aXZhdGlvbiwgc3RvcmVfYWN0aXZhdGlvbik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghaXNJbnB1dCkge1xuICAgICAgdmFyIHJlc3BvbnNpYmlsaXR5ID0gZ2V0VmFyKHRoaXMsICdlcnJvcicsICdyZXNwb25zaWJpbGl0eScsIHRoaXMuZXJyb3JcbiAgICAgICAgLnJlc3BvbnNpYmlsaXR5KTtcbiAgICAgIGlmIChpc091dHB1dCkge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZ2V0VmFyKCd0YXJnZXQnKTtcbiAgICAgICAgYnVpbGRTZW50ZW5jZShyZXNwb25zaWJpbGl0eSwgJyA9ICcsIHRhcmdldCwgJyAtICcsIGFjdGl2YXRpb24sXG4gICAgICAgICAgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICBidWlsZFNlbnRlbmNlKHJlc3BvbnNpYmlsaXR5LCAnICo9ICcsIGRlcml2YXRpdmUsIHN0b3JlX3Byb3BhZ2F0aW9uKTtcbiAgICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5jb25uZWN0aW9ucy5pbnB1dHMpIHtcbiAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLmNvbm5lY3Rpb25zLmlucHV0c1tpZF07XG4gICAgICAgICAgdmFyIHRyYWNlID0gZ2V0VmFyKHRoaXMsICd0cmFjZScsICdlbGVnaWJpbGl0eScsIGlucHV0LklELCB0aGlzLnRyYWNlXG4gICAgICAgICAgICAuZWxlZ2liaWxpdHlbaW5wdXQuSURdKTtcbiAgICAgICAgICB2YXIgaW5wdXRfd2VpZ2h0ID0gZ2V0VmFyKGlucHV0LCAnd2VpZ2h0Jyk7XG4gICAgICAgICAgYnVpbGRTZW50ZW5jZShpbnB1dF93ZWlnaHQsICcgKz0gJywgcmF0ZSwgJyAqICgnLCByZXNwb25zaWJpbGl0eSxcbiAgICAgICAgICAgICcgKiAnLCB0cmFjZSwgJyknLCBzdG9yZV9wcm9wYWdhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgb3V0cHV0cy5wdXNoKGFjdGl2YXRpb24uaWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFub1Byb2plY3Rpb25zICYmICFub0dhdGVzKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gZ2V0VmFyKCdhdXgnKTtcbiAgICAgICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLmNvbm5lY3Rpb25zLnByb2plY3RlZCkge1xuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLmNvbm5lY3Rpb25zLnByb2plY3RlZFtpZF07XG4gICAgICAgICAgICB2YXIgbmV1cm9uID0gY29ubmVjdGlvbi50bztcbiAgICAgICAgICAgIHZhciBjb25uZWN0aW9uX3dlaWdodCA9IGdldFZhcihjb25uZWN0aW9uLCAnd2VpZ2h0Jyk7XG4gICAgICAgICAgICB2YXIgbmV1cm9uX3Jlc3BvbnNpYmlsaXR5ID0gZ2V0VmFyKG5ldXJvbiwgJ2Vycm9yJyxcbiAgICAgICAgICAgICAgJ3Jlc3BvbnNpYmlsaXR5JywgbmV1cm9uLmVycm9yLnJlc3BvbnNpYmlsaXR5KTtcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW9uLmdhdGVyKSB7XG4gICAgICAgICAgICAgIHZhciBjb25uZWN0aW9uX2dhaW4gPSBnZXRWYXIoY29ubmVjdGlvbiwgJ2dhaW4nKTtcbiAgICAgICAgICAgICAgYnVpbGRTZW50ZW5jZShlcnJvciwgJyArPSAnLCBuZXVyb25fcmVzcG9uc2liaWxpdHksICcgKiAnLFxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25fZ2FpbiwgJyAqICcsIGNvbm5lY3Rpb25fd2VpZ2h0LFxuICAgICAgICAgICAgICAgIHN0b3JlX3Byb3BhZ2F0aW9uKTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICBidWlsZFNlbnRlbmNlKGVycm9yLCAnICs9ICcsIG5ldXJvbl9yZXNwb25zaWJpbGl0eSwgJyAqICcsXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbl93ZWlnaHQsIHN0b3JlX3Byb3BhZ2F0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHByb2plY3RlZCA9IGdldFZhcih0aGlzLCAnZXJyb3InLCAncHJvamVjdGVkJywgdGhpcy5lcnJvci5wcm9qZWN0ZWQpO1xuICAgICAgICAgIGJ1aWxkU2VudGVuY2UocHJvamVjdGVkLCAnID0gJywgZGVyaXZhdGl2ZSwgJyAqICcsIGVycm9yLFxuICAgICAgICAgICAgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICAgIGJ1aWxkU2VudGVuY2UoZXJyb3IsICcgPSAwJywgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICAgIGZvciAodmFyIGlkIGluIHRoaXMudHJhY2UuZXh0ZW5kZWQpIHtcbiAgICAgICAgICAgIHZhciBuZXVyb24gPSB0aGlzLm5laWdoYm9vcnNbaWRdO1xuICAgICAgICAgICAgdmFyIGluZmx1ZW5jZSA9IGdldFZhcignYXV4XzInKTtcbiAgICAgICAgICAgIHZhciBuZXVyb25fb2xkID0gZ2V0VmFyKG5ldXJvbiwgJ29sZCcpO1xuICAgICAgICAgICAgaWYgKG5ldXJvbi5zZWxmY29ubmVjdGlvbi5nYXRlciA9PSB0aGlzKVxuICAgICAgICAgICAgICBidWlsZFNlbnRlbmNlKGluZmx1ZW5jZSwgJyA9ICcsIG5ldXJvbl9vbGQsIHN0b3JlX3Byb3BhZ2F0aW9uKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgYnVpbGRTZW50ZW5jZShpbmZsdWVuY2UsICcgPSAwJywgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICAgICAgZm9yICh2YXIgaW5wdXQgaW4gdGhpcy50cmFjZS5pbmZsdWVuY2VzW25ldXJvbi5JRF0pIHtcbiAgICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLnRyYWNlLmluZmx1ZW5jZXNbbmV1cm9uLklEXVtpbnB1dF07XG4gICAgICAgICAgICAgIHZhciBjb25uZWN0aW9uX3dlaWdodCA9IGdldFZhcihjb25uZWN0aW9uLCAnd2VpZ2h0Jyk7XG4gICAgICAgICAgICAgIHZhciBuZXVyb25fYWN0aXZhdGlvbiA9IGdldFZhcihjb25uZWN0aW9uLmZyb20sICdhY3RpdmF0aW9uJyk7XG4gICAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UoaW5mbHVlbmNlLCAnICs9ICcsIGNvbm5lY3Rpb25fd2VpZ2h0LCAnICogJyxcbiAgICAgICAgICAgICAgICBuZXVyb25fYWN0aXZhdGlvbiwgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ldXJvbl9yZXNwb25zaWJpbGl0eSA9IGdldFZhcihuZXVyb24sICdlcnJvcicsXG4gICAgICAgICAgICAgICdyZXNwb25zaWJpbGl0eScsIG5ldXJvbi5lcnJvci5yZXNwb25zaWJpbGl0eSk7XG4gICAgICAgICAgICBidWlsZFNlbnRlbmNlKGVycm9yLCAnICs9ICcsIG5ldXJvbl9yZXNwb25zaWJpbGl0eSwgJyAqICcsXG4gICAgICAgICAgICAgIGluZmx1ZW5jZSwgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZ2F0ZWQgPSBnZXRWYXIodGhpcywgJ2Vycm9yJywgJ2dhdGVkJywgdGhpcy5lcnJvci5nYXRlZCk7XG4gICAgICAgICAgYnVpbGRTZW50ZW5jZShnYXRlZCwgJyA9ICcsIGRlcml2YXRpdmUsICcgKiAnLCBlcnJvcixcbiAgICAgICAgICAgIHN0b3JlX3Byb3BhZ2F0aW9uKTtcbiAgICAgICAgICBidWlsZFNlbnRlbmNlKHJlc3BvbnNpYmlsaXR5LCAnID0gJywgcHJvamVjdGVkLCAnICsgJywgZ2F0ZWQsXG4gICAgICAgICAgICBzdG9yZV9wcm9wYWdhdGlvbik7XG4gICAgICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5jb25uZWN0aW9ucy5pbnB1dHMpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMuY29ubmVjdGlvbnMuaW5wdXRzW2lkXTtcbiAgICAgICAgICAgIHZhciBncmFkaWVudCA9IGdldFZhcignYXV4Jyk7XG4gICAgICAgICAgICB2YXIgdHJhY2UgPSBnZXRWYXIodGhpcywgJ3RyYWNlJywgJ2VsZWdpYmlsaXR5JywgaW5wdXQuSUQsIHRoaXNcbiAgICAgICAgICAgICAgLnRyYWNlLmVsZWdpYmlsaXR5W2lucHV0LklEXSk7XG4gICAgICAgICAgICBidWlsZFNlbnRlbmNlKGdyYWRpZW50LCAnID0gJywgcHJvamVjdGVkLCAnICogJywgdHJhY2UsXG4gICAgICAgICAgICAgIHN0b3JlX3Byb3BhZ2F0aW9uKTtcbiAgICAgICAgICAgIGZvciAodmFyIGlkIGluIHRoaXMudHJhY2UuZXh0ZW5kZWQpIHtcbiAgICAgICAgICAgICAgdmFyIG5ldXJvbiA9IHRoaXMubmVpZ2hib29yc1tpZF07XG4gICAgICAgICAgICAgIHZhciBuZXVyb25fcmVzcG9uc2liaWxpdHkgPSBnZXRWYXIobmV1cm9uLCAnZXJyb3InLFxuICAgICAgICAgICAgICAgICdyZXNwb25zaWJpbGl0eScsIG5ldXJvbi5lcnJvci5yZXNwb25zaWJpbGl0eSk7XG4gICAgICAgICAgICAgIHZhciB4dHJhY2UgPSBnZXRWYXIodGhpcywgJ3RyYWNlJywgJ2V4dGVuZGVkJywgbmV1cm9uLklELFxuICAgICAgICAgICAgICAgIGlucHV0LklELCB0aGlzLnRyYWNlLmV4dGVuZGVkW25ldXJvbi5JRF1baW5wdXQuSURdKTtcbiAgICAgICAgICAgICAgYnVpbGRTZW50ZW5jZShncmFkaWVudCwgJyArPSAnLCBuZXVyb25fcmVzcG9uc2liaWxpdHksICcgKiAnLFxuICAgICAgICAgICAgICAgIHh0cmFjZSwgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGlucHV0X3dlaWdodCA9IGdldFZhcihpbnB1dCwgJ3dlaWdodCcpO1xuICAgICAgICAgICAgYnVpbGRTZW50ZW5jZShpbnB1dF93ZWlnaHQsICcgKz0gJywgcmF0ZSwgJyAqICcsIGdyYWRpZW50LFxuICAgICAgICAgICAgICBzdG9yZV9wcm9wYWdhdGlvbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAobm9HYXRlcykge1xuICAgICAgICAgIGJ1aWxkU2VudGVuY2UocmVzcG9uc2liaWxpdHksICcgPSAwJywgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICAgIGZvciAodmFyIGlkIGluIHRoaXMuY29ubmVjdGlvbnMucHJvamVjdGVkKSB7XG4gICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMuY29ubmVjdGlvbnMucHJvamVjdGVkW2lkXTtcbiAgICAgICAgICAgIHZhciBuZXVyb24gPSBjb25uZWN0aW9uLnRvO1xuICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb25fd2VpZ2h0ID0gZ2V0VmFyKGNvbm5lY3Rpb24sICd3ZWlnaHQnKTtcbiAgICAgICAgICAgIHZhciBuZXVyb25fcmVzcG9uc2liaWxpdHkgPSBnZXRWYXIobmV1cm9uLCAnZXJyb3InLFxuICAgICAgICAgICAgICAncmVzcG9uc2liaWxpdHknLCBuZXVyb24uZXJyb3IucmVzcG9uc2liaWxpdHkpO1xuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpb24uZ2F0ZXIpIHtcbiAgICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb25fZ2FpbiA9IGdldFZhcihjb25uZWN0aW9uLCAnZ2FpbicpO1xuICAgICAgICAgICAgICBidWlsZFNlbnRlbmNlKHJlc3BvbnNpYmlsaXR5LCAnICs9ICcsIG5ldXJvbl9yZXNwb25zaWJpbGl0eSxcbiAgICAgICAgICAgICAgICAnICogJywgY29ubmVjdGlvbl9nYWluLCAnICogJywgY29ubmVjdGlvbl93ZWlnaHQsXG4gICAgICAgICAgICAgICAgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UocmVzcG9uc2liaWxpdHksICcgKz0gJywgbmV1cm9uX3Jlc3BvbnNpYmlsaXR5LFxuICAgICAgICAgICAgICAgICcgKiAnLCBjb25uZWN0aW9uX3dlaWdodCwgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBidWlsZFNlbnRlbmNlKHJlc3BvbnNpYmlsaXR5LCAnICo9ICcsIGRlcml2YXRpdmUsXG4gICAgICAgICAgICBzdG9yZV9wcm9wYWdhdGlvbik7XG4gICAgICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5jb25uZWN0aW9ucy5pbnB1dHMpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMuY29ubmVjdGlvbnMuaW5wdXRzW2lkXTtcbiAgICAgICAgICAgIHZhciB0cmFjZSA9IGdldFZhcih0aGlzLCAndHJhY2UnLCAnZWxlZ2liaWxpdHknLCBpbnB1dC5JRCwgdGhpc1xuICAgICAgICAgICAgICAudHJhY2UuZWxlZ2liaWxpdHlbaW5wdXQuSURdKTtcbiAgICAgICAgICAgIHZhciBpbnB1dF93ZWlnaHQgPSBnZXRWYXIoaW5wdXQsICd3ZWlnaHQnKTtcbiAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UoaW5wdXRfd2VpZ2h0LCAnICs9ICcsIHJhdGUsICcgKiAoJyxcbiAgICAgICAgICAgICAgcmVzcG9uc2liaWxpdHksICcgKiAnLCB0cmFjZSwgJyknLCBzdG9yZV9wcm9wYWdhdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG5vUHJvamVjdGlvbnMpIHtcbiAgICAgICAgICBidWlsZFNlbnRlbmNlKHJlc3BvbnNpYmlsaXR5LCAnID0gMCcsIHN0b3JlX3Byb3BhZ2F0aW9uKTtcbiAgICAgICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLnRyYWNlLmV4dGVuZGVkKSB7XG4gICAgICAgICAgICB2YXIgbmV1cm9uID0gdGhpcy5uZWlnaGJvb3JzW2lkXTtcbiAgICAgICAgICAgIHZhciBpbmZsdWVuY2UgPSBnZXRWYXIoJ2F1eCcpO1xuICAgICAgICAgICAgdmFyIG5ldXJvbl9vbGQgPSBnZXRWYXIobmV1cm9uLCAnb2xkJyk7XG4gICAgICAgICAgICBpZiAobmV1cm9uLnNlbGZjb25uZWN0aW9uLmdhdGVyID09IHRoaXMpXG4gICAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UoaW5mbHVlbmNlLCAnID0gJywgbmV1cm9uX29sZCwgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBidWlsZFNlbnRlbmNlKGluZmx1ZW5jZSwgJyA9IDAnLCBzdG9yZV9wcm9wYWdhdGlvbik7XG4gICAgICAgICAgICBmb3IgKHZhciBpbnB1dCBpbiB0aGlzLnRyYWNlLmluZmx1ZW5jZXNbbmV1cm9uLklEXSkge1xuICAgICAgICAgICAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMudHJhY2UuaW5mbHVlbmNlc1tuZXVyb24uSURdW2lucHV0XTtcbiAgICAgICAgICAgICAgdmFyIGNvbm5lY3Rpb25fd2VpZ2h0ID0gZ2V0VmFyKGNvbm5lY3Rpb24sICd3ZWlnaHQnKTtcbiAgICAgICAgICAgICAgdmFyIG5ldXJvbl9hY3RpdmF0aW9uID0gZ2V0VmFyKGNvbm5lY3Rpb24uZnJvbSwgJ2FjdGl2YXRpb24nKTtcbiAgICAgICAgICAgICAgYnVpbGRTZW50ZW5jZShpbmZsdWVuY2UsICcgKz0gJywgY29ubmVjdGlvbl93ZWlnaHQsICcgKiAnLFxuICAgICAgICAgICAgICAgIG5ldXJvbl9hY3RpdmF0aW9uLCBzdG9yZV9wcm9wYWdhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV1cm9uX3Jlc3BvbnNpYmlsaXR5ID0gZ2V0VmFyKG5ldXJvbiwgJ2Vycm9yJyxcbiAgICAgICAgICAgICAgJ3Jlc3BvbnNpYmlsaXR5JywgbmV1cm9uLmVycm9yLnJlc3BvbnNpYmlsaXR5KTtcbiAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UocmVzcG9uc2liaWxpdHksICcgKz0gJywgbmV1cm9uX3Jlc3BvbnNpYmlsaXR5LFxuICAgICAgICAgICAgICAnICogJywgaW5mbHVlbmNlLCBzdG9yZV9wcm9wYWdhdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJ1aWxkU2VudGVuY2UocmVzcG9uc2liaWxpdHksICcgKj0gJywgZGVyaXZhdGl2ZSxcbiAgICAgICAgICAgIHN0b3JlX3Byb3BhZ2F0aW9uKTtcbiAgICAgICAgICBmb3IgKHZhciBpZCBpbiB0aGlzLmNvbm5lY3Rpb25zLmlucHV0cykge1xuICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcy5jb25uZWN0aW9ucy5pbnB1dHNbaWRdO1xuICAgICAgICAgICAgdmFyIGdyYWRpZW50ID0gZ2V0VmFyKCdhdXgnKTtcbiAgICAgICAgICAgIGJ1aWxkU2VudGVuY2UoZ3JhZGllbnQsICcgPSAwJywgc3RvcmVfcHJvcGFnYXRpb24pO1xuICAgICAgICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy50cmFjZS5leHRlbmRlZCkge1xuICAgICAgICAgICAgICB2YXIgbmV1cm9uID0gdGhpcy5uZWlnaGJvb3JzW2lkXTtcbiAgICAgICAgICAgICAgdmFyIG5ldXJvbl9yZXNwb25zaWJpbGl0eSA9IGdldFZhcihuZXVyb24sICdlcnJvcicsXG4gICAgICAgICAgICAgICAgJ3Jlc3BvbnNpYmlsaXR5JywgbmV1cm9uLmVycm9yLnJlc3BvbnNpYmlsaXR5KTtcbiAgICAgICAgICAgICAgdmFyIHh0cmFjZSA9IGdldFZhcih0aGlzLCAndHJhY2UnLCAnZXh0ZW5kZWQnLCBuZXVyb24uSUQsXG4gICAgICAgICAgICAgICAgaW5wdXQuSUQsIHRoaXMudHJhY2UuZXh0ZW5kZWRbbmV1cm9uLklEXVtpbnB1dC5JRF0pO1xuICAgICAgICAgICAgICBidWlsZFNlbnRlbmNlKGdyYWRpZW50LCAnICs9ICcsIG5ldXJvbl9yZXNwb25zaWJpbGl0eSwgJyAqICcsXG4gICAgICAgICAgICAgICAgeHRyYWNlLCBzdG9yZV9wcm9wYWdhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaW5wdXRfd2VpZ2h0ID0gZ2V0VmFyKGlucHV0LCAnd2VpZ2h0Jyk7XG4gICAgICAgICAgICBidWlsZFNlbnRlbmNlKGlucHV0X3dlaWdodCwgJyArPSAnLCByYXRlLCAnICogJywgZ3JhZGllbnQsXG4gICAgICAgICAgICAgIHN0b3JlX3Byb3BhZ2F0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJ1aWxkU2VudGVuY2UoYmlhcywgJyArPSAnLCByYXRlLCAnICogJywgcmVzcG9uc2liaWxpdHksXG4gICAgICAgIHN0b3JlX3Byb3BhZ2F0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lbW9yeTogdmFySUQsXG4gICAgICBpbnB1dHM6IGlucHV0cyxcbiAgICAgIG91dHB1dHM6IG91dHB1dHMsXG4gICAgICB0YXJnZXRzOiB0YXJnZXRzLFxuICAgICAgdmFyaWFibGVzOiB2YXJpYWJsZXMsXG4gICAgICBhY3RpdmF0aW9uX3NlbnRlbmNlczogYWN0aXZhdGlvbl9zZW50ZW5jZXMsXG4gICAgICB0cmFjZV9zZW50ZW5jZXM6IHRyYWNlX3NlbnRlbmNlcyxcbiAgICAgIHByb3BhZ2F0aW9uX3NlbnRlbmNlczogcHJvcGFnYXRpb25fc2VudGVuY2VzXG4gICAgfVxuICB9XG59XG5cblxuLy8gcmVwcmVzZW50cyBhIGNvbm5lY3Rpb24gYmV0d2VlbiB0d28gbmV1cm9uc1xuTmV1cm9uLmNvbm5lY3Rpb24gPSBmdW5jdGlvbiBDb25uZWN0aW9uKGZyb20sIHRvLCB3ZWlnaHQpIHtcblxuICBpZiAoIWZyb20gfHwgIXRvKVxuICAgIHRocm93IFwiQ29ubmVjdGlvbiBFcnJvcjogSW52YWxpZCBuZXVyb25zXCI7XG5cbiAgdGhpcy5JRCA9IE5ldXJvbi5jb25uZWN0aW9uLnVpZCgpO1xuICB0aGlzLmZyb20gPSBmcm9tO1xuICB0aGlzLnRvID0gdG87XG4gIHRoaXMud2VpZ2h0ID0gdHlwZW9mIHdlaWdodCA9PSAndW5kZWZpbmVkJyA/IE1hdGgucmFuZG9tKCkgKiAuMiAtIC4xIDpcbiAgICB3ZWlnaHQ7XG4gIHRoaXMuZ2FpbiA9IDE7XG4gIHRoaXMuZ2F0ZXIgPSBudWxsO1xufVxuXG5cbi8vIHNxdWFzaGluZyBmdW5jdGlvbnNcbk5ldXJvbi5zcXVhc2ggPSB7fTtcblxuLy8gZXEuIDUgJiA1J1xuTmV1cm9uLnNxdWFzaC5MT0dJU1RJQyA9IGZ1bmN0aW9uKHgsIGRlcml2YXRlKSB7XG4gIGlmICghZGVyaXZhdGUpXG4gICAgcmV0dXJuIDEgLyAoMSArIE1hdGguZXhwKC14KSk7XG4gIHZhciBmeCA9IE5ldXJvbi5zcXVhc2guTE9HSVNUSUMoeCk7XG4gIHJldHVybiBmeCAqICgxIC0gZngpO1xufTtcbk5ldXJvbi5zcXVhc2guVEFOSCA9IGZ1bmN0aW9uKHgsIGRlcml2YXRlKSB7XG4gIGlmIChkZXJpdmF0ZSlcbiAgICByZXR1cm4gMSAtIE1hdGgucG93KE5ldXJvbi5zcXVhc2guVEFOSCh4KSwgMik7XG4gIHZhciBlUCA9IE1hdGguZXhwKHgpO1xuICB2YXIgZU4gPSAxIC8gZVA7XG4gIHJldHVybiAoZVAgLSBlTikgLyAoZVAgKyBlTik7XG59O1xuTmV1cm9uLnNxdWFzaC5JREVOVElUWSA9IGZ1bmN0aW9uKHgsIGRlcml2YXRlKSB7XG4gIHJldHVybiBkZXJpdmF0ZSA/IDEgOiB4O1xufTtcbk5ldXJvbi5zcXVhc2guSExJTSA9IGZ1bmN0aW9uKHgsIGRlcml2YXRlKSB7XG4gIHJldHVybiBkZXJpdmF0ZSA/IDEgOiArKHggPiAwKTtcbn07XG5cbi8vIHVuaXF1ZSBJRCdzXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBuZXVyb25zID0gMDtcbiAgdmFyIGNvbm5lY3Rpb25zID0gMDtcbiAgTmV1cm9uLnVpZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXVyb25zKys7XG4gIH1cbiAgTmV1cm9uLmNvbm5lY3Rpb24udWlkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNvbm5lY3Rpb25zKys7XG4gIH1cbiAgTmV1cm9uLnF1YW50aXR5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5ldXJvbnM6IG5ldXJvbnMsXG4gICAgICBjb25uZWN0aW9uczogY29ubmVjdGlvbnNcbiAgICB9XG4gIH1cbn0pKCk7XG5cbi8vIGV4cG9ydFxuaWYgKG1vZHVsZSkgbW9kdWxlLmV4cG9ydHMgPSBOZXVyb247XG5cbiIsIi8qXG5cblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTQgSnVhbiBDYXphbGEgLSBqdWFuY2F6YWxhLmNvbVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkVcblxuXG5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNZTkFQVElDXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5TeW5hcHRpYyBpcyBhIGphdmFzY3JpcHQgbmV1cmFsIG5ldHdvcmsgbGlicmFyeSBmb3Igbm9kZS5qcyBhbmQgdGhlIGJyb3dzZXIsIGl0cyBnZW5lcmFsaXplZFxuYWxnb3JpdGhtIGlzIGFyY2hpdGVjdHVyZS1mcmVlLCBzbyB5b3UgY2FuIGJ1aWxkIGFuZCB0cmFpbiBiYXNpY2FsbHkgYW55IHR5cGUgb2YgZmlyc3Qgb3JkZXJcbm9yIGV2ZW4gc2Vjb25kIG9yZGVyIG5ldXJhbCBuZXR3b3JrIGFyY2hpdGVjdHVyZXMuXG5cbmh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUmVjdXJyZW50X25ldXJhbF9uZXR3b3JrI1NlY29uZF9PcmRlcl9SZWN1cnJlbnRfTmV1cmFsX05ldHdvcmtcblxuVGhlIGxpYnJhcnkgaW5jbHVkZXMgYSBmZXcgYnVpbHQtaW4gYXJjaGl0ZWN0dXJlcyBsaWtlIG11bHRpbGF5ZXIgcGVyY2VwdHJvbnMsIG11bHRpbGF5ZXJcbmxvbmctc2hvcnQgdGVybSBtZW1vcnkgbmV0d29ya3MgKExTVE0pIG9yIGxpcXVpZCBzdGF0ZSBtYWNoaW5lcywgYW5kIGEgdHJhaW5lciBjYXBhYmxlIG9mXG50cmFpbmluZyBhbnkgZ2l2ZW4gbmV0d29yaywgYW5kIGluY2x1ZGVzIGJ1aWx0LWluIHRyYWluaW5nIHRhc2tzL3Rlc3RzIGxpa2Ugc29sdmluZyBhbiBYT1IsXG5wYXNzaW5nIGEgRGlzdHJhY3RlZCBTZXF1ZW5jZSBSZWNhbGwgdGVzdCBvciBhbiBFbWJlZGVkIFJlYmVyIEdyYW1tYXIgdGVzdC5cblxuVGhlIGFsZ29yaXRobSBpbXBsZW1lbnRlZCBieSB0aGlzIGxpYnJhcnkgaGFzIGJlZW4gdGFrZW4gZnJvbSBEZXJlayBELiBNb25uZXIncyBwYXBlcjpcblxuQSBnZW5lcmFsaXplZCBMU1RNLWxpa2UgdHJhaW5pbmcgYWxnb3JpdGhtIGZvciBzZWNvbmQtb3JkZXIgcmVjdXJyZW50IG5ldXJhbCBuZXR3b3Jrc1xuaHR0cDovL3d3dy5vdmVyY29tcGxldGUubmV0L3BhcGVycy9ubjIwMTIucGRmXG5cblRoZXJlIGFyZSByZWZlcmVuY2VzIHRvIHRoZSBlcXVhdGlvbnMgaW4gdGhhdCBwYXBlciBjb21tZW50ZWQgdGhyb3VnaCB0aGUgc291cmNlIGNvZGUuXG5cblxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBTeW5hcHRpYyA9IHtcbiAgICBOZXVyb246IHJlcXVpcmUoJy4vbmV1cm9uJyksXG4gICAgTGF5ZXI6IHJlcXVpcmUoJy4vbGF5ZXInKSxcbiAgICBOZXR3b3JrOiByZXF1aXJlKCcuL25ldHdvcmsnKSxcbiAgICBUcmFpbmVyOiByZXF1aXJlKCcuL3RyYWluZXInKSxcbiAgICBBcmNoaXRlY3Q6IHJlcXVpcmUoJy4vYXJjaGl0ZWN0Jylcbn07XG5cbi8vIENvbW1vbkpTICYgQU1EXG5pZiAodGhpcy5kZWZpbmUgJiYgdGhpcy5kZWZpbmUuYW1kKVxue1xuICBkZWZpbmUoW10sIFN5bmFwdGljKTtcbn1cblxuLy8gTm9kZS5qc1xuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cylcbntcbiAgbW9kdWxlLmV4cG9ydHMgPSBTeW5hcHRpYztcbn1cblxuLy8gQnJvd3NlclxuaWYgKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcpXG57XG5cdFN5bmFwdGljLm5pbmphID0gZnVuY3Rpb24oKXsgZGVsZXRlIHdpbmRvd1snc3luYXB0aWMnXTsgfTtcbiAgd2luZG93WydzeW5hcHRpYyddID0gU3luYXB0aWM7XG59XG4iLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRSQUlORVJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmZ1bmN0aW9uIFRyYWluZXIobmV0d29yaywgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5uZXR3b3JrID0gbmV0d29yaztcbiAgdGhpcy5yYXRlID0gb3B0aW9ucy5yYXRlIHx8IC41O1xuICB0aGlzLml0ZXJhdGlvbnMgPSBvcHRpb25zLml0ZXJhdGlvbnMgfHwgMTAwMDAwO1xuICB0aGlzLmVycm9yID0gb3B0aW9ucy5lcnJvciB8fCAuMDA1XG59XG5cblRyYWluZXIucHJvdG90eXBlID0ge1xuXG4gIC8vIHRyYWlucyBhbnkgZ2l2ZW4gc2V0IHRvIGEgbmV0d29ya1xuICB0cmFpbjogZnVuY3Rpb24oc2V0LCBvcHRpb25zKSB7XG5cbiAgICB2YXIgZXJyb3IgPSAxO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB2YXIgaW5wdXQsIG91dHB1dCwgdGFyZ2V0O1xuXG4gICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy5zaHVmZmxlKSB7XG4gICAgICAgIC8vKyBKb25hcyBSYW9uaSBTb2FyZXMgU2lsdmFcbiAgICAgICAgLy9AIGh0dHA6Ly9qc2Zyb21oZWxsLmNvbS9hcnJheS9zaHVmZmxlIFt2MS4wXVxuICAgICAgICBmdW5jdGlvbiBzaHVmZmxlKG8pIHsgLy92MS4wXG4gICAgICAgICAgZm9yICh2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoOyBpOyBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgaSksIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5pdGVyYXRpb25zKVxuICAgICAgICB0aGlzLml0ZXJhdGlvbnMgPSBvcHRpb25zLml0ZXJhdGlvbnM7XG4gICAgICBpZiAob3B0aW9ucy5lcnJvcilcbiAgICAgICAgdGhpcy5lcnJvciA9IG9wdGlvbnMuZXJyb3I7XG4gICAgICBpZiAob3B0aW9ucy5yYXRlKVxuICAgICAgICB0aGlzLnJhdGUgPSBvcHRpb25zLnJhdGU7XG4gICAgfVxuXG4gICAgd2hpbGUgKGl0ZXJhdGlvbnMgPCB0aGlzLml0ZXJhdGlvbnMgJiYgZXJyb3IgPiB0aGlzLmVycm9yKSB7XG4gICAgICBlcnJvciA9IDA7XG5cbiAgICAgIGZvciAodmFyIHRyYWluIGluIHNldCkge1xuICAgICAgICBpbnB1dCA9IHNldFt0cmFpbl0uaW5wdXQ7XG4gICAgICAgIHRhcmdldCA9IHNldFt0cmFpbl0ub3V0cHV0O1xuXG4gICAgICAgIG91dHB1dCA9IHRoaXMubmV0d29yay5hY3RpdmF0ZShpbnB1dCk7XG4gICAgICAgIHRoaXMubmV0d29yay5wcm9wYWdhdGUodGhpcy5yYXRlLCB0YXJnZXQpO1xuXG4gICAgICAgIHZhciBkZWx0YSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgaW4gb3V0cHV0KVxuICAgICAgICAgIGRlbHRhICs9IE1hdGgucG93KHRhcmdldFtpXSAtIG91dHB1dFtpXSwgMik7XG5cbiAgICAgICAgZXJyb3IgKz0gZGVsdGEgLyBvdXRwdXQubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBlcnJvclxuICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgZXJyb3IgLz0gc2V0Lmxlbmd0aDtcblxuICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY3VzdG9tTG9nICYmIG9wdGlvbnMuY3VzdG9tTG9nLmV2ZXJ5ICYmIGl0ZXJhdGlvbnMgJVxuICAgICAgICAgIG9wdGlvbnMuY3VzdG9tTG9nLmV2ZXJ5ID09IDApXG4gICAgICAgICAgb3B0aW9ucy5jdXN0b21Mb2cuZG8oe1xuICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgICAgICAgaXRlcmF0aW9uczogaXRlcmF0aW9uc1xuICAgICAgICAgIH0pO1xuICAgICAgICBlbHNlIGlmIChvcHRpb25zLmxvZyAmJiBpdGVyYXRpb25zICUgb3B0aW9ucy5sb2cgPT0gMCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdpdGVyYXRpb25zJywgaXRlcmF0aW9ucywgJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAob3B0aW9ucy5zaHVmZmxlKVxuICAgICAgICAgIHNodWZmbGUoc2V0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0cyA9IHtcbiAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgIGl0ZXJhdGlvbnM6IGl0ZXJhdGlvbnMsXG4gICAgICB0aW1lOiBEYXRlLm5vdygpIC0gc3RhcnRcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSxcblxuICAvLyB0cmFpbnMgYW55IGdpdmVuIHNldCB0byBhIG5ldHdvcmsgdXNpbmcgYSBXZWJXb3JrZXJcbiAgd29ya2VyVHJhaW46IGZ1bmN0aW9uKHNldCwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcblxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgZXJyb3IgPSAxO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICB2YXIgaW5wdXQsIG91dHB1dCwgdGFyZ2V0O1xuICAgIHZhciBsZW5ndGggPSBzZXQubGVuZ3RoO1xuXG4gICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy5zaHVmZmxlKSB7XG4gICAgICAgIC8vKyBKb25hcyBSYW9uaSBTb2FyZXMgU2lsdmFcbiAgICAgICAgLy9AIGh0dHA6Ly9qc2Zyb21oZWxsLmNvbS9hcnJheS9zaHVmZmxlIFt2MS4wXVxuICAgICAgICBmdW5jdGlvbiBzaHVmZmxlKG8pIHsgLy92MS4wXG4gICAgICAgICAgZm9yICh2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoOyBpOyBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgaSksIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5pdGVyYXRpb25zKVxuICAgICAgICB0aGlzLml0ZXJhdGlvbnMgPSBvcHRpb25zLml0ZXJhdGlvbnM7XG4gICAgICBpZiAob3B0aW9ucy5lcnJvcilcbiAgICAgICAgdGhpcy5lcnJvciA9IG9wdGlvbnMuZXJyb3I7XG4gICAgICBpZiAob3B0aW9ucy5yYXRlKVxuICAgICAgICB0aGlzLnJhdGUgPSBvcHRpb25zLnJhdGU7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIGEgd29ya2VyXG4gICAgdmFyIHdvcmtlciA9IHRoaXMubmV0d29yay53b3JrZXIoKTtcblxuICAgIC8vIGFjdGl2YXRlIHRoZSBuZXR3b3JrXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVXb3JrZXIoaW5wdXQpXG4gICAge1xuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoeyBcbiAgICAgICAgICAgIGFjdGlvbjogXCJhY3RpdmF0ZVwiLFxuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICAgICAgbWVtb3J5QnVmZmVyOiB0aGF0Lm5ldHdvcmsub3B0aW1pemVkLm1lbW9yeVxuICAgICAgICB9LCBbdGhhdC5uZXR3b3JrLm9wdGltaXplZC5tZW1vcnkuYnVmZmVyXSk7XG4gICAgfVxuXG4gICAgLy8gYmFja3Byb3BhZ2F0ZSB0aGUgbmV0d29ya1xuICAgIGZ1bmN0aW9uIHByb3BhZ2F0ZVdvcmtlcih0YXJnZXQpe1xuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoeyBcbiAgICAgICAgICAgIGFjdGlvbjogXCJwcm9wYWdhdGVcIixcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgcmF0ZTogdGhhdC5yYXRlLFxuICAgICAgICAgICAgbWVtb3J5QnVmZmVyOiB0aGF0Lm5ldHdvcmsub3B0aW1pemVkLm1lbW9yeVxuICAgICAgICB9LCBbdGhhdC5uZXR3b3JrLm9wdGltaXplZC5tZW1vcnkuYnVmZmVyXSk7XG4gICAgfVxuXG4gICAgLy8gdHJhaW4gdGhlIHdvcmtlclxuICAgIHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgLy8gZ2l2ZSBjb250cm9sIG9mIHRoZSBtZW1vcnkgYmFjayB0byB0aGUgbmV0d29ya1xuICAgICAgICB0aGF0Lm5ldHdvcmsub3B0aW1pemVkLm93bmVyc2hpcChlLmRhdGEubWVtb3J5QnVmZmVyKTtcblxuICAgICAgICBpZiAoZS5kYXRhLmFjdGlvbiA9PSBcInByb3BhZ2F0ZVwiKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gbGVuZ3RoKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgICAgICAgICAgZXJyb3IgLz0gc2V0Lmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIC8vIGxvZ1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5jdXN0b21Mb2cgJiYgb3B0aW9ucy5jdXN0b21Mb2cuZXZlcnkgJiYgaXRlcmF0aW9ucyAlIG9wdGlvbnMuY3VzdG9tTG9nLmV2ZXJ5ID09IDApXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY3VzdG9tTG9nLmRvKHtcbiAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgICAgaXRlcmF0aW9uczogaXRlcmF0aW9uc1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMubG9nICYmIGl0ZXJhdGlvbnMgJSBvcHRpb25zLmxvZyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdGVyYXRpb25zJywgaXRlcmF0aW9ucywgJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNodWZmbGUpXG4gICAgICAgICAgICAgICAgICAgIHNodWZmbGUoc2V0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXRlcmF0aW9ucyA8IHRoYXQuaXRlcmF0aW9ucyAmJiBlcnJvciA+IHRoYXQuZXJyb3IpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmF0ZVdvcmtlcihzZXRbaW5kZXhdLmlucHV0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGlvbnM6IGl0ZXJhdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKSAtIHN0YXJ0XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVycm9yID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVXb3JrZXIoc2V0W2luZGV4XS5pbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS5kYXRhLmFjdGlvbiA9PSBcImFjdGl2YXRlXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGUuZGF0YS5vdXRwdXQpXG4gICAgICAgICAgICAgIGRlbHRhICs9IE1hdGgucG93KHNldFtpbmRleF0ub3V0cHV0IC0gZS5kYXRhLm91dHB1dFtpXSwgMik7XG4gICAgICAgICAgICBlcnJvciArPSBkZWx0YSAvIGUuZGF0YS5vdXRwdXQubGVuZ3RoO1xuXG4gICAgICAgICAgICBwcm9wYWdhdGVXb3JrZXIoc2V0W2luZGV4XS5vdXRwdXQpOyBcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBraWNrIGl0XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgYWN0aXZhdGVXb3JrZXIoc2V0W2luZGV4XS5pbnB1dCk7XG4gIH0sXG5cbiAgLy8gdHJhaW5zIGFuIFhPUiB0byB0aGUgbmV0d29ya1xuICBYT1I6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAgIGlmICh0aGlzLm5ldHdvcmsuaW5wdXRzKCkgIT0gMiB8fCB0aGlzLm5ldHdvcmsub3V0cHV0cygpICE9IDEpXG4gICAgICB0aHJvdyBcIkVycm9yOiBJbmNvbXBhdGlibGUgbmV0d29yayAoMiBpbnB1dHMsIDEgb3V0cHV0KVwiO1xuXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgaXRlcmF0aW9uczogMTAwMDAwLFxuICAgICAgbG9nOiBmYWxzZSxcbiAgICAgIHNodWZmbGU6IHRydWVcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucylcbiAgICAgIGZvciAodmFyIGkgaW4gb3B0aW9ucylcbiAgICAgICAgZGVmYXVsdHNbaV0gPSBvcHRpb25zW2ldO1xuXG4gICAgcmV0dXJuIHRoaXMudHJhaW4oW3tcbiAgICAgIGlucHV0OiBbMCwgMF0sXG4gICAgICBvdXRwdXQ6IFswXVxuICAgIH0sIHtcbiAgICAgIGlucHV0OiBbMSwgMF0sXG4gICAgICBvdXRwdXQ6IFsxXVxuICAgIH0sIHtcbiAgICAgIGlucHV0OiBbMCwgMV0sXG4gICAgICBvdXRwdXQ6IFsxXVxuICAgIH0sIHtcbiAgICAgIGlucHV0OiBbMSwgMV0sXG4gICAgICBvdXRwdXQ6IFswXVxuICAgIH1dLCBkZWZhdWx0cyk7XG4gIH0sXG5cbiAgLy8gdHJhaW5zIHRoZSBuZXR3b3JrIHRvIHBhc3MgYSBEaXN0cmFjdGVkIFNlcXVlbmNlIFJlY2FsbCB0ZXN0XG4gIERTUjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdmFyIHRhcmdldHMgPSBvcHRpb25zLnRhcmdldHMgfHwgWzIsIDQsIDcsIDhdO1xuICAgIHZhciBkaXN0cmFjdG9ycyA9IG9wdGlvbnMuZGlzdHJhY3RvcnMgfHwgWzMsIDUsIDYsIDldO1xuICAgIHZhciBwcm9tcHRzID0gb3B0aW9ucy5wcm9tcHRzIHx8IFswLCAxXTtcbiAgICB2YXIgbGVuZ3RoID0gb3B0aW9ucy5sZW5ndGggfHwgMjQ7XG4gICAgdmFyIGNyaXRlcmlvbiA9IG9wdGlvbnMuc3VjY2VzcyB8fCAwLjk1O1xuICAgIHZhciBpdGVyYXRpb25zID0gb3B0aW9ucy5pdGVyYXRpb25zIHx8IDEwMDAwMDtcbiAgICB2YXIgcmF0ZSA9IG9wdGlvbnMucmF0ZSB8fCAuMTtcbiAgICB2YXIgbG9nID0gb3B0aW9ucy5sb2cgfHwgMDtcbiAgICB2YXIgY3VzdG9tTG9nID0gb3B0aW9ucy5jdXN0b21Mb2cgfHwge307XG5cbiAgICB2YXIgdHJpYWwgPSBjb3JyZWN0ID0gaSA9IGogPSBzdWNjZXNzID0gMCxcbiAgICAgIGVycm9yID0gMSxcbiAgICAgIHN5bWJvbHMgPSB0YXJnZXRzLmxlbmd0aCArIGRpc3RyYWN0b3JzLmxlbmd0aCArIHByb21wdHMubGVuZ3RoO1xuXG4gICAgdmFyIG5vUmVwZWF0ID0gZnVuY3Rpb24ocmFuZ2UsIGF2b2lkKSB7XG4gICAgICB2YXIgbnVtYmVyID0gTWF0aC5yYW5kb20oKSAqIHJhbmdlIHwgMDtcbiAgICAgIHZhciB1c2VkID0gZmFsc2U7XG4gICAgICBmb3IgKHZhciBpIGluIGF2b2lkKVxuICAgICAgICBpZiAobnVtYmVyID09IGF2b2lkW2ldKVxuICAgICAgICAgIHVzZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHVzZWQgPyBub1JlcGVhdChyYW5nZSwgYXZvaWQpIDogbnVtYmVyO1xuICAgIH1cblxuICAgIHZhciBlcXVhbCA9IGZ1bmN0aW9uKHByZWRpY3Rpb24sIG91dHB1dCkge1xuICAgICAgZm9yICh2YXIgaSBpbiBwcmVkaWN0aW9uKVxuICAgICAgICBpZiAoTWF0aC5yb3VuZChwcmVkaWN0aW9uW2ldKSAhPSBvdXRwdXRbaV0pXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgIHdoaWxlICh0cmlhbCA8IGl0ZXJhdGlvbnMgJiYgKHN1Y2Nlc3MgPCBjcml0ZXJpb24gfHwgdHJpYWwgJSAxMDAwICE9IDApKSB7XG4gICAgICAvLyBnZW5lcmF0ZSBzZXF1ZW5jZVxuICAgICAgdmFyIHNlcXVlbmNlID0gW10sXG4gICAgICAgIHNlcXVlbmNlTGVuZ3RoID0gbGVuZ3RoIC0gcHJvbXB0cy5sZW5ndGg7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgc2VxdWVuY2VMZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYW55ID0gTWF0aC5yYW5kb20oKSAqIGRpc3RyYWN0b3JzLmxlbmd0aCB8IDA7XG4gICAgICAgIHNlcXVlbmNlLnB1c2goZGlzdHJhY3RvcnNbYW55XSk7XG4gICAgICB9XG4gICAgICB2YXIgaW5kZXhlcyA9IFtdLFxuICAgICAgICBwb3NpdGlvbnMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBwcm9tcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGluZGV4ZXMucHVzaChNYXRoLnJhbmRvbSgpICogdGFyZ2V0cy5sZW5ndGggfCAwKTtcbiAgICAgICAgcG9zaXRpb25zLnB1c2gobm9SZXBlYXQoc2VxdWVuY2VMZW5ndGgsIHBvc2l0aW9ucykpO1xuICAgICAgfVxuICAgICAgcG9zaXRpb25zID0gcG9zaXRpb25zLnNvcnQoKTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBwcm9tcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNlcXVlbmNlW3Bvc2l0aW9uc1tpXV0gPSB0YXJnZXRzW2luZGV4ZXNbaV1dO1xuICAgICAgICBzZXF1ZW5jZS5wdXNoKHByb21wdHNbaV0pO1xuICAgICAgfVxuXG4gICAgICAvL3RyYWluIHNlcXVlbmNlXG4gICAgICB2YXIgdGFyZ2V0c0NvcnJlY3QgPSBkaXN0cmFjdG9yc0NvcnJlY3QgPSAwO1xuICAgICAgZXJyb3IgPSAwO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGdlbmVyYXRlIGlucHV0IGZyb20gc2VxdWVuY2VcbiAgICAgICAgdmFyIGlucHV0ID0gW107XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBzeW1ib2xzOyBqKyspXG4gICAgICAgICAgaW5wdXRbal0gPSAwO1xuICAgICAgICBpbnB1dFtzZXF1ZW5jZVtpXV0gPSAxO1xuXG4gICAgICAgIC8vIGdlbmVyYXRlIHRhcmdldCBvdXRwdXRcbiAgICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgdGFyZ2V0cy5sZW5ndGg7IGorKylcbiAgICAgICAgICBvdXRwdXRbal0gPSAwO1xuXG4gICAgICAgIGlmIChpID49IHNlcXVlbmNlTGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIGluZGV4ID0gaSAtIHNlcXVlbmNlTGVuZ3RoO1xuICAgICAgICAgIG91dHB1dFtpbmRleGVzW2luZGV4XV0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgcmVzdWx0XG4gICAgICAgIHZhciBwcmVkaWN0aW9uID0gdGhpcy5uZXR3b3JrLmFjdGl2YXRlKGlucHV0KTtcblxuICAgICAgICBpZiAoZXF1YWwocHJlZGljdGlvbiwgb3V0cHV0KSlcbiAgICAgICAgICBpZiAoaSA8IHNlcXVlbmNlTGVuZ3RoKVxuICAgICAgICAgICAgZGlzdHJhY3RvcnNDb3JyZWN0Kys7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGFyZ2V0c0NvcnJlY3QrKztcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5uZXR3b3JrLnByb3BhZ2F0ZShyYXRlLCBvdXRwdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRlbHRhID0gMDtcbiAgICAgICAgZm9yICh2YXIgaiBpbiBwcmVkaWN0aW9uKVxuICAgICAgICAgIGRlbHRhICs9IE1hdGgucG93KG91dHB1dFtqXSAtIHByZWRpY3Rpb25bal0sIDIpO1xuICAgICAgICBlcnJvciArPSBkZWx0YSAvIHRoaXMubmV0d29yay5vdXRwdXRzKCk7XG5cbiAgICAgICAgaWYgKGRpc3RyYWN0b3JzQ29ycmVjdCArIHRhcmdldHNDb3JyZWN0ID09IGxlbmd0aClcbiAgICAgICAgICBjb3JyZWN0Kys7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSBlcnJvclxuICAgICAgaWYgKHRyaWFsICUgMTAwMCA9PSAwKVxuICAgICAgICBjb3JyZWN0ID0gMDtcbiAgICAgIHRyaWFsKys7XG4gICAgICB2YXIgZGl2aWRlRXJyb3IgPSB0cmlhbCAlIDEwMDA7XG4gICAgICBkaXZpZGVFcnJvciA9IGRpdmlkZUVycm9yID09IDAgPyAxMDAwIDogZGl2aWRlRXJyb3I7XG4gICAgICBzdWNjZXNzID0gY29ycmVjdCAvIGRpdmlkZUVycm9yO1xuICAgICAgZXJyb3IgLz0gbGVuZ3RoO1xuXG4gICAgICAvLyBsb2dcbiAgICAgIGlmIChsb2cgJiYgdHJpYWwgJSBsb2cgPT0gMClcbiAgICAgICAgY29uc29sZS5sb2coXCJpdGVyYXRpb25zOlwiLCB0cmlhbCwgXCIgc3VjY2VzczpcIiwgc3VjY2VzcywgXCIgY29ycmVjdDpcIixcbiAgICAgICAgICBjb3JyZWN0LCBcIiB0aW1lOlwiLCBEYXRlLm5vdygpIC0gc3RhcnQsIFwiIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICBpZiAoY3VzdG9tTG9nLmRvICYmIGN1c3RvbUxvZy5ldmVyeSAmJiB0cmlhbCAlIGN1c3RvbUxvZy5ldmVyeSA9PSAwKVxuICAgICAgICBjdXN0b21Mb2cuZG8oe1xuICAgICAgICAgIGl0ZXJhdGlvbnM6IHRyaWFsLFxuICAgICAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3MsXG4gICAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgICAgIHRpbWU6IERhdGUubm93KCkgLSBzdGFydCxcbiAgICAgICAgICBjb3JyZWN0OiBjb3JyZWN0XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpdGVyYXRpb25zOiB0cmlhbCxcbiAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3MsXG4gICAgICBlcnJvcjogZXJyb3IsXG4gICAgICB0aW1lOiBEYXRlLm5vdygpIC0gc3RhcnRcbiAgICB9XG4gIH0sXG5cbiAgLy8gdHJhaW4gdGhlIG5ldHdvcmsgdG8gbGVhcm4gYW4gRW1iZWRlZCBSZWJlciBHcmFtbWFyXG4gIEVSRzogZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSBvcHRpb25zLml0ZXJhdGlvbnMgfHwgMTUwMDAwO1xuICAgIHZhciBjcml0ZXJpb24gPSBvcHRpb25zLmVycm9yIHx8IC4wNTtcbiAgICB2YXIgcmF0ZSA9IG9wdGlvbnMucmF0ZSB8fCAuMTtcbiAgICB2YXIgbG9nID0gb3B0aW9ucy5sb2cgfHwgNTAwO1xuXG4gICAgLy8gZ3JhbWFyIG5vZGVcbiAgICB2YXIgTm9kZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5wYXRocyA9IFtdO1xuICAgIH1cbiAgICBOb2RlLnByb3RvdHlwZSA9IHtcbiAgICAgIGNvbm5lY3Q6IGZ1bmN0aW9uKG5vZGUsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMucGF0aHMucHVzaCh7XG4gICAgICAgICAgbm9kZTogbm9kZSxcbiAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSxcbiAgICAgIGFueTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnBhdGhzLmxlbmd0aCA9PSAwKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMucGF0aHMubGVuZ3RoIHwgMDtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aHNbaW5kZXhdO1xuICAgICAgfSxcbiAgICAgIHRlc3Q6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5wYXRocylcbiAgICAgICAgICBpZiAodGhpcy5wYXRoc1tpXS52YWx1ZSA9PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGhzW2ldO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJlYmVyR3JhbW1hciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAvLyBidWlsZCBhIHJlYmVyIGdyYW1tYXJcbiAgICAgIHZhciBvdXRwdXQgPSBuZXcgTm9kZSgpO1xuICAgICAgdmFyIG4xID0gKG5ldyBOb2RlKCkpLmNvbm5lY3Qob3V0cHV0LCBcIkVcIik7XG4gICAgICB2YXIgbjIgPSAobmV3IE5vZGUoKSkuY29ubmVjdChuMSwgXCJTXCIpO1xuICAgICAgdmFyIG4zID0gKG5ldyBOb2RlKCkpLmNvbm5lY3QobjEsIFwiVlwiKS5jb25uZWN0KG4yLCBcIlBcIik7XG4gICAgICB2YXIgbjQgPSAobmV3IE5vZGUoKSkuY29ubmVjdChuMiwgXCJYXCIpXG4gICAgICBuNC5jb25uZWN0KG40LCBcIlNcIik7XG4gICAgICB2YXIgbjUgPSAobmV3IE5vZGUoKSkuY29ubmVjdChuMywgXCJWXCIpXG4gICAgICBuNS5jb25uZWN0KG41LCBcIlRcIik7XG4gICAgICBuMi5jb25uZWN0KG41LCBcIlhcIilcbiAgICAgIHZhciBuNiA9IChuZXcgTm9kZSgpKS5jb25uZWN0KG40LCBcIlRcIikuY29ubmVjdChuNSwgXCJQXCIpO1xuICAgICAgdmFyIGlucHV0ID0gKG5ldyBOb2RlKCkpLmNvbm5lY3QobjYsIFwiQlwiKVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbnB1dDogaW5wdXQsXG4gICAgICAgIG91dHB1dDogb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYnVpbGQgYW4gZW1iZWRlZCByZWJlciBncmFtbWFyXG4gICAgdmFyIGVtYmVkZWRSZWJlckdyYW1tYXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWJlcjEgPSByZWJlckdyYW1tYXIoKTtcbiAgICAgIHZhciByZWJlcjIgPSByZWJlckdyYW1tYXIoKTtcblxuICAgICAgdmFyIG91dHB1dCA9IG5ldyBOb2RlKCk7XG4gICAgICB2YXIgbjEgPSAobmV3IE5vZGUpLmNvbm5lY3Qob3V0cHV0LCBcIkVcIik7XG4gICAgICByZWJlcjEub3V0cHV0LmNvbm5lY3QobjEsIFwiVFwiKTtcbiAgICAgIHJlYmVyMi5vdXRwdXQuY29ubmVjdChuMSwgXCJQXCIpO1xuICAgICAgdmFyIG4yID0gKG5ldyBOb2RlKS5jb25uZWN0KHJlYmVyMS5pbnB1dCwgXCJQXCIpLmNvbm5lY3QocmViZXIyLmlucHV0LFxuICAgICAgICBcIlRcIik7XG4gICAgICB2YXIgaW5wdXQgPSAobmV3IE5vZGUpLmNvbm5lY3QobjIsIFwiQlwiKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICBvdXRwdXQ6IG91dHB1dFxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gZ2VuZXJhdGUgYW4gRVJHIHNlcXVlbmNlXG4gICAgdmFyIGdlbmVyYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbm9kZSA9IGVtYmVkZWRSZWJlckdyYW1tYXIoKS5pbnB1dDtcbiAgICAgIHZhciBuZXh0ID0gbm9kZS5hbnkoKTtcbiAgICAgIHZhciBzdHIgPSBcIlwiO1xuICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgc3RyICs9IG5leHQudmFsdWU7XG4gICAgICAgIG5leHQgPSBuZXh0Lm5vZGUuYW55KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIC8vIHRlc3QgaWYgYSBzdHJpbmcgbWF0Y2hlcyBhbiBlbWJlZGVkIHJlYmVyIGdyYW1tYXJcbiAgICB2YXIgdGVzdCA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgdmFyIG5vZGUgPSBlbWJlZGVkUmViZXJHcmFtbWFyKCkuaW5wdXQ7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgY2ggPSBzdHIuY2hhckF0KGkpO1xuICAgICAgd2hpbGUgKGkgPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgIHZhciBuZXh0ID0gbm9kZS50ZXN0KGNoKTtcbiAgICAgICAgaWYgKCFuZXh0KVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgbm9kZSA9IG5leHQubm9kZTtcbiAgICAgICAgY2ggPSBzdHIuY2hhckF0KCsraSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBoZWxwZXIgdG8gY2hlY2sgaWYgdGhlIG91dHB1dCBhbmQgdGhlIHRhcmdldCB2ZWN0b3JzIG1hdGNoXG4gICAgdmFyIGRpZmZlcmVudCA9IGZ1bmN0aW9uKGFycmF5MSwgYXJyYXkyKSB7XG4gICAgICB2YXIgbWF4MSA9IDA7XG4gICAgICB2YXIgaTEgPSAtMTtcbiAgICAgIHZhciBtYXgyID0gMDtcbiAgICAgIHZhciBpMiA9IC0xO1xuICAgICAgZm9yICh2YXIgaSBpbiBhcnJheTEpIHtcbiAgICAgICAgaWYgKGFycmF5MVtpXSA+IG1heDEpIHtcbiAgICAgICAgICBtYXgxID0gYXJyYXkxW2ldO1xuICAgICAgICAgIGkxID0gaTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJyYXkyW2ldID4gbWF4Mikge1xuICAgICAgICAgIG1heDIgPSBhcnJheTJbaV07XG4gICAgICAgICAgaTIgPSBpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpMSAhPSBpMjtcbiAgICB9XG5cbiAgICB2YXIgaXRlcmF0aW9uID0gMDtcbiAgICB2YXIgZXJyb3IgPSAxO1xuICAgIHZhciB0YWJsZSA9IHtcbiAgICAgIFwiQlwiOiAwLFxuICAgICAgXCJQXCI6IDEsXG4gICAgICBcIlRcIjogMixcbiAgICAgIFwiWFwiOiAzLFxuICAgICAgXCJTXCI6IDQsXG4gICAgICBcIkVcIjogNVxuICAgIH1cblxuICAgIHZhciBzdGFydCA9IERhdGUubm93KCk7XG4gICAgd2hpbGUgKGl0ZXJhdGlvbiA8IGl0ZXJhdGlvbnMgJiYgZXJyb3IgPiBjcml0ZXJpb24pIHtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIGVycm9yID0gMDtcblxuICAgICAgLy8gRVJHIHNlcXVlbmNlIHRvIGxlYXJuXG4gICAgICB2YXIgc2VxdWVuY2UgPSBnZW5lcmF0ZSgpO1xuXG4gICAgICAvLyBpbnB1dFxuICAgICAgdmFyIHJlYWQgPSBzZXF1ZW5jZS5jaGFyQXQoaSk7XG4gICAgICAvLyB0YXJnZXRcbiAgICAgIHZhciBwcmVkaWN0ID0gc2VxdWVuY2UuY2hhckF0KGkgKyAxKTtcblxuICAgICAgLy8gdHJhaW5cbiAgICAgIHdoaWxlIChpIDwgc2VxdWVuY2UubGVuZ3RoIC0gMSkge1xuICAgICAgICB2YXIgaW5wdXQgPSBbXTtcbiAgICAgICAgdmFyIHRhcmdldCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDY7IGorKykge1xuICAgICAgICAgIGlucHV0W2pdID0gMDtcbiAgICAgICAgICB0YXJnZXRbal0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlucHV0W3RhYmxlW3JlYWRdXSA9IDE7XG4gICAgICAgIHRhcmdldFt0YWJsZVtwcmVkaWN0XV0gPSAxO1xuXG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLm5ldHdvcmsuYWN0aXZhdGUoaW5wdXQpO1xuXG4gICAgICAgIGlmIChkaWZmZXJlbnQob3V0cHV0LCB0YXJnZXQpKVxuICAgICAgICAgIHRoaXMubmV0d29yay5wcm9wYWdhdGUocmF0ZSwgdGFyZ2V0KTtcblxuICAgICAgICByZWFkID0gc2VxdWVuY2UuY2hhckF0KCsraSk7XG4gICAgICAgIHByZWRpY3QgPSBzZXF1ZW5jZS5jaGFyQXQoaSArIDEpO1xuXG4gICAgICAgIHZhciBkZWx0YSA9IDA7XG4gICAgICAgIGZvciAodmFyIGsgaW4gb3V0cHV0KVxuICAgICAgICAgIGRlbHRhICs9IE1hdGgucG93KHRhcmdldFtrXSAtIG91dHB1dFtrXSwgMilcbiAgICAgICAgZGVsdGEgLz0gb3V0cHV0Lmxlbmd0aDtcblxuICAgICAgICBlcnJvciArPSBkZWx0YTtcbiAgICAgIH1cbiAgICAgIGVycm9yIC89IHNlcXVlbmNlLmxlbmd0aDtcbiAgICAgIGl0ZXJhdGlvbisrO1xuICAgICAgaWYgKGl0ZXJhdGlvbiAlIGxvZyA9PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXRlcmF0aW9uczpcIiwgaXRlcmF0aW9uLCBcIiB0aW1lOlwiLCBEYXRlLm5vdygpIC0gc3RhcnQsXG4gICAgICAgICAgXCIgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXRlcmF0aW9uczogaXRlcmF0aW9uLFxuICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgdGltZTogRGF0ZS5ub3coKSAtIHN0YXJ0LFxuICAgICAgdGVzdDogdGVzdCxcbiAgICAgIGdlbmVyYXRlOiBnZW5lcmF0ZVxuICAgIH1cbiAgfVxufTtcblxuLy8gZXhwb3J0XG5pZiAobW9kdWxlKSBtb2R1bGUuZXhwb3J0cyA9IFRyYWluZXI7XG5cbiJdfQ==
