import React, { Component } from "react";
import "../../style/dashboardnav.css";
import nav from "../../img/nav.png";
import home from "../../img/home.png";
import calendar from "../../img/calendar.png";
import time from "../../img/time.png";
import service from "../../img/service.png";
import staff from "../../img/staff.png";
import online from "../../img/online.png";
import { Link } from "react-router-dom";

class DashboardNav extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false };
  }
  showMenu = () => {
    this.setState(prevState => ({
      ...prevState,
      showMenu: !prevState.showMenu
    }));
  };
  onMouseOver(e) {
    this.setState({
      showMenu: true
    });
  }

  onMouseOut(e) {
    this.setState({
      showMenu: false
    });
  }
  render() {
    const menuList = [
      { name: "管理介面首頁", img: home, url: "/dashboard" },
      { name: "行事曆", img: calendar, url: "/calendar" },
      { name: "營業時間", img: time, url: "/openinghours" },
      { name: "服務項目", img: service, url: "/service" },
      { name: " 服務人員", img: staff, url: "/staff" },
      { name: "打造專屬預約網站", img: online, url: "/online" }
    ];
    const addStyle = { backgroundColor: "rgba(73, 85, 105, 0.8)" };
    if (this.state.showMenu === true) {
      return (
        <React.Fragment>
          <div
            className="dashboard-nav"
            onMouseLeave={this.onMouseOut.bind(this)}
          >
            <ul>
              <li>
                <img onClick={this.showMenu} src={nav} alt="nav" />
              </li>

              {menuList.map((menu, i) => {
                if (i === this.props.index) {
                  return (
                    <Link key={i} to={menu.url}>
                      <li style={addStyle}>
                        <img src={menu.img} />
                        {menu.name}
                      </li>
                    </Link>
                  );
                } else {
                  return (
                    <Link key={i} to={menu.url}>
                      <li>
                        <img src={menu.img} />
                        {menu.name}
                      </li>
                    </Link>
                  );
                }
              })}
            </ul>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div
            className="s-dashboard-nav"
            onMouseEnter={this.onMouseOver.bind(this)}
          >
            <ul>
              <li>
                <img onClick={this.showMenu} src={nav} alt="nav" />
              </li>

              {menuList.map((menu, i) => {
                if (i === this.props.index) {
                  return (
                    <Link key={i} to={menu.url}>
                      <li style={addStyle}>
                        <img src={menu.img} />
                      </li>
                    </Link>
                  );
                } else {
                  return (
                    <Link key={i} to={menu.url}>
                      <li>
                        <img src={menu.img} />
                      </li>
                    </Link>
                  );
                }
              })}
            </ul>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default DashboardNav;
