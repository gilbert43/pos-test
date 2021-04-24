<script>
import Card from '@/components/Card.vue';
import AddOrder from './Form.vue';
export default {
    name: "Orders",

    data() {

        return {
            orders: [],
            items: [],
            loading: false,
            loadingItems: false,
            addOrder: false
        };
    },

    components: {
        Card, AddOrder,
    },

    mounted() {
        this.fetchOrders();
    },

    methods: {

        fetchOrders() {
            this.loading=true;
            this.$http(`GET`)(`orders`).then(data => {
                this.orders=data.data;
                this.loading=false;
            }).catch(() => {this.loading=false;});
        },

        fetchItems() {
            this.addOrder=true;
            this.loadingItems=true;
            this.$http(`GET`)(`products`).then(({data}) => {
                this.items=data;
                this.loadingItems=false;
            }).catch(() => {this.loadingItems=false;});
        },

        deleteOrder(order) {
            if(!window.confirm('Delete Order?')) return;
            this.loading=true;
            this.$http(`POST`, {id: order.id})(`delete-order`).then(() => {
                this.fetchOrders();
                this.loading=false;
            }).catch(() => {this.loading=false;});
        },
    },
}
</script>
<template>
    <card>
        <template v-slot:header>
            <div class="row">
                <div class="col-md-6 col-12">
                    <h5 class="h5">Orders</h5>
                </div>
                <div class="col-md-6 col-12 text-right">
                    <button @click.prevent="fetchItems"
                        class="btn-sm btn-primary">Add Order</button>
                </div>
            </div>
            <AddOrder 
                :showModal="addOrder" 
                @closeModal="addOrder=false"
                @refresh="() => {
                    fetchOrders();
                    fetchItems();
                }"
                :items="items"
                :loadingItems="loadingItems"
            />
        </template>
        <template v-slot:body>
            <div class="row">
                <div class="col-12">
                    <table class="table">
                        <thead>
                           <tr>
                               <th>Date</th>
                               <th>Order No</th>
                               <th>Ordered Items</th>
                               <th>Action</th>
                           </tr> 
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td class="text-center" colspan="4">Loading</td>
                            </tr>
                            <tr v-for="order in orders" :key="order.id">
                                <td>{{$root.formatDate(order.created_at)}}</td>
                                <td>{{order.orderNumber}}</td>
                                <td>{{order.count}}</td>
                                <td>
                                    <button @click.prevent="deleteOrder(order)"
                                        class="btn-sm btn-danger">Delete</button>
                                </td>
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