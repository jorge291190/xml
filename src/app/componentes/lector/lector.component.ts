import { Component, OnInit, Attribute, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { NgxXml2jsonService } from 'ngx-xml2json';
import Swal from 'sweetalert2';
import { isArray } from 'util';

@Component({
  selector: 'app-lector',
  templateUrl: './lector.component.html',
  styleUrls: ['./lector.component.css']
})
export class LectorComponent implements OnInit {
   


  resultado: string;
  jsonparser: any;
  archivos: any[]= [];
  redos = /cfdi:/gi;
  selected;
  Null;


          tiles: any[] = [
            {text: 'One', cols: 1, rows: 2, color: '#A8A6A6 '},
            {text: 'Two', cols: 3, rows: 7, color: 'white'},
            {text: 'Three', cols: 1, rows: 2, color: 'white '},
            {text: 'Four', cols: 1, rows: 3, color: 'white'},
          ];


  dataSource = this.archivos;

  constructor(
    private _http: HttpClient,
    private ngxXml2jsonService: NgxXml2jsonService
  ) {
    
  }

  ngOnInit() {
  }


  async onSelectedFilesChanged(event){

    const lista: any []= event;
    const parser = new DOMParser();
    let contador =1;
    const  Food: any[] = [
      {value: 'steak-0', viewValue: 'Steak'},
      {value: 'pizza-1', viewValue: 'Pizza'},
      {value: 'tacos-2', viewValue: 'Tacos'}
    ];
    
      Array.from(lista).forEach(file =>{
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload =  () => {
        contador++;
        //trata los archivos como string
        const xmldata = reader.result.toString();
        //convierte el string en un DOM
        const parser = new DOMParser();
        const subString = xmldata.replace(this.redos,"");

          //xml convertido a cadena de texto
         const xml = parser.parseFromString(subString, 'text/xml');

          
    //xml->json
    const obj:any = this.ngxXml2jsonService.xmlToJson(xml);

   // console.log(obj);
    
    //CONSTANTES DE REEMPLAZO DESDE AQUI INICIAS TODO LO QUE VAYAS A REEMPLAZAR 
    const te = /tfd:TimbreFiscalDigital/gi;
    const dat = /@ATTRIBUTES/gi;
    const pagos = /pago10:Pago/gi;
    const ppago =/pago10:doctorelacionado/gi;


    let parsedata = JSON.stringify(obj).toLocaleLowerCase().replace(dat,'data');
           parsedata = parsedata.replace(te,"identificador").trim();
           parsedata = parsedata.replace(pagos,"pagos").trim();
           parsedata = parsedata.replace(ppago,"repago").trim();
           const result: any = JSON.parse(parsedata);
      try {
       
    if(result.comprobante.data.tipodecomprobante !== "p"){

   // let impuestos =           
      if(result.comprobante.impuestos.traslados){
          this.pushFacturas(result);}
       // console.log(result);
      }else{

        this.pushComplemento(result);
      }
      } catch (error) {
        this.pushNoOBjeto(result);

        console.log(error);
      }      

        };
    
      });
    
  
  }
  //NO TOQUES NADA DEL OBJETO QUE YA ESTE AQUI, SI PUEDES AGREGAR NUEVAS CARACTERISTICAS
  pushFacturas(obj: any){
    
    let uuid =                obj.comprobante.complemento.identificador.data.uuid;
    let rfcpac =              obj.comprobante.complemento.identificador.data.rfcprovcertif;
    let rfcemisor =           obj.comprobante.emisor.data.rfc;
    let nombreemisor =        obj.comprobante.emisor.data.nombre;      
    let rfcreceptor =         obj.comprobante.receptor.data.rfc;
    let nombrereceptor =      obj.comprobante.receptor.data.nombre;
    let serie =               obj.comprobante.data.serie;
    let folio =               obj.comprobante.data.folio;
    let fecha =               obj.comprobante.data.fecha;
    let descuento =           obj.comprobante.data.descuento;
    let condicionespago =     obj.comprobante.data.condicionesdepago;
    let subtotal =            obj.comprobante.data.subtotal;
    let moneda =              obj.comprobante.data.moneda;
    let total =               obj.comprobante.data.total;
    let tipocomprobante =     obj.comprobante.data.tipodecomprobante;
    let metodopago =          obj.comprobante.data.metodopago;
    let lugar =               obj.comprobante.data.lugarexpedicion;
    let impuestos =           obj.comprobante.impuestos.traslados;
    let formapago =           obj.comprobante.data.formapago;

    let temp : any ={
      id: uuid,
      pac: rfcpac,
      emisorrfc: rfcemisor,
      emisornombre: nombreemisor,
      receptorrfc: rfcreceptor,
      receptornombre: nombrereceptor,
      ser: serie,
      fol: folio,
      desc: descuento,
      date: fecha,
      conpago: condicionespago,
      subtot: subtotal,
      mon: moneda,
      tot: total,
      tipc: tipocomprobante,
      metpago: metodopago,
      lug: lugar,
      impu: impuestos,
      forma: formapago,
      Status:'En Proceso',
};


this.archivos.push(temp);
  }
//NO TOQUES NADA DEL OBJETO QUE YA ESTE AQUI, SI PUEDES AGREGAR NUEVAS CARACTERISTICAS
  pushNoOBjeto(obj: any){
    let uuid =                obj.comprobante.complemento.identificador.data.uuid;
    let rfcpac =              obj.comprobante.complemento.identificador.data.rfcprovcertif;
    let rfcemisor =           obj.comprobante.emisor.data.rfc;
    let nombreemisor =        obj.comprobante.emisor.data.nombre;      
    let rfcreceptor =         obj.comprobante.receptor.data.rfc;
    let nombrereceptor =      obj.comprobante.receptor.data.nombre;
    let serie =               obj.comprobante.data.serie;
    let folio =               obj.comprobante.data.folio;
    let fecha =               obj.comprobante.data.fecha;
    let descuento =           obj.comprobante.data.descuento;
    let condicionespago =     obj.comprobante.data.condicionesdepago;
    let subtotal =            obj.comprobante.data.subtotal;
    let moneda =              obj.comprobante.data.moneda;
    let total =               obj.comprobante.data.total;
    let tipocomprobante =     obj.comprobante.data.tipodecomprobante;
    let metodopago =          obj.comprobante.data.metodopago;
    let lugar =               obj.comprobante.data.lugarexpedicion;
    let formapago =           obj.comprobante.data.formapago;
   // let impuestos =           obj.comprobante.impuestos.traslados;

    let temp : any ={
      id: uuid,
      pac: rfcpac,
      emisorrfc: rfcemisor,
      emisornombre: nombreemisor,
      receptorrfc: rfcreceptor,
      receptornombre: nombrereceptor,
      ser: serie,
      fol: folio,
      date: fecha,
      desc: descuento,
      conpago: condicionespago,
      subtot: subtotal,
      mon: moneda,
      tot: total,
      tipc: tipocomprobante,
      metpago: metodopago,
      lug: lugar,
      impu: [],
      forma: formapago,
      Status:'En Proceso',
};

this.archivos.push(temp);
  }

//NO TOQUES NADA DEL OBJETO QUE YA ESTE AQUI, SI PUEDES AGREGAR NUEVAS CARACTERISTICAS
  pushComplemento(obj: any){
    let uuid =                obj.comprobante.complemento.identificador.data.uuid;
    let rfcpac =              obj.comprobante.complemento.identificador.data.rfcprovcertif;
    let rfcemisor =           obj.comprobante.emisor.data.rfc;
    let nombreemisor =        obj.comprobante.emisor.data.nombre;      
    let rfcreceptor =         obj.comprobante.receptor.data.rfc;
    let nombrereceptor =      obj.comprobante.receptor.data.nombre;
    let serie =               obj.comprobante.data.serie;
    let folio =               obj.comprobante.data.folio;
    let fecha =               obj.comprobante.data.fecha;
    let condicionespago =     '';
    let subtotal =            obj.comprobante.data.subtotal;
    let moneda =              obj.comprobante.data.moneda;
    let total =               obj.comprobante.data.total;
    let tipocomprobante =     obj.comprobante.data.tipodecomprobante;
    let metodopago =          '';
    let lugar =               obj.comprobante.data.lugarexpedicion;
    let impuestos =           '';
    let formapago =           '';
    let ppagos  =   this.sumaPagos(obj.comprobante.complemento);

    let temp : any ={
      id: uuid,
      pac: rfcpac,
      emisorrfc: rfcemisor,
      emisornombre: nombreemisor,
      receptorrfc: rfcreceptor,
      receptornombre: nombrereceptor,
      ser: serie,
      fol: folio,
      date: fecha,
      conpago: condicionespago,
      subtot: subtotal,
      mon: moneda,
      tot: total,
      tipc: tipocomprobante,
      metpago: metodopago,
      lug: lugar,
      impu: impuestos,
      imppagado: ppagos,
      forma: formapago,
      Status:'En Proceso',

};


this.archivos.push(temp);


  }

  enProceso(): number{

    return this.archivos.filter(ele => ele.Status ==="En Proceso").length;
  }

  Subidos(): number{

    return this.archivos.filter(ele => ele.Status ==="No error").length;
  }

  Procesados(): number{
    return this.archivos.filter(ele => ele.Status !=="En Proceso").length;
  }

  async onUploadClicked(event){
  
      let contador = 0;
      Swal.fire({
        icon: 'success',
        title: 'Cargando Archivos a TCI',
        showConfirmButton: false,
        timer: 1500
      })
      await this.archivos.forEach(elemento =>{
        contador++;
        if(elemento.Status  === 'En Proceso'){
              setTimeout(()  => {
               //PARA QUE FUNCIONE CON VARIOS USUARIOS HAY QUE AGREGAR LAS NUEVAS VARIABLES DE BASES DE DATOS
              
              const body = JSON.stringify(elemento);
              const bd =                "bmt942pr6";
              const bdcanceldos =       "bnsrxgwgb";
              const bdemitidos =        'bnrqc65vf';
        /*orden del archivo pph
                folio-
                Fecha-
                metodoPago-
                nombre receptor-
                rfc receptor-
                emisornombre-
                emisorrfc-
                iva-
                ieps-
                uuid-
                pac-
                subtotal-
                tipo comprobante
        */
              //AQUI VAN LOS CAMPOS EN DONDE CAEN EN QUICKBASE
              const fields =            "11-16-19-20-21-12-14-6-13-15-133-7-83-69-134-136";
              const fieldscancelados =  "11-16-19-20-21-12-14-6-13-15-95-7-80-69-96-97";
              const fieldsemitidos  =   "11-16-19-20-21-12-14-6-13-15-228-7-101-69-231-232";

           
              if(event === 'Recibidos'){
              this._http.post(`https://tciconsultoria.com/cargaxmlv4.php?bd=${bd}&fields=${fields}`,body, {responseType:'text'} )
              .subscribe ( res => { 
                const parse: any = JSON.parse(res);
                console.log(res);
                if(parse.errtext) {
                  
                    this.archivos.find(ele => ele.id === elemento.id).Status = parse.errtext;          
                }    
              });
              } //fin del if de Recibidos
              if(event === 'Emitidos'){
                this._http.post(`https://tciconsultoria.com/cargaxmlv4.php?bd=${bdemitidos}&fields=${fieldsemitidos}`,body, {responseType:'text'} )
                .subscribe ( res => { 
                  console.log(res);
                  const parse: any = JSON.parse(res);
                  if(parse.errtext) {
                      this.archivos.find(ele => ele.id === elemento.id).Status = parse.errtext;          
                  }    
                });
                } //fin del if de Emitidos
              if(event === 'Cancelados'){
              this._http.post(`https://tciconsultoria.com/cargaxmlv4.php?bd=${bdcanceldos}&fields=${fieldscancelados}`,body, {responseType:'text'} )
              .subscribe(res =>{ 
                const parse: any = JSON.parse(res);
                console.log(res);
                
                if(parse.errtext) {
                  this.archivos.find(ele => ele.id === elemento.id).Status = parse.errtext;          
              }  
              });
            
            } //fin del if de Cancelados
          }, contador *500);
        }
    });

   
  }



  sumaPagos(obj:any): number{
      if(!isArray(obj.pagoss.pagos)){

        return Number(obj.pagoss.pagos.repago.data.imppagado);
      }
    else{
      let suma = 0;
    obj.pagoss.pagos.forEach(element => {
      if(element.repago){

        
        suma += Number(element.repago.data.imppagado);
      }
    });
    return suma;
      
    }
    
    


  }
  
}
