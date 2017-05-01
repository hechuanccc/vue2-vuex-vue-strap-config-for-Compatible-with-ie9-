<template>
    <div id="aside" class="app-aside modal fade folded md show-text nav-dropdown" v-if="showNav">
        <div class="left navside grey dk"  v-if="$root.$data.userType !== 'agent'">
            <div class="navbar no-radius">
                <a class="navbar-brand" href="/" v-if="$root.permissions.includes('list_report_betrecord')">
                  <img src="../../static/images/logo.png" />
                  <span class="hidden-folded inline">$t{{'app_name'}}</span>
                </a>
                <a class="navbar-brand" v-else>
                    <img src="../../static/images/logo.png" />
                    <span class="hidden-folded inline">$t{{'app_name'}}</span>
                </a>
            </div>

            <div>
                <nav class="nav-stacked nav-active-blue" >
                    <ul class="nav" ui-nav="">
                        <template v-if="$root.permissions.includes('list_report_betrecord')">
                            <li><div class="b-b b m-t-sm m-b-sm"></div></li>

                            <li :class="$route.group == 'overview' ? 'active' : ''" >
                                <a v-link="'/'" >
                                  <span class="nav-icon"><i class="material-icons">&#xe3fc;</i></span>
                                  <span class="nav-text">{{$t("nav.overview")}}</span>
                                </a>
                            </li>

                            <li><div class="b-b b m-t-sm"></div></li>
                        </template>
                        <li :class="$route.group == 'bill' ? 'active' : ''">
                            <a>
                                <span class="nav-caret" ><i class="fa fa-caret-down"></i></span>
                                <span class="nav-icon" ><i class="material-icons">&#xE227;</i></span>
                                <span class="nav-text">{{$t("nav.bills")}}</span>
                            </a>
                            <ul class="nav-sub">
                                <li v-if="$root.permissions.includes('list_remit_online_withdraw_page')"><a v-link="'/bill/remit'"><span class="nav-text">{{$t('bill.remit_audit')}}</span></a></li>
                                <li v-if="$root.permissions.includes('list_remit_online_withdraw_page')"><a v-link="'/bill/online'"><span class="nav-text">{{$t('bill.online_payment')}}</span></a></li>
                                <li v-if="$root.permissions.includes('list_remit_online_withdraw_page')"><a v-link="'/bill/withdraw'"><span class="nav-text">{{$t('bill.withdrawal_audit')}}</span></a></li>
                                <li><a v-link="'/bill/search'"><span class="nav-text">{{$t('bill.transcations_query')}}</span></a></li>
                                <li><a v-link="'/bill/returnrate'"><span class="nav-text">{{$t('bill.return_report')}}</span></a></li>
                                <li v-if="$root.permissions.includes('calculate_commission')"><a v-link="'/bill/commission'" ><span class="nav-text">{{$t('bill.commission_report')}}</span></a></li>
                            </ul>
                        </li>

                        <li :class="$route.group == 'report' ? 'active' : ''">
                            <a>
                                <span class="nav-caret">
                                  <i class="fa fa-caret-down"></i>
                                </span>
                                <span class="nav-icon">
                                  <i class="material-icons">&#xe1b8;</i>
                                </span>
                                <span class="nav-text">{{$t("nav.report")}}</span>
                            </a>
                            <ul class="nav-sub">
                                <li v-if="$root.permissions.includes('list_report_betrecord')"><a v-link="'/report/game'"><span class="nav-text">{{$t('nav.game_report')}}</span></a></li>
                                <li><a v-link="'/report/login'"><span class="nav-text">{{$t('nav.login_record')}}</span></a></li>
                                <li><a v-link="'/report/betrecord'"><span class="nav-text">{{$t('nav.bet_record')}}</span></a></li>
                                <li><a v-link="'/report/transferrecord'"><span class="nav-text">{{$t('nav.transfer_record')}}</span></a></li>
                            </ul>
                        </li>
                        <li><div class="b-b m-t-sm m-b-sm"></div></li>
                        <li :class="$route.group == 'member' ? 'active' : ''">
                            <a>
                                <span class="nav-caret"><i class="fa fa-caret-down"></i></span>
                                <span class="nav-icon"><i class="material-icons">&#xE7FC;</i></span>
                                <span class="nav-text">{{$t("nav.member")}}</span>
                            </a>
                            <ul class="nav-sub">
                                <li>
                                    <a v-link.literal="/member">
                                        <span class="nav-text">{{$t("nav.member_list")}}</span>
                                    </a>
                                </li>
                                <li v-if="$root.permissions.includes('update_member_details')">
                                    <a  v-link.literal="/member/add">
                                        <span class="nav-text">{{$t("nav.member_add")}}</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-link.literal="/member/applications">
                                        <span class="nav-text">{{$t("nav.member_application")}}</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li  :class="$route.group == 'agent' ? 'active' : ''">
                            <a >
                                <span class="nav-caret"><i class="fa fa-caret-down"></i></span>
                                <span class="nav-icon"><i class="material-icons">&#xE7FB;</i></span>
                                <span class="nav-text">{{$t("nav.agent")}}</span>
                            </a>
                            <ul class="nav-sub">
                                <li><a v-link.literal="/agent"><span class="nav-text">{{$t("nav.agent_list")}}</span></a></li>
                                <li v-if="$root.permissions.includes('change_agent_level_4')"><a v-link.literal="/agent/add"><span class="nav-text">{{$t("nav.agent_add")}}</span></a></li>
                                <li><a v-link.literal="/agent/applications"><span class="nav-text">{{$t("nav.agent_application")}}</span></a></li>
                            </ul>
                        </li>

                        <li :class="$route.group == 'setting' ? 'active' : ''">
                            <a>
                                <span class="nav-caret"><i class="fa fa-caret-down"></i></span>
                                <span class="nav-icon"><i class="material-icons">&#xE8B8;</i></span>
                                <span class="nav-text">{{$t("nav.setting")}}</span>
                            </a>
                            <ul class="nav-sub">
                                <li><a v-link.literal="/level"><span class="nav-text">{{$t("nav.setting_level")}}</span></a></li>
                                <li><a v-link.literal="/online_payee"><span class="nav-text">{{$t("nav.setting_online_payee")}}</span></a></li>
                                <li><a v-link.literal="/paymenttype"><span class="nav-text">{{$t("setting.setting_paymenttype")}}</span></a></li>
                                <li><a v-link.literal="/remit_payee"><span class="nav-text">{{$t("nav.setting_remit_payee")}}</span></a></li>
                                <li><a v-link.literal="/return"><span class="nav-text">{{$t("nav.setting_return")}}</span></a></li>
                                <li><a v-link.literal="/commission"><span class="nav-text">{{$t("nav.setting_commission")}}</span></a></li>
                                <li><a v-link.literal="/provider"><span class="nav-text">{{$t("nav.setting_provider")}}</span></a></li>
                                <li><a v-link.literal="/staff"><span class="nav-text">{{$t("nav.staff")}}</span></a></li>
                                <li><a v-link.literal="/promotion"><span class="nav-text">{{$t("nav.promotion")}}</span></a></li>
                            </ul>
                        </li>

                        <li><div class="b-b b m-t-sm m-b-sm"></div></li>

                        <li :class="$route.group == 'manage' ? 'active' : ''">
                            <a>
                                <span class="nav-icon"><i class="material-icons">&#xE051;</i></span>
                                <span class="nav-text">{{$t("nav.cms")}}</span>
                            </a>
                            <ul class="nav-sub">
                                <li><a v-link.literal="/banner"><span class="nav-text">{{$t("manage.title_banner")}}</span></a></li>
                                <li><a v-link.literal="/announcement"><span class="nav-text">{{$t("manage.title_announcement")}}</span></a></li>
                                <li><a v-link.literal="/website"><span class="nav-text">{{$t("manage.title_website")}}</span></a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div class="left navside grey dk" v-else>
            <div class="navbar no-radius">

                <a class="navbar-brand" href="/">
                  <img src="../../static/images/logo.png" />
                  <span class="hidden-folded inline">$t{{'app_name'}}</span>
                </a>
            </div>

            <div flex>
              <nav class="nav-stacked nav-active-blue" flex>
                <ul class="nav" ui-nav="">
                    <li><div class="b-b b m-t-sm m-b-sm"></div></li>
                    <li :class="$route.group == 'overview' ? 'active' : ''">
                        <a v-link="'/'" >
                          <span class="nav-icon"><i class="material-icons">&#xe3fc;</i></span>
                          <span class="nav-text">{{$t("nav.overview")}}</span>
                        </a>
                    </li>

                    <li :class="$route.group == 'member' ? 'active' : ''">
                        <a>
                            <span class="nav-caret"><i class="fa fa-caret-down"></i></span>
                            <span class="nav-icon"><i class="material-icons">&#xE7FC;</i></span>
                            <span class="nav-text">{{$t("nav.member")}}</span>
                        </a>
                        <ul class="nav-sub">
                            <li>
                                <a v-link="'/member'">
                                    <span class="nav-text">{{$t("nav.member_list")}}</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li :class="$route.group == 'bill' ? 'active' : ''">
                        <a>
                            <span class="nav-caret" ><i class="fa fa-caret-down"></i></span>
                            <span class="nav-icon" ><i class="material-icons">&#xE227;</i></span>
                            <span class="nav-text">{{$t("nav.bills")}}</span>
                        </a>
                        <ul class="nav-sub">
                            <li><a v-link="'/bill/search'"><span class="nav-text">{{$t('bill.transcations_query')}}</span></a></li>
                            <li><a v-link="'/bill/commission'"><span class="nav-text">{{$t('bill.commission_report')}}</span></a></li>
                        </ul>
                    </li>

                    <li :class="$route.group == 'report' ? 'active' : ''">
                        <a>
                            <span class="nav-caret">
                              <i class="fa fa-caret-down"></i>
                            </span>
                            <span class="nav-icon">
                              <i class="material-icons">&#xe1b8;</i>
                            </span>
                            <span class="nav-text">{{$t("nav.report")}}</span>
                        </a>
                        <ul class="nav-sub">
                            <li><a v-link="'/report/betrecord'"><span class="nav-text">{{$t('nav.bet_record')}}</span></a></li>
                            <li><a v-link="'/report/transferrecord'"><span class="nav-text">{{$t('nav.transfer_record')}}</span></a></li>
                        </ul>
                    </li>
                </ul>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            showNav: {
                default: true
            }
        }
    }
</script>
