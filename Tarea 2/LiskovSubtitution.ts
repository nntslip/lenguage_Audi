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
  
 class Aves{ 
     nombre:string; 
     constructor(nombre:string){ 
         this.nombre=nombre; 
     } 
  
     volar(){ 
         console.log("El pájaro vuela en el cielo"); 
     } 
  
     novolar(){ 
         throw new Error("Los pinguinos no pueden volar"); 
     } 
 } 
  
 class Pajaro extends Aves{ 
     constructor(nombre:string){ 
         super(nombre); 
     } 
     volar(): string { 
         return ""; 
     } 
 } 
  
 class Pinguino extends Aves{ 
     constructor(nombre:string){ 
         super(nombre); 
     } 
     novolar(): string { 
         return ""; 
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
 class Cuadrado extends Rectangulo { 
  
     constructor(lado: number) { 
         super(lado, lado); 
     } 
  
     setAlto(value: number) { 
         if (value !== this.ancho) { 
             throw new Error("Los lados del cuadrado deben de ser iguales"); 
         } 
  
         super.setAlto(value); 
         this.ancho = value; 
     } 
  
     setAncho(value: number) { 
         if (value !== this.alto) { 
             throw new Error("Los lados del cuadrado deben de ser iguales"); 
         } 
  
         super.setAncho(value); 
         this.alto = value; 
     } 
     }
