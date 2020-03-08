import React from "react";
import { connect } from "react-redux";
import edit from "../../img/edit.png";
import deleteImg from "../../img/delete.png";
import Case from "../../img/case.png";
import { deleteService } from "../../store/actions/serviceAction";
import ServiceForm from "./ServiceForm";

class ServiceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
  }

  editServiceShow = (service, boolean) => {
    this.setState({
      edit: boolean,
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
            ...prevState.error,
            price: false
          }
        }));
      }
    }
    if (e.target.id == "item") {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          item: false
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

    if (serviceInfo.item.length > 0 && serviceInfo.price.length > 0) {
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
      return (
        <ServiceForm
          serviceInfo={this.state.service}
          storeId={storeId}
          toggleForm={this.editServiceShow}
        />
      );
    }

    return (
      <div className="table-container">
        <table className="table-wrapper">
          <thead>
            <tr>
              <th colSpan="2">服務項目</th>
              <th className="desc-width">描述</th>
              <th className="icon-width">時間</th>
              <th className="icon-width">價格</th>
              <th className="icon-width">編輯</th>
              <th className="icon-width">刪除</th>
            </tr>
          </thead>
          <tbody>
            {services &&
              services.map(service => {
                let url;
                if (service.url == null) {
                  url = Case;
                } else {
                  url = service.url;
                }
                return (
                  <tr key={service.id}>
                    <th className="img">
                      <img src={url} />
                    </th>
                    <th className="title">{service.item}</th>
                    <td datatitle="描述" className="staff-desc">
                      {service.desc}
                    </td>
                    <td datatitle="時間" className="icon-width">
                      {service.duration / 60} 小時
                    </td>
                    <td datatitle="價格" className="icon-width">
                      {service.price}
                    </td>

                    <td datatitle="編輯" className="icon-width">
                      <img
                        className="edit-img"
                        onClick={() => {
                          this.editServiceShow(service, true);
                        }}
                        src={edit}
                      ></img>
                    </td>
                    <td datatitle="刪除" className="icon-width">
                      <img
                        onClick={() => {
                          this.deleteService(storeId, service.id);
                        }}
                        className="edit-img"
                        src={deleteImg}
                      ></img>
                    </td>
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
      dispatch(deleteService(storeId, serviceId))
  };
};

export default connect(null, mapDispatchToProps)(ServiceList);
