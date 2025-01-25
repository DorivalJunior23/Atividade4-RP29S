import React from 'react';
import QRCode from 'react-qr-code';

export class ExportToQRCode extends React.PureComponent {  
  render() {      
    return (
      <div className="d-flex flex-wrap">        
        {this.props.dadosParaQRCode.map((item, index) =>{                            
            return(
              <div style={{padding: 10}} key={index} className="signature">                                                               
                <label style={{fontSize: 15}}>{item.codigoDeBarras}<br />{"Val-"+item.dataValidade}<br />{item.name}</label>                                                                                                                     
                  <p style={{marginRight: 10, marginTop: 10, flexWrap:"wrap"}}>                                                
                    <QRCode 
                        value={item.codigoDeBarras+"  "+item.dataValidade}
                        size={100}
                        level={"L"}
                        includeMargin={true}                                                        
                    />
                  </p>                                                                                                                                                                                        
              </div>                      
            );                                      
          })
        }          
      </div>                                                
    );
  }
}
               
  

