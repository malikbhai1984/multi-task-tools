// PDF.js Config
if(typeof pdfjsLib!=='undefined'){pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';}

// Navigation
function showCategory(cat){
document.querySelectorAll('.category').forEach(c=>c.classList.remove('active'));
document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
document.getElementById(cat).classList.add('active');
event.target.classList.add('active');
}

// IMAGE TOOLS
function resizeImage(){
const file=document.getElementById('imgResize').files[0];
if(!file)return alert('Select image!');
const w=parseInt(document.getElementById('resizeWidth').value);
const h=parseInt(document.getElementById('resizeHeight').value);
const fmt=document.getElementById('imgFormat').value;
const reader=new FileReader();
reader.onload=function(e){
const img=new Image();
img.onload=function(){
const canvas=document.createElement('canvas');
canvas.width=w;canvas.height=h;
canvas.getContext('2d').drawImage(img,0,0,w,h);
const mime=fmt==='jpeg'?'image/jpeg':fmt==='png'?'image/png':'image/webp';
canvas.toBlob(blob=>{
const url=URL.createObjectURL(blob);
document.getElementById('resizeResult').innerHTML=`<img src="${url}" style="max-width:100%"><br><button onclick="downloadFile('${url}','resized.${fmt}')">Download</button>`;
},mime,0.9);
};
img.src=e.target.result;
};
reader.readAsDataURL(file);
}

function reverseImageSearch(){
const file=document.getElementById('revSearchImg').files[0];
if(!file)return alert('Select image!');
document.getElementById('revSearchResult').innerHTML=`
<button onclick="window.open('https://www.google.com/imghp','_blank')">Google Images</button>
<button onclick="window.open('https://yandex.com/images/','_blank')">Yandex</button>
<button onclick="window.open('https://tineye.com/','_blank')">TinEye</button>
`;
}

document.getElementById('compressQuality')?.addEventListener('input',function(){
document.getElementById('qualityVal').textContent=this.value+'%';
});

function compressImage(){
const file=document.getElementById('compressImg').files[0];
if(!file)return alert('Select image!');
const quality=document.getElementById('compressQuality').value/100;
const reader=new FileReader();
reader.onload=function(e){
const img=new Image();
img.onload=function(){
const canvas=document.createElement('canvas');
canvas.width=img.width;canvas.height=img.height;
canvas.getContext('2d').drawImage(img,0,0);
canvas.toBlob(blob=>{
const url=URL.createObjectURL(blob);
const orig=(file.size/1024).toFixed(2);
const comp=(blob.size/1024).toFixed(2);
const save=((1-blob.size/file.size)*100).toFixed(1);
document.getElementById('compressResult').innerHTML=`
<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;">
<div><h4>Original</h4><p>${orig} KB</p><img src="${e.target.result}" style="width:100%"></div>
<div><h4>Compressed</h4><p>${comp} KB</p><p style="color:green;">Saved ${save}%</p><img src="${url}" style="width:100%"><button onclick="downloadFile('${url}','compressed.jpg')">Download</button></div>
</div>`;
},'image/jpeg',quality);
};
img.src=e.target.result;
};
reader.readAsDataURL(file);
}

// QR TOOLS
function scanQRCode(){
const file=document.getElementById('qrScanImg').files[0];
if(!file)return alert('Select QR image!');
const reader=new FileReader();
reader.onload=function(e){
const img=new Image();
img.onload=function(){
const canvas=document.createElement('canvas');
const ctx=canvas.getContext('2d');
canvas.width=img.width;canvas.height=img.height;
ctx.drawImage(img,0,0);
const imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
const code=jsQR(imageData.data,canvas.width,canvas.height);
if(code){
document.getElementById('qrScanResult').innerHTML=`<h4>QR Data:</h4><p style="word-break:break-all;background:#f0f0f0;padding:10px;border-radius:5px;">${code.data}</p><button onclick="copyToClipboard('${code.data}')">Copy</button>`;
}else{
document.getElementById('qrScanResult').innerHTML='<p>No QR code found!</p>';
}
};
img.src=e.target.result;
};
reader.readAsDataURL(file);
}

function generateUPIQR(){
const upiId=document.getElementById('upiId').value;
const name=document.getElementById('upiName').value;
const amount=document.getElementById('upiAmount').value;
if(!upiId||!name)return alert('Fill required fields!');
const upiString=`upi://pay?pa=${upiId}&pn=${name}${amount?'&am='+amount:''}`;
document.getElementById('upiQR').innerHTML='';
new QRCode(document.getElementById('upiQR'),{text:upiString,width:256,height:256});
}

function generateWhatsAppLink(){
const number=document.getElementById('waNumber').value.replace(/\D/g,'');
const message=document.getElementById('waMessage').value;
if(!number)return alert('Enter phone!');
const link=`https://wa.me/${number}${message?'?text='+encodeURIComponent(message):''}`;
document.getElementById('waResult').innerHTML=`<p><a href="${link}" target="_blank">${link}</a></p><button onclick="copyToClipboard('${link}')">Copy</button><button onclick="window.open('${link}','_blank')">Open</button>`;
}

function generateVCardQR(){
const name=document.getElementById('vcName').value;
const company=document.getElementById('vcCompany').value;
const phone=document.getElementById('vcPhone').value;
const email=document.getElementById('vcEmail').value;
const vcard=`BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${company}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
document.getElementById('vcQR').innerHTML='';
new QRCode(document.getElementById('vcQR'),{text:vcard,width:256,height:256});
}

function generateWiFiQR(){
const ssid=document.getElementById('wifiSSID').value;
const pass=document.getElementById('wifiPass').value;
const type=document.getElementById('wifiType').value;
if(!ssid)return alert('Enter SSID!');
const wifi=`WIFI:T:${type};S:${ssid};P:${pass};;`;
document.getElementById('wifiQR').innerHTML='';
new QRCode(document.getElementById('wifiQR'),{text:wifi,width:256,height:256});
}

function generateTextToQR(){
const text=document.getElementById('textToQR').value;
if(!text)return alert('Enter text!');
document.getElementById('textQRDisplay').innerHTML='';
new QRCode(document.getElementById('textQRDisplay'),{text:text,width:256,height:256});
setTimeout(()=>{document.getElementById('downloadQRBtn').style.display='inline-block';},100);
}

function downloadQRImage(){
const canvas=document.querySelector('#textQRDisplay canvas');
if(!canvas)return alert('Generate QR first!');
canvas.toBlob(function(blob){
const url=URL.createObjectURL(blob);
const link=document.createElement('a');
link.href=url;link.download='qrcode.png';link.click();
});
}

// YOUTUBE TOOLS
function downloadThumbnail(){
const url=document.getElementById('thumbUrl').value;
const videoId=url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1];
if(!videoId)return alert('Invalid URL!');
const qualities=[
{name:'Max',url:`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`},
{name:'SD',url:`https://img.youtube.com/vi/${videoId}/sddefault.jpg`},
{name:'HQ',url:`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
];
let html='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;">';
qualities.forEach(q=>{
html+=`<div style="text-align:center;background:#f5f5f5;padding:10px;border-radius:8px;">
<h4>${q.name}</h4><img src="${q.url}" style="width:100%;border-radius:5px;">
<button onclick="downloadFile('${q.url}','thumb-${q.name}.jpg')">Download</button></div>`;
});
html+='</div>';
document.getElementById('thumbResult').innerHTML=html;
}

function researchKeyword(){
const keyword=document.getElementById('keywordInput').value;
if(!keyword)return alert('Enter keyword!');
const suggestions=[`${keyword} tutorial`,`${keyword} for beginners`,`best ${keyword}`,`how to ${keyword}`,`${keyword} tips`];
document.getElementById('keywordResult').innerHTML=`<h4>Keywords:</h4><ul>${suggestions.map(s=>`<li>${s}</li>`).join('')}</ul>`;
}

function analyzeTitle(){
const title=document.getElementById('titleAnalyze').value;
if(!title)return alert('Enter title!');
let score=0;
const len=title.length;
if(len>=50&&len<=70)score+=30;
if(/\d/.test(title))score+=20;
if(/\?|!/.test(title))score+=15;
if(title.split(' ').length>=6)score+=20;
if(/best|top|how|guide/i.test(title))score+=15;
const grade=score>=70?'Excellent':score>=40?'Good':'Needs Improvement';
const color=score>=70?'green':score>=40?'orange':'red';
document.getElementById('titleResult').innerHTML=`<h3 style="color:${color};">Score: ${score}/100 - ${grade}</h3><p>Length: ${len} chars</p><p>Has Numbers: ${/\d/.test(title)?'Yes':'No'}</p>`;
}

function generateDescription(){
const topic=document.getElementById('descTopic').value;
const keywords=document.getElementById('descKeywords').value;
const desc=`🎥 Welcome!\n\nIn this video: ${topic}\n\n🔔 Subscribe for more\n👍 Like if helpful\n\n🏷️ Keywords: ${keywords}\n\n#${topic.replace(/\s/g,'')} #YouTube`;
document.getElementById('descResult').value=desc;
}

function generateHashtags(){
const topic=document.getElementById('hashInput').value;
if(!topic)return alert('Enter topic!');
const tags=[`#${topic.replace(/\s/g,'')}` ,'#YouTube','#Viral','#Trending','#Subscribe'];
document.getElementById('hashResult').innerHTML=`<p style="line-height:2;">${tags.join(' ')}</p>`;
}

// PDF TOOLS
async function compressPDF(){
const file=document.getElementById('pdfCompress').files[0];
if(!file)return alert('Select PDF!');
document.getElementById('pdfCompressResult').innerHTML='Compressing...';
const arrayBuffer=await file.arrayBuffer();
const pdfDoc=await PDFLib.PDFDocument.load(arrayBuffer);
const pdfBytes=await pdfDoc.save({useObjectStreams:false});
const orig=(file.size/1024).toFixed(2);
const comp=(pdfBytes.length/1024).toFixed(2);
const save=((1-pdfBytes.length/file.size)*100).toFixed(1);
const blob=new Blob([pdfBytes],{type:'application/pdf'});
const url=URL.createObjectURL(blob);
document.getElementById('pdfCompressResult').innerHTML=`<h4>Done!</h4><p>Original: ${orig} KB</p><p>Compressed: ${comp} KB</p><p style="color:green;">Saved: ${save}%</p><button onclick="downloadFile('${url}','compressed.pdf')">Download</button>`;
}

async function mergePDFs(){
const files=document.getElementById('pdfMerge').files;
if(files.length<2)return alert('Select 2+ PDFs!');
document.getElementById('mergeResult').innerHTML='Merging...';
const mergedPdf=await PDFLib.PDFDocument.create();
for(let i=0;i<files.length;i++){
const arrayBuffer=await files[i].arrayBuffer();
const pdf=await PDFLib.PDFDocument.load(arrayBuffer);
const copiedPages=await mergedPdf.copyPages(pdf,pdf.getPageIndices());
copiedPages.forEach(page=>mergedPdf.addPage(page));
}
const pdfBytes=await mergedPdf.save();
const blob=new Blob([pdfBytes],{type:'application/pdf'});
const url=URL.createObjectURL(blob);
document.getElementById('mergeResult').innerHTML=`<h4>Merged!</h4><p>Pages: ${mergedPdf.getPageCount()}</p><button onclick="downloadFile('${url}','merged.pdf')">Download</button>`;
}

async function countPDFPages(){
const file=document.getElementById('pdfCounter').files[0];
if(!file)return alert('Select PDF!');
const arrayBuffer=await file.arrayBuffer();
const pdf=await pdfjsLib.getDocument(arrayBuffer).promise;
document.getElementById('countResult').innerHTML=`<h3>Pages: ${pdf.numPages}</h3><p>Size: ${(file.size/1024).toFixed(2)} KB</p>`;
}

async function convertPDFToText(){
const file=document.getElementById('pdfToText').files[0];
if(!file)return alert('Select PDF!');
document.getElementById('pdfTextResult').value='Extracting...';
const arrayBuffer=await file.arrayBuffer();
const pdf=await pdfjsLib.getDocument(arrayBuffer).promise;
let text='';
for(let i=1;i<=pdf.numPages;i++){
const page=await pdf.getPage(i);
const content=await page.getTextContent();
text+=content.items.map(item=>item.str).join(' ')+'\n\n';
}
document.getElementById('pdfTextResult').value=text;
}

function convertHTMLToPDF(){
const html=document.getElementById('htmlToPdf').value;
if(!html)return alert('Enter HTML!');
const{jsPDF}=window.jspdf;
const doc=new jsPDF();
doc.html(html,{callback:function(doc){doc.save('document.pdf');},x:10,y:10,width:190});
}

// BUSINESS TOOLS
function translateText(){
const input=document.getElementById('translateInput').value;
if(!input)return alert('Enter text!');
const dict={'你好':'Hello','谢谢':'Thank you','再见':'Goodbye','Hello':'你好','Thank you':'谢谢','Goodbye':'再见'};
let result=dict[input]||'Translation: '+input;
document.getElementById('translateResult').value=result;
}

function generateResume(){
const name=document.getElementById('resumeName').value;
const email=document.getElementById('resumeEmail').value;
const phone=document.getElementById('resumePhone').value;
const skills=document.getElementById('resumeSkills').value;
const exp=document.getElementById('resumeExp').value;
const resume=`<div style="font-family:Arial;padding:20px;background:#fff;border:1px solid #ddd;">
<h2 style="color:#667eea;">${name}</h2><p>📧 ${email} | 📞 ${phone}</p><hr>
<h3>Skills</h3><p>${skills}</p><h3>Experience</h3><p>${exp}</p></div>`;
document.getElementById('resumeResult').innerHTML=resume+'<br><button onclick="window.print()">Print</button>';
}

async function scanBusinessCard(){
const file=document.getElementById('cardScan').files[0];
if(!file)return alert('Select card!');
document.getElementById('cardResult').innerHTML='Scanning...';
const{data:{text}}=await Tesseract.recognize(file,'eng');
document.getElementById('cardResult').innerHTML=`<h4>Text:</h4><p style="background:#f5f5f5;padding:10px;border-radius:5px;">${text}</p>`;
}

function generateEmailTemplate(){
const type=document.getElementById('emailType').value;
const recipient=document.getElementById('emailRecipient').value;
const templates={
'Marketing Email':`Subject: Exclusive Offer!\n\nHi ${recipient},\n\nWe're excited...`,
'Follow-up Email':`Subject: Following Up\n\nHi ${recipient},\n\nWanted to follow up...`,
'Cold Outreach':`Subject: Quick Question\n\nHi ${recipient},\n\nI came across your profile...`
};
document.getElementById('emailResult').value=templates[type]||'Select template';
}

function generateInvoice(){
const from=document.getElementById('invoiceFrom').value;
const to=document.getElementById('invoiceTo').value;
const amount=document.getElementById('invoiceAmount').value;
const desc=document.getElementById('invoiceDesc').value;
const invoice=`<div style="font-family:Arial;padding:30px;background:#fff;border:2px solid #667eea;border-radius:10px;">
<h2 style="color:#667eea;">INVOICE</h2><hr><p><strong>From:</strong> ${from}</p><p><strong>To:</strong> ${to}</p>
<p><strong>Description:</strong> ${desc}</p><h3 style="color:green;">Amount: $${amount}</h3>
<p style="margin-top:20px;color:#666;">Date: ${new Date().toLocaleDateString()}</p></div>`;
document.getElementById('invoiceResult').innerHTML=invoice+'<br><button onclick="window.print()">Print</button>';
}

function optimizeLinkedIn(){
const title=document.getElementById('linkedinTitle').value;
const skills=document.getElementById('linkedinSkills').value;
const headline=`${title} | ${skills} | Helping Companies Grow 🚀`;
document.getElementById('linkedinResult').innerHTML=`<h4>Optimized:</h4><p style="background:#f5f5f5;padding:15px;border-radius:5px;">${headline}</p><button onclick="copyToClipboard('${headline}')">Copy</button>`;
}

function convertCurrency(){
const amount=document.getElementById('currAmount').value;
const from=document.getElementById('currFrom').value;
const to=document.getElementById('currTo').value;
const rates={USD:1,EUR:0.85,GBP:0.73,CNY:6.45,INR:74.5};
const result=(amount*rates[to]/rates[from]).toFixed(2);
document.getElementById('currResult').innerHTML=`<h3>${amount} ${from} = ${result} ${to}</h3>`;
}

function calculatePayPalFee(){
const amount=parseFloat(document.getElementById('paypalAmount').value);
const rate=parseFloat(document.getElementById('paypalType').value);
const fee=(amount*rate/100)+0.30;
const receive=amount-fee;
document.getElementById('paypalResult').innerHTML=`<h4>Amount: $${amount}</h4><p>Fee: $${fee.toFixed(2)}</p><h3 style="color:green;">You Receive: $${receive.toFixed(2)}</h3>`;
}

function calculateTax(){
const amount=parseFloat(document.getElementById('taxAmount').value);
const rate=parseFloat(document.getElementById('taxRate').value);
const tax=amount*rate/100;
const total=amount+tax;
document.getElementById('taxResult').innerHTML=`<p>Base: $${amount.toFixed(2)}</p><p>Tax (${rate}%): $${tax.toFixed(2)}</p><h3 style="color:green;">Total: $${total.toFixed(2)}</h3>`;
}

function convertUnit(){
const value=parseFloat(document.getElementById('unitValue').value);
const type=document.getElementById('unitType').value;
const conversions={'in-cm':{result:value*2.54,unit:'cm'},'cm-in':{result:value/2.54,unit:'inches'},'lb-kg':{result:value*0.453592,unit:'kg'},'kg-lb':{result:value/0.453592,unit:'pounds'}};
const conv=conversions[type];
document.getElementById('unitResult').innerHTML=`<h3>${value} = ${conv.result.toFixed(2)} ${conv.unit}</h3>`;
}

// DEVELOPER TOOLS
function convertJSONToCSV(){
try{
const json=JSON.parse(document.getElementById('jsonInput').value);
const array=Array.isArray(json)?json:[json];
const headers=Object.keys(array[0]).join(',');
const rows=array.map(obj=>Object.values(obj).join(',')).join('\n');
const csv=headers+'\n'+rows;
const blob=new Blob([csv],{type:'text/csv'});
const url=URL.createObjectURL(blob);
document.getElementById('jsonCSVResult').innerHTML=`<textarea rows="8" readonly>${csv}</textarea><button onclick="downloadFile('${url}','data.csv')">Download</button>`;
}catch(e){alert('Invalid JSON!');}
}

function convertTimestamp(){
const timestamp=document.getElementById('timestamp').value;
const date=new Date(timestamp*1000);
document.getElementById('timestampResult').innerHTML=`<h4>Date: ${date.toLocaleString()}</h4><p>ISO: ${date.toISOString()}</p>`;
}

function getCurrentTimestamp(){
const now=Math.floor(Date.now()/1000);
document.getElementById('timestamp').value=now;
convertTimestamp();
}

function formatJSON(){
try{
const json=JSON.parse(document.getElementById('jsonFormat').value);
document.getElementById('jsonFormatResult').value=JSON.stringify(json,null,2);
}catch(e){alert('Invalid JSON!');}
}

function encodeURL(){
const url=document.getElementById('urlInput').value;
document.getElementById('urlOutput').value=encodeURIComponent(url);
}

function decodeURL(){
const url=document.getElementById('urlInput').value;
try{document.getElementById('urlOutput').value=decodeURIComponent(url);}catch(e){alert('Invalid URL!');}
}

function generatePassword(){
const length=document.getElementById('passLength').value;
const upper=document.getElementById('passUpper').checked;
const lower=document.getElementById('passLower').checked;
const numbers=document.getElementById('passNum').checked;
const symbols=document.getElementById('passSym').checked;
let chars='';
if(upper)chars+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
if(lower)chars+='abcdefghijklmnopqrstuvwxyz';
if(numbers)chars+='0123456789';
if(symbols)chars+='!@#$%^&*()_+-=[]{}|;:,.<>?';
if(!chars)return alert('Select at least one option!');
let password='';
for(let i=0;i<length;i++){password+=chars.charAt(Math.floor(Math.random()*chars.length));}
document.getElementById('passResult').value=password;
}

function encodeBase64(){
const file=document.getElementById('base64File').files[0];
if(file){
const reader=new FileReader();
reader.onload=function(e){document.getElementById('base64Output').value=e.target.result;};
reader.readAsDataURL(file);
}else{
const text=document.getElementById('base64Input').value;
if(!text)return alert('Enter text or select file!');
document.getElementById('base64Output').value=btoa(text);
}
}

function decodeBase64(){
const encoded=document.getElementById('base64Input').value;
if(!encoded)return alert('Enter base64!');
try{document.getElementById('base64Output').value=atob(encoded);}catch(e){alert('Invalid Base64!');}
}

// UTILITY FUNCTIONS
function downloadFile(url,filename){
const link=document.createElement('a');
link.href=url;link.download=filename;link.click();
}

function copyToClipboard(text){
navigator.clipboard.writeText(text).then(()=>alert('Copied!'));
}

function copyText(elementId){
const element=document.getElementById(elementId);
element.select();
document.execCommand('copy');
alert('Copied!');
}
