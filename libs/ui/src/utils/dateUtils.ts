export function formatDateToInput(dateString) {
  const [year, month, day] = dateString.split('/');
  const dateObject = new Date(year, month - 1, day);
  return dateObject.toISOString().split('T')[0];
}

export function formatDateToString(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export function formatToDisplay(dateStr: string): string {
  let retorno = '';
   
  if (dateStr !== undefined && dateStr !== null && dateStr !== ''){
    let pattern: string = localStorage.getItem('dateFormat');
    if(pattern === '' || pattern === undefined || pattern ===null){
      pattern = 'd-m-Y'
    }
    const [year, month, dayWithHour] = dateStr.split('-');
    const [day, hour] = dayWithHour.split("T");
    retorno = pattern.replace('d', day).replace('m', month).replace('Y', year);
  }

  return retorno;
};
