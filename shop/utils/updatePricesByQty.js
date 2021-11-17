export const updatePricesByQty = (product, productPricesByQty, callback) => {
  const tempProductPricesByQty = [...productPricesByQty];
  const indexToUpdate = productPricesByQty.findIndex((bagProduct) => {
    return bagProduct.id === product.id;
  });

  if (indexToUpdate !== -1) {
    tempProductPricesByQty[indexToUpdate].qty = product.qty;
    tempProductPricesByQty[indexToUpdate].totalPrice = product.totalPrice;
  } else {
    tempProductPricesByQty.push(product);
  }

  callback(tempProductPricesByQty);
};
