import React from 'react';
import QRCode from 'react-qr-code';

export class ExportItemToQRCode extends React.PureComponent {     
  render() {         
    return (
      <div class="d-flex flex-wrap">        
        {this.props.itemsParaQRCode.map((item, index) =>{                            
            return(
              <div style={{padding: 10}} key={index} className="signature" className="content-wrapper">                                                               
                <label style={{fontSize: 15}}>{item.codigoDeBarras}<br />{"Val-"+item.dataValidade}<br />{item.name}</label>                                                                                                                     
                  <p style={{marginRight: 10, marginTop: 10, flexWrap:"wrap"}}>                                                
                    <QRCode 
                        value={item.codigoDeBarras+"  "+item.dataValidade}
                        size={100}
                        level={"L"}
                        includeMargin={false}                                                        
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
               
  

