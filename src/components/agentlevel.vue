<template>
    <select class="form-control w-sm c-select" v-model="level" @change="onChange">
        <option value="">{{$t('common.please_select')}}</option>
        <option class="form-control" value="{{l.id}}" v-for="l in levels">{{l.name}}</option>
    </select>
</template>

<script>
import api from '../api'
export default {
    props: ['level', 'default'],
    data () {
        return {
            levels: []
        }
    },
    ready () {
        this.$http.get(api.agentlevel)
        .then(response => {
            this.levels = response.data
            if (this.default) {
                this.level = this.default
            }
        })
    },
    methods: {
        onChange: function () {
            this.$dispatch('level-select', this.level)
        }
    }
}
</script>

