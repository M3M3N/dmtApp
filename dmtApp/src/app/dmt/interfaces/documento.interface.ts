export interface Documento {
    id          : number,
    descripcion : string,
    estatus     : string,
    abreviacion : string,
    orden       : number,
    obliga_a    : boolean
    obliga_s    : boolean
    obliga      : boolean
    obliga_n    : boolean
}