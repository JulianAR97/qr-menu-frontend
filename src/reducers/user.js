

const defaultState = {
  logged_in: false,
  isDataLoaded: false,
  lastFile: { has_file: false, pdf_file: null, qr_code: null, uploaded: null },
  allFiles: [],
  menuFile: null,
  menuQRLink: null,
  domainLink: null,
  qrLinks: [],
  lang: JSON.parse(localStorage.getItem('lang')) || 'en',
}

const UserReducer = (state = defaultState, action) => {

  switch(action.type) {
    
    case 'CHECK_LOGIN_STATUS':
        return {
          ...state,
          logged_in: action.payload.data.logged_in,
          isDataLoaded: true,
          lastFile: action.payload.data.last_file,
          allFiles: action.payload.data.all_files,
          domainLink: `${document.location.host}/menu/${action.payload.data.menu_qr_link}`,
          menuFile: action.payload.data.menu_file,
          menuQRLink: action.payload.data.menu_link,
          qrLinks: action.payload.data.links,
        };

    case 'LOGIN':
      localStorage.setItem('token', JSON.stringify(action.payload.data.token));
      return {
        ...state,
        logged_in: action.payload.data.logged_in,
        isDataLoaded: true,
        lastFile: action.payload.data.last_file,
        allFiles: action.payload.data.all_files,
        domainLink: `${document.location.host}/menu/${action.payload.data.menu_qr_link}`,
        menuFile: action.payload.data.menu_file,
        menuQRLink: action.payload.data.menu_link,
        qrLinks: action.payload.data.links,
      }

    case 'SIGNUP':
      if(action.payload.data.errors) {
        return state
      } else {
        localStorage.setItem('token', JSON.stringify(action.payload.data.token));
        return {
          ...state,
          logged_in: action.payload.data.logged_in,
          isDataLoaded: true,
          domainLink: `${document.location.host}/menu/${action.payload.data.menu_qr_link}`,
        }
      }

    case 'LOGOUT':
      return {
        ...state,
        logged_in: false,
        isDataLoaded: false,
        lastFile: { has_file: false, pdf_file: null, qr_code: null, uploaded: null },
        allFiles: [],
        qrLinks: [],
        menuFile: null,
        menuQRLink: null,
        domainLink: null
      }

    case 'SINGLE_FILE_UPLOAD':
      return {
        ...state,
        lastFile: action.payload.last_file,
        allFiles: [...state.allFiles, {
          link: action.payload.last_file.pdf_file,
          qr_code_link: action.payload.last_file.qr_code, 
          updated_at: action.payload.last_file.uploaded,
          id: action.payload.last_file.id,
          file_name: action.payload.last_file.file_name,
        }]
      }

    case 'GENERATE_QR':
      return {
        ...state,
        menuQRLink: action.payload.qr_code_link,
        domainLink: action.payload.domain
      }

    case 'UPLOAD_MENU':
      return {
        ...state,
        menuFile: action.payload.file_link
      }

    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        lang: action.payload
      }

    case 'GENERATE_QR_LINK':
      return {
        ...state,
        qrLinks: [...state.qrLinks, action.payload]
      }

    case 'DELETE_QR_LINK':
        const qrLinks = state.qrLinks.filter(element => element.id !== parseInt(action.payload.data.id))
      return {
        ...state,
        qrLinks
      }

    case 'DELETE_MENU':
      let lastFileUpdated;
      if(state.lastFile.id === parseInt(action.payload.data.id)) {
        lastFileUpdated = state.allFiles[state.allFiles.length - 1];
      } else {
        lastFileUpdated = state.lastFile
      }
      return {
        ...state,
        allFiles: state.allFiles.filter(element => element.id !== parseInt(action.payload.data.id)),
        lastFile: lastFileUpdated
      }

    default:
      return state;

  }
}

export default UserReducer