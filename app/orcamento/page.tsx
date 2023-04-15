export default function Page() {
  return (
    <div className="md-px-4 flex flex-col items-center justify-center">
      <div>
        <label className="label">
          <span className="label-text">Nome do Cliente</span>
        </label>
        <label className="input-group flex justify-center">
          <span className="w-24">Nome</span>
          <input
            type="text"
            placeholder="Nome do Cliente"
            className="input-bordered input"
          />
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Telefone do Cliente</span>
        </label>
        <label className="input-group flex justify-center">
          <span className="w-24">Telefone</span>
          <input
            type="text"
            placeholder="Telefone do cliente"
            className="input-bordered input"
          />
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Energia Consumida em kWh</span>
        </label>
        <label className="input-group flex justify-center">
          <span className="w-24">Consumo</span>
          <input
            type="text"
            placeholder="Energia consumida"
            className="input-bordered input"
          />
        </label>
      </div>
      <button className="btn-primary btn my-4"> Procurar Sistema</button>
    </div>
  );
}
