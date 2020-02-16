import React, { Component } from "react";
import { connect } from "react-redux";
import edit from "../../img/edit.png";
import deleteImg from "../../img/delete.png";
import { deleteService } from "../../store/actions/serviceAction";

class ServiceList extends Component {
  deleteService = (storeId, serviceId) => {
    this.props.deleteService(storeId, serviceId);
  };
  render() {
    const { services, storeId } = this.props;
    return (
      <React.Fragment>
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
                  <img className="edit-img" src={edit}></img>
                </td>
                <td className="staff-name">{service.item}</td>
                <td className="staff-phone">{service.duration / 60} 小時</td>
                <td className="staff-email">{service.price}</td>
                <td className="staff-desc">{service.desc}</td>
              </tr>
            );
          })}
      </React.Fragment>
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
