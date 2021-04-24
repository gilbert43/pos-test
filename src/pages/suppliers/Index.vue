<script>
import Card from '@/components/Card.vue';
import SupplierForm from "./Form.vue";
export default {
    name: "Suppliers",

    data() {

        return {
            suppliers: [],
            loading: false,
            addSupplier: false
        };
    },

    components: {
        Card, SupplierForm
    },

    mounted() {
        this.fetchSuppliers();
    },

    methods: {

        fetchSuppliers() {
            this.loading=true;
            this.$http(`GET`)(`suppliers`).then(data => {
                this.suppliers=data.data;
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
                    <h5 class="h5">Suppliers</h5>
                </div>
                <div class="col-md-6 col-12 text-right">
                    <button @click.prevent="addSupplier=true"
                        class="btn-sm btn-primary">Add Supplier</button>
                </div>
            </div>
            <SupplierForm 
                :showModal="addSupplier" 
                @closeModal="addSupplier=false"
                @refresh="fetchSuppliers"
            />
        </template>
        <template v-slot:body>
            <div class="row">
                <div class="col-12">
                    <table class="table">
                        <thead>
                           <tr>
                               <th>#</th>
                               <th>Name</th>
                               <th>Created At</th>
                           </tr> 
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td class="text-center" colspan="4">Loading</td>
                            </tr>
                            <tr v-for="(supplier, idx) in suppliers" :key="supplier.id">
                                <td>{{idx+1}}</td>
                                <td>{{supplier.name}}</td>
                                <td>{{$root.formatDate(supplier.created_at)}}</td>
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