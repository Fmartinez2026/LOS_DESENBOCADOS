export default function Buscador({ placeholder }) {
  return (
    <div style={{ marginTop: "1rem", display: "flex", gap: "10px", flexDirection: "column" }}>
      {/* El input usa la prop 'placeholder' que le enviamos */}
      <input 
        type="text" 
        className="form-input" 
        placeholder={placeholder} 
      />
      <button className="btn btn-primary">
        Buscar
      </button>
    </div>
  );
}