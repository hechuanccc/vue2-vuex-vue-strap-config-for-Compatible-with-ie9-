<template>
    <select class="form-control w-sm c-select" v-model="commissionsetting">
        <option value="">{{$t('common.please_select')}}</option>
        <option class="form-control" value="{{r.id}}" v-for="r in commissionsettings">{{r.name}}</option>
    </select>
</template>

<script>
import api from '../api'
export default {
    props: ['commissionsetting', 'default'],
    data () {
        return {
            commissionsettings: []
        }
    },
    ready () {
        this.$http.get(api.commission + '?opt_fields=id,name')
        .then(response => {
            this.commissionsettings = response.data
            if (this.default) {
                this.commissionsetting = this.default
            }
        })
    }
}
</script>

