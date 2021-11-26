export class Product {
  /**
   * @param {string} name
   * @param {number} price
   */
  constructor(name, price) {
    this.name = typeof name === 'string' ? name : null
    this.price = typeof price === 'number' ? price : null
  }
}

export class CartProduct {
  /**
   * @param {Product} product
   * @param {number} quantity
   */
  constructor(product, quantity) {
    this.product = product instanceof Product ? product : null
    this.quantity = typeof quantity === 'number' ? quantity : null
  }
}

export class Cart {
  /**
   * @param {CartProduct[]} products
   */
  constructor(products) {
    this.products = Array.isArray(products) ? products : null
  }

  /**
   * Returns total price of items in cart
   * @returns {number} total
   */
  get totalPrice() {
    let total = 0

    this.products.forEach(function(item, index, arr) {
      const finalPrice = item.quantity * item.product.price
      total = total + finalPrice
    })

    return total
  }
}

export class Receipt extends Cart {
  // Not needed but useful for JSDOC
  createdAt = new Date()
  
  /**
   * @param {CartProduct[]} products 
   */
  constructor(products) {
    super(products)

    this.createdAt = Date.now()
  }
}