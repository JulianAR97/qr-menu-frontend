/** 
  * @param {String} date
  * @param {'en' | 'ru'} lang
*/
export const convertDate = (date, lang) => {
  if (date) {
    let getDate = date.split('T');
    let fullDate = getDate[0].split('-')
    return (lang === 'en') ? `${fullDate[1]}/${fullDate[2]}/${fullDate[0]}` : `${fullDate[2]}/${fullDate[1]}/${fullDate[0]}`;
  } else {
    return ''
  }
}


