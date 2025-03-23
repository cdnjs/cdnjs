const fs = require('fs');

function getShape(data, shape = []) {
  if (data instanceof Array && data.length === 0) {
    return [0];
  }
  if (typeof data === "number") {
    if (JSON.stringify(shape) === "[]") {
      return [1];
    }
    return shape;
  }
  if (typeof data[0] === "number" && Array.isArray(data)) {
    for (const element of data) {
      if (typeof element != "number") {
        throw new Error("The requested array has an inhomogeneous shape.");
      }
    }
    shape.push(data.length);
    return shape;
  }
  if (Array.isArray(data[0])) {
    let elementLength = data[0].length;
    for (const element of data) {
      if (typeof element != "object" && typeof element != "number") {
        throw new Error("TypeError: the input data is not a number.");
      } else if (Array.isArray(element) && elementLength != element.length) {
        throw new Error("The requested array has an inhomogeneous shape.");
      } else if (Array.isArray(element)) {
        elementLength = element.length;
      }
    }
    shape.push(data.length);
  }
  return getShape(data[0], shape);
}
function assureArray(a) {
  if (Array.isArray(a)) {
    return a;
  } else if (typeof a === "number") {
    return [a];
  } else if (a === null) {
    return a;
  }
  return a._data;
}
function getData(a) {
  if (Array.isArray(a)) {
    return a;
  }
  if (typeof a === "number") {
    return a;
  }
  return a._data;
}

class Tensor {
  requires_grad = false;
  _data;
  shape;
  _grad;
  children;
  parents;
  operation;
  visited = false;
  m;
  v;
  device;
  forwardKernel;
  backwardKernelA;
  backwardKernelB;
  /**
   * Creates new instance of the Tensor class.
   * @param {object} data - Iterable containing the data to be stored in the Tensor.
   * @param {boolean} requires_grad - Whether to keep track of this tensor's gradients.
   * @param {string} device - Device to store Tensor. Either "gpu" or "cpu".
   */
  constructor(data, requires_grad = false, device = "cpu") {
    if (typeof data === "object") {
      this._data = data;
    } else if (typeof data === "number") {
      this._data = [data];
    } else {
      throw Error('Your argument "data" is not a number or an iterable.');
    }
    this.shape = getShape(data);
    this.device = device;
    this.requires_grad = requires_grad;
    this.forwardKernel = null;
    if (this.requires_grad) {
      this._grad = zeros(this.shape);
    }
    this.children = [];
    this.parents = [];
    this.operation = null;
    this.visited = false;
  }
  /**
   * Returns the data in the Tensor.
   */
  get data() {
    return this._data;
  }
  /**
   * Returns the data's length'.
   */
  get length() {
    return this._data.length;
  }
  /**
   * Returns the number of dimensions in the Tensor.
   */
  get ndims() {
    return this.shape.length;
  }
  /**
   * Returns the tensor's gradients.
   */
  get grad() {
    return this._grad?.data;
  }
  /**
   * Performs backward pass from THIS tensor backwards.
   * It fills every tensor that originated this one and that has requires_grad=true's gradients to their gradients relative to THIS tensor.
   */
  backward(grad = null, child = null) {
    if (!this.requires_grad) {
      throw new Error("this tensor has requires_grad set to False");
    }
    if (grad === null) {
      grad = ones(this.shape);
      this.children = [];
    }
    this._grad = new Tensor(_add(this._grad?.data, grad.data));
    if (child != null) {
      const idx = this.children.indexOf(child);
      this.children.splice(idx, 1);
    }
    if (this.operation != null) {
      if (this.children.length === 0) {
        this.operation.backward(this._grad, this);
      }
    }
  }
  /**
   * Sends this Tensor to the provided device.
   * @param {string} device - Device to store Tensor. Either "gpu" or "cpu".
   * @param {boolean} requires_grad - Whether to keep track of this tensor's gradients.
   * @param {string} device - gpu or cpu: device to store Tensor.
   */
  to(device) {
    this.device = device;
  }
  /**
   * Reset this Tensor's gradients to zero.
   */
  zero_grad() {
    this._grad = zeros(this.shape);
    this.children = [];
    this.parents = [];
    this.operation = null;
    if (this.m instanceof Tensor && this.v instanceof Tensor) {
      this.m.zero_grad_graph();
      this.v.zero_grad_graph();
    }
  }
  /**
   * Reset the gradients of this Tensor, and of all of the Tensors that led to it.
   */
  zero_grad_graph() {
    this.zero_grad();
    if (this.operation != null) {
      for (const parent of this.parents) {
        parent.zero_grad_graph();
        parent.parents = [];
      }
      this.operation = null;
      this.parents = [];
      this.children = [];
    }
  }
  /**
   * Turns the data in the Tensor into a javascript list object.
   */
  tolist() {
    return this._data;
  }
  /**
   * Gets the sum of the Tensor over a specified dimension.
   * @param {number} dim - Dimension to sum over.
   * @param {boolean} keepdims - Whether to keep dimensions of original tensor.
   * @returns {Tensor} - Final tensor.
   */
  sum(dim = -1, keepdims = false) {
    const operation = new Sum();
    return operation.forward(this, dim, keepdims);
  }
  /**
   * Gets the mean of the Tensor over a specified dimension.
   * @param {number} dim - Dimension to get mean over.
   * @param {boolean} keepdims - Whether to keep dimensions of original tensor.
   * @returns {Tensor} - Final tensor.
   */
  mean(dim = -1, keepdims = false) {
    const operation = new Mean();
    return operation.forward(this, dim, keepdims);
  }
  /**
   * Gets the variance of the Tensor over a specified dimension.
   * @param {number} dim - Dimension to get variance over.
   * @param {boolean} keepdims - Whether to keep dimensions of original tensor.
   * @returns {Tensor} - Final tensor.
   */
  variance(dim = -1, keepdims = false) {
    const operation = new Variance();
    return operation.forward(this, dim, keepdims);
  }
  /**
   * Add integer or other Tensor to this Tensor.
   * @param {any} other - Tensor or integer to be added to this Tensor.
   * @returns {object} New tensor.
   */
  add(other) {
    const operation = new Add();
    return operation.forward(this, other);
  }
  /**
   * Subtract integer or other Tensor from this Tensor.
   * @param {any} other - Tensor or integer to be subtracted from this Tensor.
   * @returns {object} New tensor.
   */
  sub(other) {
    if (typeof other === "number") {
      return this.add(-other);
    } else if (other instanceof Tensor) {
      return this.add(other.neg());
    } else {
      throw Error('Argument "other" is not a Tensor or a number.');
    }
  }
  /**
   * Get element-wise opposite of given tensor ( every element * (-1) )
   * @returns {object} New tensor.
   */
  neg() {
    const operation = new Neg();
    return operation.forward(this);
  }
  /**
   * Multiply this Tensor by integer or other Tensor.
   * @param {any} other - Tensor or integer to multiply this Tensor by.
   * @returns {object} New tensor.
   */
  mul(other) {
    const operation = new Mul();
    return operation.forward(this, other);
  }
  /**
   * Divide this Tensor by integer or other Tensor.
   * @param {Tensor | number} other - Tensor or integer to divide this Tensor by.
   * @returns {Tensor} New tensor.
   */
  div(other) {
    const operation = new Div();
    return operation.forward(this, other);
  }
  /**
   * Multiply this Tensor by integer or other Tensor.
   * @param {Tensor | number} other - Tensor or integer to multiply this Tensor by.
   * @returns {Tensor} New tensor.
   */
  matmul(other) {
    const operation = new MatMul();
    let device;
    if (this.device === "gpu" || other.device === "gpu") {
      device = "gpu";
    } else {
      device = "cpu";
    }
    // On first iteration, create CPU or GPU kernel for matmul:
    if (other.forwardKernel === null || other.batch_size != this.shape.at(-2)) {
      if (device === "gpu") {
        // If the batch size changed, warn user and update the batch size:
        if (other.batch_size != null){
          other.batch_size = other.shape.at(-2);
          if (other.warned === undefined) {
            console.warn('Testing batch size different from training batch size. JS-PyTorch recreating GPU Kernel (Less efficient)')
            other.warned = true;
          }
        }
        other.gpu = new GPU.GPU();
        // Define Kernel function for matmul:
        const kernelFunc = function(a, b, len) {
          let sum2 = 0;
          for (let i = 0; i < len; i++) {
            sum2 += a[this.thread.y][i] * b[i][this.thread.x];
          }
          return sum2;
        };
        // Create and store the GPU kernels:
        other.forwardKernel = other.gpu.createKernel(kernelFunc, { loopMaxIterations: other.shape.at(-2) }).setOutput([other.shape.at(-1), this.shape.at(-2)]);
        other.backwardKernelA = other.gpu.createKernel(kernelFunc, { loopMaxIterations: other.shape.at(-1) }).setOutput([this.shape.at(-1), this.shape.at(-2)]);
        other.backwardKernelB = other.gpu.createKernel(kernelFunc, { loopMaxIterations: this.shape.at(-2) }).setOutput([other.shape.at(-1), other.shape.at(-2)]);
      } else {
        // Build the CPU kernel:
        const kernelFunc = function(a, b, len) {
          const out = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0));
          for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b[0].length; j++) {
              let currentIndex = 0;
              for (let k = 0; k < len; k++) {
                currentIndex += a[i][k] * b[k][j];
              }
              out[i][j] = currentIndex;
            }
          }
          return out;
        };
        // Store the CPU kernels:
        other.forwardKernel = kernelFunc;
        other.backwardKernelA = kernelFunc;
        other.backwardKernelB = kernelFunc;
      }
    }
    // Store the batch size. If the batch size changes, we will create a new GPU kernel:
    other.batch_size = this.shape.at(-2);
    return operation.forward(this, other);
  }
  /**
   * Get tensor to element-wise power of n.
   * @param {number} n - Exponent.
   * @returns {object} New tensor.
   */
  pow(n) {
    const operation = new Pow();
    return operation.forward(this, n);
  }
  /**
   * Get element-wise square root of given tensor.
   * @returns {object} New tensor.
   */
  sqrt() {
    const operation = new Sqrt();
    return operation.forward(this);
  }
  /**
   * Get element-wise exponentiation of given tensor ( e^(every element) )
   * @returns {object} New tensor.
   */
  exp() {
    const operation = new Exp();
    return operation.forward(this);
  }
  /**
   * Get element-wise natural log of given tensor ( ln(every element) )
   * @returns {object} New tensor.
   */
  log() {
    const operation = new Log();
    return operation.forward(this);
  }
  /**
   * Transpose the tensor along two consecutive dimensions:
   * @param {number} dim1 - First dimension.
   * @param {number} dim2 - Second dimension.
   * @returns {object} New tensor.
   */
  transpose(dim1, dim2) {
    const operation = new Transpose();
    return operation.forward(this, dim1, dim2);
  }
  /**
   * In a tensor, returns a list of elements in [index1], or [index1][index2];
   * @param {object} index1 - List containing indexes to extract data from in first dimension.
   * @param {object} index2 - List containing indexes to extract data from in second dimension [OPTIONAL].
   * @returns {object} New tensor.
   * @example
   * let a = tensor([[1,1,2,3],
   *                 [6,7,8,9]])
   *
   * // Returns tensor([2,6,9]):
   * a.at([0,1,1], [2,0,3])
   *
   * // Returns tensor([[1,1,2,3],
   *                    [6,7,8,9],
   *                    [1,1,2,3]])
   * a.at([0,1,0])
   */
  at(index1, index2) {
    const operation = new At();
    return operation.forward(this, index1, index2);
  }
  /**
   * Where the "condition" function returns True in "mask" Tensor, the "value" will fill the "this" Tensor.
   * @param {Tensor} mask - "condition" will be applied in this tensor element-wise.
   * @param {function} condition - Function that returns True or False element-wise.
   * @param {number} value - Value to fill Tensor when condition is met.
   * @returns {object} New tensor.
   * @example
   * let a = tensor([[1,5,2,3],
   *                 [6,7,2,9]])
   *
   * // Returns tensor([[1,0,2,3],
   * //                 [0,0,2,0]])
   * a.masked_fill(mask, (el) => {return el > 3}, 0)
   */
  masked_fill(mask, condition, value) {
    const operation = new MaskedFill();
    return operation.forward(this, mask, condition, value);
  }
  /**
   * Reshape the tensor into the new shape:
   * @param {object} shape - New tensor's shape.
   * @returns {object} New tensor.
   */
  reshape(shape) {
    const operation = new Reshape();
    return operation.forward(this, shape);
  }
}
class Parameter extends Tensor {
  constructor(data) {
    super(data, true);
  }
}
class Add {
  cache;
  /**
   * Add tensors or tensor and integers.
   * @param {any} a - First tensor or integer.
   * @param {any} b - Second tensor or integer.
   * @returns {object} New tensor.
   */
  forward(a, b) {
    this.cache = [a, b];
    const aData = getData(a);
    const bData = getData(b);
    const z = new Tensor(
      _add(aData, bData),
      // data;
      requiresGrad(a) || requiresGrad(b)
      // requires_grad;
    );
    if (a instanceof Tensor && requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
    }
    if (b instanceof Tensor && requiresGrad(b)) {
      z.parents.push(b);
      b.children.push(z);
    }
    z.operation = this;
    return z;
  }
  backward(dz, z) {
    const [a, b] = this.cache;
    if (requiresGrad(a)) {
      let da = dz;
      da = broadcast(da, a);
      a.backward(da, z);
    }
    if (requiresGrad(b)) {
      let db = dz;
      db = broadcast(db, b);
      b.backward(db, z);
    }
  }
}
class Neg {
  cache;
  /**
   * Get element-wise opposite of given tensor ( every element * (-1) )
   * @param {object} a - Tensor to be multiplied by -1.
   * @returns {object} New tensor.
   */
  forward(a) {
    this.cache = a;
    const z = new Tensor(
      _neg(a._data),
      // data;
      requiresGrad(a)
      // requires_grad;
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const a = this.cache;
    if (requiresGrad(a)) {
      const da = neg(dz);
      a.backward(da, z);
    }
  }
}
class Mul {
  cache;
  /**
   * Perform element-wise multiplication between Tensors and integers or other Tensors.
   * @param {any} a - First tensor or integer.
   * @param {any} b - Second tensor or integer.
   * @returns {object} New tensor.
   */
  forward(a, b) {
    this.cache = [a, b];
    const aData = getData(a);
    const bData = getData(b);
    const z = new Tensor(
      _mul(aData, bData),
      // data;
      requiresGrad(a) || requiresGrad(b)
      // requires_grad;
    );
    if (a instanceof Tensor && requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
    }
    if (b instanceof Tensor && requiresGrad(b)) {
      z.parents.push(b);
      b.children.push(z);
    }
    z.operation = this;
    return z;
  }
  backward(dz, z) {
    const [a, b] = this.cache;
    if (requiresGrad(a)) {
      let da = new Tensor(_mul(dz.data, getData(b)));
      da = broadcast(da, a);
      a.backward(da, z);
    }
    if (requiresGrad(b)) {
      let db = new Tensor(_mul(dz.data, getData(a)));
      db = broadcast(db, b);
      b.backward(db, z);
    }
  }
}
class Div {
  cache;
  /**
   * Perform element-wise division between Tensors and integers or other Tensors.
   * @param {any} a - First tensor or integer.
   * @param {any} b - Second tensor or integer.
   * @returns {object} New tensor.
   */
  forward(a, b) {
    this.cache = [a, b];
    const aData = getData(a);
    const bData = getData(b);
    const z = new Tensor(
      _div(aData, bData),
      // data;
      requiresGrad(a) || requiresGrad(b)
      // requires_grad;
    );
    if (a instanceof Tensor && requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
    }
    if (b instanceof Tensor && requiresGrad(b)) {
      z.parents.push(b);
      b.children.push(z);
    }
    z.operation = this;
    return z;
  }
  backward(dz, z) {
    const [a, b] = this.cache;
    if (requiresGrad(a)) {
      let da = new Tensor(_mul(dz.data, _div(1, getData(b))));
      da = broadcast(da, a);
      a.backward(da, z);
    }
    if (requiresGrad(b)) {
      let db = new Tensor(
        _mul(dz.data, _neg(_div(getData(a), _pow(getData(b), 2))))
      );
      db = broadcast(db, b);
      b.backward(db, z);
    }
  }
}
class MatMul {
  cache;
  kernelFunc;
  thread;
  forward(a, b) {
    this.cache = [a, b];
    let aData = a.data;
    let bData = b.data;
    if (a.shape.length < b.shape.length) {
      aData = broadcastUp(aData, bData);
    } else {
      bData = broadcastUp(bData, aData);
    }
    const z = new Tensor(
      _matmul(aData, bData, b.forwardKernel),
      // data;
      requiresGrad(a) || requiresGrad(b)
      // requires_grad;
    );
    if (a instanceof Tensor && requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
    }
    if (b instanceof Tensor && requiresGrad(b)) {
      z.parents.push(b);
      b.children.push(z);
    }
    z.operation = this;
    return z;
  }
  backward(dz, z) {
    const [a, b] = this.cache;
    if (requiresGrad(a)) {
      const dzData = dz.data;
      let b_T = _transpose(b.data, b.ndims - 2);
      b_T = broadcastUp(b_T, dzData);
      let da = new Tensor(_matmul(dzData, b_T, b.backwardKernelA));
      da = broadcast(da, a);
      a.backward(da, z);
    }
    if (requiresGrad(b)) {
      const dzData = dz.data;
      let a_T = _transpose(a.data, a.ndims - 2);
      a_T = broadcastUp(a_T, dzData);
      let db = new Tensor(_matmul(a_T, dzData, b.backwardKernelB));
      db = broadcast(db, b);
      b.backward(db, z);
    }
  }
}
class Pow {
  cache;
  /**
   * Get tensor to element-wise power of n.
   * @param {object} a - Tensor to be elevated to the power of n.
   * @param {number} n - Exponent.
   * @returns {object} New tensor.
   */
  forward(a, n) {
    this.cache = a;
    const z = new Tensor(
      _pow(getData(a), n),
      // data;
      requiresGrad(a)
      // requires_grad;
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const a = this.cache;
    if (requiresGrad(a)) {
      const da = new Tensor(_mul(2, _mul(a.data, dz.data)));
      a.backward(da, z);
    }
  }
}
class Sqrt {
  cache;
  /**
   * Get element-wise square root of given tensor
   * @param {object} a - Tensor to be square rooted.
   * @returns {object} New tensor.
   */
  forward(a) {
    this.cache = a;
    const z = new Tensor(
      _sqrt(a._data),
      // data;
      requiresGrad(a)
      // requires_grad;
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const a = this.cache;
    if (requiresGrad(a)) {
      const da = new Tensor(
        _mul(_mul(_div(1, 2), _div(1, _sqrt(a.data))), dz.data)
      );
      a.backward(da, z);
    }
  }
}
class Exp {
  cache;
  /**
   * Get element-wise exponentiation of given tensor ( e^(every element) )
   * @param {object} a - Tensor to be exponentiated.
   * @returns {object} New tensor.
   */
  forward(a) {
    this.cache = a;
    const z = new Tensor(
      _exp(a._data),
      // data;
      requiresGrad(a)
      // requires_grad;
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const a = this.cache;
    if (requiresGrad(a)) {
      const da = new Tensor(_mul(_exp(a.data), dz.data));
      a.backward(da, z);
    }
  }
}
class Log {
  cache;
  /**
   * Get element-wise natural log of given tensor ( ln(every element) )
   * @param {object} a - Tensor we will take the log of.
   * @returns {object} New tensor.
   */
  forward(a) {
    this.cache = a;
    const z = new Tensor(
      _log(a._data),
      // data;
      requiresGrad(a)
      // requires_grad;
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const a = this.cache;
    if (requiresGrad(a)) {
      const da = new Tensor(_mul(_div(1, a.data), dz.data));
      a.backward(da, z);
    }
  }
}
class Sum {
  cache;
  /**
   * Gets the sum of a Tensor over a specified dimension.
   * @param {Tensor} a - Tensor to sum.
   * @param {dim} dim - Dimension to sum over.
   * @param {keepdims} keepdims - Whether to keep dimensions of original tensor.
   * @returns {Tensor} - Final tensor.
   */
  forward(a, dim, keepdims = false) {
    this.cache = [a, dim, keepdims];
    if (dim < 0) {
      dim = a.shape.length + dim;
    }
    if (dim >= a.shape.length) {
      throw Error("Dimension larger than array.");
    }
    const z = new Tensor(
      _sum(a._data, dim, keepdims),
      // New data.
      requiresGrad(a)
      // requires_grad.
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const [a, dim, keepdims] = this.cache;
    if (requiresGrad(a)) {
      if (keepdims) {
        dz = dz.sum(dim);
      }
      const da = broadcast(dz, a);
      a.backward(da, z);
    }
  }
}
class Mean {
  cache;
  /**
   * Gets the mean of a Tensor over a specified dimension.
   * @param {Tensor} a - Tensor to get mean from.
   * @param {dim} dim - Dimension to get mean over.
   * @param {keepdims} keepdims - Whether to keep dimensions of original tensor.
   * @returns {Tensor} - Final tensor.
   */
  forward(a, dim, keepdims = false) {
    if (dim < 0) {
      dim = a.shape.length + dim;
    }
    if (dim >= a.shape.length) {
      throw Error("Dimension larger than array.");
    }
    this.cache = [a, dim];
    const z = new Tensor(
      _mean(a._data, dim, keepdims),
      // New data.
      requiresGrad(a)
      // keep_dims.
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const [a, dim] = this.cache;
    if (requiresGrad(a)) {
      let da = new Tensor(_div(dz.data, a.shape[dim]));
      da = broadcast(da, a);
      a.backward(da, z);
    }
  }
}
class Variance {
  cache;
  /**
   * Gets the variance of a Tensor over a specified dimension.
   * @param {Tensor} a - Tensor to get variance of.
   * @param {dim} dim - Dimension to get variance over.
   * @param {keepdims} keepdims - Whether to keep dimensions of original tensor.
   * @returns {Tensor} - Final tensor.
   */
  forward(a, dim, keepdims = false) {
    if (dim < 0) {
      dim = a.shape.length + dim;
    }
    if (dim >= a.shape.length) {
      throw Error("Dimension larger than array.");
    }
    this.cache = [a, dim];
    const z = new Tensor(
      _variance(a._data, dim, keepdims),
      // New data.
      requiresGrad(a)
      // keep_dims.
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const [a, dim] = this.cache;
    if (requiresGrad(a)) {
      dz = broadcast(dz, a);
      const err = _add(a._data, _neg(_mean(a._data, dim, true)));
      const var_err = _mul(_mul(dz._data, 2), err);
      let da = _div(var_err, a.shape[dim]);
      da = new Tensor(da);
      a.backward(da, z);
    }
  }
}
class Transpose {
  cache;
  /**
   * Transpose the tensor along two consecutive dimensions:
   * @param {object} a - Tensor to transpose.
   * @param {number} dim1 - First dimension.
   * @param {number} dim2 - Second dimension.
   * @returns {object} New tensor.
   */
  forward(a, dimA, dimB) {
    this.cache = [a, dimA, dimB];
    if (dimA < 0) {
      dimA = a.shape.length + dimA;
    }
    if (dimB < 0) {
      dimB = a.shape.length + dimB;
    }
    let dim;
    if (dimB < dimA) {
      dim = dimB;
    } else if (dimB > dimA) {
      dim = dimA;
    } else {
      throw new Error("ValueError: dimensions are not consecutive.");
    }
    const z = new Tensor(
      _transpose(a._data, dim),
      // data;
      requiresGrad(a)
      // requires_grad;
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const [a, dimA, dimB] = this.cache;
    if (requiresGrad(a)) {
      const da = dz.transpose(dimA, dimB);
      a.backward(da, z);
    }
  }
}
class At {
  cache;
  forward(a, idx1, idx2 = null) {
    if (idx1) {
      idx1 = assureArray(idx1).flat(Infinity);
    }
    if (idx2) {
      idx2 = assureArray(idx2).flat(Infinity);
    }
    this.cache = [a, idx1, idx2];
    const z = new Tensor(
      _at(a._data, idx1, idx2),
      // data;
      requiresGrad(a)
      // requires_grad;
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const [a, idx1, idx2] = this.cache;
    if (requiresGrad(a)) {
      const da = zeros(a.shape);
      for (let i = 0; i < dz.length; i++) {
        if (idx2 != null) {
          da._data[idx1[i]][idx2[i]] = _add(
            da._data[idx1[i]][idx2[i]],
            dz._data[i]
          );
        } else {
          da._data[idx1[i]] = _add(da._data[idx1[i]], dz._data[i]);
        }
      }
      a.backward(da, z);
    }
  }
}
class MaskedFill {
  cache;
  forward(a, mask, condition, value) {
    this.cache = [a, mask, condition];
    const z = new Tensor(
      _masked_fill(a._data, mask._data, condition, value),
      // data;
      requiresGrad(a)
      // requires_grad;
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const [a, mask, condition] = this.cache;
    if (requiresGrad(a)) {
      const da = new Tensor(_masked_fill(dz._data, mask._data, condition, 0));
      a.backward(da, z);
    }
  }
}
class Reshape {
  cache;
  forward(a, shape) {
    this.cache = a;
    const z = new Tensor(
      _reshape(a._data, shape),
      // data;
      requiresGrad(a)
      // requires_grad;
    );
    if (requiresGrad(a)) {
      z.parents.push(a);
      a.children.push(z);
      z.operation = this;
    }
    return z;
  }
  backward(dz, z) {
    const a = this.cache;
    if (requiresGrad(a)) {
      const da = new Tensor(_reshape(dz.data, a.shape));
      a.backward(da, z);
    }
  }
}
function mean(a, dim = -1, keepdims = false) {
  return a.mean(dim, keepdims);
}
function variance(a, dim = -1, keepdims = false) {
  return a.variance(dim, keepdims);
}
function add(a, b) {
  return a.add(b);
}
function neg(a) {
  return a.neg();
}
function mul(a, b) {
  return a.mul(b);
}
function div(a, b) {
  const operation = new Div();
  return operation.forward(a, b);
}
function pow(a, n) {
  const operation = new Pow();
  return operation.forward(a, n);
}
function sqrt(a) {
  return a.sqrt();
}
function exp(a) {
  return a.exp();
}
function log(a) {
  return a.log();
}
function matmul(a, b) {
  return a.matmul(b);
}
function transpose(a, dim1, dim2) {
  return a.transpose(dim1, dim2);
}
function at(a, idx1, idx2) {
  return a.at(idx1, idx2);
}
function masked_fill(a, mask, condition, value) {
  return a.masked_fill(mask, condition, value);
}
function reshape(a, shape) {
  return a.reshape(shape);
}
function _sum(a, dim, keepdims) {
  if (dim == 0) {
    const sum2 = a.reduce((a2, b) => _add(a2, b), 0);
    if (keepdims) {
      return Array(a.length).fill(sum2);
    } else {
      return sum2;
    }
  } else if (typeof a === "object") {
    return a.map((element) => _sum(element, dim - 1, keepdims));
  } else {
    throw Error("Dimension invalid.");
  }
}
function _mean(a, dim, keepdims) {
  if (dim == 0) {
    const reduced = _div(
      a.reduce((a2, b) => _add(a2, b), 0),
      a.length
    );
    if (keepdims) {
      return Array(a.length).fill(reduced);
    } else {
      return reduced;
    }
  } else if (typeof a === "object") {
    return a.map((element) => _mean(
      element,
      dim - 1
      /*, keepdims*/
    ));
  } else {
    throw Error("Dimension invalid.");
  }
}
function _variance(a, dim, keepdims) {
  if (dim == 0) {
    const mean2 = _div(
      a.reduce((a2, b) => _add(a2, b), 0),
      a.length
    );
    const squares = a.map((el) => (el - mean2) ** 2);
    const variance2 = _div(
      squares.reduce((a2, b) => _add(a2, b), 0),
      a.length
    );
    if (keepdims) {
      return Array(a.length).fill(variance2);
    } else {
      return variance2;
    }
  } else if (typeof a === "object") {
    return a.map((element) => _variance(
      element,
      dim - 1
      /*keepdims*/
    ));
  } else {
    throw Error("Dimension invalid.");
  }
}
function _add(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else if (typeof a === "number" && b instanceof Array) {
    return b.map((element) => _add(element, a));
  } else if (a instanceof Array && typeof b === "number") {
    return a.map((element) => _add(element, b));
  } else if (a instanceof Array && b instanceof Array) {
    const aShape = getShape(a);
    const bShape = getShape(b);
    if (JSON.stringify(aShape) === JSON.stringify(bShape)) {
      return a.map((element, idx) => _add(element, b[idx]));
    } else if (aShape.length > bShape.length) {
      let idx;
      for (let i = 0; i < aShape.length; i++) {
        if (JSON.stringify(aShape.slice(i, i + bShape.length)) === JSON.stringify(bShape)) {
          idx = i;
        }
      }
      if (idx === 0) {
        return a.map((element, idx2) => _add(element, b[idx2]));
      } else {
        return a.map((element) => _add(element, b));
      }
    } else if (aShape.length < bShape.length) {
      let idx;
      for (let i = 0; i < bShape.length; i++) {
        if (JSON.stringify(bShape.slice(i, i + aShape.length)) === JSON.stringify(aShape)) {
          idx = i;
        }
      }
      if (idx === 0) {
        return b.map((element, idx2) => _add(a[idx2], element));
      } else {
        return b.map((element) => _add(a, element));
      }
    } else {
      throw Error("Given arguments cannot be added.");
    }
  } else {
    throw Error("Given arguments cannot be added.");
  }
}
function _neg(a) {
  if (typeof a === "number") {
    return -a;
  } else if (typeof a === "object") {
    return a.map((element) => _neg(element));
  } else {
    throw new TypeError("the input data is not a number.");
  }
}
function _mul(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return a * b;
  } else if (typeof a === "number" && b instanceof Array) {
    return b.map((element) => _mul(element, a));
  } else if (a instanceof Array && typeof b === "number") {
    return a.map((element) => _mul(element, b));
  } else if (a instanceof Array && b instanceof Array) {
    const aShape = getShape(a);
    const bShape = getShape(b);
    if (JSON.stringify(aShape) === JSON.stringify(bShape)) {
      return a.map((element, idx) => _mul(element, b[idx]));
    } else if (aShape.length > bShape.length) {
      let idx;
      for (let i = 0; i < aShape.length; i++) {
        if (JSON.stringify(aShape.slice(i, i + bShape.length)) === JSON.stringify(bShape)) {
          idx = i;
        }
      }
      if (idx === 0) {
        return a.map((element, idx2) => _mul(element, b[idx2]));
      } else {
        return a.map((element) => _mul(element, b));
      }
    } else if (aShape.length < bShape.length) {
      let idx;
      for (let i = 0; i < bShape.length; i++) {
        if (JSON.stringify(bShape.slice(i, i + aShape.length)) === JSON.stringify(aShape)) {
          idx = i;
        }
      }
      if (idx === 0) {
        return b.map((element, idx2) => _mul(a[idx2], element));
      } else {
        return b.map((element) => _mul(a, element));
      }
    }
  }
}
function _div(a, b) {
  if (typeof a === "number" && typeof b === "number") {
    return a / b;
  } else if (typeof a === "number" && b instanceof Array) {
    return b.map((element) => _div(a, element));
  } else if (a instanceof Array && typeof b === "number") {
    return a.map((element) => _div(element, b));
  } else if (a instanceof Array && b instanceof Array) {
    const aShape = getShape(a);
    const bShape = getShape(b);
    if (JSON.stringify(aShape) === JSON.stringify(bShape)) {
      return a.map((element, idx) => _div(element, b[idx]));
    } else if (aShape.length > bShape.length) {
      let idx;
      for (let i = 0; i < aShape.length; i++) {
        if (JSON.stringify(aShape.slice(i, i + bShape.length)) === JSON.stringify(bShape)) {
          idx = i;
        }
      }
      if (idx === 0) {
        return a.map((element, idx2) => _div(element, b[idx2]));
      } else {
        return a.map((element) => _div(element, b));
      }
    } else if (aShape.length < bShape.length) {
      let idx;
      for (let i = 0; i < bShape.length; i++) {
        if (JSON.stringify(bShape.slice(i, i + aShape.length)) === JSON.stringify(aShape)) {
          idx = i;
        }
      }
      if (idx === 0) {
        return b.map((element, idx2) => _div(a[idx2], element));
      } else {
        return b.map((element) => _div(a, element));
      }
    }
  }
}
function _matmul(a, b, kernel) {
  if (typeof a === "number") {
    throw new Error("Cannot perform MatMul with given shapes.");
  }
  if (typeof a[0][0] === "object") {
    return a.map(
      (element, idx) => _matmul(element, b[idx], kernel)
    );
  } else {
    if (a[0].length === b.length && typeof a[0][0] === "number") {
      let out = kernel(a, b, b.length);
      out = out.map((el) => Array.from(el));
      return out;
    } else {
      throw Error(
        `Cannot perform Matrix Multiplication: cannot broadcast ${[
          a.length,
          a[0].length
        ]} and ${[b.length, b[0].length]}`
      );
    }
  }
}
function _pow(a, n) {
  let z = a;
  for (let i = 0; i < n - 1; i++) {
    z = _mul(z, a);
  }
  return z;
}
function _sqrt(a) {
  if (typeof a === "number") {
    return Math.sqrt(a);
  } else if (a instanceof Array) {
    return a.map((element) => _sqrt(element));
  } else {
    throw new TypeError("the input data is not a number.");
  }
}
function _exp(a) {
  if (typeof a === "number") {
    return 2.718281828459045 ** a;
  } else if (a instanceof Array) {
    return a.map((element) => _exp(element));
  } else {
    throw new TypeError("the input data is not a number.");
  }
}
function _log(a) {
  if (typeof a === "number") {
    return Math.log(a);
  } else if (a instanceof Array) {
    return a.map((element) => _log(element));
  } else {
    throw new TypeError("the input data is not a number.");
  }
}
function _transpose(a, dim) {
  if (dim == 0) {
    const newArray = Array(a[0].length).fill(0).map(() => Array(a.length).fill(0));
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a[i].length; j++) {
        newArray[j][i] = a[i][j];
      }
    }
    return newArray;
  } else if (a instanceof Array) {
    return a.map((element) => _transpose(element, dim - 1));
  } else {
    throw Error("ValueError: dimensions are invalid.");
  }
}
function _at(a, idx1, idx2) {
  if (idx2) {
    return Array(idx1.length).fill(0).map((_, i) => a[idx1[i]][idx2[i]]);
  } else {
    return Array(idx1.length).fill(0).map((_, i) => a[idx1[i]]);
  }
}
function _masked_fill(a, mask, condition, value) {
  if (typeof mask === "number") {
    if (typeof a != "number") {
      throw new Error("Tensor and Mask not broadcastable");
    }
    if (condition(mask)) {
      return value;
    } else {
      return a;
    }
  } else if (typeof a === "object") {
    return a.map(
      (element, idx) => _masked_fill(element, mask[idx], condition, value)
    );
  } else {
    throw new Error("The input data is not a number.");
  }
}
function _reshape(a, shape) {
  if (getShape(a).reduce((a2, b) => a2 * b, 1) != shape.reduce((a2, b) => a2 * b, 1)) {
    throw new Error("Attempting to reshape into invalid shape.");
  }
  function _build(a2, shape2, idx, numberOfEls) {
    if (shape2.length > 1) {
      const emptyArray = Array(shape2[0]).fill(0);
      let offSet = idx;
      numberOfEls = numberOfEls / shape2[0];
      const myArray = emptyArray.map((_, idx2) => _build(a2, shape2.slice(1), offSet + idx2 * numberOfEls, numberOfEls));
      return myArray;
    } else {
      const myArray = a2.slice(idx, idx + numberOfEls);
      return myArray;
    }
  }
  const flat = a.flat(Infinity);
  const built = _build(flat, shape, 0, flat.length);
  return built;
}
function _tensorInitializer(shape, valueFunc) {
  if (shape.length === 1) {
    const emptyArray = Array(shape[0]).fill(0);
    return emptyArray.map(() => valueFunc());
  } else {
    const currentSize = shape[0];
    const emptyArray = Array(currentSize).fill(0);
    return emptyArray.map(() => _tensorInitializer(shape.slice(1), valueFunc));
  }
}
function tensor(data, requires_grad = false, device = "cpu") {
  return new Tensor(data, requires_grad, device);
}
function zeros(shape, requires_grad = false, device = "cpu") {
  return new Tensor(
    _tensorInitializer(shape, () => 0),
    requires_grad,
    device
  );
}
function ones(shape, requires_grad = false, device = "cpu") {
  return new Tensor(
    _tensorInitializer(shape, () => 1),
    requires_grad,
    device
  );
}
function tril(shape, requires_grad = false, device = "cpu") {
  const z = ones(shape, requires_grad);
  for (let i = 0; i < shape[0]; i++) {
    for (let j = 0; j < shape[0]; j++) {
      if (j > i) {
        z._data[i][j] = 0;
      }
    }
  }
  return new Tensor(z._data, requires_grad, device);
}
function rand(shape, requires_grad = false, device = "cpu") {
  return new Tensor(
    _tensorInitializer(shape, () => Math.random()),
    requires_grad,
    device
  );
}
function randn(shape, requires_grad = false, xavier = false, device = "cpu") {
  return new Tensor(
    _tensorInitializer(shape, () => {
      const mean2 = Math.random() * 0.98 + 1e-3;
      const variance2 = Math.random() * 0.98 + 1e-3;
      const num = Math.sqrt(-2 * Math.log(mean2)) * Math.cos(2 * Math.PI * variance2);
      if (xavier) {
        return num / Math.sqrt(shape[0]);
      } else {
        return num;
      }
    }),
    requires_grad,
    device
  );
}
function randint(low = 0, high = 1, shape = [1], requires_grad = false) {
  return new Tensor(
    _tensorInitializer(shape, () => {
      return Math.floor(Math.random() * (high - low)) + low;
    }),
    requires_grad
  );
}
function requiresGrad(a) {
  if (a instanceof Tensor) {
    return a.requires_grad;
  } else {
    return false;
  }
}
function broadcast(a, b) {
  function _broadcast(out2, b2) {
    if (typeof out2 === "number" && typeof b2 === "number") {
      return out2;
    } else if (typeof out2 === "number" && b2 instanceof Array) {
      const newArray = Array(b2.length).fill(out2);
      return _broadcast(newArray, b2);
    } else if (out2 instanceof Array && typeof b2 === "number") {
      return _broadcast(_sum(out2, 0), b2);
    } else if (JSON.stringify(getShape(out2)) === JSON.stringify(getShape(b2))) {
      return out2;
    } else if (out2 instanceof Array && b2 instanceof Array) {
      const outShape = getShape(out2);
      const bShape = getShape(b2);
      if (outShape.length > bShape.length) {
        let idx;
        for (let i = 0; i < outShape.length; i++) {
          if (JSON.stringify(outShape.slice(i, i + bShape.length)) === JSON.stringify(bShape)) {
            idx = i;
          }
        }
        if (idx === 0) {
          return out2.map((element, idx2) => _broadcast(element, b2[idx2]));
        } else {
          return _sum(out2, 0);
        }
      } else if (outShape.length < bShape.length) {
        let idx;
        for (let i = 0; i < bShape.length; i++) {
          if (JSON.stringify(bShape.slice(i, i + outShape.length)) === JSON.stringify(outShape)) {
            idx = i;
          }
        }
        if (idx === 0) {
          return out2.map((element) => _broadcast(element, b2[0]));
        } else {
          return Array(b2.length).fill(0).map(() => _broadcast(out2, b2[0]));
        }
      } else {
        const _broadcastSideways = (out3, b3) => {
          if (out3 instanceof Array && b3.length != out3.length) {
            if (b3.length === 1) {
              return [_sum(out3, 0)];
            } else if (out3.length === 1) {
              const emptyArray = Array(b3.length).fill(zeros);
              return emptyArray.map(() => out3[0]);
            } else {
              throw Error(
                `Shapes ${getShape(out3)} and ${getShape(b3)} not broadcastable.`
              );
            }
          } else {
            if (out3 instanceof Array) {
              return out3.map(
                (element, idx) => _broadcastSideways(element, b3[idx])
              );
            } else if (typeof out3 === "number") {
              return [null].map(
                (element, idx) => _broadcastSideways(element, b3[idx])
              );
            } else {
              throw Error("Shapes not broadcastable.");
            }
          }
        };
        return _broadcastSideways(out2, b2);
      }
    } else {
      throw Error("Shapes not broadcastable.");
    }
  }
  let out = a.data;
  while (JSON.stringify(getShape(out)) != JSON.stringify(b.shape)) {
    out = assureArray(_broadcast(out, b.data));
  }
  return new Tensor(out);
}
function broadcastUp(inElement, outElement) {
  function _broadcastUp(inElement2, outElement2) {
    if (getShape(inElement2).length + 1 === getShape(outElement2).length) {
      const emptyArray = Array(outElement2.length).fill(zeros);
      return emptyArray.map(() => inElement2);
    } else {
      const emptyArray = Array(outElement2.length).fill(zeros);
      return emptyArray.map(
        (_, idx) => _broadcastUp(inElement2, outElement2[idx])
      );
    }
  }
  while (getShape(inElement).length < getShape(outElement).length) {
    inElement = _broadcastUp(inElement, outElement);
  }
  return inElement;
}

class Module {
  // Instantiate Module's mode initially as "train":
  mode = "train";
  /**
   * Returns all model parameters in a list.
   * @returns {object} List with parameters in the model.
   */
  parameters() {
    let params = [];
    for (const [_, value] of this.entries()) {
      if (value instanceof Module) {
        params = params.concat(value.parameters());
      } else if (value instanceof Parameter) {
        params.push(value);
      } else if (value instanceof Tensor) {
        if (value.requires_grad) {
          params.push(value);
        }
      }
    }
    return params;
  }
  /**
   * Sets module's mode to train, which influences layers like Dropout
   */
  train() {
    this.mode = "train";
    for (const [_, param] of this.entries()) {
      if (param instanceof Module) {
        param.train();
      }
    }
  }
  /**
   * Sets module's mode to eval, which influences layers like Dropout
   */
  eval() {
    this.mode = "eval";
    for (const [_, param] of this.entries()) {
      if (param instanceof Module) {
        param.eval();
      }
    }
  }
  /**
   * Returns an array of key/values of the enumerable properties of the Module
   * @returns {object} List with parameters in the model.
   */
  entries() {
    return Object.entries(this);
  }
}
class Linear extends Module {
  W;
  b;
  has_bias;
  constructor(in_size, out_size, device = "cpu", bias = true, xavier = true) {
    super();
    this.W = randn([in_size, out_size], true, xavier);
    this.W.device = device;
    this.b = zeros([out_size], true);
    this.has_bias = bias;
  }
  /**
   * Performs forward pass through the Linear layer.
   * @param {Tensor} x - input Tensor.
   * @returns {Tensor} new Tensor. Out = (In @ W) + b.
   */
  forward(x) {
    let z = x.matmul(this.W);
    if (this.has_bias) {
      z = z.add(this.b);
    }
    return z;
  }
}
class MultiHeadSelfAttention extends Module {
  Wk;
  Wq;
  Wv;
  residual_proj;
  mask;
  att_dropout;
  residual_dropout;
  softmax;
  H;
  constructor(in_size, out_size, n_heads, n_timesteps, dropout_prob = 0, device = "cpu") {
    super();
    this.Wk = new Linear(in_size, in_size, device, true, false);
    this.Wq = new Linear(in_size, in_size, device, true, false);
    this.Wv = new Linear(in_size, in_size, device, true, false);
    this.residual_proj = new Linear(in_size, out_size, device, true, false);
    this.mask = tril([n_timesteps, n_timesteps], false);
    this.att_dropout = new Dropout(dropout_prob);
    this.residual_dropout = new Dropout(dropout_prob);
    this.softmax = new Softmax();
    this.H = in_size / n_heads;
    if (in_size % n_heads != 0) {
      throw new Error("Embedding dimension not divisible in equal heads.");
    }
  }
  /**
   * Performs Multi Head Self-Attention on "x" tensor.
   * @param {Tensor} x - input Tensor.
   * @returns {Tensor} new Tensor.
   */
  forward(x) {
    const [B, T, D] = x.shape;
    const H = this.H;
    const nh = D / H;
    let k = this.Wk.forward(x);
    let q = this.Wq.forward(x);
    let v = this.Wv.forward(x);
    k = k.reshape([B, T, nh, H]).transpose(1, 2);
    q = q.reshape([B, T, nh, H]).transpose(1, 2);
    v = v.reshape([B, T, nh, H]).transpose(1, 2);
    const kT = k.transpose(-2, -1);
    let att = q.matmul(kT);
    att = att.div(H ** 2);
    const mask = broadcast(this.mask, att);
    att = att.masked_fill(mask, (el) => el === 0, -Infinity);
    att = this.softmax.forward(att, -1);
    att = this.att_dropout.forward(att);
    let out = att.matmul(v);
    out = out.transpose(1, 2).reshape([B, T, D]);
    out = this.residual_proj.forward(out);
    out = this.residual_dropout.forward(out);
    return out;
  }
}
class FullyConnected extends Module {
  l1;
  relu;
  l2;
  dropout;
  constructor(in_size, out_size, dropout_prob = 0, device = "cpu", bias = true) {
    super();
    this.l1 = new Linear(in_size, in_size * 2, device, true, bias);
    this.relu = new ReLU();
    this.l2 = new Linear(in_size * 2, out_size);
    this.dropout = new Dropout(dropout_prob);
  }
  /**
   *  Passes "x" tensor through the Fully Connected layers.
   * @param {Tensor} x - input Tensor.
   * @returns {Tensor} new Tensor.
   */
  forward(x) {
    let z = this.l1.forward(x);
    z = this.relu.forward(z);
    z = this.l2.forward(z);
    z = this.dropout.forward(z);
    return z;
  }
}
class Block extends Module {
  att;
  ln1;
  fcc;
  ln2;
  constructor(in_size, out_size, n_heads, n_timesteps, dropout_prob = 0, device = "cpu") {
    super();
    this.att = new MultiHeadSelfAttention(
      in_size,
      in_size,
      n_heads,
      n_timesteps,
      dropout_prob,
      device
    );
    this.ln1 = new LayerNorm(in_size);
    this.fcc = new FullyConnected(in_size, out_size, dropout_prob, device, true);
    this.ln2 = new LayerNorm(out_size);
  }
  /**
   * Passes "x" tensor through a full transformer Block.
   * @param {Tensor} x - input Tensor.
   * @returns {Tensor} new Tensor.
   */
  forward(x) {
    let z = x.add(this.att.forward(this.ln1.forward(x)));
    z = z.add(this.fcc.forward(this.ln2.forward(z)));
    return z;
  }
}
class Embedding extends Module {
  E;
  constructor(in_size, embed_size) {
    super();
    this.E = randn([in_size, embed_size], true, false);
  }
  /**
   * Extracts embedding from rows in "idx":
   * @param {Tensor} idx - rows to get embedding from.
   * @returns {Tensor} new Tensor. Out = (In @ W) + b.
   */
  forward(idx) {
    const [B, T] = idx.shape;
    let x = this.E.at(idx);
    x = x.reshape([B, T, this.E.shape[1]]);
    return x;
  }
}
class PositionalEmbedding extends Module {
  E;
  constructor(n_timesteps, embed_size) {
    super();
    this.E = randn([n_timesteps, embed_size], true, false);
  }
  /**
   * Gets embedding for timesteps in "idx" array.
   * @param {object} idx - Array [Batch x Timesteps]. Timesteps will be filled with positional embeddings.
   * @returns {Tensor} new Tensor.
   */
  forward(idx) {
    const [_, T] = idx.shape;
    const x = this.E.at([...Array(T).keys()]);
    return x;
  }
}
class ReLU extends Module {
  constructor() {
    super();
  }
  /**
   * Performs forward pass through Rectified Linear Unit nonlinearity. Returns z if z>0 else 0.
   * @param {Tensor} z - input Tensor.
   * @returns {Tensor} new Tensor.
   */
  forward(z) {
    function _relu(z2) {
      if (typeof z2[0] === "number") {
        return z2.map((el) => {
          if (el > 0) {
            return 1;
          } else {
            return 1e-3;
          }
        });
      } else if (typeof z2[0] === "object") {
        return z2.map((el) => _relu(el));
      } else
        throw Error("In ReLU, provided Tensor is not homogenous.");
    }
    const mask = tensor(_relu(z._data));
    z = z.mul(mask);
    return z;
  }
}
class Softmax extends Module {
  constructor() {
    super();
  }
  /**
   * Performs forward pass through Softmax nonlinearity.
   * @param {Tensor} z - input Tensor.
   * @param {number} dim - dimension across which to apply Softmax.
   * @returns {Tensor} new Tensor.
   */
  forward(z, dim = -1) {
    z = exp(z);
    const out = z.div(z.sum(dim, true));
    return out;
  }
}
class Dropout extends Module {
  p;
  constructor(drop_prob) {
    super();
    this.p = drop_prob;
    this.mode = "train";
  }
  /**
   * Performs forward pass through Dropout layer. Sets random values to zero (this.p % of the total).
   * @param {Tensor} z - input Tensor.
   * @returns {Tensor} new Tensor.
   */
  forward(z) {
    if (this.mode == "eval") {
      return z;
    }
    const mask = rand(z.shape);
    let a = z.masked_fill(
      mask,
      (el) => {
        return el < this.p;
      },
      0
    );
    a = a.div(1 - this.p);
    return a;
  }
}
class LayerNorm extends Module {
  gamma;
  beta;
  constructor(n_embed) {
    super();
    this.gamma = ones([n_embed], true);
    this.beta = zeros([n_embed], true);
  }
  forward(x) {
    const var_x = x.variance(-1, true);
    const norm_x = x.sub(x.mean(-1, true)).div(sqrt(var_x));
    const z = mul(norm_x, this.gamma).add(this.beta);
    return z;
  }
}
class CrossEntropyLoss extends Module {
  constructor() {
    super();
  }
  /**
   * Performs forward pass through CrossEntropyLoss, returns loss.
   * @param {Tensor} z - Output from the last layer of the network. Must have shape like (*Batch dimentions, Number of possible classes).
   * @param {object} y - Correct indexes expected from the model.
   * @returns {object} Negative-log-likelihood loss of the model output.
   */
  forward(z, y) {
    let zDims = z.shape;
    const D = zDims.slice(zDims.length - 1, zDims.length)[0];
    zDims = zDims.slice(0, zDims.length - 1);
    const B = zDims.reduce((a, b) => a * b, 1);
    z = z.reshape([B, D]);
    const logitsExp = exp(z);
    const logitsSum = logitsExp.sum(1, true);
    const logits = logitsExp.div(logitsSum);
    const y_array = _reshape(y.data, [B]);
    const at_logits = logits.at([...Array(B).keys()], y_array);
    const log_losses = log(at_logits);
    let loss = log_losses.sum(-1).neg();
    loss = loss.div(B);
    return loss;
  }
}
/**
 * Mean Squared Error Loss class, returns the loss given the network output and the expected output.
 */
export class MSELoss extends Module {
  /**
   * Constructor.
   */
  constructor() {
    super();
  }

  /**
   * Performs forward pass through MSELoss, returns loss.
   * @param {Tensor} z - Output from the last layer of the network.
   * @param {object} y - Correct outputs expected from the model.
   * @returns {object} Mean Squared Error loss of the model output.
   */
  forward(z, y) {
    // Get data's shape:
    let zDims = z.shape;
    // Get last dimension:
    const D = zDims.slice(zDims.length - 1, zDims.length)[0];
    // Get product of all batch dimensions:
    zDims = zDims.slice(0, zDims.length - 1);
    const B = zDims.reduce((a, b) => a * b, 1);
    // Flatten out the batch dimensions:
    z = z.reshape([B, D]);
    y = y.reshape([B, D]);
    const S = z.sub(y);
    const P = S.pow(2);
    const Su = P.sum();
    let loss = Su.mean();
    loss = loss.div(B);
    return loss;
  }
}
/**
 * Saves the model to a JSON file.
 * @param {Module} model - Model to be saved in JSON file.
 * @param {string} file - JSON file.
 */
function save(model, file) {
  /**
   * Filters object, returning 'null' instead of 'value' for certain keys.
   * @param {object} obj - Objects with keys and values that we have to filter.
   * @returns {object} Filtered object.
   */
  function recursiveReplacer(obj){
    let result = {};
    for (var x in obj) {
      if (x !== "forwardKernel" && x !== "backwardKernelA" && x !== "backwardKernelB" && x !== "gpu") {
        if (typeof obj[x] === 'object' && !Array.isArray(obj[x])) {
          result[x] = recursiveReplacer(obj[x]);
        } else {
          result[x] = obj[x];
        }
      } else {
        result[x] = null;
      }
    }
    return result 
  }
  const data = JSON.stringify(recursiveReplacer(model));
  fs.writeFileSync(file, data);
}
function load(model, file) {
  const loadedData = fs.readFileSync(file);
  let loadedModel = JSON.parse(loadedData.toString());
  loadParameters(loadedModel, model);
  return model;
}
function loadParameters(source, target) {
  for (const [key, value] of target.entries()) {
    if (value instanceof Module) {
      loadParameters(source[key], target[key]);
    } else if (value instanceof Parameter || value instanceof Tensor) {
      target[key]._data = source[key]._data;
      target[key].m = source[key].m;
      target[key].v = source[key].v;
    }
  }
}

class Adam {
  // Declare Adam's types:
  params;
  lr;
  reg;
  b1;
  b2;
  eps;
  constructor(params, lr = 1e-3, reg = 0, betas = [0.9, 0.99], eps = 1e-9) {
    this.params = params;
    this.lr = lr;
    this.reg = reg;
    this.b1 = betas[0];
    this.b2 = betas[1];
    this.eps = eps;
    this.reg = reg;
    for (let i = 0; i < this.params.length; i++) {
      this.params[i].m = zeros(this.params[i].shape);
      this.params[i].v = zeros(this.params[i].shape);
    }
  }
  /**
   * Updates all parameters in this.params with their gradients.
   */
  step() {
    for (let i = 0; i < this.params.length; i++) {
      this.params[i].m = this.params[i].m?.mul(this.b1).add(this.params[i]._grad?.mul(1 - this.b1));
      this.params[i].v = this.params[i].v?.mul(this.b2).add(this.params[i]._grad?.pow(2).mul(1 - this.b2));
      const update_tensor = this.params[i].m?.mul(this.lr).div(this.params[i].v?.sqrt().add(this.eps)).neg();
      const regularization_tensor = this.params[i].mul(this.reg * this.lr).neg();
      this.params[i]._data = this.params[i].add(
        update_tensor?.add(regularization_tensor)
      )._data;
    }
  }
  /**
   * Sets all the gradients of self.params to zero.
   */
  zero_grad() {
    for (let i = 0; i < this.params.length; i++) {
      this.params[i].zero_grad();
    }
  }
}

const nn = {
  Module,
  Linear,
  MultiHeadSelfAttention,
  FullyConnected,
  Block,
  Embedding,
  PositionalEmbedding,
  ReLU,
  Softmax,
  Dropout,
  LayerNorm,
  CrossEntropyLoss,
  MSELoss
};
const optim = { Adam };
const torch = {
  // Add methods from tensor.js (these methods are accessed with "torch."):
  Tensor,
  Parameter,
  add,
  neg,
  mul,
  div,
  matmul,
  exp,
  log,
  sqrt,
  pow,
  mean,
  masked_fill,
  variance,
  at,
  reshape,
  _reshape,
  transpose,
  tensor,
  randint,
  randn,
  rand,
  tril,
  ones,
  zeros,
  broadcast,
  save,
  load,
  // Add submodules:
  nn,
  optim,
  getShape
};

exports.torch = torch;