
import Home from "./Home";



export default function Page({ searchParams }) {
  const seller = searchParams.seller || '';
 
  console.log(seller, 'seller') 
  
  return (
    <Home seller={seller}/>
  );
}

