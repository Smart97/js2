/* const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];


const $goodsList = document.querySelector('.goods-list');
  
const renderGoodsItem = ({ title, price }) => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};
  
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
            item => renderGoodsItem(item)
        ).join('');

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}
  
renderGoodsList();
 */

class goodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render(container) {
        return `<div class="${container}"><h3>${this.title}</h3><p>${this.price}</p></div>`
    }
}
class goodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render(container) {
        let listHTML = '';
        this.goods.forEach(good => {
            const goodItem = new goodsItem(good.title, good.price);
            listHTML += goodItem.render('goods-item');
            console.log(good)
        }); 
         document.querySelector(container).insertAdjacentHTML('beforeend', listHTML)    
    }
    calculatePrice() {
        let totalPrice = 0;
        this.goods.forEach(item => {totalPrice += item.price}) //стоимость конкретного товара с учетом количества элементов будет считаться в самом товаре в calculatePrice()
    }
}

//HW
class basketItem extends goodsItem { 
   deleteItem(){

   };
   calculatePrice() {
       //считает стоимость товара 
   }
   getPrice() {
        //получаем цену товара
   }
   getQuantity(){
        //получаем количество товаров
   }
};

class basket extends goodsList {
    addItem(){
        //добавление в корзину из общего списка товаров
    };
    deleteItem(){
        //удаляет предмет из корзины
    };
    changeQuantity(){
        //Добавляем или убираем товар по одному или сразу до определенного значения, если убирается последний то вызывается deleteItem()
    };

};


const list = new goodsList();
list.fetchGoods();
list.render('.goods-list');
