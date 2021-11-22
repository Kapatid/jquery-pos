import { Product, Cart, CartProduct } from "./classes.js"
import ProductRow from "./ProductRow.js"

/**
 * Returns a random number based on given min & max.
 * 
 * @param {number} min
 * @param {number} max
 * @returns number
 */
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** An array of sample products. */
const products = [
  new Product("Burger", 120),
  new Product("Beef Bento", 180),
  new Product("Tonkotsu Ramen", 150),
  new Product("Fried Chicken", 150)
]

let cart = new Cart([], 0)

/**
 * Add product to cart.
 * 
 * @param {CartProduct} cartProduct 
 */
const addProduct = (cartProduct) => {
  cart.products.push(cartProduct)

  // Insert product row to table
  $('#table-header').after(ProductRow(cartProduct))

  $('#price').text(`₱ ${cart.totalPrice}`)

  $(".product-quantity-input").on('change', function() {
    const input = $(this)
    const productName = input.parent().prev().text()

    cart.products.forEach(function(item, index) {
      if (item.product.name === productName) {
        cart.products[index].quantity = input.val()
        
        $('#price').text(`₱ ${cart.totalPrice}`)

        return
      }
    })
  })

  $('.btn-remove').on('click', function() {
    const btnClicked  = $(this)
    const productName = btnClicked.parent().prev().prev()
      .prev().text()

    cart.products = cart.products.filter(
      p => p.product.name !== productName
    )

    btnClicked.parent().parent().remove()

    $('#price').text(`₱ ${cart.totalPrice}`)
  })
}

/**
 * Check if product already exists in cart.
 * 
 * @param {CartProduct} cartProduct 
 */
const isProductInCart = (cartProduct) => {
  let productInCart = false

  cart.products.forEach(function(item, index) {
    if (item.product.name === cartProduct.product.name) {
      productInCart = true
      $('#alert')
        .text(`${cartProduct.product.name} is already in cart.`)

      $('#alert').fadeIn('fast', function() {
        $(this).delay(1000).fadeOut('slow')
      })

      return
    }
  })

  !productInCart && addProduct(cartProduct)
}

/** Main function for executing POS logic. */
export default function Pos(){
  
  $('#add-product').on('click', function() {
    /** Product to be added to cart that is randomly picked. */
    const cartProduct = new CartProduct(
      products[randomNumber(0,3)],
      randomNumber(1,3)
    )

    cart.products.length === 0 
      ? addProduct(cartProduct)
      : isProductInCart(cartProduct)
  })

  $('#btn-checkout').on('click', function() {
    if (cart.products.length !== 0) {
      cart = new Cart([], 0)
      $('.product').remove()
      $('#price').text(`₱ ${cart.totalPrice}`)

      alert('Checkout successful!')
    } else {
      alert('Please add a product first.')
    }
  })
}