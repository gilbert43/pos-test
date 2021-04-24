<script>
import Card from '@/components/Card.vue';
import ProductForm from "./Form.vue";

export default {
    name: "Products",

    data() {

        return {
            products: [],
            loading: false,
            addProduct: false,
            product: {
                name: ``,
                description: ``,
                qty: 0,
            }
        };
    },

    components: {
        Card, ProductForm
    },

    mounted() {
        this.fetchProducts();
    },

    methods: {

        fetchProducts() {
            this.loading=true;
            this.$http(`GET`)(`products`).then(data => {
                this.products=data.data;
                this.loading=false;
            }).catch(() => {this.loading=false;});
        },

        saveProduct() {

        },
    },
}
</script>
<template>
    <card>
        <template v-slot:header>
            <div class="row">
                <div class="col-md-6 col-12">
                    <h5 class="h5">Products</h5>
                </div>
                <div class="col-md-6 col-12 text-right">
                    <button @click.prevent="addProduct=true"
                        class="btn-sm btn-primary">Add Product</button>
                </div>
            </div>
            <ProductForm 
                :showModal="addProduct"
                @refresh="fetchProducts" 
                @closeModal="addProduct=false" />
        </template>
        <template v-slot:body>
            <div class="row">
                <div class="col-12">
                    <table class="table">
                        <thead>
                           <tr>
                               <th>#</th>
                               <th>Name</th>
                               <th>Description</th>
                               <th>Qty</th>
                               <th>Created At</th>
                           </tr> 
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td class="text-center" colspan="6">Loading</td>
                            </tr>
                            <tr v-for="(product,idx) in products" :key="product.id">
                                <td>{{idx+1}}</td>
                                <td>{{product.name}}</td>
                                <td>{{product.description}}</td>
                                <td>{{product.quantity}}</td>
                                <td>{{$root.formatDate(product.created_at)}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
        <template v-slot:footer>

        </template>
    </card>
</template>