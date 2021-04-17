import Header from './Components/Header';
import Movies from "./Components/Movies";

//React
import {createContext, useState} from "react";

//React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Components/Footer";

import auth from "./auth";
import Register from "./Components/Register";
import Login from "./Components/Login";
import MovieAdd from "./Components/MovieAdd";
import MovieForm from "./Components/MovieForm";
import MovieDetail from "./Components/MovieDetail";

export const EfdbContext = createContext();

const App = () => {
    const [isLogin, setIsLogin] = useState(auth.control());

  return(
         <Router>
             <EfdbContext.Provider value={{isLogin, setIsLogin}}>
                 <Header/>
                 <Switch>
                     <Route path='/' exact>
                         <Movies/>
                     </Route>
                     <Route path="/film-detay/:id" exact>
                         <MovieDetail/>
                     </Route>
                     <Route path="/giris" exact>
                         <Login/>
                     </Route>
                     <Route path="/kayit" exact>
                         <Register/>
                     </Route>
                     <Route path="/film-ekle" exact>
                         <MovieAdd/>
                     </Route>
                     <Route path="/film-duzenle/:id" exact>
                         <MovieForm/>
                     </Route>

                 </Switch>
                 <Footer/>
             </EfdbContext.Provider>
         </Router>
  )
}

export default App;