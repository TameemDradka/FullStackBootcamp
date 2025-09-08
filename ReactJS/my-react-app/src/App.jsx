import Header from "./header";
import Footer from "./footer";

function App() {
  const fName = "Tameem";
  const lName = "D";

  return (
    <>
      <Header />
      <div>
        <img src="https://fishandmeat.hk/wp-content/uploads/2025/05/arabic-chicken-shawarma-sandwich-recipe-1747792750.jpg" alt="yo"/>
        <img src="https://images.squarespace-cdn.com/content/v1/5fee3b088500a82fe9d47ac9/1609900284373-K62CMOSW8RIBRS2ZB962/mansaf.jpg" alt="no"/>
        <img src="https://cdn.prod.website-files.com/62e81a6c2171bd40143e605c/66e83b6c83ebb283250e9ee5_08415-5%20WebKiosk_App_FW_3PcBIC_45Deg_ALC_2000x1333_RAS_CR.jpg" alt="ll"/>
      </div>

      <p className="text">Created By {fName} {lName}</p>
      <p className="text">Copyright 2025.</p>

    
      <Footer />
    </>
  );
}

export default App;