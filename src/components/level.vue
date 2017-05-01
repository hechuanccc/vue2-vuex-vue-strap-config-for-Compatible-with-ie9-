<template>
    <select class="form-control w-sm c-select" v-model="level" @change="onChange" v-if="mode==='select'" :required="req">
        <option value="">{{$t('common.please_select')}}</option>
        <option class="form-control" value="{{l.id}}" v-for="l in levels">{{l.name}}</option>
    </select>
    <div v-else>
        <label class="ui-check ui-check-md m-r"  v-for="l in levels">
            <input type="checkbox" name="paymenttype" value="{{l.id}}" v-model="level" >
            <i class="dark-white"></i>
            {{l.name}}
        </label>
    </div>
</template>

<script>
import api from '../api'
export default {
    props: {
        req: {
            default: false
        },
        level: [String, Number],
        default: [String, Number],
        mode: {
            default: 'select'
        }
    },
    data () {
        return {
            levels: []
        }
    },
    ready () {
        this.$http.get(api.level)
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

