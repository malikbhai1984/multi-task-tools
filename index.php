<!DOCTYPE html>
<html lang="ur">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multi-Tool Website - YouTube, QR, Image, PDF Tools</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        h2 { margin-bottom: 20px; color: #667eea; }
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .tab {
            padding: 15px 30px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            cursor: pointer;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
        }
        .tab:hover { background: rgba(255,255,255,0.3); }
        .tab.active { background: white; color: #667eea; }
        .tool-section {
            display: none;
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        .tool-section.active { display: block; }
        .input-group { margin-bottom: 20px; }
        label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 600;
        }
        input[type="text"], input[type="file"], textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
        }
        button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
        }
        button:hover { transform: scale(1.05); }
        .result { margin-top: 30px; text-align: center; }
        .thumbnails {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .thumbnail-item {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 10px;
        }
        .thumbnail-item img {
            width: 100%;
            border-radius: 8px;
            margin-bottom: 10px;
        }
        #qrcode { display: flex; justify-content: center; margin: 20px 0; }
        .quality-selector {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        .preview-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 20px;
        }
        .preview-box {
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
        }
        .preview-box img { max-width: 100%; border-radius: 8px; }
        .size-info { margin-top: 10px; font-weight: bold; color: #666; }
        .pdf-section { margin-bottom: 30px; padding-bottom: 30px; border-bottom: 2px solid #e0e0e0; }
        .pdf-section:last-child { border-bottom: none; }
        #extractedText {
            width: 100%;
            font-family: monospace;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
        }
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(102,126,234,.3);
            border-radius: 50%;
            border-top-color: #667eea;
            animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
            .preview-container { grid-template-columns: 1fr; }
            h1 { font-size: 1.8em; }
            .tab { padding: 10px 15px; font-size: 14px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🛠️ Multi-Tool Website</h1>
        
        <div class="tabs">
            <button class="tab active" onclick="showTool('youtube')">📺 Thumbnail</button>
            <button class="tab" onclick="showTool('qr')">📱 QR Code</button>
            <button class="tab" onclick="showTool('compress')">🗜️ Image</button>
            <button class="tab" onclick="showTool('pdf')">📄 PDF Tools</button>
        </div>

        <!-- YouTube Tool -->
        <div id="youtube" class="tool-section active">
            <h2>📺 YouTube Thumbnail Downloader</h2>
            <div class="input-group">
                <label>YouTube URL:</label>
                <input type="text" id="ytUrl" placeholder="https://www.youtube.com/watch?v=...">
            </div>
            <button onclick="getThumbnails()">Get Thumbnails</button>
            <div id="thumbnailResult" class="result"></div>
        </div>

        <!-- QR Code Tool -->
        <div id="qr" class="tool-section">
            <h2>📱 QR Code Generator</h2>
            <div class="input-group">
                <label>Text or URL:</label>
                <textarea id="qrText" rows="4" placeholder="Enter text or URL"></textarea>
            </div>
            <button onclick="generateQR()">Generate QR Code</button>
            <div id="qrcode"></div>
            <div id="qrResult" class="result"></div>
        </div>

        <!-- Image Compressor Tool -->
        <div id="compress" class="tool-section">
            <h2>🗜️ Image Compressor</h2>
            <div class="input-group">
                <label>Select Image:</label>
                <input type="file" id="imageInput" accept="image/*">
            </div>
            <div class="quality-selector">
                <label>Quality:</label>
                <label><input type="radio" name="quality" value="0.9" checked> High 90%</label>
                <label><input type="radio" name="quality" value="0.7"> Medium 70%</label>
                <label><input type="radio" name="quality" value="0.5"> Low 50%</label>
            </div>
            <button onclick="compressImage()">Compress Image</button>
            <div id="compressResult" class="preview-container"></div>
        </div>

        <!-- PDF Tools -->
        <div id="pdf" class="tool-section">
            <h2>📄 PDF Tools</h2>

            <!-- PDF to Text Extractor -->
            <div class="pdf-section">
                <h3>📝 PDF to Text Extractor</h3>
                <div class="input-group">
                    <label>Upload PDF File:</label>
                    <input type="file" id="pdfFile" accept=".pdf">
                </div>
                <button onclick="extractPDFText()">Extract Text</button>
                <div id="pdfResult" class="result" style="text-align:left;">
                    <textarea id="extractedText" rows="10" readonly placeholder="Extracted text will appear here..."></textarea>
                    <br>
                    <button onclick="copyText()" style="margin-top:10px;">Copy Text</button>
                    <button onclick="downloadText()" style="margin-top:10px;">Download as TXT</button>
                </div>
            </div>

            <!-- PDF Compressor -->
            <div class="pdf-section">
                <h3>🗜️ PDF Compressor</h3>
                <div class="input-group">
                    <label>Upload PDF to Compress:</label>
                    <input type="file" id="pdfCompress" accept=".pdf">
                </div>
                <div class="quality-selector">
                    <label>Quality:</label>
                    <label><input type="radio" name="pdfQuality" value="1.5" checked> High</label>
                    <label><input type="radio" name="pdfQuality" value="2"> Medium</label>
                    <label><input type="radio" name="pdfQuality" value="3"> Low (Max Compression)</label>
                </div>
                <button onclick="compressPDF()">Compress PDF</button>
                <div id="pdfCompressResult" class="result"></div>
            </div>

            <!-- HTML to PDF -->
            <div class="pdf-section">
                <h3>📄 HTML to PDF Generator</h3>
                <div class="input-group">
                    <label>Enter HTML Content:</label>
                    <textarea id="htmlContent" rows="6" placeholder="<h1>My Document</h1><p>Content here...</p>"></textarea>
                </div>
                <button onclick="htmlToPDF()">Create PDF</button>
            </div>

            <!-- Merge PDFs -->
            <div class="pdf-section">
                <h3>📑 Merge PDFs</h3>
                <div class="input-group">
                    <label>Select Multiple PDF Files:</label>
                    <input type="file" id="pdfMerge" accept=".pdf" multiple>
                </div>
                <button onclick="mergePDFs()">Merge PDFs</button>
                <div id="mergeResult" class="result"></div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js"></script>
    
    <script>
        // Configure PDF.js worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        function showTool(tool) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tool-section').forEach(s => s.classList.remove('active'));
            event.target.classList.add('active');
            document.getElementById(tool).classList.add('active');
        }

        // ==================== YOUTUBE FUNCTIONS ====================
        function getVideoId(url) {
            const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
            const match = url.match(regex);
            return match ? match[1] : null;
        }

        function getThumbnails() {
            const url = document.getElementById('ytUrl').value;
            const videoId = getVideoId(url);
            if (!videoId) { alert('Invalid YouTube URL!'); return; }

            const qualities = [
                { name: 'Max Quality', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
                { name: 'Standard', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
                { name: 'High', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
                { name: 'Medium', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` }
            ];

            let html = '<div class="thumbnails">';
            qualities.forEach(q => {
                html += `<div class="thumbnail-item">
                    <h3>${q.name}</h3>
                    <img src="${q.url}">
                    <button onclick="downloadImage('${q.url}', '${videoId}_${q.name}.jpg')">Download</button>
                </div>`;
            });
            html += '</div>';
            document.getElementById('thumbnailResult').innerHTML = html;
        }

        function downloadImage(url, filename) {
            fetch(url).then(r => r.blob()).then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.click();
            });
        }

        // ==================== QR CODE FUNCTIONS ====================
        let qrcodeObj = null;
        function generateQR() {
            const text = document.getElementById('qrText').value;
            if (!text) { alert('Enter text!'); return; }

            document.getElementById('qrcode').innerHTML = '';
            qrcodeObj = new QRCode(document.getElementById('qrcode'), {
                text: text,
                width: 256,
                height: 256
            });

            setTimeout(() => {
                document.getElementById('qrResult').innerHTML = 
                    '<button onclick="downloadQR()">Download QR</button>';
            }, 100);
        }

        function downloadQR() {
            const canvas = document.querySelector('#qrcode canvas');
            canvas.toBlob(blob => {
                const link = document.createElement('a');
                link.download = 'qrcode.png';
                link.href = URL.createObjectURL(blob);
                link.click();
            });
        }

        // ==================== IMAGE COMPRESSOR FUNCTIONS ====================
        function compressImage() {
            const file = document.getElementById('imageInput').files[0];
            if (!file) { alert('Select image!'); return; }

            const quality = parseFloat(document.querySelector('input[name="quality"]:checked').value);
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    canvas.getContext('2d').drawImage(img, 0, 0);
                    
                    canvas.toBlob(function(blob) {
                        const originalSize = (file.size / 1024).toFixed(2);
                        const compressedSize = (blob.size / 1024).toFixed(2);
                        const savings = ((1 - blob.size / file.size) * 100).toFixed(1);
                        const compressedUrl = URL.createObjectURL(blob);
                        
                        document.getElementById('compressResult').innerHTML = `
                            <div class="preview-box">
                                <h3>Original</h3>
                                <img src="${e.target.result}">
                                <div class="size-info">${originalSize} KB</div>
                            </div>
                            <div class="preview-box">
                                <h3>Compressed</h3>
                                <img src="${compressedUrl}">
                                <div class="size-info">${compressedSize} KB</div>
                                <div class="size-info" style="color:green;">Saved ${savings}%</div>
                                <button onclick="downloadCompressed('${compressedUrl}')">Download</button>
                            </div>
                        `;
                    }, 'image/jpeg', quality);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        function downloadCompressed(url) {
            const link = document.createElement('a');
            link.href = url;
            link.download = 'compressed.jpg';
            link.click();
        }

        // ==================== PDF FUNCTIONS ====================
        
        // 1. PDF to Text Extractor
        async function extractPDFText() {
            const file = document.getElementById('pdfFile').files[0];
            if (!file) { alert('PDF select karo!'); return; }

            document.getElementById('extractedText').value = 'Extracting text...';
            
            try {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
                let fullText = '';

                for(let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map(item => item.str).join(' ');
                    fullText += `--- Page ${i} ---\n${pageText}\n\n`;
                }

                document.getElementById('extractedText').value = fullText;
                alert('Text extracted successfully!');
            } catch (error) {
                alert('Error extracting text: ' + error.message);
                document.getElementById('extractedText').value = '';
            }
        }

        function copyText() {
            const text = document.getElementById('extractedText');
            text.select();
            document.execCommand('copy');
            alert('Text copied!');
        }

        function downloadText() {
            const text = document.getElementById('extractedText').value;
            if (!text) { alert('No text to download!'); return; }
            
            const blob = new Blob([text], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'extracted_text.txt';
            link.click();
        }

        // 2. PDF Compressor
        async function compressPDF() {
            const file = document.getElementById('pdfCompress').files[0];
            if (!file) { alert('PDF select karo!'); return; }

            const scale = parseFloat(document.querySelector('input[name="pdfQuality"]:checked').value);
            
            document.getElementById('pdfCompressResult').innerHTML = '<div class="loading"></div> Compressing...';

            try {
                const arrayBuffer = await file.arrayBuffer();
                const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
                
                const pdfBytes = await pdfDoc.save({
                    useObjectStreams: false
                });

                const originalSize = (file.size / 1024).toFixed(2);
                const compressedSize = (pdfBytes.length / 1024).toFixed(2);
                const savings = ((1 - pdfBytes.length / file.size) * 100).toFixed(1);

                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);

                document.getElementById('pdfCompressResult').innerHTML = `
                    <div class="preview-box">
                        <h3>Compression Complete!</h3>
                        <div class="size-info">Original: ${originalSize} KB</div>
                        <div class="size-info">Compressed: ${compressedSize} KB</div>
                        <div class="size-info" style="color:green;">Saved: ${savings}%</div>
                        <button onclick="window.open('${url}')">Preview PDF</button>
                        <button onclick="downloadPDF('${url}', 'compressed.pdf')">Download</button>
                    </div>
                `;
            } catch (error) {
                alert('Error compressing PDF: ' + error.message);
                document.getElementById('pdfCompressResult').innerHTML = '';
            }
        }

        // 3. HTML to PDF
        function htmlToPDF() {
            const htmlContent = document.getElementById('htmlContent').value;
            if (!htmlContent) { alert('HTML content enter karo!'); return; }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.html(htmlContent, {
                callback: function (doc) {
                    doc.save('document.pdf');
                    alert('PDF created successfully!');
                },
                x: 10,
                y: 10,
                width: 190,
                windowWidth: 800
            });
        }

        // 4. Merge PDFs
        async function mergePDFs() {
            const files = document.getElementById('pdfMerge').files;
            if (files.length < 2) { alert('At least 2 PDFs select karo!'); return; }

            document.getElementById('mergeResult').innerHTML = '<div class="loading"></div> Merging PDFs...';

            try {
                const mergedPdf = await PDFLib.PDFDocument.create();

                for (let i = 0; i < files.length; i++) {
                    const arrayBuffer = await files[i].arrayBuffer();
                    const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
                    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                    copiedPages.forEach((page) => mergedPdf.addPage(page));
                }

                const pdfBytes = await mergedPdf.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);

                document.getElementById('mergeResult').innerHTML = `
                    <div class="preview-box">
                        <h3>PDFs Merged Successfully!</h3>
                        <div class="size-info">Total Pages: ${mergedPdf.getPageCount()}</div>
                        <button onclick="window.open('${url}')">Preview PDF</button>
                        <button onclick="downloadPDF('${url}', 'merged.pdf')">Download</button>
                    </div>
                `;
            } catch (error) {
                alert('Error merging PDFs: ' + error.message);
                document.getElementById('mergeResult').innerHTML = '';
            }
        }

        function downloadPDF(url, filename) {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
        }
    </script>
</body>
</html>
