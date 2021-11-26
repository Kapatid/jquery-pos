import { Product, Cart, CartProduct, Receipt } from "../models.js"
import ProductRow from "./ProductRow.js"
import ReceiptRow from "./ReceiptRow.js"

const controller = () => {
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

  let btnAddProdClicked = false
  /**
   * Check if product already exists in cart.
   * 
   * @param {CartProduct} cartProduct 
   */
  const isProductInCart = (cartProduct) => {
    let productInCart = false

    cart.products.forEach((item, index) => {
      if (item.product.name === cartProduct.product.name) {
        productInCart = true
        
        if (!btnAddProdClicked) {
          $('#alert')
            .text(`${cartProduct.product.name} is already in cart.`)

          $('#alert').fadeIn('fast', function() {
            btnAddProdClicked = true

            $(this).delay(1000).fadeOut('slow', function() {
              btnAddProdClicked = false
            })
          })
        }

        return
      }
    })

    !productInCart && addProduct(cartProduct)
  }

  /**
   * Used to display receipt and the products in it.
   * 
   * @param {Receipt} receipt
   */
  const showReceipt = (receipt) => {
    $('#receipt-table').show()

    receipt.products.forEach((item) => {
      $('#receipt-header').after(ReceiptRow(item))
    })

    const today = new Date(receipt.createdAt)
    today.toUTCString()
    $('#receipt-datetime').text(today)
    $('#receipt-price').text(`₱ ${receipt.totalPrice}`)
  }

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
      let receipt = new Receipt(cart.products)
      cart = new Cart([], 0)

      $('.product').remove()
      $('#price').text(`₱ ${cart.totalPrice}`)

      showReceipt(receipt)

      alert('Checkout successful!')
    } else {
      alert('Please add a product first.')
    }
  })
}

const Pos = () => `
  <div id="products">
    <table id="products-table">
      <tr id="table-header">
        <th>NAME</th>
        <th id="th-quantity">QUANTITY</th>
        <th id="th-price">PRICE</th>
        <th id="th-remove">&nbsp;</th>
      </tr>

      <tr id="total">
        <td>&nbsp;</td>
        <td id="title">Total:</td>
        <td id="price">₱ 0</td>
        <td>&nbsp;</td>
      </tr>
    </table>

    <button id="btn-checkout">Checkout</button>

    <table id="receipt-table">
      <tr>
        <th id="receipt-title" colspan="3">
          RECEIPT
          <br>
          <p id="receipt-datetime">datetime</p>
        </th>
      </tr>

      <tr id="receipt-header">
        <th>NAME</th>
        <th id="th-quantity">QUANTITY</th>
        <th id="th-price">PRICE</th>
      </tr>

      <tr id="total">
        <td>&nbsp;</td>
        <td id="title">Total:</td>
        <td id="receipt-price">₱ 0</td>
      </tr>
    </table>
  </div>
`

export default { str: Pos, callback: controller }