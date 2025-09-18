import LoginForm from "./LoginForm";

export default function LoginEntry() {
  return (
    <div
      className=" min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('./fondologin.jpg')",
      }}
    >
      <div className=" flex items-center justify-center z-10">
        <LoginForm />
      </div>
    </div>
  );
}
