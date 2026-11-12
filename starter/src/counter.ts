export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

// let nombre: string = "Camila";
// let edad: number = 28;
// let disponible: boolean = true;

// let nombre = "Camila";
// let edad = 28;
// let disponible = true;


interface Product {
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
  brand: string;
  rating: number;
  numReviews?: number;
  countInStock: number; // 10
  isFeatured: boolean;
  isNew: boolean; // verdadero - falso
}

// const boton = document.querySelector("#botonConfirmarComp");


// function calcularTotal(  product: Product,  cantidad: number): number {
//   applyDiscount(product, 10);
//   return product.price * cantidad;
// }

// function applyDiscount(product: Product, discount: number): number {
//   if(product.isNew) {
//     return product.price * 0.9;
//   }
//   return product.price;
// }