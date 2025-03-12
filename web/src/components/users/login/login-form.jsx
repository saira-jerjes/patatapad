import { useForm } from "react-hook-form";
import * as PatatapadAPI from "../../../services/api-services";
import { useAuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login-form.css";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    try {
      user = await PatatapadAPI.login(user);
      login(user);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        const { data } = error.response;
        Object.keys(data.errors).forEach((inputName) =>
          setError(inputName, { message: data.errors[inputName] })
        );
      } else {
        console.error(error);
      }
    }
  };
  return (
    <div className="login-body">
    <img className="fondo" src="./fondologin.jpg"/> 
    <div className="form-body">
      <form className="form-login" onSubmit={handleSubmit(handleLogin)}>
        <div className="input-group email">
          <span className="input-group-text">
            <i className="fa fa-envelope fa-fw"></i>
          </span>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="user@example.org"
            {...register("email", { required: "Mandatory field" })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        <div className="input-group mt-2 password">
          <span className="input-group-text">
            <i className="fa fa-lock fa-fw"></i>
          </span>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""} `}
            placeholder="****"
            {...register("password", { required: "Mandatory field" })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
        <div className="d-grid mt-3 mb-2">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>

        <Link to="/register" className="link-regist">Empieza a crear tu universo! Regístrate aquí</Link>
      </form>
    </div>
    </div>
  );
}

export default LoginForm;
