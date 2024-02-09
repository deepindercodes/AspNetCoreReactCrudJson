import React from "react";
import './article.css'

class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            domarticleimage: "",
            article: {}
        };
        this.addArticle = this.addArticle.bind(this);
        this.readFile = this.readFile.bind(this);
        this.resetAddForm = this.resetAddForm.bind(this);
        this.openEditingPanel = this.openEditingPanel.bind(this);
        this.resetEditForm = this.resetEditForm.bind(this);
        this.editArticle = this.editArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
    }

    //Add new Article
    addArticle(event) {
        event.preventDefault();



        let newArticle = {
            articletitle: event.target.articletitle.value,
            articleauthor: event.target.articleauthor.value,
            articlebody: event.target.articlebody.value,
            articleimage: event.target.articleimage.value
        }

        // Simple POST request with a JSON body using fetch
        {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newArticle)
            };
            fetch('api/articles', requestOptions)
                .then(response => {
                    this.getArticles();
                    this.resetAddForm();
                    document.getElementById('btnCloseAddModal').click();
                });

        }
    }

    //Fetch All Articles
    getArticles() {
        fetch('api/articles')
            .then((response) => response.json())
            .then((data) => this.setState({ articles: data }))
            .catch((error) => console.log(error));
    }

    resetAddForm() {
        this.setState({
            domarticleimage: ""
        });
        document.getElementById("myForm").reset();
    }

    resetEditForm() {
        this.setState({
            domarticleimage: ""
        });
        document.getElementById("myEditForm").reset();
    }


    componentDidMount() {
        this.getArticles();
    }

    //Read Article image data
    readFile(event) {

        let file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            //console.log(e.target?.result?.toString());

            this.setState({
                domarticleimage: e.target?.result?.toString()
            });

        }
        fileReader.readAsDataURL(file);

    }

    openEditingPanel(id) {
        //console.log(id);
        this.resetEditForm();

        fetch('/api/articles/' + id)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                this.setState({ article: data, domarticleimage: data.articleimage });

            })
            .catch((error) => console.log(error));
    }

    editArticle(event) {
        event.preventDefault();

        //console.log(event);

        let id = event.target.articleid.value;

        let editArticle = {
            articletitle: event.target.articletitle.value,
            articleauthor: event.target.articleauthor.value,
            articlebody: event.target.articlebody.value,
            articleimage: event.target.articleimage.value
        }

        // Simple PUT request with a JSON body using fetch
        {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editArticle)
            };
            fetch('api/articles/'+ id, requestOptions)
                .then(response => {
                    this.getArticles();
                    this.resetEditForm();
                    document.getElementById('btnCloseEditModal').click();
                });

        }
    }

    deleteArticle(id) {

        if (confirm('Are you sure you want to delete this article?')) {
            {
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                };
                fetch('api/articles/' + id, requestOptions)
                    .then(response => {
                        this.getArticles();
                    });

            }
        }

    }

    render() {

        return (

            <div>


                <div className="container">

                    <div className="row">
                        <div className="col-sm-9">
                            &nbsp;
                        </div>
                        <div className="col-sm-2 p-3">
                            <a href="#" data-bs-toggle="modal" data-keyboard="false" data-backdrop="static" data-bs-target="#divAddArticle">Add New Article</a>
                        </div>
                        <div className="col-sm-1">
                            &nbsp;
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            &nbsp;
                        </div>
                        <div className="col-sm-10">
                            <ul className='list-group'>
                                <li className='list-group-item fs-5 p-3 bg-primary text-white' key='0'>Article Listing</li>
                                {this.state.articles.map(article =>
                                    <li className='list-group-item p-2' key={article.id}>
                                        <div className='row'>
                                            <div className='col-sm-10'>{article.articletitle}</div>
                                            <div className='col-sm-2 text-center'>
                                                <a href='#' data-bs-toggle="modal" data-keyboard="false" data-backdrop="static" data-bs-target="#divEditArticle" onClick={() => this.openEditingPanel(article.id)}>Edit</a>&nbsp;
                                                <a href='#' onClick={() => this.deleteArticle(article.id)}>Delete</a>&nbsp;
                                                <a href={'/view/' + article.id} target='_blank'>View</a>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="col-sm-1">
                            &nbsp;
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="divAddArticle" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Add New Article</h5>
                                <button id="btnCloseAddModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.resetAddForm}></button>
                            </div>
                            <div className="modal-body">

                                <form id="myForm" onSubmit={this.addArticle}>

                                    <div className="container">


                                        <div className="row">

                                            <div className="col-sm-12">
                                                <div className="container-fluid">

                                                    <div className="row">

                                                        <div className="col-sm-4">
                                                            <label htmlFor="articletitle" className="control-label">Title</label>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <input id="articletitle" name="articletitle" className="form-control" required="required" />
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-12">
                                                            &nbsp;
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-4">
                                                            <label htmlFor="articleauthor" className="control-label">Author</label>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <input id="articleauthor" name="articleauthor" className="form-control" required="required" />
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-12">
                                                            &nbsp;
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-4">
                                                            <label htmlFor="articlebody" className="control-label">Body</label>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <textarea id="articlebody" name="articlebody" className="form-control" required="required" rows="5" cols="20"></textarea>
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-12">
                                                            &nbsp;
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-4">
                                                            Article Image
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <input type="file" id="fileArticleImage" className="form-control" onChange={this.readFile} />
                                                            <img id="imagArticlePreview" src={this.state.domarticleimage} className="img-fluid" />
                                                            <input type="hidden" id="articleimage" name="articleimage" value={this.state.domarticleimage} />
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-12">
                                                            &nbsp;
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-12 text-center">
                                                            <button className="btn btn-danger">Add</button>
                                                        </div>

                                                    </div>


                                                    <div className="row">

                                                        <div className="col-sm-12">
                                                            &nbsp;
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </form>

                            </div>
                        </div>
                    </div>
                </div >


                <div className="modal fade" id="divEditArticle" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabelEdit">Edit Article</h5>
                                <button id="btnCloseEditModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.resetEditForm}></button>
                            </div>
                            <div className="modal-body">

                                <form id="myEditForm" onSubmit={this.editArticle}>
                                    <input type="hidden" id="articleid" name="articleid" value={this.state.article.id} />
                                    <div className="container">


                                        <div className="row">

                                            <div className="col-sm-12">
                                                <div className="container-fluid">

                                                    <div className="row">

                                                        <div className="col-sm-4">
                                                            <label htmlFor="articletitle" className="control-label">Title</label>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <input id="articletitle" name="articletitle" className="form-control" required="required" defaultValue={this.state.article.articletitle} />
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-12">
                                                            &nbsp;
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-4">
                                                            <label htmlFor="articleauthor" className="control-label">Author</label>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <input id="articleauthor" name="articleauthor" className="form-control" required="required" defaultValue={this.state.article.articleauthor} />
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-12">
                                                            &nbsp;
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-4">
                                                            <label htmlFor="articlebody" className="control-label">Body</label>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <textarea id="articlebody" name="articlebody" className="form-control" required rows="5" cols="20" defaultValue={this.state.article.articlebody}></textarea>
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-12">
                                                            &nbsp;
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-4">
                                                            Article Image
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <input type="file" id="fileArticleImage" className="form-control" onChange={this.readFile} />
                                                            <img id="imagArticlePreview" src={this.state.domarticleimage} className="img-fluid" />
                                                            <input type="hidden" id="articleimage" name="articleimage" defaultValue={this.state.domarticleimage} />
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-12">
                                                            &nbsp;
                                                        </div>

                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-12 text-center">
                                                            <button className="btn btn-danger">Edit</button>
                                                        </div>

                                                    </div>


                                                    <div className="row">

                                                        <div className="col-sm-12">
                                                            &nbsp;
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </form>

                            </div>
                        </div>
                    </div>
                </div >

            </div>

        );
    }
}

export default Article;