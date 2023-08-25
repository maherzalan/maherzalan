// contentScript.js
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
		console.log(message, sender, sendResponse);
        switch(message.action) {
            case "inputMarks":
				(check())? inputMarks(message.list,message.from):alert('الرجاء اختيار الصف والشعبة');
			break;
			case "save":
				(check())? save():alert('الرجاء اختيار الصف والشعبة');
            break;
        }
    }
);

function inputMarks(list,from){
  chrome.runtime.sendMessage({list: list, from:from}, (response) => {
	let linhaenviar = list;
	linhaenviar = linhaenviar.split("\n");
	let num = linhaenviar.length;    
	let count = 0;
    linhaenviar.forEach(function (value, index) {
		if(value){
			count +=1;
			let a = parseInt(index)+parseInt(from-1);
			setTimeout(function () {
					//$('input[name="Marks['+(a)+'].Value"]').val(linhaenviar[index]).addClass('not-saved-mark');
					$('input[name="Marks['+(a)+'].Value"]').val(linhaenviar[index]).addClass('not-saved-mark').trigger("blur");
			}, 50 * index);  
		}
		if(index == num-1) {
			showMSG('تم ادخال '+count+' من الدرجات','success');
			}
    });
	
 });
}

function showMSG(msg,type){
    console.log('showMSG()',$('#btnMoveAllToSection').text());
	//$('#fill_marks_form').prepend('<div class="alert alert-'+type+'">'+msg+' <button type="button" class="close" data-dismiss="alert">x</button></div>')
}

function check(){
	return true;
}

function save(){
	console.log('save()',$('#btnMoveAllToSection').text());
	//$('#fill_marks_form .btnMarks_save').trigger( "click" );
}

/*
const jqueryScript = document.createElement('script');
jqueryScript.src = chrome.runtime.getURL('js/jquery.min.js');
jqueryScript.onload = function () {
    console.log('jQuery has been loaded.');
};
document.head.appendChild(jqueryScript);

const jqueryScript2 = document.createElement('script');
jqueryScript2.src = chrome.runtime.getURL('js/axios.min.js');
jqueryScript2.onload = function () {
    // تم تحميل مكتبة jQuery بنجاح
    console.log('axios has been loaded.');
    // يمكنك الآن استخدام مكتبة jQuery هنا
};
document.body.appendChild(jqueryScript2);
const jqueryScript3 = document.createElement('script');
jqueryScript3.src = chrome.runtime.getURL('js/xlsx.full.min.js');
jqueryScript3.onload = function () {
    // تم تحميل مكتبة jQuery بنجاح
    console.log('xlsx has been loaded.');
    // يمكنك الآن استخدام مكتبة jQuery هنا
};
document.body.appendChild(jqueryScript3);
const jqueryScript4 = document.createElement('script');
jqueryScript4.src = chrome.runtime.getURL('js/xlsx-populate.min.js');
jqueryScript4.onload = function () {
    // تم تحميل مكتبة jQuery بنجاح
    console.log('populate has been loaded.');
    // يمكنك الآن استخدام مكتبة jQuery هنا
};
document.body.appendChild(jqueryScript4);

const jqueryScript5 = document.createElement('script');
jqueryScript5.src = chrome.runtime.getURL('js/exceljs.min.js');
jqueryScript5.onload = function () {
    // تم تحميل مكتبة jQuery بنجاح
    console.log('exceljs has been loaded.');
    // يمكنك الآن استخدام مكتبة jQuery هنا
};
document.body.appendChild(jqueryScript5);

// استخدام مكتبة jQuery لتحديث عنصر HTML بعد تحميل كامل المكتبات
function updateElement() {
    const element = $("#myElement");
    element.text("تم تحديث النص باستخدام jQuery");
}

if (typeof jQuery === "undefined") {
    // تحميل jQuery إذا لم يتم تحميله بعد
    const jqueryScript = document.createElement('script');
    jqueryScript.src = chrome.runtime.getURL('js/jquery.min.js');
    jqueryScript.onload = function () {
        console.log('jQuery has been loaded.');
        updateElement(); // تحديث العنصر بعد تحميل jQuery
    };
    document.head.appendChild(jqueryScript);
} else {
    // jQuery محملة بالفعل، قم بتحديث العنصر مباشرة
    updateElement();
}

// تحميل باقي المكتبات بنفس الطريقة...
*/

console.log('contentScript.js');
/*
function importScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// استدعاء ملف xlsx.full.min.js
importScript('js/xlsx.full.min.js')
    .then(() => {
        console.log('xlsx.full.min.js has been loaded.');
        // يمكنك هنا بدء استخدام المكتبة xlsx
    })
    .catch(error => {
        console.error('An error occurred while loading xlsx.full.min.js:', error);
    });

var jq2 = document.createElement('script');
jq2.src = "js/xlsx-populate.min.js";
document.getElementsByTagName('head')[0].appendChild(jq2);

var jq3 = document.createElement('script');
jq3.src = "js/exceljs.min.js";
document.getElementsByTagName('head')[0].appendChild(jq3);

const apiUrl = "https://emis.unrwa.org/api/lookup/StudentSections";
const selectElement = $("#FromSection");
const loadingIndicator = $("#loadingIndicator");
const delayBetweenOptions = 3000;

let optionIndex = 1;
const allResults = [];

function generateRandomCallbackFunction() {
    const randomNumber1 = generateRandomNumber(1000000000000, 9999999999999);
    const randomNumber2 = generateRandomNumber(1000000000000, 9999999999999);
    return `jQuery_${randomNumber1}_${randomNumber2}`;
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function requestData(sectionID) {
    loadingIndicator.show();

    function handleResponse(data) {
        loadingIndicator.hide();
        console.log("Received data for Section ID", sectionID, ":", data);
        allResults.push({ sectionID, sectionName: selectElement.find("option").eq(optionIndex).text(), data });

        optionIndex++;
        if (optionIndex < selectElement.find("option").length) {
            const nextSectionID = selectElement.find("option").eq(optionIndex).val();
            requestData(nextSectionID);
        } else {
            console.log("Finished looping through options.");
            generateExcelAndDownload();

            // Extract ids and sectionId from allResults
            const ids = [];
            const sectionId = allResults[0].sectionID; // Assuming all sections have the same ID

            for (const result of allResults) {
                for (const student of result.data.Data) {
                    ids.push(student.Id);
                }
            }

            // Execute the POST request with the extracted values
            executePostRequest(ids, sectionId);
        }
    }

    const jsonpUrl = `${apiUrl}?SectionID=${sectionID}&callback=?`;

    $.getJSON(jsonpUrl)
        .done(handleResponse)
        .fail(function (jqXHR, textStatus, errorThrown) {
            loadingIndicator.hide();
            console.log("Error for Section ID", sectionID, ":", textStatus, errorThrown);
        });
}

let idsForApiUrl = []; // متغير جديد لتخزين قيمة "Ids" المستخدمة في الرابط apiUrl

function generateExcelAndDownload() {
   const additionalData = prepareAdditionalData(allResults);
    let excelData = prepareExcelData(allResults, additionalData);

    // ترتيب جميع البيانات بواسطة StudentGBA
    excelData = sortExcelDataByStudentGBA(excelData);

    const blob = createExcelBlob(excelData, additionalData);

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "data.xlsx";
    downloadLink.textContent = "Download Excel";
    downloadLink.id = "downloadLink";
    const sectionIds = allResults.map(result => result.sectionID);
    console.log(allResults);
    // Execute the POST request for each sectionId with the associated ids
    for (const sectionId of sectionIds) {
        const idsForSection = [];
        for (const result of allResults) {
            if (result.sectionID === sectionId) {
                for (const student of result.data.Data) {
                    idsForSection.push(student.Id);
                    idsForApiUrl.push(student.AdditionalData); // استخدام AdditionalData بدلاً من Id
                }
            }
        }

        const idsQueryString = idsForSection;
        executePostRequest(idsQueryString, sectionId);

        // ...
    

        console.log(idsForSection,sectionId);
        //executePostRequest(idsForSection, sectionId);
    }
    if ($('#Grade').parent().find('#downloadLink').length > 0) {
        console.log("Download link exists within #Grade element.");
    } else {
        $('#Grade').after(downloadLink);
        console.log("Download link added to #Grade element.");
    }
}

function executePostRequest(ids, sectionId) {
    const callbackFunction = generateRandomCallbackFunction();
    if (!callbackFunction) {
        console.log("Error: Callback function not generated.");
        return;
    }

    const blockedElement = "#BlockPanel";

    const apiUrl = `https://emis.unrwa.org/api/student/ChangeStudentSectionBulk?callback=${callbackFunction}&Ids=${ids}&sectionid=${sectionId}&blockedElement=${blockedElement}&_=${Date.now()}`;
    console.log(apiUrl);
    /*$.ajax({
        url: apiUrl,
        type: "POST",
        dataType: "jsonp",
        success: function (data) {
            console.log("Request successful:", data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error:", textStatus, errorThrown);
        }
    });*/
/*}

function prepareExcelData(allResults, additionalData) {
    let excelData = [];
    let counter = allResults.length; // عدد العناصر في allResults
    let ascending = true;

    for (const result of allResults) {
        const sectionID = result.sectionID;
        const sectionName = result.sectionName;

        result.data.Data = sortExcelDataByStudentGBA(result.data.Data); // ترتيب البيانات بواسطة StudentGBA

        for (const student of result.data.Data) {
            const newSectionID = additionalData.find(item => item.No === counter).SectionID;

            excelData.push({
                Id: student.Id,
                StudentId: student.StudentId,
                FullName: student.FullName,
                StudentGBA: student.StudentGBA,
                AnnualStudentId: student.AnnualStudentId,
                SectionID: sectionID,
                SectionName: sectionName,
                AdditionalData: newSectionID,
                NewSectionID: counter,
            });

            if (ascending) {
                counter++;
                if (counter > allResults.length) {
                    ascending = false;
                    counter = allResults.length;
                }
            } else {
                counter--;
                if (counter < 1) {
                    ascending = true;
                    counter = 1;
                }
            }
        }
    }


    return excelData;
}

function prepareAdditionalData(allResults) {
    const additionalData = [];
    let no = 0;

    for (const result of allResults) {
        const sectionID = result.sectionID;
        const sectionName = result.sectionName;
        no++;

        additionalData.push({
            No: no,
            SectionID: sectionID,
            SectionName: sectionName
        });
    }

    return additionalData;
}

function sortExcelDataByStudentGBA(data) {
    data.sort((a, b) => b.StudentGBA - a.StudentGBA);
    return data;
}



function createExcelBlob(excelData, additionalData) {
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const style = {
        font: { bold: true, size: 14 },
        border: {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
        }
    };

    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
        const cellRef = XLSX.utils.encode_cell({ c: 7, r: R });
        worksheet[cellRef].s = style;
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');

    const additionalWs = XLSX.utils.json_to_sheet(additionalData);
    XLSX.utils.book_append_sheet(wb, additionalWs, 'AdditionalSheet');

    const blob = new Blob([s2ab(XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }))], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    readExcelFileAndConvertToArray(blob);

    return blob;
}

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
}

function readExcelFileAndConvertToArray(blob) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Get the data from Sheet1
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert the worksheet data to an array of objects
        const excelDataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Extract "Id" and "AdditionalData" values
        const extractedData = excelDataArray.map(row => ({
            Id: row[0], // Assuming "Id" is in the first column (index 0)
            AdditionalData: row[7] // Assuming "AdditionalData" is in the eighth column (index 7)
        }));

        console.log("Extracted Data:", extractedData);

        // Accumulate Id values for each AdditionalData
        const idMap = accumulateIdValues(extractedData);

        // Loop through the idMap to execute POST requests
        for (const additionalData in idMap) {
            const ids = idMap[additionalData].join('+');
            executePostRequest(ids, additionalData);
        }
    };
    reader.readAsArrayBuffer(blob);
}
function accumulateIdValues(extractedData) {
    const idMap = {}; // Map to accumulate Id values for each AdditionalData
    for (const item of extractedData) {
        const additionalData = item.AdditionalData;
        const id = item.Id;
        if (idMap[additionalData]) {
            idMap[additionalData].push(id);
        } else {
            idMap[additionalData] = [id];
        }
    }
    return idMap;
}
requestData(selectElement.find("option").eq(optionIndex).val());
*/