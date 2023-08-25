document.getElementById('excelFile').addEventListener('change', handleFile, false);

function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        const htmlTable = XLSX.utils.sheet_to_html(sheet);

        document.getElementById('tableContainer').innerHTML = htmlTable;
    };

    reader.readAsArrayBuffer(file);
}