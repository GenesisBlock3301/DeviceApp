import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./layout/NavBar";
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Devices from "./components/Home";
import AddDevice from "./components/AddDevice";
import EditDevice from "./components/EditDevice";
import SearchBar from "./components/SearchBox";
// import {L}

function App() {
    return (
        <BrowserRouter>
            <div className="container-fluid">
                <Navbar/>
            </div>
            <Switch>
                <Route exact path="/" component={Devices}/>
                <Route exact path="/adduser" component={AddDevice}/>
                <Route exact path="/edit/:id" component={EditDevice}/>
                <Route exact path="/search" component={SearchBar}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
