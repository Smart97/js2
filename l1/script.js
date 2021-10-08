const APIURL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
class goodsItem {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
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
     /*    this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ]; */
        
        fetch(`${APIURL}/catalogData.json`)
        .then((result) => {
            return result.json();
        })
        .then((result) => {
            this.goods = result.map(item => ({title: item.product_name, price: item.price, id: item.id_product}))
            this.render('.goods-list')
        })
        .catch((err) => {
            console.log(err.text)
        });
    }
    render(container) {
        let listHTML = '';
        this.goods.forEach(good => {
            const goodItem = new goodsItem(good.title, good.price, good.id);
            listHTML += goodItem.render('goods-item');
        }); 
         document.querySelector(container).insertAdjacentHTML('beforeend', listHTML)    
    }
    calculatePrice() {
        let totalPrice = 0;
        this.goods.forEach(item => {totalPrice += item.price}) //стоимость конкретного товара с учетом количества элементов будет считаться в самом товаре в calculatePrice()
    }
}


class basketItem extends goodsItem { 
   constructor() {
        super();
   }
   toJSON() {
        this.data = [];
        this.data.push(this.title);
        this.data.push(this.price);
        this.data.push(this.id);
        return JSON.stringify(this.data);
   };
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
   addItem(){
        fetch(`${APIURL}/addToBasket.json`, {
            method: 'POST',
            headers: 'application/json;charset=utf-8',
            body: this.toJSON()
        })
    };
    deleteItem(){
        fetch(`${APIURL}/deleteFromBasket.json`, {
            method: 'POST',
            headers: 'application/json;charset=utf-8',
            body: this.toJSON()
        })
    };
};

class basketClass extends goodsList {
    constructor() {
       super();
       this.countGoods = 0;
       this.totalPrice = 0;
        
    }
    fetchGoods() {
        fetch(`${APIURL}/getBasket.json`)
        .then((result) => {
            return result.json()
        })
        .then((result) => {
            this.goods = result.contents.map(good => ({title: good.product_name, price: good.price, id: good.id_product, quantity: good.quantity}))
            this.countGoods = result.countGoods;
            this.totalPrice = result.amount;
        })
        .catch((err) => {
            console.log(err.text)
        });
    }

    changeQuantity(){
        //Добавляем или убираем товар по одному или сразу до определенного значения, если убирается последний то вызывается deleteItem()
    };

};


const list = new goodsList();
list.fetchGoods();
//list.render('.goods-list');
const basket = new basketClass();
basket.fetchGoods();
