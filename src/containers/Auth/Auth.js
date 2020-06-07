import React, { Component } from "react";
import classes from "./Auth.module.css";
import Input from "../../components/UI/Forms/Input/Input";
import Button from "../../components/UI/Button/Button";
import { Redirect } from "react-router-dom";
//redux
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
//utility
import { checkValidity } from "../../utility/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    signUpMode: true,
  };

  componentDidMount() {
    if (!this.props.cookingSandwich && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler(event, controlName) {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({
      controls: updatedControls,
    });
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.signUpMode
    );
  };

  switchAuthHandler = () => {
    this.setState((prevState) => {
      return {
        signUpMode: !prevState.signUpMode,
      };
    });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((element) => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        changed={(event) => this.inputChangedHandler(event, element.id)}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMsg = null;
    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMsg}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthHandler} btnType="Danger">
          Switch to {this.state.signUpMode ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    idToken: state.authe.idToken,
    userId: state.authe.userId,
    loading: state.authe.loading,
    error: state.authe.error,
    isAuthenticated: state.authe.idToken !== null,
    cookingSandwich: state.sandwichBuilder.cooking,
    authRedirectPath: state.authe.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
