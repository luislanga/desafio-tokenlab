import { Dashboard } from "./pages/Dashboard";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
export default App;
