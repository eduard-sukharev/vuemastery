Vue.component(
    'product-details',
    {
        props: {
            details: {
                type: Array,
                required: true,
            }
        },
        template: `<ul><li v-for="detail in details">{{ detail }}</li></ul>`
    }
)

Vue.component(
    'product',
    {
        props: {
            premium: {
                type: Boolean,
                required: true,
            }
        },
        template: `
        <div class="product">
          <div class="product-image">
            <img v-bind:src="image">
          </div>
          <div class="product-info">
            <h1>{{ title }} <span v-show="onSale">On Sale!</span></h1>
              <p v-if="inventory >= 10">In Stock</p>
              <p v-else-if="inventory < 10 && inventory > 0">Almost sold out!</p>
              <p v-else :class="{outOfStock: inventory <= 0}">Out of Stock</p>
              <p>Shipping: {{ shipping }}</p>
    
              <a :href="link">Link to manufacturer page</a>
    
              <product-details :details="details"></product-details>
    
              <div v-for="(variant, index) in variants"
                   :key="variant.id"
                   class="color-box"
                   :style="{backgroundColor: variant.color}"
                   @mouseover="updateImage(index)"
              >
              </div>
    
              <p>{{ description }}</p>
    
              <button v-on:click="addToCart"
                      :disabled="inventory <= 0"
                      :class="{disabledButton: inventory <= 0}"
              >Add to cart</button>
    
              <div class="cart">
                  <p>Cart({{cart}})</p><button v-show="cart > 0" @click="removeFromCart">-</button>
              </div>
          </div>
        </div>`,
        data() {
            return {
                product: 'Socks',
                brand: 'Vue Mastery',
                description: 'Warm and colorfull socks to please your feet',
                link: 'https://example.com',
                details: [
                    '80% polyester',
                    '20% cotton',
                    'Gender-neutral',
                ],
                selectedVariant: 0,
                variants: [
                    {
                        id: 32154,
                        color: 'green',
                        image: './vmSocks-green-onWhite.jpg',
                        quantity: 50,
                    },
                    {
                        id: 65421,
                        color: 'blue',
                        image: './vmSocks-blue-onWhite.jpg',
                        quantity: 10,
                        onSale: true,
                    }
                ],
                cart: 0,
            }
        },
        methods: {
            addToCart() {
                this.cart++;
            },
            removeFromCart() {
                this.cart--;
            },
            updateImage(index) {
                this.selectedVariant = index;
                console.log(index);
            },
        },
        computed: {
            title() {
                return this.brand + ' ' + this.product;
            },
            image() {
                return this.variants[this.selectedVariant].image;
            },
            inventory() {
                return this.variants[this.selectedVariant].quantity;
            },
            onSale() {
                return this.variants[this.selectedVariant].onSale;
            },
            shipping() {
                if (this.premium) {
                    return 'Free'
                }

                return 2.99
            }
        },
    }
);

var app = new Vue({
    el: '#app',
    data: {
        premium: false
    },
})
