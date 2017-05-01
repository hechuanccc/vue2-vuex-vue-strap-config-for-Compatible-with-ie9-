<template>
    <div class="loading text-center" v-if="loading"><i class='fa fa-spinner '></i>   <b class="">正在加载中...</b>   </div>
    <div v-else>
        <div class="pull-left m-l" v-if="count !== 0">
            <span class="text-muted">共 {{count}} 条, 当前显示第 {{ queryset.length}} 条</span>
        </div>
        <div class="pull-center" >
            <div v-if="queryset.length === 0" class="text-muted">查无记录</div>
            <div v-else>
                <button class="md-btn w-md grey-600" @click="pull" v-if="queryset.length < count" :disabled="busy">
                    <span v-if="!busy">更多</span>
                    <span v-else>正在载入...</span>
                </button>
                <span v-else class="text-muted">已全部展示</span>
            </div>
        </div>
    </div>
</template>

<script>
// to perform a pulling, parent componet need to boardcast 'rebase' event
// once the comopnent is ready, and might trigger 'rebase' everytime needed
export default {
    props: {
        limit: {
            default: 10
        },
        queryset: {
            required: true,
            type: Array
        },
        query: {
            required: true,
            type: Object
        },
        extra: {
            default: '',
            type: String
        },
        api: {
            required: true,
            type: String
        },
        optexpand: {
            default: 1
        }
    },
    data () {
        return {
            count: 0,
            next: '',
            busy: false,
            loading: true
        }
    },
    methods: {
        rebase () {
            this.next = this.buildUrl(this.api, this.extra + '&opt_expand=' + this.optexpand + '&offset=0&limit=' + this.limit)
            this.queryset = []
            this.pull()
        },
        // pull queryset form back-end
        pull () {
            this.busy = true
            this.$http.get(this.next).then(response => {
                this.busy = false
                this.count = response.data.count
                this.queryset = this.queryset.concat(response.data.results)
                this.loading = false
                this.next = response.data.next
            }, response => {
                if (response.status === 401) {
                    this.$router.go('/login?next=' + this.$route.path)
                }
            })
        },
        // build router query string through this.query
        buildUrl (api, defaultQuery) {
            let url = api + (defaultQuery ? ('?' + defaultQuery) : '')
            let params = []
            let query = this.$route.query

            // sync query data with local data
            this.query = query
            for (let x in query) {
                if (query[x]) {
                    params.push(x + '=' + query[x])
                }
            }
            return url + (defaultQuery ? '&' : '?') + params.join('&')
        },
        // change the route, and then parent component will know and trigger route.data
        // and broadcast 'rebase' event
        submit () {
            let query = this.query

            for (let x in query) {
                if (query[x] === '') {
                    delete query[x]
                }
            }

            this.$router.go({
                name: this.$route.name,
                query: query
            })
        }
    }
}
</script>

