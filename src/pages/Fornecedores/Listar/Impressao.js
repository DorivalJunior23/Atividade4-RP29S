export class Impressao {

    constructor(dadosParaImpressao) {
        this.dadosParaImpressao = dadosParaImpressao;
      } 

    async PreparaDocumento() {
        const documento = this.CriaCorpoDocumento();
        return documento;
    }

      Documento () {
        const tableContent = [];  
        this.dadosParaImpressao.forEach(item => {
            tableContent.push([
                { text: ((item.cnpj) ? item.cnpj : ''), fontSize: 10, alignment: "left"},
                { text: ((item.cpf) ? item.cpf : ''), fontSize: 10, alignment: "left"},
                { text: item.name, fontSize: 10, alignment: "left" },
                { text: item.telefone, fontSize: 10, alignment: "left" },
                { text: item.bairro, fontSize: 10, alignment: "center" },
                { text: item.cep, fontSize: 10, alignment: "left" },                
                { text: item.tipo, fontSize: 10, alignment: "left" },
                { text: item.status, fontSize: 10, alignment: "center" }                
            ])
        });
        return tableContent;
      }
	
      CriaCorpoDocumento () {
        
        const formattedData = this.Documento();
        const data = new Date();
        const documentDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            header: [
                {   
                    margin: [10, 10, 0, 0],
                    image: 'data:image/jpeg;base64,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',
                    width: 140,
                    height: 140,

                }
            ],
            content: [

                {   
                    margin: [105, -20, 0, 0],
                    ul :[
                        {text: 'Alone Market LTDA ME', style:{fontSize: 10, bold: true}, margin: [0, 5]},
                        {text: 'COND. DA BOA VISTA - 000,\t RECIFE - PERNAMBUCO-PE-00000-000', style:{fontSize: 10}, margin: [0, 3]},
                        {text: 'www.alonemarket.com.br', link: 'http://google.com', style:{fontSize: 10}, margin: [0, 3]},
                        {text: '(00) 0000-0000\t (00) 0000-0000', style:{fontSize: 10}, margin: [0, 3]},
                        {text: 'Data: '+ String(data.getDate()).padStart(2,'0')  + "/" + String((String(data.getMonth() + 1).padStart(2, '0'))) + "/" + String(String(data.getFullYear()))
                        + "\tHora:  " + (String(data.getHours()).padStart(2,'0')+" : " + data.getMinutes()), style: {fontSize: 10}},
                    ]
                     
                },
                {
        
                    margin: [100, 100, 100, 0],
                    text: '\nRELATÓRIO DE FORNECEDOR', style: {fontSize: 14, alignment: 'center', bold: true},

                },
                '\n\n\n\n',
                {
                    margin: [-30, 0, 0, 0],
                    table: {
                        headerRows: 1,
                        dontBreakRows: true,
                        body: [
                            [{text: 'CNPJ', style: {fontSize: "11", bold: true, alignment: "center"}, margin:[13,0]}, 
                             {text: 'CPF', style: {fontSize: "11", bold: true, alignment: "center"}, margin:[13,0]}, 
                             {text: 'Razão Social', style: {fontSize: "11", bold: true, alignment: "center"}, margin:[14,0]}, 
                             {text: 'Telefone', style: {fontSize: "11", bold: true, alignment: "center"}, margin:[14.2,0]}, 
                             {text: 'Bairro', style: {fontSize: "11", bold: true, alignment: "center"}, margin:[15,0]}, 
                             {text: 'CEP', style: {fontSize: "11", bold: true, alignment: "center"}, margin:[13,0]}, 
                             {text: 'Tipo', style: {fontSize: "11", bold: true, alignment: "center"}, margin:[13,0]},
                             {text: 'Status', style: {fontSize: "11", bold: true, alignment: "center"}, margin:[13,0]},         
                            ],
                            ...formattedData,
                            
                        ]
                        
                    },
                    
                }
            ],

            footer: [
                {

                    text: '\n@ Alone Market',
                    fontSize: 10,
                    alignment: 'center',
                }
            ]
        };
        return documentDefinition;
      }
    
}