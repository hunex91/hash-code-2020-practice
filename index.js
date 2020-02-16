const fs = require('fs')
const _ = require('lodash')

const INPUT_FILE_PATH = './input/a_example.in';
const OUTPUT_FILE_PATH = './output/a_example.out';

// Read the file to an array, every line will be an element of the array
const file = read(INPUT_FILE_PATH)

// Convert the lines into an object, containing the M, N and the list of pizzas
const input = convert(file)

// Create the output
const output = orderPizza(input)

// Write the result to a file
write(output, OUTPUT_FILE_PATH)

// Log to console
console.log('Input', input)
console.log('Output', output)

/**
 * Read an input file and return it's content as an array. Every line is an element in the array.
 * @param {String} path The file path
 */
function read(path) {
  return fs.readFileSync(path).toString().split('\n')
}

function write(output, path) {
  const lines = [
    output.pizzaCount,
    output.order.map(x => x.index).join(' '),
    ''
  ].join('\n')

  fs.writeFileSync(path, lines)
}

/**
 * Convert the input file to an object.
 * @param {Array} file The raw file as string lines
 */
function convert(file) {
  const [ line1, line2 ] = file
  const [ M, N ] = line1.split(' ').map(x => Number(x))
  const list = line2.split(' ').map((x, i) => ({ index: i, slices: Number(x) }))

  return {
    M, N, list
  }
}

/**
 * Sort array. Returns a new array.
 * @param {Array} array The array
 */
function sort({ array, by, asc = true }) {
  return asc ? 
    _.sortBy(array, by) : 
    _.sortBy(array, by).reverse()
}

/**
 * Solve the problem, order the pizza.
 * @param {Object} input The input object.
 */
function orderPizza(input) {
  const { M, N } = input

  let pizzaCount = 0
  let sliceCount = 0
  let order = []

  const sorted = sort({ array: input.list, by: 'slices', asc: false })

  let pizza
  for (let i = 0; i < sorted.length; i++) {
    pizza = sorted[i]
    if (sliceCount + pizza.slices <= M) {
      order.push(pizza)
      pizzaCount += 1
      sliceCount += pizza.slices
    } else {
      continue
    }
  }

  return {
    pizzaCount,
    sliceCount,
    order: sort({ array: order, by: 'index', asc: true })
  }
}