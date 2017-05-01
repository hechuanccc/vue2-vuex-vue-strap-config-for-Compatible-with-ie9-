<template>
    <div class="app-header white box-shadow" v-if="showNav">
        <div class="navbar">
            <div class="navbar-item pull-left h5 ng-binding" id="pageTitle">{{$route.title}}</div>

            <div class="dropdown pull-right my">
                <button class="btn white btn-sm dropdown-toggle" @click="dropdown=!dropdown">
                    <span class="dropdown-label">{{$root.username}}</span>
                    <span class="caret"></span>
                </button>
                <div class="dropdown-menu text-left text-sm" v-show="dropdown">
                    <a class="dropdown-item" @click="logout">退出登录</a>
                </div>
            </div>
            <div class="collapse navbar-toggleable-sm" id="collapse" v-if="$root.$data.userType !== 'agent'">
                <form class="navbar-form form-inline pull-right pull-none-sm navbar-item v-m ng-pristine ng-valid" role="search">
                    <div class="form-group l-h m-a-0">
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control p-x b-a rounded" v-model="query.username_q" placeholder="{{$t('common.search_member')}}" @focus="showResults()" @keyup="search" @blur="closeResults()">
                            <div class="search-results" v-if="hasResults">
                                <div class="search-items">
                                    <div class="search-item" v-for="r in results | limit searchlimit">
                                        <a v-link="'/member/' + r.id">{{r.username}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="navbar-nav pull-right" v-if="$root.$data.userType !== 'agent'">
                <a class="nav-link" v-link="'/member?logined=1'">
                    <span class="m-r label success" >{{$t('common.onlinemembers')}}: {{members_count}} </span>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../api'
    import Vue from 'vue'
    import VueCookie from 'vue-cookie'
    import storage from '../utils/storage'

    export default {
        data () {
            return {
                dropdown: false,
                members_count: '',
                memberApi: api.member,
                query: {
                    username_q: ''
                },
                results: '',
                searchlimit: 5,
                hasResults: false
            }
        },
        props: {
            showNav: {
                default: true
            }
        },
        ready () {
            this.getOnlineMembers()
            setInterval(this.getOnlineMembers, 30000)
        },
        methods: {
            logout () {
                this.$http.post(api.logout).then((response) => {
                    this.dropdown = false
                    this.loading = true
                    if (response.status === 200) {
                        this.$router.go('/login')
                        this.$cookie.delete('access_token')
                        this.$cookie.delete('refresh_token')
                    }
                }, (response) => {
                    this.loading = false
                    this.errorMsg = response.data.detail
                })
            },
            getOnlineMembers () {
                if (this.$route.name !== 'login') {
                    let authenticationCookie = Vue.http.headers.common['Authorization']
                    if (authenticationCookie) {
                        authenticationCookie = authenticationCookie.split(' ').pop()
                    }

                    let userCookie = VueCookie.get('access_token')
                    if (authenticationCookie === userCookie) {
                        let userType = storage.fetch().type
                        if (userType !== 'agent') {
                            this.$http.get(api.onlinemembers).then(response => {
                                this.members_count = response.data.online_member
                            })
                        }
                    } else {
                        this.$router.go('/login?next=' + this.$route.path)
                    }
                }
            },
            search () {
                if (this.query.username_q) {
                    this.$http.get(api.member + '?username_q=' + this.query.username_q).then((response) => {
                        this.results = response.data
                        if (this.results.length) {
                            this.hasResults = true
                        }
                    }, response => {
                        this.searchErr = response.data.error
                    })
                }
            },
            showResults () {
                if (this.results.length > 0) {
                    this.hasResults = true
                }
            },
            closeResults () {
                setTimeout(() => {
                    this.results = []
                    this.query.username_q = ''
                    this.hasResults = false
                }, 300)
            }
        },
        filters: {
            limit: function (arr, limit) {
                return arr.slice(0, Number(limit))
            }
        }
    }
</script>
<style scoped lang="scss">
    .dropdown-menu {
        display: block;
    }
    .my {
        margin: 12px 0;
    }
    .search-results {
        font-size: 0.875rem;
        color: rgba(0, 0, 0, 0.87);
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        float: left;
        padding: 5px 0;
        margin: 2px 0 0;
        font-size: 1rem;
        color: #373a3c;
        text-align: left;
        list-style: none;
        background-color: #fff;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .search-item {
        margin: 5px 0;
    }
    .search-item a {
        color: #2196f3;
        padding: 0px 15px;
    }
    .close {
        display: flex;
        justify-content: flex-end;
        padding: 5px 8px;
    }
</style>
