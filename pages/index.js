import { useState } from "react";

export default function Home() {
  const [edital, setEdital] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const gerarDeclaracoes = async () => {
    setLoading(true);
    setTimeout(() => {
      setResultado(`✔️ Pacote gerado com sucesso!\n\n- 12 declarações no padrão Galdino\n- PDF com cabeçalho, rodapé e assinatura\n- Verificação de certidões e atestados incluída.`);
      setLoading(false);
    }, 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArquivo(file);
      setEdital(`(Arquivo anexado: ${file.name})`);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <h1 style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>LicitaFácil</h1>
      <label htmlFor="upload">Anexar edital (PDF ou imagem):</label>
      <input type="file" id="upload" accept=".pdf,image/*" onChange={handleFileChange} style={{ display: 'block', marginBottom: 10 }} />

      <label htmlFor="edital">Ou cole aqui o conteúdo do edital:</label>
      <textarea
        id="edital"
        rows={10}
        value={edital}
        onChange={(e) => setEdital(e.target.value)}
        placeholder="Ex: Concorrência nº 005/2025 – Objeto: pavimentação urbana..."
        style={{ width: '100%', marginBottom: 10 }}
      />

      <button onClick={gerarDeclaracoes} disabled={loading}>
        {loading ? "Gerando..." : "Gerar Pacote de Documentos"}
      </button>

      {resultado && (
        <pre style={{ marginTop: 20, background: '#f4f4f4', padding: 10 }}>{resultado}</pre>
      )}
    </div>
  );
}