const lzf = require('lzfjs');
const { formatXml } = require('./format')
var format = require('xml-formatter');

export const decompress =async (file) => {
    return new Promise((resolve,reject)=>{
        const reader = new FileReader()

        reader.onload = async (e) => {
            const text = e.target.result
            let data = ''
            try {
                data = lzf.decompress(text).toString('utf8')
            }
            catch {
                data = 'error: selected file invalid'
            }
    
            var formattedXml = format(data, {
                indentation: '  ', 
                filter: (node) => node.type !== 'Comment', 
                collapseContent: true, 
                lineSeparator: '\n'
            });

            resolve({ fileName: file.name, xml: formattedXml, dataSize: data.length, saveDataSize: text.byteLength })
        };
        reader.readAsArrayBuffer(file)
    })
    
};