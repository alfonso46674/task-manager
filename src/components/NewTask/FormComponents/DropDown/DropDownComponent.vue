<template>
  <div>
      {{dropdownName}}

    <button
      class="btn btn-outline-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{selectedItem}}
    </button>
    <ul class="dropdown-menu" re>
      <li v-for="item in dropdownItems" :key="item" class="dropdown-item" :value="item" @click="updateSelectedItem(item)" >{{item}}</li>  
    </ul>
  </div>
</template>

<script>
import {useStore} from 'vuex'

export default {
    props:{
        dropdownName: {
            type: String,
            required:true
        },
        dropdownItems: {
            type: Array,
            required: true,
        },
        selectedItem: {
          required:true
        
        }
    }, 
    setup(){
        const store = useStore()

        const updateSelectedItem =(item) =>{
            store.commit('newTask/setPriority',item)
        }
    return {
      updateSelectedItem,
    }
    }
};
</script>

<style>
</style>