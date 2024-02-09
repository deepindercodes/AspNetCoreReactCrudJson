import React from "react";
import './view.css'
class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            article: {}
        }
    }

    //Fetch All Articles
    getArticle(articleid) {
        fetch('/api/articles/'+ articleid)
            .then((response) => response.json())
            .then((data) => this.setState({ article: data }))
            .catch((error) => console.log(error));
    }

    componentDidMount() {
        this.setState({
            id: window.location.pathname.split('/')[2]
        });

        this.getArticle(window.location.pathname.split('/')[2]);
    }

    render() {
        return (
            <div className="container">

                <div className="row">
                    <div className="col-sm-1">
                        &nbsp;
                    </div>
                    <div className="col-sm-10">
                        <ul className='list-group'>
                            <li className='list-group-item fs-5 p-3 bg-primary text-white'>
                                {this.state.article.articletitle}
                            </li>
                            <li className='list-group-item p-2'>
                                <p>
                                    {
                                        this.state.article.articleimage == null || this.state.article.articleimage == ""
                                            ? null
                                            : (
                                                <img id="imgarticle" src={this.state.article.articleimage} className="img-fluid rounded articleimg" />
                                            )
                                    }
                                    <b>Author:</b>&nbsp;{this.state.article.articleauthor }<br />
                                    <b>Date (UTC):</b>&nbsp;
                                    <span>{this.state.article.modifiedonutc != null ? this.state.article.modifiedonutc : this.state.article.createdonutc  }</span>

                                <br />
                                <br />
                                {this.state.article.articlebody}
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="col-sm-1">
                    &nbsp;
                </div>
            </div>
</div >

        );
    }
}

export default View;