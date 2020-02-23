import React, { Component } from "react";
import { connect } from "react-redux";
import edit from "../../img/edit.png";
import deleteImg from "../../img/delete.png";
import { deleteService, editService } from "../../store/actions/serviceAction";

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      error: {
        item: false,
        price: false,
        image: false
      }
    };
  }

  editServiceShow = service => {
    this.setState({
      edit: true,
      service
    });
  };

  cancelForm = e => {
    this.setState({
      edit: false
    });
  };

  handleChange = e => {
    if (e.target.id == "price") {
      if (isNaN(e.target.value)) {
        this.setState(prevState => ({
          error: {
            ...prevState.error,
            price: true
          }
        }));
      } else {
        this.setState(prevState => ({
          error: {
            // object that we want to update
            ...prevState.error, // keep all other key-value pairs
            phone: false // update the value of specific key
          }
        }));
      }
    }
    if (e.target.id == "item") {
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          item: false // update the value of specific key
        }
      }));
    }
    this.setState({
      service: {
        ...this.state.service,
        [e.target.id]: e.target.value
      }
    });
  };
  handleImgChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          service: {
            ...this.state.service,
            url: reader.result,
            image
          }
        });
      };
      reader.readAsDataURL(image);
      this.setState(prevState => ({
        error: {
          // object that we want to update
          ...prevState.error, // keep all other key-value pairs
          image: false // update the value of specific key
        }
      }));
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const serviceInfo = this.state.service;
    if (serviceInfo.item.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          item: true
        }
      }));
    }

    if (serviceInfo.price.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          price: true
        }
      }));
      return;
    }

    if (serviceInfo.image == null) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          image: true
        }
      }));
    }

    if (
      serviceInfo.item.length > 0 &&
      serviceInfo.price.length > 0 &&
      serviceInfo.image !== null
    ) {
      console.log("submit", this.state);
      this.props.editService(this.props.storeId, serviceInfo.id, serviceInfo);
      this.setState({
        edit: false
      });
    }
  };

  deleteService = (storeId, serviceId) => {
    const r = confirm("是否確認要刪除？");
    if (r == true) {
      this.props.deleteService(storeId, serviceId);
    }
  };
  render() {
    const { services, storeId } = this.props;

    if (this.state.edit === true) {
      const serviceInfo = this.state.service;
      return (
        <div className="edit-staff-wrapper">
          <div className="createstaff-header">
            <h1>編輯服務項目</h1>
          </div>
          <form
            autoComplete="off"
            className="staff-form"
            onSubmit={this.handleSubmit}
          >
            <div className="input-wrapper">
              <div className="form-section">
                <div className="form-item">
                  <label className="required" htmlFor="name">
                    服務名稱
                    {this.state.error.item && (
                      <span className="alert-msg">請填入服務名稱</span>
                    )}
                  </label>
                  <input
                    id="item"
                    value={serviceInfo.item}
                    onChange={this.handleChange}
                  ></input>
                </div>
                <div className="form-item">
                  <label className="required" htmlFor="time">
                    服務所需時間
                  </label>
                  <select
                    className="all-select"
                    value={serviceInfo.duration}
                    onChange={this.handleChange}
                    id="duration"
                  >
                    <option value="30">30 分鐘</option>
                    <option value="60">1 小時</option>
                    <option value="90">1.5 小時</option>
                    <option value="120">2 小時</option>
                    <option value="150">2.5 小時</option>
                    <option value="180">3 小時</option>
                    <option value="210">3.5 小時</option>
                    <option value="240">4 小時</option>
                    <option value="270">4.5 小時</option>
                    <option value="300">5 小時</option>
                    <option value="330">5.5 小時</option>
                    <option value="360">6 小時</option>
                  </select>
                </div>
                <div className="form-item">
                  <label className="required" htmlFor="price">
                    價格
                    {this.state.error.price && (
                      <span className="alert-msg">請檢查填入價格</span>
                    )}
                  </label>
                  <span className="currencyinput">
                    <span className="dollarsign">$</span>
                    <input
                      id="price"
                      value={serviceInfo.price}
                      onChange={this.handleChange}
                    ></input>
                  </span>
                </div>
                <div className="form-item logo-wrapper">
                  <label className="required" htmlFor="desc">
                    服務項目照片
                    {this.state.error.image && (
                      <span className="alert-msg">請上傳服務項目照片</span>
                    )}
                  </label>
                  <div className="logo-circle">
                    <img className="store-logo" src={serviceInfo.url} alt="" />
                  </div>
                  <p>建議尺寸 180 x 180</p>
                  <input
                    onChange={this.handleImgChange}
                    type="file"
                    name="pic"
                    accept="image/*"
                  />
                </div>
              </div>
              <div className="form-section">
                <div className="form-item">
                  <label htmlFor="desc">服務說明</label>
                  <textarea
                    rows="11"
                    id="desc"
                    onChange={this.handleChange}
                    value={serviceInfo.desc}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="form-button-wrapper">
              <button onClick={this.cancelForm} className="cancel-staff-button">
                取消
              </button>
              <button className="create-staff-button">儲存</button>
            </div>
          </form>
        </div>
      );
    }

    return (
      <div className="staff-table-container">
        <table className="staff-table-wrapper">
          <thead>
            <tr>
              <th>刪除</th>
              <th>編輯</th>
              <th>項目</th>
              <th>時間</th>
              <th>價格</th>
              <th>描述</th>
            </tr>
          </thead>
          <tbody>
            {services &&
              services.map(service => {
                return (
                  <tr key={service.id}>
                    <td className="icon-edit">
                      <img
                        onClick={() => {
                          this.deleteService(storeId, service.id);
                        }}
                        className="edit-img"
                        src={deleteImg}
                      ></img>
                    </td>
                    <td className="icon-edit">
                      <img
                        className="edit-img"
                        onClick={() => {
                          this.editServiceShow(service);
                        }}
                        src={edit}
                      ></img>
                    </td>
                    <td className="staff-name">{service.item}</td>
                    <td className="staff-phone">
                      {service.duration / 60} 小時
                    </td>
                    <td className="staff-email">{service.price}</td>
                    <td className="staff-desc">{service.desc}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteService: (storeId, serviceId) =>
      dispatch(deleteService(storeId, serviceId)),
    editService: (storeId, serviceId, serviceInfo) =>
      dispatch(editService(storeId, serviceId, serviceInfo))
  };
};

export default connect(null, mapDispatchToProps)(ServiceList);
