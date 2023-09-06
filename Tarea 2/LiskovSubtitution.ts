//example 1 
 // class Pajaro{ 
 //     volar(){ 
 //         console.log("El pájaro vuela en el cielo"); 
 //     } 
 // } 
  
 // class Pinguino extends Pajaro{ 
 //     volar(){ 
 //         throw new Error("Los pinguinos no pueden volar"); 
 //     } 
 // } 
  
 /////solucion 
  
 class pajaro{ 
     volar(){ 
         console.log("El pájaro vuela en el cielo"); 
     }
 }
 class pinguino{ 
     nadar(){ 
         console.log("El pingüino nada en el agua); 
     }
 } 
 //example 2 
 class Rectangulo{ 
     alto: number; 
     ancho: number; 
  
     constructor(alto: number, ancho: number){ 
         this.alto = alto; 
         this.ancho = ancho; 
     } 
  
     setAlto(value: number){ 
         this.alto = value; 
     } 
  
     setAncho(value: number){ 
         this.ancho = value; 
     } 
  
     area(): number{ 
         return this.alto = this.ancho; 
     } 
 } 
  
 /// 
 class Cuadrado { 
  lado: number;
  constructor(lado: number){ 
         this.lado = alto; 
     } 
     setLado(value: number) { 
         this.lado=value; 
     } 
 }
