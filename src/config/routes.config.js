import { locale } from '../i18n/da.locale'

export const routes = {
  root: '/',
  forgot_password: '/forgot_password',
  reset_password: '/reset_password',
  home: '/home',
  configuration: '/configuration',
  editor: '/editor',
  log: '/log',
  action: '/action',
  admin: {
    root: `/admin`
  },
  general: {
    root: `/configuration/general`,
    country_and_language: `/configuration/general/country_and_language`,
    library_and_identity: `/configuration/general/library_and_identity`,
    branch_information: `/configuration/general/branch_information`,
    library_system: `/configuration/general/library_system`,
    search: `/configuration/general/search`,
    cover_service: `/configuration/general/cover_service`,
    path: `/configuration/general/path`,
    news_and_events: `/configuration/general/news_and_events`,
    information_for_redia: `/configuration/general/information_for_redia`,
    opening_hours_and_contact_information: `/configuration/general/opening_hours_and_contact_information`
  },
  library_app: {
    root: `/configuration/library_app`,
    modules: `/configuration/library_app/modules` ,
    materials: `/configuration/library_app/materials`,
    search: `/configuration/library_app/search`,
    user_creation: `/configuration/library_app/user_creation`,
    payments: `/configuration/library_app/payments`
  },
  butler: {
    root: `/configuration/butler`,
    units: `/configuration/butler/units`,
    materials: `/configuration/butler/materials`,
    search: `/configuration/butler/search`,
    loans_and_returns: `/configuration/butler/loans_and_returns`,
    payments: `/configuration/butler/payments`
  }
}


// TODO: Is this mapping right?
export const routesTranslations = {
  "home" : locale.home,
  "forgot_password": locale.forgot_password.title,
  "reset_password": locale.reset_password.title,
  "configuration" : locale.tab_bar.configuration,
  "editor" : locale.tab_bar.editor,
  "general" : locale.general.title,
  "country_and_language" : locale.general.country_and_language.title,
  "library_and_identity" : locale.general.library_and_identity.title,
  "branch_information" : locale.general.branch_information.title,
  "library_system" : locale.general.library_system.title,
  "search" : locale.general.search.title,
  "cover_service" : locale.general.cover_service.title,
  "path" : locale.general.path.title,
  "news_and_events" : locale.general.news_and_events.title,
  "information_for_redia" : locale.general.information_for_redia.title,
  "library_app" : locale.library_app.title,
  "modules" : locale.library_app.modules.title,
  "materials" : locale.library_app.materials.title,
  "user_creation" : locale.library_app.user_creation.title,
  "payments" : locale.library_app.payments.title,
  "butler" : locale.butler.title,
  "loans_and_returns" : locale.butler.loans_and_returns.title,
  "log" : locale.tab_bar.log,
  "units" : locale.butler.units.title
}