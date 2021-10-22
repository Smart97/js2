const APIURL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";


Vue.component('goods-list', {
    props:['goods'],
    template: `
    <div class="goods-list">
        <goods-item 
            v-for='good in goods'
            v-bind:title='good.title'
            v-bind:price='good.price'>
        </goods-item>
    </div>
    `
});

Vue.component('goods-item', {
    props: {
        title: String,
        price: Number,
    },
    template: `
    <div class="goods-item">
        <h3>{{ title }}</h3>
        <p>{{ price }}</p>
    </div>
    `
});

Vue.component('cart', {
    template:`
    <div class="cart">
        <cart-good 
        v-if='visibility'
        v-for='good in cartGoods'
        v-bind:name = good.name
        v-bind:price = good.price
        v-bind:quantity = good.quantity
        ></cart-good>
    </div>
    `,
    props: {
        cartGoods: Array,
        visibility: Boolean,
    },
    
});

Vue.component('cart-good', {
    template: `
    <div class="cart-good">
        <h2>{{ name }}</h2>
        <p>{{ price }}</p>
        <p>{{ quantity }}</p>
    </div>
    `,
    props: {
        name: String,
        price: Number,
        quantity: Number,
    },
})


Vue.component('search', {
    template: `
    <div class="search">
        <input type="text" id="search-line" v-model="searchLine" @keyup.enter='search'>
        <button @click='search'>Искать</button>
    </div>
    `,
    data() {
       return {
            searchLine: ''
        }
    },
    methods: {
        search() {
            this.$emit('search', this.searchLine )
        }
    }
});

Vue.component('error', {
    template: `
    <div class="error-container" v-if=visibility>
        <div class='error-message'>
            <h2>Fetch error, status {{status}}</h2>
        </div>
    </div>
    `,
    props: {
        status: Number,
        visibility: Boolean,
    }
})


const app = new Vue(
    {
        el: '#app',
        data: {
            goods: [],
            filteredGoods: [],
            searchLine: '',
            cartVisibility: false,
            isFetchError: false,
            errorStatus:0,
            cartGoods: [{
                name: 'Мышка',
                price: 1000,
                quantity: 2,
            }, {
                name: 'ноут',
                price: 10000,
                quantity: 1,
            }],
        },
        methods: {
            fetchGoods() {
                fetch(`${APIURL}/catalogData.json`).then((result) => {
                    if(result.status == 200) {
                        return result.json();
                    } else {
                        console.log(result.status);
                        this.isFetchError = !this.isFetchError;
                        this.errorStatus = result.status;
                        //errorSwitch(); аналог cartSwitch()  вызывает referenceerror
                    };
                })
                .then((result) => {
                    this.goods = result.map(item => ({title: item.product_name, price: item.price, id: item.id_product}))
                    this.filteredGoods = this.goods;
                })
                .catch((err) => {
                    console.log('fetch error '+ err)
                });
            },
            searchGoods(searchLine) {
                let pattern = new RegExp(searchLine.trim(), 'i')
                this.filteredGoods = this.goods; 
                this.filteredGoods = this.goods.filter(good => pattern.test(good.title))
                this.searchLine = searchLine;
            },
            cartSwitch() {
                this.cartVisibility = !this.cartVisibility;
            },
        },
        mounted() {
            this.fetchGoods()
        },
        computed: {

        }
      
    }
);
