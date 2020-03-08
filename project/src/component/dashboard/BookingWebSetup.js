import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { onlineSetup } from "../../store/actions/onlineAction";
import "..//../style/createstaff.css";
import storeBanner from "../../img/store-banner.png";
import Checkbox from "@material-ui/core/Checkbox";
import uploader from "../../img/upload.png";
import camera from "../../img/camera.png";

class BookingWebSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {
        storeName: "",
        storeAddress: "",
        storePhone: "",
        bookOpenDay: "365",
        bookCloseDay: "0",
        storeDesc: "",
        bookingNote: "",
        bookingIsOpen: true,
        logoImage: "",
        logoSrc: null,
        bannerImage: "",
        bannerSrc: null
      },
      error: {
        storePhone: false,
        storeName: false,
        storeAddress: false,
        storeDesc: false
      }
    };
  }

  handleChange = e => {
    if (e.target.id == "storePhone") {
      if (isNaN(e.target.value)) {
        this.setState({
          error: {
            ...this.state.error,
            storePhone: true
          }
        });
      } else {
        this.setState({
          error: {
            ...this.state.error,
            storePhone: false
          }
        });
      }
    }
    if (e.target.id == "storeName") {
      this.setState({
        error: {
          ...this.state.error,
          storeName: false
        }
      });
    }
    if (e.target.id == "storeAddress") {
      this.setState({
        error: {
          ...this.state.error,
          storeAddress: false
        }
      });
    }
    if (e.target.id == "storeDesc") {
      this.setState({
        error: {
          ...this.state.error,
          storeDesc: false
        }
      });
    }
    this.setState({
      store: {
        ...this.state.store,
        [e.target.id]: e.target.value
      }
    });
  };

  handleLogoChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          store: {
            ...this.state.store,
            logoImage: image,
            logoSrc: reader.result
          }
        });
      };
      reader.readAsDataURL(image);
    }
  };
  handleBannerChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          store: {
            ...this.state.store,
            bannerImage: image,
            bannerSrc: reader.result
          }
        });
      };

      reader.readAsDataURL(image);
    }
  };
  handleClick = e => {
    this.setState(prevState => ({
      store: {
        ...prevState.store,
        bookingIsOpen: !prevState.store.bookingIsOpen
      }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const onlineInfo = this.state.store;
    if (onlineInfo.storeName.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          storeName: true
        }
      }));
    }
    if (onlineInfo.storeAddress.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          storeAddress: true
        }
      }));
    }

    if (onlineInfo.storeDesc.length < 1) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          storeDesc: true
        }
      }));
    }

    if (
      onlineInfo.storeName.length > 0 &&
      onlineInfo.storeAddress.length > 0 &&
      onlineInfo.storePhone.length > 0 &&
      onlineInfo.storeDesc.length > 0
    ) {
      this.props.onlineSetup(onlineInfo, this.props.auth.uid);
      this.props.history.push("/online");
    }
  };
  handleCancel = e => {
    this.props.history.push("/online");
  };
  componentDidMount() {
    if (
      this.props.store &&
      this.props.store[0] &&
      this.props.store[0].online !== undefined
    ) {
      this.setState({ store: this.props.store[0].online });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.store && this.props.store[0] && this.props.store[0].online) {
      if (this.props.store !== prevProps.store) {
        this.setState({ store: this.props.store[0].online });
      }
    }
  }

  render() {
    if (this.state.store == null) {
      return <div>Loading</div>;
    }
    const onlineInfo = this.state.store;

    return (
      <div className="createstaff-wrapper">
        <div className="createstaff-header">
          <h1>線上預約網站設定</h1>
        </div>
        <form className="staff-form" onSubmit={this.handleSubmit}>
          <div className="input-wrapper">
            <div className="form-section">
              <div className="form-item">
                <label className="required" htmlFor="name">
                  店家名稱
                  {this.state.error.storeName && (
                    <span className="alert-msg">名稱請填寫完整</span>
                  )}
                </label>
                <input
                  placeholder="e.g. AppWorks School"
                  id="storeName"
                  onChange={this.handleChange}
                  value={onlineInfo.storeName}
                ></input>
              </div>
              <div className="form-item">
                <label className="required" htmlFor="date">
                  店家住址
                  {this.state.error.storeAddress && (
                    <span className="alert-msg">地址請填寫完整</span>
                  )}
                </label>
                <input
                  placeholder="請填入完整地址"
                  id="storeAddress"
                  onChange={this.handleChange}
                  value={onlineInfo.storeAddress}
                ></input>
              </div>
              <div className="form-item">
                <label className="required" htmlFor="time">
                  聯絡電話
                  {this.state.error.storePhone && (
                    <span className="alert-msg">請填入完整電話</span>
                  )}
                </label>
                <input
                  placeholder="e.g. 02555888"
                  id="storePhone"
                  onChange={this.handleChange}
                  value={onlineInfo.storePhone}
                ></input>
              </div>
              <div className="form-item logo-wrapper">
                <div className="form-item-title">公司圖片</div>
                <label htmlFor="logo">
                  <div className="logo-circle">
                    <img
                      className="store-logo"
                      src={onlineInfo.logoSrc ? onlineInfo.logoSrc : uploader}
                      alt=""
                    />
                    <div className="img-description-square">
                      <img src={camera} />
                      新增
                    </div>
                  </div>
                </label>
                <p>建議尺寸 300 x 250</p>
                <input
                  type="file"
                  name="pic"
                  accept="image/*"
                  onChange={this.handleLogoChange}
                  id="logo"
                  style={{ display: "none" }}
                />
              </div>
              <div className="form-item logo-wrapper">
                <div className="form-item-title">公司主視覺圖片</div>
                <label htmlFor="banner">
                  <div className="banner-wrapper">
                    <img
                      className="store-banner"
                      src={
                        onlineInfo.bannerSrc
                          ? onlineInfo.bannerSrc
                          : storeBanner
                      }
                      alt=""
                    />
                    <div className="img-description-square">
                      <img src={camera} />
                      新增
                    </div>
                  </div>
                </label>
                <p>建議尺寸 1280 x 400</p>
                <input
                  type="file"
                  name="pic"
                  id="banner"
                  accept="image/*"
                  onChange={this.handleBannerChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="form-section">
              <div className="form-item">
                <label htmlFor="desc">
                  最早預約時間 (例如:兩個月前開放預約)
                </label>
                <select
                  className="all-select"
                  id="bookOpenDay"
                  value={onlineInfo.bookOpenDay}
                  onChange={this.handleChange}
                >
                  <option value="365">不限制</option>
                  <option value="7">1週</option>
                  <option value="14">2週</option>
                  <option value="21">3週</option>
                  <option value="28">4週</option>
                  <option value="35">5週</option>
                  <option value="42">6週</option>
                  <option value="49">7週</option>
                  <option value="56">8週</option>
                  <option value="63">9週</option>
                  <option value="70">10週</option>
                  <option value="77">11週</option>
                  <option value="84">12週</option>
                </select>
              </div>
              <div className="form-item">
                <label htmlFor="desc">
                  最晚預約時間 (例如:最晚須於一天之前預約)
                </label>
                <select
                  className="all-select"
                  value={onlineInfo.bookCloseDay}
                  onChange={this.handleChange}
                  id="bookCloseDay"
                >
                  <option value="0">不限制</option>
                  <option value="1">1天</option>
                  <option value="2">2天</option>
                  <option value="3">3天</option>
                  <option value="4">4天</option>
                  <option value="5">5天</option>
                  <option value="6">6天</option>
                  <option value="7">1週</option>
                  <option value="14">2週</option>
                  <option value="21">3週</option>
                  <option value="28">4週</option>
                </select>
              </div>

              <div className="form-item">
                <label className="required" htmlFor="storeDesc">
                  店家描述
                  {this.state.error.storeDesc && (
                    <span className="alert-msg">請填入店家描述</span>
                  )}
                </label>
                <textarea
                  rows="11"
                  id="storeDesc"
                  onChange={this.handleChange}
                  value={onlineInfo.storeDesc}
                ></textarea>
              </div>
              <div className="form-item">
                <label htmlFor="bookingNote">預約須知</label>
                <textarea
                  rows="11"
                  id="bookingNote"
                  onChange={this.handleChange}
                  value={onlineInfo.bookingNote}
                ></textarea>
              </div>

              <div className="form-item">
                <label htmlFor="desc">
                  開放線上預約
                  <Checkbox
                    checked={onlineInfo.bookingIsOpen}
                    onChange={this.handleClick}
                    color="primary"
                    value="secondary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-button-wrapper">
            <button onClick={this.handleCancel} className="cancel-staff-button">
              取消
            </button>
            <button className="create-staff-button">儲存</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    store: state.firestore.ordered.store
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onlineSetup: (online, id) => dispatch(onlineSetup(online, id))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "store",
        doc: props.auth.uid
      }
    ];
  })
)(BookingWebSetup);
