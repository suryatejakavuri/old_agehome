import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
  en:{ translation:{ welcome:'Welcome to the Ashram', donate:'Donate', residents:'Residents', stories:'Stories', events:'Events', dashboard:'Dashboard', login:'Login', logout:'Logout', register:'Register' } },
  te:{ translation:{ welcome:'ఆశ్రమానికి స్వాగతం', donate:'దానం చేయండి', residents:'నివాసితులు', stories:'కథలు', events:'కార్యక్రమాలు', dashboard:'డ్యాష్‌బోర్డు', login:'లాగిన్', logout:'లాగౌట్', register:'రిజిస్టర్' } }
};
i18n.use(initReactI18next).init({ resources, lng:'en', interpolation:{ escapeValue:false } });
export default i18n;
