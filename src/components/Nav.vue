<script>
export default {
    name: "NavComponent",

}
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">POS</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <router-link :to="{name: `products.index`}" 
                  :class="$route.name ===`products.index` ? `active` : ``"
                  class="nav-link" aria-current="page">Products</router-link>
            </li>
            <li class="nav-item">
                <router-link 
                  :to="{name: `suppliers.index`}" 
                  :class="$route.name ===`suppliers.index` ? `active` : ``"
                  class="nav-link" aria-current="page">Suppliers</router-link>
            </li>
            <li class="nav-item">
                <router-link 
                  :class="$route.name ===`orders.index` ? `active` : ``"
                  :to="{name: `orders.index`}" class="nav-link" aria-current="page">Orders</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>