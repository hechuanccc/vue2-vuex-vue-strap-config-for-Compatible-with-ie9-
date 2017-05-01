<template>
    <select v-model="bank" class="form-control w-sm c-select" :required="req">
        <option class="form-control" value="">请选择</option>
        <option class="form-control" value="{{b.id}}" v-for="b in banks">{{b.name}}</option>
    </select>
</template>

<script>
import api from '../api'
export default {
    props: ['bank', 'req'],
    data () {
        return {
            banks: []
        }
    },
    ready () {
        this.$http.get(api.bank)
        .then(response => {
            this.banks = response.data
        })
    }
}
</script>

