import { CartProduct } from "./classes.js"

/**
 * Product component to be used for viewing 
 * details of a product.
 * 
 * @param {CartProduct} cartProduct 
 * @returns {string} element
 */
const ProductRow = (cartProduct) => {
  return `
    <tr class="product">
      <td class="product-name">${cartProduct.product.name}</td>
      <td class="product-quantity">
        <input 
          class="product-quantity-input"
          type="number"
          min="1"
          max="10" 
          onKeyDown="return false" 
          class="product-quantity" 
          value="${cartProduct.quantity}"
        />
      </td>
      <td class="product-price">₱ ${cartProduct.product.price}</td>
      <td><button class="btn-remove">Remove</button></td>
    </tr>
  `
}

export default ProductRow