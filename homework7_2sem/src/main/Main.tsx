import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import Content from "../components/Content";
function Main() {
  return (
     <div>
       <Navbar activePage="1"/>
       <Gallery/>
       <Content/>
     </div>
   );
}
export default Main;