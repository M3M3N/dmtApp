export interface Archivo {
    id?          : number,
    archivo      : string,
    tipo         : string,
    numero       : number,
    fecha?       : Date,
    usuario?     : string,
    ruta?        : string,
    descripcion? : string,
}