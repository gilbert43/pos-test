<script>
import Modal from '@/components/Modal.vue';
export default {
    name: "SupplierForm",

    data() {

        return {
            supplier: {
                name: ``,
            },
            loading: false,
            errors: {},
        }
    },

    props: {

        showModal: Boolean,
        items: Array,
        loadingItems:Boolean,
    },

    computed: {
        selectedItems() {
            if(!this.items.length) return [];

            const selectedItems = this.items.filter(item => item.amount > 0);

            return selectedItems.map(item => ({id: item.id, quantity: item.amount}));
        },
    },

    methods: {

        saveSupplier() {
            this.loading=true;
            this.$http(`POST`, {items: this.selectedItems})(`new-order`).then(() => {
                this.$emit(`refresh`);
                this.emit(`closeModal`);
                this.loading=false;
            }).catch((error) => {
                this.errors=error.errors
                this.loading=false;
            });
        }
    },
    components: {
        Modal
    }
}
</script>
<template>
    <modal :showModal="showModal">
        <template v-slot:header>
            Add Order
        </template>
        <template v-slot:body>
            <form id="add-order" @submit.prevent="saveSupplier">
                <div class="row">
                    <div class="col-12 p-2">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="loadingItems">
                                    <td colspan="3" class="text-center">Loading</td>
                                </tr>
                                <tr v-for="item in items" :key="item.id">
                                    <td>{{item.name}}</td>
                                    <td>{{item.quantity}}</td>
                                    <td>
                                        <input v-model.number="item.amount" 
                                            type="number" class="form-control">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
        </template>
        <template v-slot:footer>
            <button @click.prevent="$emit(`closeModal`)"
                class="btn-sm btn-danger">Close</button>
            <button v-if="!loading" type="submit" form="add-order"
                class="btn-sm btn-info">Save</button>
            <div v-else>Loading</div>
        </template>
    </modal>
</template>