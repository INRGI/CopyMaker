export function importSingleDomain(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const importedDomain = JSON.parse(e.target.result);
        
        if (importedDomain && importedDomain.name && importedDomain.id) {
          const existingDomain = useSelector(state => 
            state.domains.find(d => d.id === importedDomain.id)
          );
          
          if (existingDomain) {
            alert('Домен із таким ID вже існує!');
          } else {
            dispatch(addDomain(importedDomain)); 
            alert('Домен успішно імпортовано!');
          }
        } else {
          alert('Невірний формат файлу або відсутні необхідні дані!');
        }
      } catch (error) {
        alert('Не вдалося прочитати файл!');
      }
    };
    reader.readAsText(file);
  }
  