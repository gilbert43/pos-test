<script>
export default {
    name: "Modal",

    props: {
        showModal: Boolean,
    }
}
</script>
<template>
<div class="modal fade" 
    :class="{
        'show': showModal
    }"
    :style="{
        display: showModal ? `block` : `none`,
        paddingRight: `17px`,
        overflow: `auto`
    }"
    id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" 
        tabindex="-1" aria-modal="true" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</div>
</template>