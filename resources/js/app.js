import Swal from 'sweetalert2'
import '../css/app.css'
import { initRoutes } from '@eidellev/adonis-stardust/client';
import { stardust } from '@eidellev/adonis-stardust/client';
import jQuery from 'jquery';
import axios from 'axios';

initRoutes();

window.Swal = Swal
window.stardust = stardust
window.$ = jQuery
window.axios = axios
