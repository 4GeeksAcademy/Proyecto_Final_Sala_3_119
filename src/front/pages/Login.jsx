// Guarda email y password y hace login real contra la API.
// Muestra aviso cuando vienes de un registro correcto (?registered=1).
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import TextInput from "../components/TextInput";
import { login } from "../jsApiComponents/auth";
import { toast } from "react-toastify";
export function Login() {
  const nav = useNavigate();
  const [sp] = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  useEffect(() => {
    if (sp.get("registered")) {
      setOk("Cuenta creada. Ya puedes iniciar sesión.");
    }
  }, [sp]);
  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.email || !form.password) {
      setErr("Completa el email y la contraseña.");
      return;
    }
    const resp = await login(form);
    if (resp.status === 400) {
      setErr("Usuario o contraseña incorrecta.");
      console.log("Respuesta del server", resp);
      return;
    }
    if (resp.status === 200 && resp.data) {
      if (resp.data.token) {
        localStorage.setItem("token", resp.data.token);
        toast.success("🎉 Sesión iniciada correctamente.");
        nav("/home");
      }
    }
  };
  const randomEvents = [
    "⚽ Partidos y quedadas programadas para esta tarde",
    "🏃‍♂️ Grupo de running a 5 min de tu ubicación",
    "🏋️‍♀️ Entrenamiento libre en el parque central",
    "🚴‍♂️ Salida en bici nivel intermedio",
    "🥋 Clase gratuita de artes marciales",
    "🧘 Sesión de yoga al aire libre (nivel iniciación)",
    "🥾 Ruta de senderismo este domingo",
    "🤼 Entreno funcional con nuevos participantes",
    "🏊 Grupo de natación — 30 min técnica + cardio",
    "🏐 Partido amistoso de voley playa",
  ];
  const [randomEvent] = useState(
    () => randomEvents[Math.floor(Math.random() * randomEvents.length)]
  );
  return (
    <AuthShell
      title="Iniciar sesión"
      subtitle="Accede a tu cuenta para continuar"
    >
      <div className="auth-card-horizontal">

        <div className="auth-card-main">
          {ok && <div className="alert alert-success py-2">{ok}</div>}
          <form onSubmit={submit} noValidate>
            <TextInput
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="email@example.com"
            />
            <TextInput
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="********"
              withToggle
            />
            <div className="d-flex justify-content-end mb-3">
              <Link to="/forgot" className="link-accent">
                ¿Has olvidado la contraseña?
              </Link>
            </div>
            {err && <div className="alert alert-danger py-2">{err}</div>}
            <button className="btn btn-accent w-100 mt-1">Entrar</button>
          </form>
          <div className="text-center mt-3">
            <span className="link-muted">¿No tienes cuenta? </span>
            <Link to="/register" className="link-accent">
              Regístrate
            </Link>
          </div>
        </div>

        <aside className="auth-card-side">
          <h3>Vuelve a la acción</h3>
          <p>Entra a tu perfil y retoma donde lo dejaste. Hoy puedes encontrar:</p>
          <ul>
            <li>{randomEvent}</li>
          </ul>
          <p style={{ marginTop: "14px" }}>
            Cada día aparecen nuevas actividades cerca de tu zona.
            ¡No te lo pierdas!
          </p>
        </aside>
      </div>
    </AuthShell>
  );
}
