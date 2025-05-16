
import Home from "./Home";



export default function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const seller = searchParams.seller || '';
 
  console.log(seller, 'seller') 
  
  return (
    <Home seller={seller}/>
  );
}

