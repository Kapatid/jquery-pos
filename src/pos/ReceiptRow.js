import { CartProduct } from "./classes.js"

/**
 * Receipt row component to be used for viewing 
 * details of a product.
 * 
 * @param {CartProduct} cartProduct 
 * @returns {string} element
 */
const ReceiptRow = (cartProduct) => {
  return `
    <tr class="product">
      <td class="product-name">${cartProduct.product.name}</td>
      <td class="product-quantity">${cartProduct.quantity}</td>
      <td class="product-price">₱ ${cartProduct.product.price}</td>
    </tr>
  `
}

export default ReceiptRow