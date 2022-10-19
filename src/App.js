import "antd/dist/antd.min.css";
import "./App.css";
import ChecklistsHome from "./components/ChecklistsHome";
import { Layout, Row, Col } from "antd";
const {Header,Content,Sider} = Layout;
function App() {
  return (
    <div className="App">
      <ChecklistsHome />
    </div>
  );
}

export default App;
