/* 
 * Description: Root.js dynamically exports the correct component based on environment
 *				
 *
 * Project: Fleet
 * Group Members: Jordan Collins, Tristan Newmann, Hayden Cheers, Alistair Woodcock
 * Last modified: 11 October 2016
 * Last Author: Alistair Woodcock
 * 
 */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Root.prod')
} else {
  module.exports = require('./Root.dev')
}