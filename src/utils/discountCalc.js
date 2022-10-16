function discountCalc(price, discount) {
  if (discount === 0) {
    return price
  } else {
    let potongan = price * discount / 100
    return price - potongan
  }
}

export default discountCalc