<template>
    <select class="form-control w-sm c-select" v-model="returnsetting">
        <option value="">{{$t('common.please_select')}}</option>
        <option class="form-control" value="{{r.id}}" v-for="r in returnsettings">{{r.name}}</option>
    </select>
</template>

<script>
import api from '../api'
export default {
    props: ['returnsetting', 'default', 'defaultOption'],
    data () {
        return {
            returnsettings: []
        }
    },
    ready () {
        this.$http.get(api.return + '?opt_fields=id,name')
        .then(response => {
            this.returnsettings = response.data
            if (this.default) {
                this.returnsetting = this.default
            }
        })
    }
}
</script>

