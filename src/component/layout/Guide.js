import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { guideBanned } from "../../store/actions/authAction";
import stick from "../../img/stick-man.png";

class Guide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guideOpen: false
    };
  }
  render() {
    const { store, staff, service } = this.props;
    let stepShow = {
      staff: false,
      service: false,
      openinghours: false,
      webSetup: false,
      count: 0
    };
    if (staff && staff.length < 1) {
      stepShow.staff = true;
      stepShow.count++;
    }
    if (service && service.length < 1) {
      stepShow.service = true;
      stepShow.count++;
    }
    if (
      store == undefined ||
      store.online === undefined ||
      (store.online && !store.online.bookingIsOpen)
    ) {
      stepShow.webSetup = true;
      stepShow.count++;
    }
    if (store == undefined || store.workday == undefined) {
      stepShow.openinghours = true;
      stepShow.count++;
    }

    const guideOpen = this.props.guideShow;
    this.openGuide = () => {
      this.setState({
        guideOpen: !this.state.guideOpen
      });
    };
    this.guideClose = () => {
      this.props.guideBanned(this.props.auth.uid);
    };
    let lastStep;
    if (stepShow.count === 0) {
      lastStep = (
        <Link to="/calendar">
          <div className="getting-started-task-done">
            <img className="getting-started-img" src={stick} />
            試著自己新增預約吧！
          </div>
        </Link>
      );
    } else {
      lastStep = "";
    }
    return (
      <React.Fragment>
        {guideOpen && (
          <div className="getting-started">
            {this.state.guideOpen ? (
              <button
                onClick={this.openGuide}
                className="getting-started-btn getting-started-btn-close"
              >
                X
              </button>
            ) : (
              <button onClick={this.openGuide} className="getting-started-btn">
                使用教學
                <span className="getting-started-badge">{stepShow.count}</span>
              </button>
            )}

            {this.state.guideOpen && (
              <div className="getting-started-surface">
                <div className="getting-started-surface-header">
                  <h1>使用步驟</h1>
                </div>
                <div className="getting-started-surface-body">
                  <ul>
                    <Link to="/staff">
                      <li className="getting-started-task-closed">
                        {stepShow.staff ? (
                          <span className="getting-started-completed">1</span>
                        ) : (
                          <div className="getting-started-completed-checked">
                            ✓
                          </div>
                        )}
                        前往服務人員設定資料
                      </li>
                    </Link>
                    <Link to="/service">
                      <li className="getting-started-task-closed">
                        {stepShow.service ? (
                          <span className="getting-started-completed icon-circle-check">
                            2
                          </span>
                        ) : (
                          <div className="getting-started-completed-checked">
                            ✓
                          </div>
                        )}
                        前往服務項目設定資料
                      </li>
                    </Link>
                    <Link to="/openinghours">
                      <li className="getting-started-task-closed">
                        {stepShow.openinghours ? (
                          <span className="getting-started-completed icon-circle-check">
                            3
                          </span>
                        ) : (
                          <div className="getting-started-completed-checked">
                            ✓
                          </div>
                        )}
                        營業時間設定資料
                      </li>
                    </Link>

                    <Link to="/online">
                      <li className="getting-started-task-closed">
                        {stepShow.webSetup ? (
                          <span className="getting-started-completed icon-circle-check">
                            4
                          </span>
                        ) : (
                          <div className="getting-started-completed-checked">
                            ✓
                          </div>
                        )}
                        預約網站頁面設定
                      </li>
                    </Link>
                    {lastStep}
                  </ul>
                  <button
                    onClick={this.guideClose}
                    className="getting-started-dismiss"
                  >
                    不要再顯示
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    guideShow:
      state.firestore.ordered.owners &&
      state.firestore.ordered.owners[0] &&
      state.firestore.ordered.owners[0].guideShow,
    staff: state.firestore.ordered.staff,
    store: state.firestore.ordered.store && state.firestore.ordered.store[0],
    service: state.firestore.ordered.service
  };
};

const mapDispatchToProps = dispatch => {
  return {
    guideBanned: id => dispatch(guideBanned(id))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(props => {
    return [
      {
        collection: "owners",
        doc: props.auth.uid
      },
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "staff" }],
        storeAs: "staff"
      },
      {
        collection: "store",
        doc: props.auth.uid,
        subcollections: [{ collection: "service" }],
        storeAs: "service"
      },
      {
        collection: "store",
        doc: props.auth.uid
      }
    ];
  })
)(Guide);
