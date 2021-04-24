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
    },

    methods: {
        saveSupplier() {
            this.loading=true;
            this.$http(`POST`, this.supplier)(`new-supplier`).then(() => {
                this.supplier={
                    name: ``,
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
            Add Supplier
        </template>
        <template v-slot:body>
            <form id="add-supplier" @submit.prevent="saveSupplier">
                <div class="row">
                    <div class="col-12 p-2">
                        <label for="name" class="form-label">Name:</label>
                        <input type="text" v-model.trim="supplier.name" 
                            class="form-control" id="name" required>
                        <p v-if="errors['name'] && errors['name'].length">
                          {{errors['name'].join(' ')}}
                        </p>
                    </div>
                </div>
            </form>
        </template>
        <template v-slot:footer>
            <button @click.prevent="$emit(`closeModal`)"
                class="btn-sm btn-danger">Close</button>
            <button v-if="!loading" type="submit" form="add-supplier"
                class="btn-sm btn-info">Save</button>
            <div v-else>Loading</div>
        </template>
    </modal>
</template>