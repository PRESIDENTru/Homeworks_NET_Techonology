import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Quiz from "./features/Quiz";

function Testing() {
    return (
        <div>
            <Navbar activePage="4"/>
            <h3>Задание на перетаскивание элементов</h3>
            <Quiz />
            <Footer />
        </div>
    );
}
export default Testing;