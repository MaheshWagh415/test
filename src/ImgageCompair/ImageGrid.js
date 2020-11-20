import React, { Component } from "react";
import axios from "axios";
import paginate from "paginate-array";
import TableView from "./TableView";
import "../App.css";
export class ImageGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
      size: 6,
      page: 1,
      currPage: null,
      passData: [],
      switchButton: true
    };
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/photos").then(respose => {
      const { page, size } = this.state;
      const currPage = paginate(respose.data, page, size);
      this.setState({ img: respose.data, currPage });
    });
  }

  previousPage() {
    const { page, size, img } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(img, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }
  nextPage() {
    const { currPage, page, size, img } = this.state;

    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(img, newPage, size);
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
    }
  }

  handleChange(e) {
    const { value } = e.target;
    const { img } = this.state;
    const newSize = +value;
    const newPage = 1;
    const newCurrPage = paginate(img, newPage, newSize);
    this.setState({
      ...this.state,
      size: newSize,
      page: newPage,
      currPage: newCurrPage
    });
  }
  handleCompare = item => {
    const passData = [...this.state.passData];
    passData.push({ item });
    this.setState({ passData, switchButton: false });
  };

  handleRemove = item => {
    const tempArray = this.state.img;
    var newTempArray = tempArray.filter(tempId => {
      return tempId.id !== item.id;
    });
    const newPage = 1;
    const newCurrPage = paginate(newTempArray, newPage);
    this.setState({
      ...this.state,
      page: newPage,
      currPage: newCurrPage
    });
  };

  render() {
    const { page, size, currPage, passData, switchButton } = this.state;
    return (
      <div className="container">
        <section className="stickyElement">
          <div>page: {page}</div>
          <div>size: {size}</div>
          {switchButton === true ? (
            ""
          ) : (
            <div className="addItem">
              <button
                className="btn-info"
                onClick={() => this.setState({ switchButton: true })}
              >
                Compare
              </button>
            </div>
          )}
          <div>
            <label htmlFor="size">Size</label>
            <select name="size" id="size" onChange={this.handleChange}>
              <option value="3">3</option>
              <option value="6">6</option>
            </select>
          </div>
        </section>
        <div className="row">
          {currPage &&
            currPage.data.map(images => {
              return (
                <div className="col-lg-3 divStyle" key={images.id}>
                  <div style={{ position: "relative" }}>
                    <img
                      className="items"
                      key={images.id}
                      alt={images.title}
                      src={images.url}
                    />
                  </div>
                  <div>
                    <span>Title: {images.title}</span>
                  </div>
                  <div>
                    <span>ID: {images.id}</span>
                  </div>
                  <div className="wrapText">
                    URL:<span>&nbsp;{images.url}</span>
                  </div>
                  <div className="text-center">
                  {this.state.switchButton === true ? (
                    <button
                      onClick={() => this.handleCompare(images)}
                      className="button btn-success"
                    >
                      Compare
                    </button>
                  ) : (
                    <button
                      onClick={() => this.handleRemove(images)}
                      className="button btn-danger"
                    >
                      Remove
                    </button>
                  )}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="stickyBottom">
          <button className="btn-primary mr-2" onClick={this.previousPage}>
            Previous Page
          </button>
          <button className="btn-info" onClick={this.nextPage}>
            Next Page
          </button>
        </div>
        <TableView passData={passData} />
      </div>
    );
  }
}

export default ImageGrid;
