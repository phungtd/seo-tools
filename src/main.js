import { createApp } from 'vue'
import App from './App.vue'

require ('node_modules/admin-lte/plugins/jquery/jquery.min.js')
require ('node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js')
require ('node_modules/admin-lte/dist/js/adminlte.min.js?v=3.2.0')

createApp(App).mount('#app')
