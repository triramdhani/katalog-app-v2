export default [
  {
    id: '1',
    metaTitle: "laptop thinkpad x250",
    rating: 5.0,
    metaImage:'thinkpad.jpg',
    metaPrice: 2000000,
    metaDiscount: '5%' , 
    sold: 999,
    tag: 'Elektronik',
    koleksigambarNolinked : ['thinkpad.jpg','thinkpad2.jpg'],
    detailProduct: 'Lorem ipsum dolor sit.',
    deskripsiProduct: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    variant: [
      {
        idVariant: '8500',
        namaVariant: 'Thinkpad x250 ram 8gb hdd 500gb',
        imageVariant: '',
        priceVariant: '3000000',
        discountVariant: '4%',
        stockVariant: '3',
        isAvailableVariant: true,
      },
      {
        idVariant: '4250',
        namaVariant: 'Thinkpad x250 ram 4gb hdd 250gb',
        imageVariant: '',
        priceVariant: '2500000',
        discountVariant: '5%',
        stockVariant: '100',
        isAvailableVariant: true,
      },
    ]
  },
  {
    id: '2',
    metaTitle: "Obat pelangsing",
    rating: 5.0,
    metaImage:'pelangsing1.jpg',
    metaPrice: 150000,
    metaDiscount: '2%' , 
    sold: 9999,
    tag: 'kecantikan',
    koleksigambarNolinked: [],
    detailProduct: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    deskripsiProduct :"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae praesentium qui suscipit saepe voluptatem facere aliquid iste esse dicta ratione?",
    variant: [
      {
        idVariant: '111',
        namaVariant: 'Obat pelangsing 30kg dalam 1 hari',
        imageVariant: 'pelangsing1.jpg',
        priceVariant: '300000',
        discountVariant: '6%',
        stockVariant: '50',
        isAvailableVariant: true,
      },
      {
        idVariant: '222',
        namaVariant: 'obat pelangsing 20kg dalam 2 hari',
        imageVariant: 'pelangsing2.jpg',
        priceVariant: '100000',
        discountVariant: '1%',
        stockVariant: '444',
        isAvailableVariant: true,
      },
    ]
  }
]