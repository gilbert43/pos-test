<script>
import Modal from '@/components/Modal.vue';
export default {
    name: "ProductForm",

    data() {

        return {
            product: {
                name: ``,
                description: ``,
                qty: 0,
            },
            loading: false,
            errors: {},
        }
    },

    props: {
        showModal: Boolean,
    },

    methods: {
        saveProduct() {
            this.loading=true;
            this.$http(`POST`, this.product)(`new-product`).then(() => {
                this.product={
                    name: ``,
                    description: ``,
                    qty: 0,
                };
                this.$emit(`refresh`);
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
            Add Product
        </template>
        <template v-slot:body>
            <form id="add-product" @submit.prevent="saveProduct">
                <div class="row">
                    <div class="col-12 p-2">
                        <label for="name" class="form-label">Name:</label>
                        <input type="text" v-model.trim="product.name" class="form-control" id="name" required>
                        <p v-if="errors['name'] && errors['name'].length">
                          {{errors['name'].join(' ')}}
                        </p>
                    </div>
                    <div class="col-12 p-2">
                        <label for="description" class="form-label">Description:</label>
                        <input type="text" v-model.trim="product.description" class="form-control" id="description">
                    </div>
                    <div class="col-12 p-2">
                        <label for="qty" class="form-label">Qty:</label>
                        <input type="number" v-model.trim="product.qty" class="form-control" id="qty">
                    </div>
                </div>
            </form>
        </template>
        <template v-slot:footer>
            <button @click.prevent="$emit(`closeModal`)"
                class="btn-sm btn-danger">Close</button>
            <button v-if="!loading" type="submit" form="add-product"
                class="btn-sm btn-info">Save</button>
            <div v-else>Loading</div>
        </template>
    </modal>
</template>