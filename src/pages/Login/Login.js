import React, { Component } from "react";
import { connect } from "react-redux";

import "./Login.scss";
import { handleLoginApi, handleLoginApi2 } from "../../services/userService";
import * as actions from "../../redux/actions";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            passWord: "",
            isShowPassWord: false,
            errMessage: "",
        };
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState(
            {
                [name]: value,
            },
            () => {
                // console.log(this.state);
            }
        );
    };

    handleKeyDown = (e) => {
        // console.log("check key down: ", e);
        if (e.key === "Enter" || e.keyCode === 13) {
            this.handleLogin(e);
        }
    };

    handleLogin = async (e) => {
        //clearn hết đi
        this.setState({
            errMessage: ``,
        });
        e.preventDefault();

        try {
            let res = await handleLoginApi(
                this.state.userName,
                this.state.passWord
            );
            if (res && res.errCode !== 0) {
                //Lấy kết quả trả về
                this.setState({
                    errMessage: res.message,
                });
            }
            if (res && res.errCode === 0) {
                //login thành công
                // console.log("Login success");

                this.props.userLoginSuccess(res.user); //vứt lên reducer để quản lý
                // this.props.history.replace("/"); //điều hướng sang trang home
            }
        } catch (error) {
            if (error) {
                // console.log(error.response); //la 1 thuoc tinh cua axios khi gap loi
                this.setState({
                    errMessage: error.response.data.message,
                });
            }
        }
    };

    handleLogin2 = async (e) => {
        this.setState({
            errMessage: ``,
        });
        e.preventDefault();

        try {
            let res = await handleLoginApi2(
                this.state.userName,
                this.state.passWord
            );
            if (res && res.errCode !== 0) {
                //Lấy kết quả trả về
                this.setState({
                    errMessage: res.message,
                });
            }

            if (res && res.errCode === 0) {
                this.props.userLoginSuccess2(res.token);
            }
        } catch (error) {
            if (error) {
                this.setState({
                    errMessage: error.response.data.message,
                });
            }
        }
    };

    handleShowHidePassword = () => {
        //true thì để là text và cho hiện icon con mắt bị gạch
        this.setState({
            isShowPassWord: !this.state.isShowPassWord,
        });
    };

    render() {
        // console.log(`login: ${this.props.isLoggedIn}`);
        //JSX
        return (
            <div className="login-background d-flex">
                <div className="login-container col-6">
                    <div className="login-content row">
                        <div className="Logo mb-5">
                            <img
                                src={require("../../assets/images/LogoWebsite.PNG")}
                                alt="HealthBookings"
                            />
                        </div>
                        <div className="col-12 text-login"></div>
                        <div className="col-12 form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control login-input"
                                placeholder="Enter your usename"
                                name="userName"
                                value={this.state.userName}
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Password</label>
                            <div className="custom-input-password">
                                <input
                                    type={
                                        this.state.isShowPassWord
                                            ? "text"
                                            : "password"
                                    }
                                    className="form-control"
                                    placeholder="Enter your password"
                                    name="passWord"
                                    value={this.state.passWord}
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}
                                    onKeyDown={(e) => {
                                        this.handleKeyDown(e);
                                    }}
                                    autoComplete="off"
                                />
                                <span
                                    onClick={() => {
                                        this.handleShowHidePassword();
                                    }}
                                >
                                    {this.state.isShowPassWord ? (
                                        <i className="far fa-eye-slash"></i>
                                    ) : (
                                        <i className="far fa-eye"></i>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "red" }}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                            <button
                                className="btn-login"
                                onClick={(e) => {
                                    this.handleLogin2(e);
                                }}
                            >
                                Đăng Nhập
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">
                                Quên mật khẩu?
                            </span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login ">
                                Or Login with:
                            </span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
                <div className="login-bg_img col-6">
                    <div className="style_shape__1HA08"></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
        userLoginSuccess2: (token) => {
            return dispatch(actions.userLoginSuccess2(token));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
