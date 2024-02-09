import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Article from "./article/article";
import View from "./article/view";
/*import './App.css';*/

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<Article />}></Route>
                    <Route exact path="/view/:id" element={<View />}></Route>
                </Routes>
            </Router>

        );


    }
}

export default App;