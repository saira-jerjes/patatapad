import { useForm } from "react-hook-form";
import * as PatatapadAPI from "../../../services/api-services";
import { useAuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import "./register-form.css";

function RegisterForm() {
  const { register, handleSubmit, formState, setError } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const errors = formState.errors;

  const handleRegister = async (user) => {
    const userData = {
      username: user.name, 
      email: user.email,
      password: user.password,
    };
    try {
      await PatatapadAPI.register(userData);
      const data = await PatatapadAPI.login(user);
  
      login(data);
      navigate("/");
    } catch (error) {
      console.error("Error en el registro:", error.response?.data);
  
      const data = error.response?.data;
      if (data?.errors) {
        Object.keys(data.errors).forEach((inputName) =>
          setError(inputName, { message: data.errors[inputName] })
        );
      }
    }
  };
  

  return (
    <div className="login-body">
      <img className="fondo" src="./fondo-reg.jpg" />
      <div className="form-body">
        <h2 className="title">Registro</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="input-group mb-1">
            <span className="input-group-text">
              <i className="fa fa-user fa-fw"></i>
            </span>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="John Doe"
              {...register("name", { required: "Mandatory field" })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="input-group mb-1">
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

          <div className="input-group mb-2">
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

          <div className="d-grid">
            <button className="btn btn-primary" type="submit">
              Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegisterForm;
