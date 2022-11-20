const dataHome = {
  // data của slider,id là id của sản phẩm sau khi nhấn vào ra chi tiết sản phẩm đó

  banner: [
    {
      id: 1,
      img: 'assets/images/slideshow1-2.jpg',
      caption: {
        text_top: 'Trendy dress',
        text_center: 'Winter ',
        text_bottom: 'Collection',
      },
    },
    {
      id: 2,
      img: 'assets/images/slideshow1-1.jpg',
      caption: {
        text_top: 'Trendy dress',
        text_center: 'Winter ',
        text_bottom: 'Collection',
      },
    },
    {
      id: 3,
      img: 'assets/images/slideshow1-3.jpg',
      caption: {
        text_top: 'Trendy dress',
        text_center: 'Winter ',
        text_bottom: 'Collection',
      },
    },
  ],
  //data của danh mục sản phẩm,id phải là id của danh mục nào đó
  category: [
    {
      id: 1,
      name: 'Stylish Leather watch',
      upto: 50,
      img: 'assets/images/cat-1.jpg',
    },
    {
      id: 2,
      name: 'Ladies hand bag',
      upto: 40,
      img: 'assets/images/cat-2.jpg',
    },
    {
      id: 3,
      name: 'Trendy shoe',
      upto: 50,
      img: 'assets/images/cat-3.jpg',
    },
  ],
  //data của sản phẩm ,bấm vào là phải có id của chi tiết sản phẩm,tức id là id của từng sản phẩm sản phẩm

  products: [
    {
      id: 1,
      img: 'assets/images/444.jpg',
      name: 'Floral Kirby',
      sale: true,
      price: 329.1,
    },
    {
      id: 2,
      img: 'assets/images/111.jpg',
      name: 'Open knit switer',
      sale: false,
      price: 29.1,
    },
    {
      id: 3,
      img: 'assets/images/322.jpg',
      name: 'Official trendy',
      sale: true,
      price: 350.0,
    },
    {
      id: 4,
      img: 'assets/images/444.jpg',
      name: 'Floral Kirby',
      sale: true,
      price: 329.1,
    },
    {
      id: 5,
      img: 'assets/images/111.jpg',
      name: 'Open knit switer',
      sale: false,
      price: 29.1,
    },
    {
      id: 6,
      img: 'assets/images/322.jpg',
      name: 'Official trendy',
      sale: true,
      price: 350.0,
    },
    {
      id: 7,
      img: 'assets/images/111.jpg',
      name: 'Open knit switer',
      sale: false,
      price: 29.1,
    },
    {
      id: 8,
      img: 'assets/images/322.jpg',
      name: 'Official trendy',
      sale: true,
      price: 350.0,
    },
  ],
  //   data danh sach best sale tương tự như product nhưng phải là best salllers
  // vi du
  bestSale: [
    {
      img: 'assets/images/444.jpg',
      name: 'Floral Kirby',
      sale: true,
      price: 329.1,
    },
  ],
  //   data danh sach san phẩm mới tương tự như product nhưng phải là sản phẩm mới
  // vi du
  newArrivals: [
    {
      img: 'assets/images/444.jpg',
      name: 'Floral Kirby',
      sale: true,
      price: 329.1,
    },
  ],
};
// không hiểu gì thì hỏi,không làm bậy
export default dataHome;
